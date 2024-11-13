"use client";
import React, { useState } from "react";
import ImageContainer from "./shared/ImageContainer";
import { useComponentStore } from "../store/componentStore";

type ServiceCardProps = {
  serviceHeader: string;
  serviceDescription: string;
};

const ServiceCard = ({
  serviceHeader,
  serviceDescription,
}: ServiceCardProps) => {
  const [hover, setHover] = useState(false);

  const handleOnMouseEnter = () => {
    setHover(true);
  };

  const handleOnMouseLeave = () => {
    setHover(false);
  };

  const setShowPopupForm = useComponentStore((state) => state.setShowPopupForm);

  return (
    <div
      className="service-card-container relative flex-center pt-7 pb-10 bg-black rounded-t-[20px] rounded-bl-[20px]"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className="service-card text-white flex-center items-start flex-col gap-5 w-11/12">
        <h4 className="service-header w-8/12 text-xl font-bold hover:italic">
          {serviceHeader}
        </h4>
        <div className="w-full h-[1px] bg-button"></div>
        <div>
          <p className="text-justify text-sm font-medium">
            {serviceDescription}
          </p>
        </div>
      </div>
      <div
        className={`${hover ? "flex" : "hidden"} absolute -top-2 -right-2`}
        onClick={() => setShowPopupForm(true)}
      >
        <ImageContainer
          src={"/icons/contact_badge.svg"}
          alt="contact badge"
          w={87}
          h={87}
        />
      </div>
    </div>
  );
};

export default ServiceCard;
