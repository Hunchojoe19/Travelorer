const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'travelorer',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const listVisaTypesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListVisaTypes');
}
listVisaTypesRef.operationName = 'ListVisaTypes';
exports.listVisaTypesRef = listVisaTypesRef;

exports.listVisaTypes = function listVisaTypes(dc) {
  return executeQuery(listVisaTypesRef(dc));
};

const createEligibilityAssessmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateEligibilityAssessment', inputVars);
}
createEligibilityAssessmentRef.operationName = 'CreateEligibilityAssessment';
exports.createEligibilityAssessmentRef = createEligibilityAssessmentRef;

exports.createEligibilityAssessment = function createEligibilityAssessment(dcOrVars, vars) {
  return executeMutation(createEligibilityAssessmentRef(dcOrVars, vars));
};

const getVisaRequirementsForCountryAndNationalityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetVisaRequirementsForCountryAndNationality', inputVars);
}
getVisaRequirementsForCountryAndNationalityRef.operationName = 'GetVisaRequirementsForCountryAndNationality';
exports.getVisaRequirementsForCountryAndNationalityRef = getVisaRequirementsForCountryAndNationalityRef;

exports.getVisaRequirementsForCountryAndNationality = function getVisaRequirementsForCountryAndNationality(dcOrVars, vars) {
  return executeQuery(getVisaRequirementsForCountryAndNationalityRef(dcOrVars, vars));
};

const updateEligibilityAssessmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateEligibilityAssessment', inputVars);
}
updateEligibilityAssessmentRef.operationName = 'UpdateEligibilityAssessment';
exports.updateEligibilityAssessmentRef = updateEligibilityAssessmentRef;

exports.updateEligibilityAssessment = function updateEligibilityAssessment(dcOrVars, vars) {
  return executeMutation(updateEligibilityAssessmentRef(dcOrVars, vars));
};
