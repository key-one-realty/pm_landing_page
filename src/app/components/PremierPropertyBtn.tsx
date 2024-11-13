"use client";
import React from "react";
import CustomButton from "./shared/CustomButton";
import { useComponentStore } from "../store/componentStore";

const PremierPropertyBtn = () => {
  const setShowPopupForm = useComponentStore((state) => state.setShowPopupForm);

  return (
    <CustomButton btnName="Know More" onClick={() => setShowPopupForm(true)} />
  );
};

export default PremierPropertyBtn;
