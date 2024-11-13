"use client";
import React, { useState } from "react";
import { ReviewSource } from "../utils/enums";
import ImageContainer from "./shared/ImageContainer";

export type TestimonialCardProps = {
  id: number;
  name: string;
  testimonial: string;
  reviewSource: ReviewSource;
  verifyLink: string;
};

const TestimonialCard = ({
  name,
  testimonial,
  reviewSource,
  verifyLink,
}: TestimonialCardProps) => {
  const [readMore, setReadMore] = useState(false);

  const handleReviewSource = () => {
    if (reviewSource == ReviewSource.GOOGLE) {
      return (
        <ImageContainer
          src="/icons/google_reviews.png"
          alt="Google Reviews"
          w={73.598}
          h={31.664}
        />
      );
    } else if (reviewSource == ReviewSource.TRUSTPILOT) {
      return (
        <ImageContainer
          src="/icons/trustpilot.png"
          alt="trustpilot"
          w={85.579}
          h={22.251}
        />
      );
    } else {
      return (
        <ImageContainer
          src="/icons/trustpilot.png"
          alt="trustpilot"
          w={85.579}
          h={22.251}
        />
      );
    }
  };

  const handleReadMore = () => {
    if (!readMore) {
      return (
        <p className="text-sm">
          {testimonial.slice(0, 200)}...{" "}
          <span className="text-secondary-black text-sm font-black italic">
            Read More
          </span>
        </p>
      );
    } else {
      return <p className="text-sm">{testimonial}</p>;
    }
  };

  const handleStarsAndReview = () => {
    if (reviewSource == ReviewSource.TRUSTPILOT) {
      return (
        <div className="flex-between w-full">
          <ImageContainer
            src="/icons/trustpilot_stars.png"
            alt="5 stars on trustpilot"
            w={90.714}
            h={17.116}
          />

          <p className="text-secondary-black font-bold text-[15px] text-right">
            <a href={verifyLink} target="_blank">
              Verify on Trustpilot
            </a>
          </p>
        </div>
      );
    } else if (reviewSource == ReviewSource.GOOGLE) {
      return (
        <div className="flex-between w-full">
          <ImageContainer
            src="/icons/google_stars.png"
            alt="5 stars on google reviews"
            w={80.444}
            h={19.683}
          />

          <p className="text-secondary-black font-bold text-[15px] text-right">
            <a href={verifyLink} target="_blank">
              Verify on Google
            </a>
          </p>
        </div>
      );
    }
  };

  return (
    <div className="testimonial-card-container flex-center">
      <div className="flex-center flex-col w-[86%] pt-6 pb-5">
        <div className="flex-between w-full">
          <h3 className="text-2xl font-bold">{name}</h3>
          {handleReviewSource()}
        </div>
        <div className="mt-5" onClick={() => setReadMore(!readMore)}>
          {handleReadMore()}
        </div>
        <div className="mt-[30.98px] w-full">{handleStarsAndReview()}</div>
      </div>
    </div>
  );
};

export default TestimonialCard;
