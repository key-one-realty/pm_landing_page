import ImageContainer from "./components/shared/ImageContainer";
import OdometerText from "./components/OdometerText";
import CustomButton from "./components/shared/CustomButton";
import ServiceSection from "./components/sections/ServiceSection";
import TestimonialSection from "./components/TestimonialSection";
import RoundBlur from "./components/shared/RoundBlur";
import HomeSection from "./components/sections/Home";
import AboutSection from "./components/sections/About";
import ContactSection from "./components/sections/Contact";
import PopupForm from "./components/PopupForm";
import MockupBtn from "./components/MockupBtn";
import PremierPropertyBtn from "./components/PremierPropertyBtn";

export default function Home() {
  return (
    <main className="main max-w-full relative">
      <PopupForm />
      <HomeSection />
      <section className="odometer my-14 lg:my-20">
        <div className="odometer-values flex-center flex-wrap gap-12 gap-y-7">
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

      <section className="premier-property flex-between flex-col lg:flex-row gap-9 pb-14 lg:mt-10">
        <div className="section-img flex justify-start w-full">
          <ImageContainer
            src="/premier_property.png"
            alt="premier property management for the chosen ones"
            fill
            imgClassName="object-cover rounded-tr-[20px] rounded-br-[20px]"
            className="w-[90svw] h-[246px] lg:h-[43.952vh] lg:w-[47.083vw]"
          />
        </div>
        <div className="flex-center w-11/12 lg:w-10/12 2xl:w-8/12 lg:pr-28">
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

      <section className="landlord_connect_mockup flex-center flex-col gap-6 relative">
        <RoundBlur
          w="412px"
          h="414px"
          opacity="0.15"
          className="top-20 -left-20"
        />
        <div className="">
          <h2 className="text-4xl font-bold text-center mb-[264px]">
            Landlord Connect
          </h2>
        </div>

        <div className="mockup-container flex flex-col lg:flex-row justify-end items-center pb-10 relative h-[535px] lg:h-[248px] w-[91.372vw] lg:w-[71.667vw]">
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
            <h2 className="text-4xl lg:text-[45px] font-bold">
              Access Excellence Anytime, Anywhere!
            </h2>
            <p>
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
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:w-10/12 items-center justify-center gap-12 w-full lg:justify-evenly">
          <div className="flex-center">
            <ImageContainer
              src="/icons/dubai_tourism.svg"
              alt="Dubai Tourism"
              w={126}
              h={78}
            />
          </div>
          <div className="flex-center">
            <ImageContainer
              src="/icons/flipkey_review.svg"
              alt="Keyone is recommended on flipkey"
              w={145}
              h={78}
            />
          </div>
          <div className="flex-center">
            <ImageContainer
              src="/icons/flipkey_rated.svg"
              alt="Keyone is rated excellent on flipkey"
              w={126}
              h={135}
            />
          </div>
          <div className="flex-center">
            <ImageContainer
              src="/icons/airbnb.svg"
              alt="Keyone is verified on airbnb"
              w={150}
              h={113}
            />
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
