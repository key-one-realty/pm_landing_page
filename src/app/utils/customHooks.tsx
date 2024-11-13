"use client";
import { useEffect, useRef, useState } from "react";
import { PageSections } from "./enums";
import { useComponentStore } from "../store/componentStore";

export function useObserver(
  ref: React.RefObject<HTMLElement | null>,
  pageSection: PageSections
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleSectionInView = useComponentStore(
    (state) => state.handleSectionInView
  );

  useEffect(() => {
    const currentRef = ref.current;

    if (currentRef) {
      observerRef.current = handleSectionInView(currentRef, pageSection);
      // console.log(
      //   `Observer for ${pageSection.valueOf()}: ${observerRef.current}`
      // );
    }

    return () => {
      if (currentRef && observerRef.current) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [ref, pageSection, handleSectionInView]);

  return observerRef.current;
}

export function useComponentStoreRef(
  ref: React.RefObject<HTMLElement | null>,
  pageSection: PageSections
) {
  const setPopupFormSection = useComponentStore(
    (state) => state.setPopupFormSection
  );

  const setAboutSection = useComponentStore((state) => state.setAboutSection);

  const setContactSection = useComponentStore(
    (state) => state.setContactSection
  );

  const setHomeSection = useComponentStore((state) => state.setHomeSection);

  const setServiceSection = useComponentStore(
    (state) => state.setServiceSection
  );

  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      switch (pageSection) {
        case PageSections.HOME:
          setHomeSection(currentRef);
          break;
        case PageSections.SERVICES:
          setServiceSection(currentRef);
          break;
        case PageSections.ABOUT:
          setAboutSection(currentRef);
          break;
        case PageSections.CONTACT:
          setContactSection(currentRef);
          break;
        case PageSections.POPUPFORM:
          setPopupFormSection(currentRef);
          break;
        default:
          break;
      }
    }
  }, [pageSection, ref]);

  return;
}

export function useDebounceValue(input: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(input);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [input, delay]);

  return debounceValue;
}
