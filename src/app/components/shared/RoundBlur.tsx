import React from "react";

type RoundBlurProps = {
  className?: string;
  opacity: string;
  w: string;
  h: string;
  background?: string;
};

const RoundBlur = ({
  className,
  opacity,
  w,
  h,
  background = "gold",
}: RoundBlurProps) => {
  return (
    <div
      className={`absolute rounded-[50%] blur-[50px] ${className} overflow-hidden`}
    >
      <div
        style={{
          width: w,
          height: h,
          opacity: opacity,
        }}
        className={` blur-[50px] ${
          background == "black" ? "bg-blur-black" : "bg-button"
        } overflow-hidden`}
      ></div>
    </div>
  );
};

export default RoundBlur;
