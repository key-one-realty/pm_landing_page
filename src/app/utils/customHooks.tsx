"use client";
import { useEffect, useRef, useState } from "react";
import { PageSections } from "./enums";
import { useComponentStore } from "../store/componentStore";
import { useSearchParams } from "next/navigation";

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

  const currentRef = ref.current;

  useEffect(() => {
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

  return currentRef;
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

export function useURLParams() {
  const [campaignSource, setCampaignSource] = useState<string>("");
  const [campaignMedium, setCampaignMedium] = useState<string>("");
  const [campaignUTMURL, setCampaignUTMURL] = useState<string>("");
  const [campaignUTM, setCampaignUTM] = useState<string>("");

  const params = useSearchParams();

  useEffect(() => {
    const campaignSourceParam = params.get("utm_source");
    const campaignMediumParam = params.get("utm_medium");
    const campaignUTMParam = params.get("utm_campaign");

    let campaignMetadataString = "\nCampaign Metadata => \n";

    const allParams = params.entries();

    for (const [key, value] of allParams) {
      campaignMetadataString += ` ${key}= ${value} `;
    }
    setCampaignUTMURL(campaignMetadataString);

    if (campaignSourceParam) {
      setCampaignSource(campaignSourceParam);
    }

    if (campaignMediumParam) {
      setCampaignMedium(campaignMediumParam);
    }

    if (campaignUTMParam) {
      setCampaignUTM(campaignUTMParam);
    }
  }, [params]);

  return { campaignSource, campaignMedium, campaignUTMURL, campaignUTM };
}
