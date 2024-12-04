"use client";
import React, { Suspense, useEffect, useState } from "react";
import FormInput from "./FormInput";
import ImageContainer from "./ImageContainer";
import CustomButton from "./CustomButton";
import { useComponentStore } from "@/app/store/componentStore";
import { useForm } from "react-hook-form";
import { ContactInsertRequest, HeaderFormInputs } from "@/app/utils/types";
import { calculatedFormPayload } from "@/app/utils/enums";
import { useApiStore } from "@/app/store/apiStore";
import { useMutation } from "@tanstack/react-query";
import { useURLParams } from "@/app/utils/customHooks";
import LoadingFallback from "./LoadingFallback";
import { getPhoneDetails } from "@/app/utils/utils";
import { sendGTMEvent } from "@next/third-parties/google";

type RoomType =
  | "studio"
  | "1 bedroom"
  | "2 bedrooms"
  | "3 bedrooms"
  | "4 bedrooms"
  | "5 or more bedrooms";

type earningsType = {
  [key in RoomType]: {
    min: number;
    max: number;
  };
};

const HeaderForm = () => {
  const setShowPopupForm = useComponentStore((state) => state.setShowPopupForm);

  let timeout: NodeJS.Timeout;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<HeaderFormInputs>({
    defaultValues: {
      email: "",
      location: "",
      full_name: "",
      phone_number: "",
      number_of_rooms: "Number of Rooms",
    },
  });

  const [showStatus, setShowStatus] = useState(false);

  const formValues = watch();

  const { campaignSource, campaignUTM, campaignUTMURL } = useURLParams();

  const createContact = useApiStore((state) => state.createContact);

  const sendZap = useApiStore((state) => state.sendZap);
  const zapSent = useApiStore((state) => state.zapSent);

  const { isPending, isError, isSuccess, error, mutateAsync } = useMutation({
    mutationKey: ["calculator-form", formValues.email],
    mutationFn: async (payload: ContactInsertRequest) => {
      const propertyCalculatorReq = await createContact(payload);

      return propertyCalculatorReq;
    },
  });

  const generateRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleRentCalculation = () => {
    const earnings: earningsType = {
      studio: {
        min: 1700,
        max: 2040,
      },
      "1 bedroom": {
        min: 2390,
        max: 3070,
      },
      "2 bedrooms": {
        min: 3070,
        max: 4080,
      },
      "3 bedrooms": {
        min: 4080,
        max: 6820,
      },
      "4 bedrooms": {
        min: 6820,
        max: 8160,
      },
      "5 or more bedrooms": {
        min: 8160,
        max: 10000,
      },
    };

    if (formValues.number_of_rooms.toLowerCase() != "number of rooms") {
      const { min, max } =
        earnings[formValues.number_of_rooms.toLowerCase() as RoomType];

      const estimatedEarnings = generateRandom(min, max);

      return estimatedEarnings;
    }
  };

  const handleOpenPopupForm = () => {
    clearTimeout(timeout);

    setShowPopupForm(true);
  };

  // console.log(campaignMetadata);

  // const handleGenerateRandNumber = () => {
  //   const countryCodeMin = 10;
  //   const countryCodeMax = 999;

  //   const phoneNumberMin = 100000000;
  //   const phoneNumberMax = 999999999;

  //   const randomCountryCode = generateRandom(countryCodeMin, countryCodeMax);

  //   const randomPhoneNumber = generateRandom(phoneNumberMin, phoneNumberMax);

  //   return {
  //     countryCode: `${randomCountryCode}`,
  //     phoneNumber: `${randomPhoneNumber}`,
  //   };
  // };

  const handleCalculateEstimate = async (data: HeaderFormInputs) => {
    const { areaCode, countryCode, mobileNumber, formattedPhoneNumber } =
      getPhoneDetails(data.phone_number);
    const name = data.full_name.split(" ");
    const firstName = name[0];
    const familyName = name[1];

    const bedroom = String(
      calculatedFormPayload.bedroom[
        formValues.number_of_rooms.toLowerCase() as RoomType
      ]
    );

    const minBudget = String(
      calculatedFormPayload.budget[
        formValues.number_of_rooms.toLowerCase() as RoomType
      ].min
    );

    const maxBudget = String(
      calculatedFormPayload.budget[
        formValues.number_of_rooms.toLowerCase() as RoomType
      ].max
    );

    const payload: ContactInsertRequest = {
      ...calculatedFormPayload,
      firstName: firstName,
      familyName: familyName,
      email: data.email,
      remarks: `Hello, I am looking for a Property Management service for my property in ${data.location}. Email => ${data.email}, Number of rooms: ${data.number_of_rooms}. ${campaignUTMURL}`,
      bedroom: bedroom,
      budget: minBudget,
      budget2: maxBudget,
      campaignSource: campaignSource,
      campaignMedium: campaignUTM,
      compaignSource: campaignSource,
      compaignMedium: campaignUTM,
      mobilePhone: mobileNumber,
      mobileAreaCode: areaCode,
      mobileCountryCode: countryCode,
      telephoneCountryCode: countryCode,
      telephoneAreaCode: areaCode,
      telephone: mobileNumber,
    };

    // console.log(`Create Contact Payload: ${JSON.stringify(payload)}`);

    await mutateAsync(payload);
    sendGTMEvent({ event: "pm_cta_trigger", value: "true" });
    if (isSuccess) {
      setShowStatus(true);
    }

    if (!zapSent) {
      await sendZap({
        email: data.email,
        firstName: firstName,
        lastName: "",
        fullName: `${firstName}${familyName && " " + familyName}`,
        phoneNumber: `+${countryCode} ${formattedPhoneNumber}`,
      });
    }
  };

  useEffect(() => {
    if (showStatus) {
      timeout = setTimeout(() => {
        setShowStatus(false);
        setShowPopupForm(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [showStatus]);

  useEffect(() => {}, [isSuccess]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="form flex-center flex-col lg:justify-start gap-8 pb-16 lg:pb-0 w-full h-3/4">
        {showStatus && isError && (
          <span className="text-red-500 py-4 text-center">{error.message}</span>
        )}
        <form
          className="flex-center gap-3 flex-col w-full"
          onSubmit={handleSubmit(handleCalculateEstimate)}
        >
          <FormInput
            inputIcon="/icons/map.svg"
            name="location"
            inputType="location"
            placeholder="Location of Your Property"
            register={register}
            setValue={setValue}
            value={formValues.location}
            fieldOptions={{ required: "Location is required!" }}
            error={errors}
          />
          <div className="w-full flex-center-col lg:flex-row gap-[14px]">
            <FormInput
              inputIcon="/icons/email.svg"
              name="full_name"
              placeholder="Full Name"
              inputType="text"
              register={register}
              value={formValues.full_name}
              fieldOptions={{ required: "Full Name is required!" }}
              error={errors}
            />
            <div className="w-full">
              <FormInput
                inputIcon="/icons/phone_number.svg"
                name="phone_number"
                placeholder="Phone number"
                inputType="phone"
                register={register}
                setValue={setValue}
                value={formValues.phone_number}
                fieldOptions={{ required: "Phone Number is required!" }}
                error={errors}
                hideIcon
              />
            </div>
          </div>
          <div className="w-full flex-center-col lg:flex-row gap-[14px]">
            <FormInput
              inputIcon="/icons/house.svg"
              name="number_of_rooms"
              placeholder="Number of Rooms"
              inputType="select"
              options={[
                "Studio",
                "1 Bedroom",
                "2 Bedrooms",
                "3 Bedrooms",
                "4 Bedrooms",
                "5 or More Bedrooms",
              ]}
              register={register}
              value={formValues.number_of_rooms}
              fieldOptions={{ required: "Number of Rooms is required!" }}
              error={errors}
            />
            <FormInput
              inputIcon="/icons/email_address.svg"
              name="email"
              placeholder="Email Address"
              register={register}
              value={formValues.email}
              fieldOptions={{ required: "Email Address is required!" }}
              error={errors}
            />
          </div>

          {isSuccess && (
            <div className="valuation flex-between w-full text-white">
              <div className="property-requested w-5/12 flex-col-start-between gap-1">
                <h2 className="text-xl w-[90%] font-bold font-montserrat">
                  {formValues.number_of_rooms} in {formValues.location}
                </h2>
                <p className="text-[10px] font-medium">estimated earnings</p>
              </div>
              <div>
                <ImageContainer
                  src={"/icons/chevron_left.svg"}
                  alt="chevron left"
                  w={16.093}
                  h={16.093}
                />
              </div>
              <div className="property-requested w-5/12 flex-col-start-between items-end gap-1">
                <h2 className="text-3xl font-bold font-montserrat">
                  ${handleRentCalculation()}
                </h2>
                <p className="text-[10px] font-medium">monthly</p>
              </div>
            </div>
          )}
          {!isSuccess && (
            <CustomButton btnName="Calculate" isPending={isPending} />
          )}
        </form>
        {isSuccess && (
          <CustomButton btnName="Add a Listing" onClick={handleOpenPopupForm} />
        )}
      </div>
    </Suspense>
  );
};

export default HeaderForm;
