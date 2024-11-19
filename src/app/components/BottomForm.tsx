"use client";
import React, { Suspense, useEffect, useState } from "react";
import BottomFormInput from "./shared/BottomFormInput";
import CustomButton from "./shared/CustomButton";
import { useForm } from "react-hook-form";
import { ContactInsertRequest } from "../utils/types";
import { calculatedFormPayload, RoomType } from "../utils/enums";
import { useMutation } from "@tanstack/react-query";
import { useApiStore } from "../store/apiStore";
import { sendGTMEvent } from "@next/third-parties/google";
import { useURLParams } from "../utils/customHooks";
import LoadingFallback from "./shared/LoadingFallback";

type BottomFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const BottomForm = () => {
  const [showStatus, setShowStatus] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BottomFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const createContact = useApiStore((state) => state.createContact);

  const formValues = watch();

  const { isPending, isError, isSuccess, error, mutateAsync } = useMutation({
    mutationKey: ["bottom-contact-form", formValues.email],
    mutationFn: async (payload: ContactInsertRequest) => {
      const bottomContactReq = await createContact(payload);

      sendGTMEvent({ event: "pm_cta_trigger", value: "true" });

      return bottomContactReq;
    },
  });

  const [campaignSource, campaignMedium, campaignUTMURL] = useURLParams();

  const handleSubmitContactReq = async (data: BottomFormValues) => {
    const name = data.name.split(" ");
    const firstName = name[0];
    const familyName = name[1];
    const payload: ContactInsertRequest = {
      ...calculatedFormPayload,
      firstName: firstName,
      familyName: familyName,
      mobilePhone: data.phone,
      email: data.email,
      remarks: data.message + " / " + campaignUTMURL,
      bedroom: String(calculatedFormPayload.bedroom["studio" as RoomType]),
      budget: "",
      budget2: "",
      campaignSource: campaignSource,
      campaignMedium: campaignMedium,
    };

    await mutateAsync(payload);

    setShowStatus(true);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showStatus) {
      timeout = setTimeout(() => {
        setShowStatus(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [showStatus]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="w-full lg:w-full 2xl:w-10/12 flex-center-col pt-10 lg:pt-0 pb-24 lg:pb-0 h-full lg:h-[450px] 2xl:h-[546px]">
        {showStatus && isError && (
          <span className="text-red-500 text-center">{error.message}</span>
        )}
        {showStatus && isSuccess && (
          <span className="text-green-300 text-center">
            Thank you for contacting us! Someone from the team should reach out
            to you soon
          </span>
        )}
        <form
          className="flex-center-col lg:items-start lg:justify-between gap-9 w-11/12 h-full"
          onSubmit={handleSubmit(handleSubmitContactReq)}
        >
          <div className="w-full lg:flex lg:flex-col lg:justify-between h-full">
            <BottomFormInput
              register={register}
              error={errors}
              fieldOptions={{ required: true }}
              name="name"
              placeholder="Name"
            />
            <BottomFormInput
              register={register}
              error={errors}
              fieldOptions={{ required: true }}
              name="email"
              placeholder="Email"
            />
            <BottomFormInput
              register={register}
              error={errors}
              fieldOptions={{ required: true }}
              name="phone"
              placeholder="Phone"
            />
            <BottomFormInput
              name="message"
              placeholder="Message"
              inputType="textarea"
              register={register}
              error={errors}
            />
          </div>
          <div className="w-full lg:w-5/12 2xl:w-6/12">
            <CustomButton btnName="Send Message" isPending={isPending} />
          </div>
        </form>
      </div>
    </Suspense>
  );
};

export default BottomForm;
