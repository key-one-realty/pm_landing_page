"use client";
import React, { Suspense, useEffect, useRef } from "react";
// import HeaderForm from "../shared/HeaderForm";
import ImageContainer from "../shared/ImageContainer";
import Navbar from "../Navbar";
import RoundBlur from "../shared/RoundBlur";
import { useComponentStore } from "@/app/store/componentStore";
import { useObserver } from "@/app/utils/customHooks";
import { PageSections } from "@/app/utils/enums";
import ContactForm from "../shared/ContactForm";

const HomeSection = () => {
  const homeRef = useRef<HTMLElement | null>(null);

  const setHomeSection = useComponentStore((state) => state.setHomeSection);

  useObserver(homeRef, PageSections.HOME);

  useEffect(() => {
    if (homeRef.current) {
      setHomeSection(homeRef.current);
    }
  }, []);

  return (
    <header
      ref={homeRef}
      className="header-container bg-secondary-black max-w-full max-h-full lg:h-[120svh] 2xl:h-svh relative"
    >
      <RoundBlur
        w="328px"
        h="328px"
        opacity="0.25"
        background="black"
        className="top-[324px] -left-16"
      />
      <RoundBlur
        w="328px"
        h="328px"
        opacity="0.15"
        className="top-[424px] -right-16"
      />
      <RoundBlur
        w="385px"
        h="385px"
        opacity="0.15"
        className="-bottom-60 -right-40"
      />
      <div className="w-full min-h-svh  lg:flex lg:justify-between lg:items-center lg:flex-col">
        <Navbar />
        <div className="lg:hidden absolute overlay top-0 left-0 w-full h-full"></div>

        <div className="main-content flex-center">
          <div className="z-10 relative w-full h-fit gap-20 lg:gap-0 lg:w-10/12 2xl:w-8/12 flex-col-start-between flex-col justify-evenly lg:justify-between lg:items-end lg:flex-row-reverse">
            <div className="awards-container flex-center flex-col justify-end gap-4 w-[170px] lg:w-[194px] h-[50.972vh] lg:h-[95%] 2xl:h-full">
              <div className="award-imgs flex-between gap-4 lg:gap-8">
                <ImageContainer
                  src="/award.svg"
                  alt="Best Letting Agency Award"
                  w={49}
                  h={56}
                  imgClassName="lg:w-[70.607px] lg:h-[79.838px]"
                />
                <ImageContainer
                  src="/icons/arabian_property.svg"
                  alt="Arabian Property Award"
                  w={74}
                  h={52}
                  imgClassName="hidden lg:flex lg:w-[70.607px] lg:h-[79.838px]"
                />
              </div>
              <div className="text-white flex-center-col gap-1">
                <h1 className="font-montserrat text-sm font-bold text-center">
                  THE BEST LETTING AGENCY
                </h1>
                <p className="text-[10px] font-montserrat leading-4 font-medium text-center">
                  DUBAI & ARABIA
                </p>
                <p className="text-[7px] font-montserrat leading-3 font-medium text-center">
                  2024 - 2025
                </p>
              </div>
            </div>
            <div className="form-container flex-center w-full lg:w-6/12 2xl:w-5/12 h-full">
              <div className="w-11/12 lg:w-full flex-between justify-evenly flex-col lg:max-h-svh h-full gap-8 lg:gap-9 2xl:gap-8">
                <div className="form-header text-white flex-center flex-col gap-4 lg:gap-6">
                  <h1 className="text-4xl lg:text-6xl font-black font-montserrat">
                    Unlock Your Property&apos;s Full Income Potential
                  </h1>
                  <p className="font-medium">
                    Experience top-tier property management in premium locations
                    with the{" "}
                    <span className="font-bold">
                      Best Letting Agency Arabia
                    </span>{" "}
                    — awarded by the International Property Awards 2024. Your
                    journey to maximizing your property&apos;s potential starts
                    here.
                  </p>
                </div>
                <Suspense>
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeSection;
