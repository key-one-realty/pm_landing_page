"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useApiStore } from "@/app/store/apiStore";
import { ContactInsertRequest, ContactFormInputs } from "@/app/utils/types";
import { getPhoneDetails } from "@/app/utils/utils";
import { calculatedFormPayload } from "@/app/utils/enums";
import { useURLParams } from "@/app/utils/customHooks";
import { sendGTMEvent } from "@next/third-parties/google";
import FormInput from "./FormInput";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";


const ContactForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      property_type: "",
      message: "",
    },
  });

  const router = useRouter();

  const formValues = watch();
  const [showStatus, setShowStatus] = useState(false);
  const { campaignSource, campaignUTM, campaignUTMURL } = useURLParams();

  const createContact = useApiStore((state) => state.createContact);
  const sendZap = useApiStore((state) => state.sendZap);
  const zapSent = useApiStore((state) => state.zapSent);

  const { isPending, isError, isSuccess, error, mutateAsync } = useMutation({
    mutationKey: ["contact-form", formValues.email],
    mutationFn: async (payload: ContactInsertRequest) => {
      return await createContact(payload);
    },
  });

  const onSubmit = async (data: ContactFormInputs) => {
    const { areaCode, countryCode, mobileNumber, formattedPhoneNumber } =
      getPhoneDetails(data.phone_number);

    const name = data.full_name.split(" ");
    const firstName = name[0];
    const familyName = name[1] || "";

    const payload: ContactInsertRequest = {
      ...calculatedFormPayload,
      firstName,
      familyName,
      email: data.email,
      remarks: `${data.message} / Property Type: ${data.property_type} / ${campaignUTMURL}`,
      bedroom: "", // optional, no room info in this form
      budget: "",
      budget2: "",
      campaignSource,
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

    if (!isPending && !isSuccess) {
      await mutateAsync(payload);
      sendGTMEvent({ event: "contact_form_submit", value: "true" });

      if (!zapSent) {
        await sendZap({
          email: data.email,
          firstName,
          lastName: familyName,
          fullName: `${firstName}${familyName ? " " + familyName : ""}`,
          phoneNumber: `+${countryCode} ${formattedPhoneNumber}`,
        });
      }

      router.push("/thank-you?utm_source=google&utm_medium=search&utm_campaign=pm");
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showStatus) {
      timeout = setTimeout(() => {
        setShowStatus(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [showStatus]);

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-lg mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      {showStatus && isSuccess && (
        <span className="text-green-500">Form submitted successfully!</span>
      )}
      {isError && <span className="text-red-500">{error.message}</span>}

      <FormInput
        inputIcon="/icons/email.svg"
        name="full_name"
        placeholder="Full Name"
        inputType="text"
        register={register}
        value={formValues.full_name}
        setValue={setValue}
        fieldOptions={{ required: "Full Name is required" }}
        error={errors}
      />

      <FormInput
        inputIcon="/icons/email_address.svg"
        name="email"
        placeholder="Email Address"
        inputType="email"
        register={register}
        value={formValues.email}
        setValue={setValue}
        fieldOptions={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        }}
        error={errors}
      />

      <FormInput
        inputIcon="/icons/phone_number.svg"
        name="phone_number"
        placeholder="Phone Number"
        inputType="phone"
        register={register}
        value={formValues.phone_number}
        setValue={setValue}
        fieldOptions={{ required: "Phone number is required" }}
        error={errors}
      />

      <FormInput
        inputIcon="/icons/house.svg"
        name="property_type"
        placeholder="Property Type"
        inputType="select"
        register={register}
        value={formValues.property_type}
        setValue={setValue}
        options={["Apartment", "Villa", "Townhouse", "Penthouse"]}
        fieldOptions={{ required: "Property type is required" }}
        error={errors}
      />

      <FormInput
        inputIcon="/icons/additional_comments.svg"
        name="message"
        placeholder="Message"
        inputType="textarea"
        register={register}
        value={formValues.message}
        setValue={setValue}
        fieldOptions={{ required: "Message is required" }}
        error={errors}
      />

      <CustomButton btnName="Enquire Now" isPending={isPending} />
    </form>
  );
};

export default ContactForm;
