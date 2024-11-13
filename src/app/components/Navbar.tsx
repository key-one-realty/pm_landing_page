"use client";
import { useCallback, useEffect, useState } from "react";
import ImageContainer from "./shared/ImageContainer";
import { useComponentStore } from "../store/componentStore";
import { PageSections } from "../utils/enums";

const Navbar = () => {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

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

  const sectionInView = useComponentStore(
    useCallback((state) => state.sectionInView, [])
  );

  const setSectionInView = useComponentStore(
    useCallback((state) => state.setSectionInView, [])
  );

  const setShowPopupForm = useComponentStore((state) => state.setShowPopupForm);

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

  const handleOpenNav = () => {
    setOpenMobileNav(!openMobileNav);
  };

  const handleStickyNavBar = () => {
    if (window) {
      if (window.scrollY > 50) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("scroll", handleStickyNavBar);
    }

    return () => {
      document.removeEventListener("scroll", handleStickyNavBar);
    };
  }, []);

  return (
    <>
      <div className="lg:hidden w-full flex-center-col z-40 relative gap-4 min-h-10">
        <div className="flex justify-between items-center px-2 pt-16 w-10/12">
          <div
            className="hamburger-menu flex flex-col justify-center items-center gap-2"
            onClick={handleOpenNav}
          >
            <div
              className={`w-9 bg-white h-[1px] rounded-sm transition-all ${
                openMobileNav ? "rotate-45 -translate-y-1" : ""
              }`}
            ></div>
            <div
              className={`w-9 bg-white h-[1px] rounded-sm transition-all ${
                openMobileNav ? "-rotate-45 -translate-y-3" : ""
              }`}
            ></div>
            <div
              className={`w-9 bg-white h-[1px] rounded-sm transition-all ${
                openMobileNav ? "hidden" : ""
              }`}
            ></div>
          </div>

          <ImageContainer
            src="/keyone_logo.svg"
            alt="keyone logo"
            fill
            className="w-[117px] h-[20px] lg:w-[169px] lg:h-[29.007px]"
          />

          <div className="">
            <button
              className="px-4 py-2 bg-white rounded-md"
              onClick={() => setShowPopupForm(true)}
            >
              <ImageContainer
                src="/icons/request_call.png"
                alt="request a call"
                w={17}
                h={17}
              />
            </button>
          </div>
        </div>
        <div
          className={`mobile-nav relative w-11/12 ${
            openMobileNav ? "show-mobile-nav" : "hidden"
          }`}
        >
          <ul className="w-full flex-center-col navbar-container text-white absolute top-0 left-0">
            <li
              className={`font-medium text-center cursor-pointer w-full p-4 ${
                sectionInView?.valueOf() == "home" && "active"
              }`}
              onClick={() =>
                handleScrollToSection(homeSection, PageSections.HOME)
              }
            >
              Home
            </li>
            <li
              className={`font-medium text-center cursor-pointer w-full p-4 ${
                sectionInView?.valueOf() == "services" && "active"
              }`}
              onClick={() =>
                handleScrollToSection(serviceSection, PageSections.SERVICES)
              }
            >
              Our Services
            </li>
            <li
              className={`font-medium text-center cursor-pointer w-full p-4 ${
                sectionInView?.valueOf() == "about" && "active"
              }`}
              onClick={() =>
                handleScrollToSection(aboutSection, PageSections.ABOUT)
              }
            >
              About Us
            </li>
            <li
              className={`font-medium text-center cursor-pointer w-full p-4 ${
                sectionInView?.valueOf() == "contact" && "active"
              }`}
              onClick={() =>
                handleScrollToSection(contactSection, PageSections.CONTACT)
              }
            >
              Contact
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden lg:flex flex-center w-full pt-12 z-50">
        <div
          className={`w-10/12 flex-between ${
            isScrolling
              ? "bg-black py-10 fixed top-0 left-0 w-full flex justify-around"
              : ""
          }`}
        >
          <ImageContainer
            src="/keyone_logo.svg"
            alt="keyone logo"
            fill
            className="w-[117px] h-[20px] lg:w-[169px] lg:h-[29.007px]"
          />

          <div className="navbar-container z-30 flex-center p-3 w-6/12">
            <ul className="flex flex-between w-11/12 font-poppins text-white">
              <li
                className={`font-medium text-center cursor-pointer ${
                  sectionInView?.valueOf() == "home" && "active"
                }`}
                onClick={() =>
                  handleScrollToSection(homeSection, PageSections.HOME)
                }
              >
                Home
              </li>
              <li
                className={`font-medium text-center cursor-pointer ${
                  sectionInView?.valueOf() == "services" && "active"
                }`}
                onClick={() =>
                  handleScrollToSection(serviceSection, PageSections.SERVICES)
                }
              >
                Our Services
              </li>
              <li
                className={`font-medium text-center cursor-pointer ${
                  sectionInView?.valueOf() == "about" && "active"
                }`}
                onClick={() =>
                  handleScrollToSection(aboutSection, PageSections.ABOUT)
                }
              >
                About Us
              </li>
              <li
                className={`font-medium text-center cursor-pointer ${
                  sectionInView?.valueOf() == "contact" && "active"
                }`}
                onClick={() =>
                  handleScrollToSection(contactSection, PageSections.CONTACT)
                }
              >
                Contact
              </li>
            </ul>
          </div>

          <div className="">
            <button
              className="px-4 py-2 bg-white rounded-md flex-center gap-3 font-bold cursor-pointer"
              onClick={() => setShowPopupForm(true)}
            >
              <ImageContainer
                src="/icons/request_call.png"
                alt="request a call"
                w={17}
                h={17}
              />
              <p>Request Call</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
