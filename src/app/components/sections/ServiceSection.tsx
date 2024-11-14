"use client";
import React, { useEffect, useRef } from "react";
import ServiceCard from "../ServiceCard";
import { useComponentStore } from "../../store/componentStore";
import { PageSections } from "../../utils/enums";
import { useObserver } from "../../utils/customHooks";

const ServiceSection = () => {
  const serviceRef = useRef<HTMLElement | null>(null);

  const setServiceSection = useComponentStore(
    (state) => state.setServiceSection
  );

  useObserver(serviceRef, PageSections.SERVICES);

  useEffect(() => {
    if (serviceRef.current) {
      setServiceSection(serviceRef.current);
    }
  }, []);

  const services = [
    {
      id: 0,
      serviceHeader: "Maintenance, Repairs, and Remodeling",
      serviceDescription:
        "Elevate your property's appeal with our dedicated care and bespoke enhancements.",
    },
    {
      id: 1,
      serviceHeader: "Comprehensive Financial Reporting",
      serviceDescription:
        "Stay effortlessly informed with transparent and detailed insights into your investment's performance.",
    },
    {
      id: 2,
      serviceHeader: "Seamless Rent Collection",
      serviceDescription:
        "Hassle-free income management with our prompt and professional rent handling.",
    },
    {
      id: 3,
      serviceHeader: "Personalized Tenancy Management",
      serviceDescription:
        "Foster lasting tenant relationships through our attentive and customized management approach.",
    },
    {
      id: 4,
      serviceHeader: "Professional Tenancy Contract Registration",
      serviceDescription:
        "Ensure peace of mind with our expert handling of all legal documentation and compliance matters.",
    },
    {
      id: 5,
      serviceHeader: "Consult with Our Experts Now!",
      serviceDescription:
        "Embark on a journey to maximize your property's potential—speak with our seasoned professionals today.",
    },
  ];

  return (
    <section
      ref={serviceRef}
      className="services flex-center flex-col gap-11 pb-12 lg:mt-24"
    >
      <div className="section-header w-11/12 lg:w-5/12 2xl:w-4/12">
        <h3 className="text-xl lg:text-4xl font-semibold text-center">
          Exclusive Comprehensive Services for{" "}
          <span className="font-extrabold">Elite Property Owners</span>
        </h3>
      </div>
      <div className="w-11/12 lg:w-10/12 2xl:w-8/12 service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-9">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            index={service.id}
            serviceHeader={service.serviceHeader}
            serviceDescription={service.serviceDescription}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
