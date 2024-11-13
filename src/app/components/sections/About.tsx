"use client";
import React, { useEffect, useRef } from "react";
import ImageContainer from "../shared/ImageContainer";
import { useComponentStore } from "@/app/store/componentStore";
import { useObserver } from "@/app/utils/customHooks";
import { PageSections } from "@/app/utils/enums";

const AboutSection = () => {
  const aboutSection = useRef<HTMLElement | null>(null);

  const setAboutSection = useComponentStore((state) => state.setAboutSection);

  useObserver(aboutSection, PageSections.ABOUT);

  useEffect(() => {
    if (aboutSection.current) {
      setAboutSection(aboutSection.current);
    }
  }, []);

  return (
    <section
      ref={aboutSection}
      className="flex-center flex-col lg:flex-row my-14 gap-16"
    >
      <div className="flex-center flex-col mt-14 gap-16 2xl:w-8/12">
        <div className="w-11/12 flex-center flex-col gap-7">
          <h2 className="text-3xl font-extrabold text-center">
            Beyond Ordinary Property Management
          </h2>
          <p className="text-center">
            With years of experience and a passion for excellence, we elevate
            your property with exceptional management.
          </p>
        </div>
        <div className="flex-center flex-col lg:flex-row w-11/12 2xl:w-full lg:w-9/12 mt-14 gap-16">
          <div className="w-11/12 flex-center flex-col gap-10">
            <div className="flex flex-col justify-start items-start gap-2">
              <h3 className="text-xl font-extrabold">At Key One,</h3>
              <p className="text-lg text-justify">
                We believe in more than just transactions; we believe in
                building relationships. Our team of dedicated professionals is
                passionate about helping individuals and families find their
                ideal homes — places where memories will be made, and futures
                will be built. With an extensive portfolio of properties, from
                luxurious urban apartments to serene beachfront villas, we
                ensure that every client&apos;s unique needs are met.
              </p>
            </div>
            <div className="flex flex-col justify-start items-start gap-2">
              <h3 className="text-xl font-extrabold">Our Journey</h3>
              <p className="text-lg text-justify">
                Since our inception in 2007, Key One has exemplified excellence
                in property management services. With a distinguished track
                record of assisting families and investors, we offer a
                personalized experience that maximizes your investment returns.
                Our unwavering commitment to success and dedication to the
                highest standards ensure your property is meticulously cared for
                and attracts the most suitable tenants. That is the Key One
                promise.
              </p>
            </div>
          </div>
          <div className="w-full flex-center-col gap-16 lg:gap-9">
            <div>
              <h2 className="text-2xl font-bold">Why Choose Key One?</h2>
            </div>
            <div className="grid grid-cols-2 gap-[14px] lg:gap-[38px]">
              <div className="choose-card w-[182.378px] lg:w-[241px] lg:h-[185px] h-[140px] rounded-[15px] flex-center flex-col">
                <ImageContainer
                  src="/icons/hassle_free.svg"
                  alt="hassle free management"
                  fill
                  className="w-[35.63px] h-[35.63px] lg:w-[49px] lg:h-[49px]"
                />
                <p className="lg:text-2xl">Hassle-Free Management</p>
              </div>
              <div className="choose-card w-[182.378px] lg:w-[241px] lg:h-[185px] h-[140px] rounded-[15px] flex-center flex-col">
                <ImageContainer
                  src="/icons/industry.svg"
                  alt="hassle free management"
                  fill
                  className="w-[35.63px] h-[35.63px] lg:w-[49px] lg:h-[49px]"
                />
                <p className="lg:text-2xl">Industry Experience</p>
              </div>
              <div className="choose-card w-[182.378px] lg:w-[241px] lg:h-[185px] h-[140px] rounded-[15px] flex-center flex-col">
                <ImageContainer
                  src="/icons/tenancy.svg"
                  alt="hassle free management"
                  fill
                  className="w-[35.63px] h-[35.63px] lg:w-[49px] lg:h-[49px]"
                />
                <p className="lg:text-2xl">Uninterrupted Tenancy</p>
              </div>
              <div className="choose-card w-[182.378px] lg:w-[241px] lg:h-[185px] h-[140px] rounded-[15px] flex-center flex-col">
                <ImageContainer
                  src="/icons/legal.svg"
                  alt="hassle free management"
                  fill
                  className="w-[35.63px] h-[35.63px] lg:w-[49px] lg:h-[49px]"
                />
                <p className="lg:text-2xl">Legal Assurance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
