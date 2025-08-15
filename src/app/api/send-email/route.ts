import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { fullName, email, phone_number, property_type, comments } = await req.json();

    const transporter = nodemailer.createTransport({

      host: "smtp.office365.com", // or your SMTP server
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_FROM_ADDRESS, // your email
        pass: process.env.MAIL_PASSWORD, // app password or email password
      },
    });

    await transporter.sendMail({

      from: `"Website Form" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: "leads@keyone.com",
      subject: "New Popup Form Submission",
      text: `
        Name: ${fullName}
        Email: ${email}
        Phone: ${phone_number}
        Property Type: ${property_type}
        Comments: ${comments}
      `,
    });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Email sending failed" }, { status: 500 });
  }
}
