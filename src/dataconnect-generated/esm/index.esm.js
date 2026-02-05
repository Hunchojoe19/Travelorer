import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'travelorer',
  location: 'us-east4'
};

export const listVisaTypesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListVisaTypes');
}
listVisaTypesRef.operationName = 'ListVisaTypes';

export function listVisaTypes(dc) {
  return executeQuery(listVisaTypesRef(dc));
}

export const createEligibilityAssessmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateEligibilityAssessment', inputVars);
}
createEligibilityAssessmentRef.operationName = 'CreateEligibilityAssessment';

export function createEligibilityAssessment(dcOrVars, vars) {
  return executeMutation(createEligibilityAssessmentRef(dcOrVars, vars));
}

export const getVisaRequirementsForCountryAndNationalityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetVisaRequirementsForCountryAndNationality', inputVars);
}
getVisaRequirementsForCountryAndNationalityRef.operationName = 'GetVisaRequirementsForCountryAndNationality';

export function getVisaRequirementsForCountryAndNationality(dcOrVars, vars) {
  return executeQuery(getVisaRequirementsForCountryAndNationalityRef(dcOrVars, vars));
}

export const updateEligibilityAssessmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateEligibilityAssessment', inputVars);
}
updateEligibilityAssessmentRef.operationName = 'UpdateEligibilityAssessment';

export function updateEligibilityAssessment(dcOrVars, vars) {
  return executeMutation(updateEligibilityAssessmentRef(dcOrVars, vars));
}

