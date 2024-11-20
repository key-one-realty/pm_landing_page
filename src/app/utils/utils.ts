

import {
    formatPhoneNumber,
    parsePhoneNumber
  } from "react-phone-number-input";

export const getPhoneDetails = (phone: string) => {
    const parsedPhoneNumber = parsePhoneNumber(phone);
    const countryCode = parsedPhoneNumber?.countryCallingCode ?? "00";
    const formattedPhoneNumber = formatPhoneNumber(phone);
    const phoneNumberSplit = formattedPhoneNumber.split(" ");
    const areaCode = phoneNumberSplit[0];
    const mobileNumber = phoneNumberSplit.slice(1).join(" ");

    return { countryCode, areaCode, mobileNumber }
}