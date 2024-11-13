import React from "react";
import { ReviewSource } from "../utils/enums";
import TestimonialCard, { TestimonialCardProps } from "./TestimonialCard";
import CustomButton from "./shared/CustomButton";

const TestimonialSection = () => {
  const reviews: TestimonialCardProps[] = [
    {
      id: 0,
      name: "Gigi",
      reviewSource: ReviewSource.TRUSTPILOT,
      testimonial:
        "Great Agent and great Agency! Through the whole process Ali was responsive and helped us through every step. We were able to move in our flat without any delays or hardship. Ali was always available, very helpful and understanding. Very professional, reliable and trustworthy!",
      verifyLink: "https://www.trustpilot.com/reviews/636cae90252cba2c02d4564d",
    },
    {
      id: 1,
      name: "Nastya Litvinova",
      reviewSource: ReviewSource.GOOGLE,
      testimonial:
        "Im very happy with Ali who assisted me with rent studio on Dubai Marina. He explained the whole process thoroughly, and provided guidance with all steps, with great communication skills. Highly recommend.",
      verifyLink:
        "https://www.google.com/maps/reviews/@25.1093595,55.1838555,17z/data=!3m1!4b1!4m6!14m5!1m4!2m3!1sChdDSUhNMG9nS0VJQ0FnSUQ5MDY2b3hRRRAB!2m1!1s0x0:0xa5c4cb7410ca5ad8?hl=en-GB&entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      id: 2,
      name: "Abhishek Gupta",
      reviewSource: ReviewSource.TRUSTPILOT,
      testimonial:
        "I have had an opportunity to deal with multiple realty firms in Dubai, but Key One Realty made it exceptionally smooth, remarkably easy, and flawless. Ms. Merracquel from the Key One Realty team is a perfectionist. From documentation to doubts clarification, assistance in ease of move-in and move-out with minimalistic challenges, she made it all possible without any hassles.",
      verifyLink: "https://www.trustpilot.com/reviews/66aa3f9a44dd7529a0e4e0ce",
    },
  ];

  return (
    <section className="testimonials-section flex-center flex-col lg:mb-20">
      <div className="testimonial-header-container w-11/12 2xl:w-9/12 rounded-[20px] h-[481px] lg:h-[685px] text-white flex-center">
        <div className="flex-start-col justify-end gap-3 h-full w-11/12 pb-8">
          <h2 className="text-2xl lg:text-4xl font-bold lg:w-6/12">
            Testimonials from Our Esteemed Landlords and Tenants
          </h2>
          <p className="text-base lg:text-2xl">Real stories from out clients</p>
        </div>
      </div>
      <div className="testimonials -mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 2xl:w-9/12 gap-6 ">
        {reviews.map((review) => (
          <TestimonialCard {...review} key={review.id} />
        ))}
      </div>

      <div className="w-11/12 lg:hidden lg:w-4/12 mt-11 mb-20">
        <CustomButton btnName="Start Your Story" />
      </div>
    </section>
  );
};

export default TestimonialSection;
