
export enum ReviewSource {
    GOOGLE = "google",
    TRUSTPILOT = "trustpilot"
}

export enum PageSections {
    HOME = "home",
    ABOUT = "about",
    SERVICES = "services",
    CONTACT = "contact",
    POPUPFORM = "popupform"
}

export type RoomType =
  | "studio"
  | "1 bedroom"
  | "2 bedrooms"
  | "3 bedrooms"
  | "4 bedrooms"
  | "5 or more bedrooms";

export type earningsType = {
  [key in RoomType]: {
    min: number;
    max: number;
  };
};

const budgetRange : earningsType = {
    "studio": {min: 2306, max: 2310},
    "1 bedroom": {min: 2305, max: 2311},
    "2 bedrooms": {min: 2306, max: 2312},
    "3 bedrooms": {min: 2307, max: 2313},
    "4 bedrooms": {min: 2308, max: 2314},
    "5 or more bedrooms": {min: 2309, max: 2315},
}

export const calculatedFormPayload = 
{
    accessCode: "@KeY0nE$eaLtY",
    groupCode: "5103",
	  titleID: "79743",
    firstName: "Property Calculator",
    familyName: "User",
    mobileCountryCode: "971",
    mobileAreaCode: "50",
    mobilePhone: "123456",
    email: "",
    remarks: "",
    requirementType: "91212",
    contactType: "3",
    countryID: "65946",
    telephoneCountryCode: "971",
    telephoneAreaCode: "50",
    telephone: "123456",
    nationalityID: "",
    companyID: "",
    stateID: "55367",
    cityID: "54788",
    districtID: "",
    communityID: "",
    subCommunityID: "",
    propertyID: "",
    mediaType: "",
    mediaName: "205523",
    deactivateNotification: "",
    existingClient: "",
    compaignSource: "",
    compaignMedium: "",
    company: "",
    numberOfEmployee: "",
    leadStageId: "",
    activityDate: "",
    activityTime: "",
    activityTypeId: "",
    activitySubject: "",
    activityRemarks: "",
    unitType: "19",
    methodOfContact: "205375",
    referredByID: "1000",
    referredToID: "1196",
    bedroom: {
        "studio": 79720,
        "1 bedroom": 79721,
        "2 bedrooms": 79722,
        "3 bedrooms": 79723,
        "4 bedrooms": 79724,
        "5 or more bedrooms": "79725, 79726, 79727, 79728, 79731",
    },
    budget: budgetRange,
    requirementCountryID: "65946",
}