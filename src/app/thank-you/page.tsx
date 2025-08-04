'use client';
import Link from "next/link";
import Image from "next/image";



export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col bg-yellow-50 text-gray-800">
      {/* Navbar */}
      <div className="w-full bg-black pb-4 flex align-center justify-center  p-4">
        <Image
            src="/keyone_logo.svg"
            alt="Company Logo"
            width={150}
            height={50}
            className="object-contain"
        />
        </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-bold text-black mb-4">
          Thank You for Getting in Touch!
        </h1>
        <p className="text-lg mb-4 max-w-3xl">
          We’ve received your enquiry and one of our property management
          specialists will get back to you shortly.
        </p>
        <p className="text-lg mb-4 max-w-3xl">
          In the meantime, feel free to explore how we help landlords across Dubai
          maximise their rental returns through stress-free, full-service property
          management.
        </p>

        <div className="text-lg mb-6 max-w-3xl text-left">
          <h2 className="font-semibold mb-2">What's Next?</h2>
          <ul className="list-disc list-inside">
            <li>We’ll review your message and contact you within 24 hours.</li>
            <li>You can prepare any questions you might have for our team.</li>
            <li>
              If it’s urgent, don’t hesitate to reach out directly:
              <ul className="list-disc list-inside ml-6 mt-2">
                <li>
                  📞{" "}
                  <a
                    href="tel:+971586075608"
                    className="text-blue-600 hover:underline"
                  >
                    +971 58 607 5608
                  </a>
                </li>
                <li>
                  💬{" "}
                  <a
                    href="https://wa.me/971586075608"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    Chat on WhatsApp
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <Link
          href="/"
          className="px-6 py-2 bg-black rounded  transition mt-4"
          style={{ color: "rgb(246, 202, 106)" }}>
          Return to Home
        </Link>

        

       
      </div>
      <div className="w-full bg-black pb-4 flex align-center justify-center p-4 text-white">
        2024 Key One. All rights reserved.
 
      </div>

 
    </div>
  );
}
