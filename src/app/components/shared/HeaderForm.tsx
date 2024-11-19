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
      number_of_rooms: "Number of Rooms",
    },
  });

  const [showStatus, setShowStatus] = useState(false);

  const formValues = watch();

  const [campaignSource, campaignMedium, campaignUTMURL] = useURLParams();

  const createContact = useApiStore((state) => state.createContact);

  // const sendZap = useApiStore((state) => state.sendZap);

  const { isPending, isError, isSuccess, error, mutateAsync } = useMutation({
    mutationKey: ["calculator-form", formValues.email],
    mutationFn: async (payload: ContactInsertRequest) => {
      const propertyCalculatorReq = await createContact(payload);

      return propertyCalculatorReq;
    },
  });

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

      const estimatedEarnings =
        Math.floor(Math.random() * (max - min + 1)) + min;

      return estimatedEarnings;
    }
  };

  const handleOpenPopupForm = () => {
    clearTimeout(timeout);

    setShowPopupForm(true);
  };

  // console.log(campaignMetadata);

  const generateRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleGenerateRandNumber = () => {
    const countryCodeMin = 10;
    const countryCodeMax = 999;

    const phoneNumberMin = 100000000;
    const phoneNumberMax = 999999999;

    const randomCountryCode = generateRandom(countryCodeMin, countryCodeMax);

    const randomPhoneNumber = generateRandom(phoneNumberMin, phoneNumberMax);

    return {
      countryCode: `${randomCountryCode}`,
      phoneNumber: `${randomPhoneNumber}`,
    };
  };

  const handleCalculateEstimate = async (data: HeaderFormInputs) => {
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

    const { countryCode, phoneNumber } = handleGenerateRandNumber();

    const payload: ContactInsertRequest = {
      ...calculatedFormPayload,
      email: data.email,
      remarks: `Hello, I am looking for a Property Management service for my property in ${data.location}. Email => ${data.email}, Number of rooms: ${data.number_of_rooms}. ${campaignUTMURL}`,
      bedroom: bedroom,
      budget: minBudget,
      budget2: maxBudget,
      campaignSource: campaignSource,
      campaignMedium: campaignMedium,
      mobilePhone: phoneNumber,
      mobileCountryCode: countryCode,
      telephoneCountryCode: countryCode,
      telephone: phoneNumber,
    };

    // console.log(`Create Contact Payload: ${JSON.stringify(payload)}`);

    await mutateAsync(payload);
    if (isSuccess) {
      setShowStatus(true);
    }

    // await sendZap({
    //   firstName: "harith",
    //   lastName: "onigemo",
    //   email: data.email,
    //   location: data.location,
    // });
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
            placeholder="Enter Location of Your Property"
            register={register}
            setValue={setValue}
            value={formValues.location}
            fieldOptions={{ required: "Location is required!" }}
            error={errors}
          />
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
              inputIcon="/icons/email.svg"
              name="email"
              placeholder="Enter Your Email Address"
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
