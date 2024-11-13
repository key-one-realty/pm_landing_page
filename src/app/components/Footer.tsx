import React from "react";
import ImageContainer from "./shared/ImageContainer";
import RoundBlur from "./shared/RoundBlur";

const Footer = () => {
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
        className="-bottom-20 -left-36"
      />
      <div className="footer-header flex-center lg:justify-between w-10/12 text-white">
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
      <div className="text-white flex-center-col lg:flex-row lg:items-start gap-20 lg:w-10/12 lg:gap-0 mt-[89px] lg:mb-20">
        <div className="flex-center-col lg:items-start text-center gap-14 lg:w-3/12">
          <h3 className="text-2xl font-semibold text-center">Quick Link</h3>
          <ul className="flex flex-center-col lg:items-start gap-9 ">
            <li className="text-lg font-medium">Home</li>
            <li className="text-lg font-medium">About Us</li>
            <li className="text-lg font-medium">Listing</li>
            <li className="text-lg font-medium">Contact</li>
          </ul>
        </div>
        <div className="flex-center-col lg:items-start text-center gap-14 lg:w-3/12">
          <h3 className="text-2xl font-semibold text-center lg:text-left">
            Contact Information
          </h3>
          <ul className="flex-center-col justify-start lg:justify-center items-start gap-9 w-10/12 ">
            <li className="flex-center gap-4">
              <ImageContainer
                src="/icons/phone.svg"
                alt="phone"
                w={21}
                h={21}
              />{" "}
              +123 456 7890
            </li>
            <li className="flex-center gap-4">
              <ImageContainer
                src="/icons/email_footer.svg"
                alt="phone"
                w={22}
                h={17}
              />{" "}
              info@keyone.com
            </li>
            <li className="flex justify-start items-start gap-4 text-left">
              <ImageContainer
                src="/icons/map_footer.svg"
                alt="phone"
                w={22}
                h={31}
              />{" "}
              Al Zarouni Business Center, 601 SZR, Dubai, UAE
            </li>
          </ul>
        </div>
        <div className="flex-center-col lg:items-start text-center gap-14 lg:w-3/12">
          <h3 className="text-2xl font-semibold text-center">Legal</h3>
          <ul className="flex flex-center-col lg:items-start gap-9 ">
            <li className="text-lg font-medium">Privacy Policy</li>
            <li className="text-lg font-medium">Term of Uses</li>
          </ul>
        </div>
        <div className="flex-center-col lg:items-start text-center gap-14 lg:w-3/12">
          <h3 className="text-2xl font-semibold text-center">Follow Us</h3>
          <ul className="flex-center-col lg:items-start gap-9 ">
            <li className="flex-center gap-4 text-lg font-medium">
              <ImageContainer
                src="/icons/facebook.svg"
                alt="phone"
                w={13}
                h={26}
              />{" "}
              Key One at Facebook
            </li>
            <li className="flex-center gap-4 text-lg font-medium">
              <ImageContainer
                src="/icons/instagram.svg"
                alt="phone"
                w={24}
                h={24}
              />{" "}
              Key One at Instagram
            </li>
            <li className="flex justify-start items-start gap-4 text-lg font-medium text-left">
              <ImageContainer
                src="/icons/linkedin.svg"
                alt="phone"
                w={25}
                h={24}
              />{" "}
              Key One at LinkedIn
            </li>
          </ul>
        </div>
      </div>
      <div className="text-white flex-center-col gap-14">
        <div className="flex-center gap-4 lg:hidden">
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
