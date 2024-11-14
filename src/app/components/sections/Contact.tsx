"use client";
import React, { useEffect, useRef } from "react";
import ImageContainer from "../shared/ImageContainer";
import BottomForm from "../BottomForm";
import Footer from "../Footer";
import RoundBlur from "../shared/RoundBlur";
import { useComponentStore } from "@/app/store/componentStore";
import { PageSections } from "@/app/utils/enums";
import { useObserver } from "@/app/utils/customHooks";

const ContactSection = () => {
  const contactRef = useRef<HTMLElement | null>(null);

  const setContactSection = useComponentStore(
    (state) => state.setContactSection
  );

  useObserver(contactRef, PageSections.CONTACT);

  useEffect(() => {
    if (contactRef.current) {
      setContactSection(contactRef.current);
    }
  }, []);

  return (
    <section
      ref={contactRef}
      className="bottom-form bg-secondary-black rounded-tl-[25px] lg:rounded-tl-[100px] h-full relative"
    >
      <RoundBlur
        w="412px"
        h="414px"
        opacity="0.15"
        className="-top-20 -right-36"
      />
      <div className="flex-center-col h-full">
        <div className="flex-center-col gap-[22px] lg:gap-10 text-white py-14 lg:py-16">
          <h1 className="text-3xl lg:text-4xl text-center font-bold w-[65%] lg:w-full">
            Get in Touch with Our Expert Team
          </h1>
          <p className="text-lg text-center w-11/12 lg:w-8/12">
            Questions or advice needed? Allow us to provide exceptional
            management for your distinguished property.
          </p>
        </div>
        <div className="lg:flex lg:justify-around lg:w-10/12 2xl:w-8/12 h-full">
          <div className="flex-center 2xl:justify-start w-full h-full">
            <ImageContainer
              src="/bottom_form.png"
              alt="pretty lady sitting in a beautiful office"
              fill
              className="w-[87.907vw] lg:w-[40.556vw] 2xl:w-[35.556vw] h-[48.085vh] lg:h-[57.863vh] rounded-[20px]"
              imgClassName="rounded-[20px] object-cover"
            />
          </div>
          <BottomForm />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ContactSection;
