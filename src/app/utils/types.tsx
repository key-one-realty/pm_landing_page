export type HeaderFormInputs = {
  location: string;
  number_of_rooms: string;
  email: string;
};

export type PopupFormInputs = {
  fullName: string;
  email: string;
  phone_number: string;
  property_type: string;
  comments: string;
};

export interface ContactInsertRequest {
  accessCode: string;
  groupCode: string;
  titleID: string;
  firstName: string;
  familyName: string;
  mobileCountryCode: string;
  mobileAreaCode: string;
  mobilePhone: string;
  telephoneCountryCode: string;
  telephoneAreaCode: string;
  telephone: string;
  email: string;
  nationalityID: string;
  companyID: string;
  remarks: string;
  requirementType: string;
  contactType: string;
  countryID: string;
  stateID: string;
  cityID: string;
  districtID: string;
  communityID: string;
  subCommunityID: string;
  propertyID: string;
  unitType: string;
  methodOfContact: string;
  mediaType: string;
  mediaName: string;
  referredByID: string;
  referredToID: string;
  deactivateNotification: string;
  bedroom: string;
  budget: string;
  budget2: string;
  requirementCountryID: string;
  existingClient: string;
  campaignSource: string | null;
  campaignMedium: string | null;
  compaignSource: string | null;
  compaignMedium: string | null;
  company: string;
  numberOfEmployee: string;
  leadStageId: string;
  activityDate: string;
  activityTime: string;
  activityTypeId: string;
  activitySubject: string;
  activityRemarks: string;
}
