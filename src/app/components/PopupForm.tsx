"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import ImageContainer from "./shared/ImageContainer";
import FormInput from "./shared/FormInput";
import CustomButton from "./shared/CustomButton";
import { useComponentStore } from "../store/componentStore";
import { useComponentStoreRef, useURLParams } from "../utils/customHooks";
import { calculatedFormPayload, PageSections, RoomType } from "../utils/enums";
import { ContactInsertRequest, PopupFormInputs } from "../utils/types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useApiStore } from "../store/apiStore";
import { sendGTMEvent } from "@next/third-parties/google";
import LoadingFallback from "./shared/LoadingFallback";
import { getPhoneDetails } from "../utils/utils";

const PopupForm = () => {
  const popupFormRef = useRef<HTMLDivElement | null>(null);
  const showPopUpForm = useComponentStore((state) => state.showPopupForm);

  const setShowPopupForm = useComponentStore((state) => state.setShowPopupForm);

  const sendZap = useApiStore((state) => state.sendZap);
  const zapSent = useApiStore((state) => state.zapSent);

  useComponentStoreRef(popupFormRef, PageSections.POPUPFORM);

  const [showStatus, setShowStatus] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PopupFormInputs>({
    defaultValues: {
      fullName: "",
      email: "",
      comments: "",
      phone_number: "",
      property_type: "Property Type",
    },
  });

  const formValues = watch();

  const [campaignSource, campaignMedium, campaignUTMURL] = useURLParams();

  const createContact = useApiStore((state) => state.createContact);

  const { isPending, isSuccess, isError, error, mutateAsync } = useMutation({
    mutationKey: ["popup-form", formValues.email],
    mutationFn: async (payload: ContactInsertRequest) => {
      const mutationReq = await createContact(payload);

      sendGTMEvent({ event: "pm_cta_trigger", value: "true" });

      return mutationReq;
    },
  });

  const handlePopupFormRequest = async (data: PopupFormInputs) => {
    const { areaCode, countryCode, mobileNumber, formattedPhoneNumber } =
      getPhoneDetails(data.phone_number);
    const name = data.fullName.split(" ");
    const firstName = name[0];
    const familyName = name[1];
    const payload: ContactInsertRequest = {
      ...calculatedFormPayload,
      firstName: firstName,
      familyName: familyName,
      mobilePhone: mobileNumber,
      email: data.email,
      remarks: data.comments + " / " + campaignUTMURL,
      bedroom: String(calculatedFormPayload.bedroom["studio" as RoomType]),
      budget: "",
      budget2: "",
      campaignSource: campaignSource,
      campaignMedium: campaignMedium,
      compaignSource: campaignSource,
      compaignMedium: campaignMedium,
      mobileAreaCode: areaCode,
      mobileCountryCode: countryCode,
    };

    // console.log(
    //   `Country Code: ${countryCode}, Area Code: ${areaCode}, Mobile Number: ${mobileNumber}`
    // );

    await mutateAsync(payload);
    if (!zapSent) {
      await sendZap({
        email: data.email,
        firstName: firstName,
        lastName: familyName,
        fullName: `${firstName}${familyName && " " + familyName}`,
        phoneNumber: `+${countryCode} ${formattedPhoneNumber}`,
      });
    }

    setShowStatus(true);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
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
      <div
        ref={popupFormRef}
        className={`${
          showPopUpForm ? "show-popup-form" : "hidden"
        } popup-form-container absolute top-0 left-0 z-50 w-full h-screen max-w-[100svw] max-h-screen flex-center`}
      >
        <div className="absolute blur-overlay blur-md top-0 left-0 w-full h-full"></div>

        <div className="popup-form-content h-5/6 w-11/12 flex-center-col justify-evenly">
          <div className="form-header w-full text-white flex-center flex-col gap-3">
            <div
              className="back-btn w-full flex-start cursor-pointer"
              onClick={() => setShowPopupForm(false)}
            >
              <ImageContainer
                src="/icons/chevron_left.svg"
                alt="back button"
                w={24.212}
                h={24.212}
                className="rotate-180"
              />
            </div>
            <div className="header-content flex-center-col text-center w-11/12 lg:w-6/12 gap-7">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Unlock Your Property&apos;s True Potential
              </h2>
              <p className="text-xl font-medium text-center">
                Experience Elite Management with Key One{" "}
                <span className="font-extrabold">
                  Ready to Elevate Your Investment Returns?
                </span>
              </p>
            </div>
          </div>
          {showStatus && isError && (
            <span className="text-red-500 py-4 text-center">
              {error.message}
            </span>
          )}
          {showStatus && isSuccess && (
            <span className="text-green-500 py-4 text-center">
              Thank you for contacting us! Someone from the team should reach
              out to you soon
            </span>
          )}
          <form
            className="h-full w-full lg:w-5/12 flex-center-col gap-[6.87px]"
            onSubmit={handleSubmit(handlePopupFormRequest)}
          >
            <FormInput
              inputIcon="/icons/email.svg"
              name="fullName"
              placeholder="Full Name"
              register={register}
              value={formValues.fullName}
              fieldOptions={{ required: "Full Name is required!" }}
              error={errors}
            />
            <FormInput
              inputIcon="/icons/email_address.svg"
              name="email"
              placeholder="Email Address"
              register={register}
              value={formValues.email}
              fieldOptions={{ required: "Email address is required!" }}
              error={errors}
            />
            <FormInput
              inputIcon="/icons/phone_number.svg"
              name="phone_number"
              placeholder="Phone Number"
              inputType="phone"
              setValue={setValue}
              register={register}
              value={formValues.phone_number}
              fieldOptions={{ required: "Phone Number is required!" }}
              error={errors}
            />
            <FormInput
              inputIcon="/icons/property_type.svg"
              name="property_type"
              placeholder="Property Type"
              inputType="select"
              options={["Apartment", "Villa", "House", "Office"]}
              register={register}
              value={formValues.property_type}
              error={errors}
            />
            <FormInput
              inputIcon="/icons/additional_comments.svg"
              name="comments"
              inputType="textarea"
              placeholder="Additional Comments or Questions"
              register={register}
              value={formValues.comments}
              error={errors}
            />
            <CustomButton btnName="Submit" isPending={isPending} />
          </form>
        </div>
      </div>
    </Suspense>
  );
};

export default PopupForm;
