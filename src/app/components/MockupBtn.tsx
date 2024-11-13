"use client";
import React from "react";
import CustomButton from "./shared/CustomButton";
import { useComponentStore } from "../store/componentStore";

const MockupBtn = () => {
  const setShowPopupForm = useComponentStore((state) => state.setShowPopupForm);

  return (
    <div className=" flex justify-end items-end w-8/12">
      <div className="w-11/12 lg:w-4/12">
        <CustomButton
          btnName="Download Now"
          onClick={() => setShowPopupForm(true)}
        />
      </div>
    </div>
  );
};

export default MockupBtn;
