import React, { useCallback } from "react";
import ImageContainer from "./shared/ImageContainer";
import RoundBlur from "./shared/RoundBlur";
import { useComponentStore } from "../store/componentStore";
import { PageSections } from "../utils/enums";

const Footer = () => {
  const aboutSection = useComponentStore(
    useCallback((state) => state.aboutSection, [])
  );
  const serviceSection = useComponentStore(
    useCallback((state) => state.serviceSection, [])
  );
  const contactSection = useComponentStore(
    useCallback((state) => state.contactSection, [])
  );
  const homeSection = useComponentStore(
    useCallback((state) => state.homeSection, [])
  );

  const setSectionInView = useComponentStore(
    useCallback((state) => state.setSectionInView, [])
  );

  const handleScrollToSection = useCallback(
    (section: HTMLElement | null, sectionName: PageSections) => {
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setSectionInView(sectionName);
      } else {
        console.log("Section is undefined");
      }
    },
    [
      aboutSection,
      serviceSection,
      contactSection,
      homeSection,
      // setSectionInView,
    ]
  );

  return (
    <footer className="flex-center-col bg-secondary-black pt-14 pb-8 relative">
      <RoundBlur
        w="412px"
        h="414px"
        opacity="0.15"
        className="-top-20 -right-36"
      />
      <RoundBlur
        w="412px"
        h="414px"
        opacity="0.15"
        className="bottom-3 -left-36"
      />
      <div className="footer-header flex-center lg:justify-between w-10/12 2xl:w-8/12 text-white">
        <ImageContainer
          src="/keyone_logo.svg"
          alt="Keyone Logo in the footer"
          w={194}
          h={34}
        />

        <div className="hidden lg:flex flex-center flex-row gap-4 lg:gap-9">
          <ImageContainer
            src="/award.svg"
            alt="Best letting agency"
            w={46.088}
            h={51.619}
          />

          <ImageContainer
            src="/icons/arabian_property.svg"
            alt="Arabian Property Award"
            w={74}
            h={52}
            imgClassName="hidden lg:flex lg:w-[70.607px] lg:h-[79.838px]"
          />
          <div className="flex-center-col gap-1">
            <h3 className="text-base font-bold">BEST LETTING AGENCY</h3>
            <p className="text-xs font-medium">DUBAI & ARABIA 2024-2025</p>
          </div>
        </div>
      </div>
      <div className="text-white flex-center-col lg:flex-row z-30 lg:items-start gap-20 lg:w-10/12 2xl:w-8/12 lg:gap-0 mt-[89px] lg:mb-20">
        <div className="flex-center-col lg:items-start text-center gap-14 lg:w-3/12">
          <h3 className="text-2xl font-semibold text-center">Quick Link</h3>
          <ul className="flex flex-center-col lg:items-start gap-9">
            <li
              className="text-lg font-medium cursor-pointer"
              onClick={() =>
                handleScrollToSection(homeSection, PageSections.HOME)
              }
            >
              Home
            </li>
            <li
              className="text-lg font-medium cursor-pointer"
              onClick={() =>
                handleScrollToSection(aboutSection, PageSections.ABOUT)
              }
            >
              About Us
            </li>
            <li
              className="text-lg font-medium cursor-pointer"
              onClick={() =>
                handleScrollToSection(contactSection, PageSections.CONTACT)
              }
            >
              Listing
            </li>
            <li
              className="text-lg font-medium cursor-pointer"
              onClick={() =>
                handleScrollToSection(contactSection, PageSections.CONTACT)
              }
            >
              Contact
            </li>
          </ul>
        </div>
        <div className="flex-center-col lg:items-start text-center gap-14 lg:w-3/12">
          <h3 className="text-2xl font-semibold text-center lg:text-left">
            Contact Information
          </h3>
          <ul className="flex-center-col justify-start lg:justify-center items-start gap-9 w-10/12 ">
            <li className="flex-center gap-4">
              <a href="tel:+971 58 607 5608" className="flex-center gap-4">
                <ImageContainer
                  src="/icons/phone.svg"
                  alt="phone"
                  w={21}
                  h={21}
                />{" "}
                +971 58 607 5608
              </a>
            </li>
            <li className="flex-center gap-4">
              <a href="mailto:inquiry@keyone.com" className="flex-center gap-4">
                <ImageContainer
                  src="/icons/email_footer.svg"
                  alt="phone"
                  w={22}
                  h={17}
                />{" "}
                inquiry@keyone.com
              </a>
            </li>
            <li className="flex justify-start items-start gap-4 text-left">
              <a
                href="https://maps.app.goo.gl/89Yx88mc87WooPtv5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-start items-start gap-4 text-left"
              >
                <ImageContainer
                  src="/icons/map_footer.svg"
                  alt="phone"
                  w={22}
                  h={31}
                />{" "}
                Al Zarouni Business Center, 601 SZR, Dubai, UAE
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-center-col lg:items-start text-center gap-14 lg:w-3/12">
          <h3 className="text-2xl font-semibold text-center">Legal</h3>
          <ul className="flex flex-center-col lg:items-start gap-9 ">
            <li className="text-lg font-medium">
              {" "}
              <a
                href="https://www.keyonerealtygroup.com/terms-of-use"
                target="_blank"
              >
                Privacy Policy
              </a>
            </li>
            <li className="text-lg font-medium">
              <a href="https://www.keyonerealtygroup.com/privacy-policy">
                Terms of Use
              </a>{" "}
            </li>
          </ul>
        </div>
        <div className="flex-center-col lg:items-start text-center gap-14 lg:w-3/12">
          <h3 className="text-2xl font-semibold text-center">Follow Us</h3>
          <ul className="flex-center-col lg:items-start gap-9 ">
            <li className="flex-center gap-4 text-lg font-medium">
              <a
                target="_blank"
                href="https://www.facebook.com/keyone.realestate/"
                className="flex-center gap-4 text-lg font-medium"
              >
                <ImageContainer
                  src="/icons/facebook.svg"
                  alt="phone"
                  w={13}
                  h={26}
                />{" "}
                Key One at Facebook
              </a>
            </li>
            <li className="flex-center gap-4 text-lg font-medium">
              <a
                target="_blank"
                href="https://www.instagram.com/keyone.uae/"
                className="flex-center gap-4 text-lg font-medium"
              >
                <ImageContainer
                  src="/icons/instagram.svg"
                  alt="phone"
                  w={24}
                  h={24}
                />{" "}
                Key One at Instagram
              </a>
            </li>
            <li className="flex justify-start items-start gap-4 text-lg font-medium text-left">
              <a
                href="https://www.linkedin.com/company/keyoneuae/posts/?feedView=all"
                target="_blank"
                className="flex justify-start items-start gap-4 text-lg font-medium text-left"
              >
                <ImageContainer
                  src="/icons/linkedin.svg"
                  alt="phone"
                  w={25}
                  h={24}
                />{" "}
                Key One at LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-white flex-center-col gap-14">
        <div className="flex-center gap-4 lg:hidden mt-14">
          <ImageContainer
            src="/award.svg"
            alt="Best letting agency"
            w={46.088}
            h={51.619}
          />
          <div className="flex-center-col gap-1">
            <h3 className="text-base font-bold">BEST LETTING AGENCY</h3>
            <p className="text-xs font-medium">DUBAI & ARABIA 2024-2025</p>
          </div>
        </div>
        <div className="text-lg font-bold flex-center-col">
          <p className="">&copy; 2024 Key One</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
