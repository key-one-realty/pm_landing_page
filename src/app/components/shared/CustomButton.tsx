import React from "react";
import ImageContainer from "./ImageContainer";

type CustomButtonProps = {
  btnName: string;
  isPending?: boolean;
  onClick?: () => void;
};

const CustomButton = ({ btnName, isPending, onClick }: CustomButtonProps) => {
  return (
    <div className="w-full flex-center gap-2 py-3 px-1 rounded-[15px] bg-button text-xl font-bold">
      <button onClick={onClick} className="capitalize w-11/12">
        {btnName}
      </button>
      {isPending && (
        <ImageContainer
          src="/icons/loader_black.svg"
          alt="loading icon"
          w={24}
          h={24}
          className="animate-spin text-black"
        />
      )}
    </div>
  );
};

export default CustomButton;
