import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Country_Key {
  id: UUIDString;
  __typename?: 'Country_Key';
}

export interface CreateEligibilityAssessmentData {
  eligibilityAssessment_insert: EligibilityAssessment_Key;
}

export interface CreateEligibilityAssessmentVariables {
  userId: UUIDString;
  countryId: UUIDString;
  visaTypeId: UUIDString;
  nationality: string;
  status: string;
}

export interface EligibilityAssessment_Key {
  id: UUIDString;
  __typename?: 'EligibilityAssessment_Key';
}

export interface GetVisaRequirementsForCountryAndNationalityData {
  visaRequirements: ({
    id: UUIDString;
    visaType: {
      id: UUIDString;
      name: string;
    } & VisaType_Key;
      documentList: string[];
      eligibilityCriteria?: string[] | null;
      feeRange: string;
      notes?: string | null;
      processingTime: string;
  } & VisaRequirement_Key)[];
}

export interface GetVisaRequirementsForCountryAndNationalityVariables {
  countryId: UUIDString;
  nationality: string;
}

export interface ListVisaTypesData {
  visaTypes: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    purpose: string;
  } & VisaType_Key)[];
}

export interface UpdateEligibilityAssessmentData {
  eligibilityAssessment_update?: EligibilityAssessment_Key | null;
}

export interface UpdateEligibilityAssessmentVariables {
  id: UUIDString;
  status?: string | null;
  notes?: string | null;
  missingDocuments?: string[] | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface VisaRequirement_Key {
  id: UUIDString;
  __typename?: 'VisaRequirement_Key';
}

export interface VisaType_Key {
  id: UUIDString;
  __typename?: 'VisaType_Key';
}

interface ListVisaTypesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListVisaTypesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListVisaTypesData, undefined>;
  operationName: string;
}
export const listVisaTypesRef: ListVisaTypesRef;

export function listVisaTypes(): QueryPromise<ListVisaTypesData, undefined>;
export function listVisaTypes(dc: DataConnect): QueryPromise<ListVisaTypesData, undefined>;

interface CreateEligibilityAssessmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEligibilityAssessmentVariables): MutationRef<CreateEligibilityAssessmentData, CreateEligibilityAssessmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateEligibilityAssessmentVariables): MutationRef<CreateEligibilityAssessmentData, CreateEligibilityAssessmentVariables>;
  operationName: string;
}
export const createEligibilityAssessmentRef: CreateEligibilityAssessmentRef;

export function createEligibilityAssessment(vars: CreateEligibilityAssessmentVariables): MutationPromise<CreateEligibilityAssessmentData, CreateEligibilityAssessmentVariables>;
export function createEligibilityAssessment(dc: DataConnect, vars: CreateEligibilityAssessmentVariables): MutationPromise<CreateEligibilityAssessmentData, CreateEligibilityAssessmentVariables>;

interface GetVisaRequirementsForCountryAndNationalityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetVisaRequirementsForCountryAndNationalityVariables): QueryRef<GetVisaRequirementsForCountryAndNationalityData, GetVisaRequirementsForCountryAndNationalityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetVisaRequirementsForCountryAndNationalityVariables): QueryRef<GetVisaRequirementsForCountryAndNationalityData, GetVisaRequirementsForCountryAndNationalityVariables>;
  operationName: string;
}
export const getVisaRequirementsForCountryAndNationalityRef: GetVisaRequirementsForCountryAndNationalityRef;

export function getVisaRequirementsForCountryAndNationality(vars: GetVisaRequirementsForCountryAndNationalityVariables): QueryPromise<GetVisaRequirementsForCountryAndNationalityData, GetVisaRequirementsForCountryAndNationalityVariables>;
export function getVisaRequirementsForCountryAndNationality(dc: DataConnect, vars: GetVisaRequirementsForCountryAndNationalityVariables): QueryPromise<GetVisaRequirementsForCountryAndNationalityData, GetVisaRequirementsForCountryAndNationalityVariables>;

interface UpdateEligibilityAssessmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEligibilityAssessmentVariables): MutationRef<UpdateEligibilityAssessmentData, UpdateEligibilityAssessmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateEligibilityAssessmentVariables): MutationRef<UpdateEligibilityAssessmentData, UpdateEligibilityAssessmentVariables>;
  operationName: string;
}
export const updateEligibilityAssessmentRef: UpdateEligibilityAssessmentRef;

export function updateEligibilityAssessment(vars: UpdateEligibilityAssessmentVariables): MutationPromise<UpdateEligibilityAssessmentData, UpdateEligibilityAssessmentVariables>;
export function updateEligibilityAssessment(dc: DataConnect, vars: UpdateEligibilityAssessmentVariables): MutationPromise<UpdateEligibilityAssessmentData, UpdateEligibilityAssessmentVariables>;

