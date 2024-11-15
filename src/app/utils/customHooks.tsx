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

export function useURLParams() {
  const [campaignSource, setCampaignSource] = useState<string>("");
  const [campaignMedium, setCampaignMedium] = useState<string>("");
  const [campaignUtm, setCampaignUtm] = useState<string>("");
  const [campaignUtmTerm, setCampaignUtmTerm] = useState<string>("");
  const [campaignMetadata, setCampaignMetadata] = useState<string>("");
  const [campaignUTMURL, setCampaignUTMURL] = useState<string>("");

  const params = useSearchParams();

  useEffect(() => {
    const campaignSourceParam = params.get("utm_source");
    const campaignMediumParam = params.get("utm_medium");
    const campaignUtm = params.get("utm_campaign");
    const campaignUtmTerm = params.get("utm_term");

    let campaignMetadataString = "\nCampaign Metadata => \n";

    const allParams = params.entries();

    for (const [key, value] of allParams) {
      campaignMetadataString += ` ${key}= ${value} `;
    }
    setCampaignUTMURL(campaignMetadataString);

    if (campaignSourceParam) {
      setCampaignSource(campaignSourceParam);
      setCampaignMetadata(
        campaignMetadataString + `Campaign Source: ${campaignSource} `
      );
    }

    if (campaignMediumParam) {
      setCampaignMedium(campaignMediumParam);
      setCampaignMetadata(
        (campaignMetadata) =>
          campaignMetadata + `Campaign Medium: ${campaignMedium} `
      );
    }

    if (campaignUtm) {
      setCampaignUtm(campaignUtm);
      setCampaignMetadata(
        (campaignMetadata) => campaignMetadata + `Campaign UTM: ${campaignUtm} `
      );
    }

    if (campaignUtmTerm) {
      setCampaignUtmTerm(campaignUtmTerm);
      setCampaignMetadata(
        (campaignMetadata) =>
          campaignMetadata + `Campaign UTM Term: ${campaignUtmTerm}`
      );
    }
  }, [params]);

  return [
    campaignSource,
    campaignMedium,
    campaignUtm,
    campaignUtmTerm,
    campaignMetadata,
    campaignUTMURL,
  ];
}
