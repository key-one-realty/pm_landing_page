import ImageContainer from "./components/shared/ImageContainer";
import OdometerText from "./components/OdometerText";
import ServiceSection from "./components/sections/ServiceSection";
import TestimonialSection from "./components/TestimonialSection";
import RoundBlur from "./components/shared/RoundBlur";
import HomeSection from "./components/sections/Home";
import AboutSection from "./components/sections/About";
import ContactSection from "./components/sections/Contact";
import PopupForm from "./components/PopupForm";
import MockupBtn from "./components/MockupBtn";
import PremierPropertyBtn from "./components/PremierPropertyBtn";
import { Suspense } from "react";
import LoadingFallback from "./components/shared/LoadingFallback";

export default function Home() {
  return (
    <main className="main max-w-full relative overflow-x-hidden overflow-y-auto">
      <Suspense fallback={<LoadingFallback />}>
        <PopupForm />
      </Suspense>
      <HomeSection />
      <a
        href="https://wa.me/97148946079?text=Hi%20I%20am%20interested"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp Chat"
          style={{
            width: "60px",
            height: "60px",
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 999,
          }}
        />
      </a>
      <section className="odometer my-14 lg:my-20 w-full flex-center">
        <div className="odometer-values flex-center lg:justify-between flex-wrap gap-12 gap-y-7 w-10/12 2xl:w-8/12">
          <OdometerText
            value="95"
            description="Occupancy Rate"
            suffixSymbol="%"
          />
          <OdometerText
            value="24"
            valueDenominator="7"
            description="Maintenance Support"
            suffixSymbol=""
          />
          <OdometerText
            value="30"
            description="Increased Income"
            suffixSymbol="%"
          />
          <OdometerText
            value="18"
            description="Years of Excellence"
            suffixSymbol="+"
          />
          <OdometerText
            value="2000"
            description="Properties Managed"
            suffixSymbol="+"
          />
        </div>
      </section>

      <section className="premier-property flex-between lg:justify-start flex-col lg:flex-row gap-9 pb-14 lg:mt-10">
        <div className="section-img flex justify-start w-full lg:w-6/12">
          <ImageContainer
            src="/premier_property.png"
            alt="premier property management for the chosen ones"
            fill
            imgClassName="object-cover rounded-tr-[20px] rounded-br-[20px]"
            className="w-[90svw] h-[246px] lg:h-[43.952vh] lg:w-[47.083vw]"
          />
        </div>
        <div className="flex-center w-11/12 lg:w-10/12 2xl:w-5/12 lg:pr-28">
          <div className="section-description flex-center flex-col gap-5">
            <h2 className="text-4xl lg:text-6xl font-bold">
              Premier Property Management for the Chosen Ones
            </h2>
            <p>
              Experience exceptional property management tailored exclusively
              for discerning property owners. We elevate your investment with
              unparalleled professionalism and personalized attention, ensuring
              your property reaches its fullest potential. Trust us to provide
              the finest care that only the select few can appreciate.
            </p>
            <PremierPropertyBtn />
          </div>
        </div>
      </section>

      <ServiceSection />

      <section className="landlord_connect_mockup flex-center flex-col mt-12 gap-6 relative">
        <RoundBlur
          w="412px"
          h="414px"
          opacity="0.15"
          className="top-40 -left-20"
        />
        <div className="">
          <h2 className="text-4xl font-bold text-center mb-[220px] lg:mb-[294px]">
            Landlord Connect
          </h2>
        </div>

        <div className="mockup-container flex flex-col lg:flex-row justify-end items-center mb-2 relative h-[505px] lg:h-[248px] w-[91.372vw] lg:w-9/12 2xl:w-8/12">
          <div className="absolute -top-[50%] left-0 lg:hidden">
            <ImageContainer
              src={"/mockup_sm.png"}
              alt="Landlord Connect Mockup"
              fill
              className="w-[91.372vw] h-[53.528vh] object-contain"
            />
          </div>

          <div className="hidden lg:flex">
            <ImageContainer
              src={"/mockup.png"}
              alt="Landlord Connect Mockup"
              fill
              className="w-[40svw] -ml-28 2xl:object-[70%] h-[737px] object-contain -mt-[360px]"
              imgClassName="object-[63%] 2xl:object-[70%] object-cover"
            />
          </div>

          <div className="mockup-content text-white w-10/12 flex justify-start items-start flex-col gap-7">
            <h2 className="text-4xl lg:text-[45px] leading-[55px] font-bold">
              Access Excellence Anytime, Anywhere!
            </h2>
            <p className="pb-12 lg:pb-0">
              Insightful Management Control with Our{" "}
              <span className="font-bold">Advanced Landlord App</span>
            </p>
          </div>
        </div>
        <MockupBtn />
      </section>

      <AboutSection />

      <TestimonialSection />

      <section className="flex-center flex-col gap-14 mb-14 lg:mb-36">
        <div className="flex-center flex-col gap-6 w-11/12">
          <h1 className="text-3xl font-bold text-center lg:w-4/12">
            Marketing Excellence Through Partnership
          </h1>
          <p className="text-base text-center lg:w-8/12">
            Amplify Your Property's Presence by Showcasing It on the World's
            Most Influential Listing Websites. Maximize Exposure Through Our
            Strategic Partnerships with Premier Marketing Platforms
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:w-10/12 2xl:w-8/12 items-center justify-center gap-6 lg:gap-12 w-full lg:justify-between">
          <div className="flex-center lg:justify-start">
            <ImageContainer
              src="/icons/dubai_tourism.svg"
              alt="Dubai Tourism"
              w={126}
              h={78}
            />
          </div>
          <div className="flex-center lg:justify-evenly">
            <ImageContainer
              src="/icons/flipkey_review.svg"
              alt="Keyone is recommended on flipkey"
              w={145}
              h={78}
            />
          </div>
          <div className="flex-center lg:justify-evenly">
            <ImageContainer
              src="/icons/flipkey_rated.svg"
              alt="Keyone is rated excellent on flipkey"
              w={126}
              h={135}
            />
          </div>
          <div className="flex-center lg:justify-end">
            <ImageContainer
              src="/icons/airbnb.svg"
              alt="Keyone is verified on airbnb"
              w={150}
              h={113}
            />
          </div>
        </div>
      </section>

      <Suspense fallback={<LoadingFallback />}>
        <ContactSection />
      </Suspense>
    </main>
  );
}
