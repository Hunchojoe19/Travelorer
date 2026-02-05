# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListVisaTypes*](#listvisatypes)
  - [*GetVisaRequirementsForCountryAndNationality*](#getvisarequirementsforcountryandnationality)
- [**Mutations**](#mutations)
  - [*CreateEligibilityAssessment*](#createeligibilityassessment)
  - [*UpdateEligibilityAssessment*](#updateeligibilityassessment)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListVisaTypes
You can execute the `ListVisaTypes` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listVisaTypes(): QueryPromise<ListVisaTypesData, undefined>;

interface ListVisaTypesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListVisaTypesData, undefined>;
}
export const listVisaTypesRef: ListVisaTypesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listVisaTypes(dc: DataConnect): QueryPromise<ListVisaTypesData, undefined>;

interface ListVisaTypesRef {
  ...
  (dc: DataConnect): QueryRef<ListVisaTypesData, undefined>;
}
export const listVisaTypesRef: ListVisaTypesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listVisaTypesRef:
```typescript
const name = listVisaTypesRef.operationName;
console.log(name);
```

### Variables
The `ListVisaTypes` query has no variables.
### Return Type
Recall that executing the `ListVisaTypes` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListVisaTypesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListVisaTypesData {
  visaTypes: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    purpose: string;
  } & VisaType_Key)[];
}
```
### Using `ListVisaTypes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listVisaTypes } from '@dataconnect/generated';


// Call the `listVisaTypes()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listVisaTypes();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listVisaTypes(dataConnect);

console.log(data.visaTypes);

// Or, you can use the `Promise` API.
listVisaTypes().then((response) => {
  const data = response.data;
  console.log(data.visaTypes);
});
```

### Using `ListVisaTypes`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listVisaTypesRef } from '@dataconnect/generated';


// Call the `listVisaTypesRef()` function to get a reference to the query.
const ref = listVisaTypesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listVisaTypesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.visaTypes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.visaTypes);
});
```

## GetVisaRequirementsForCountryAndNationality
You can execute the `GetVisaRequirementsForCountryAndNationality` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getVisaRequirementsForCountryAndNationality(vars: GetVisaRequirementsForCountryAndNationalityVariables): QueryPromise<GetVisaRequirementsForCountryAndNationalityData, GetVisaRequirementsForCountryAndNationalityVariables>;

interface GetVisaRequirementsForCountryAndNationalityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetVisaRequirementsForCountryAndNationalityVariables): QueryRef<GetVisaRequirementsForCountryAndNationalityData, GetVisaRequirementsForCountryAndNationalityVariables>;
}
export const getVisaRequirementsForCountryAndNationalityRef: GetVisaRequirementsForCountryAndNationalityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getVisaRequirementsForCountryAndNationality(dc: DataConnect, vars: GetVisaRequirementsForCountryAndNationalityVariables): QueryPromise<GetVisaRequirementsForCountryAndNationalityData, GetVisaRequirementsForCountryAndNationalityVariables>;

interface GetVisaRequirementsForCountryAndNationalityRef {
  ...
  (dc: DataConnect, vars: GetVisaRequirementsForCountryAndNationalityVariables): QueryRef<GetVisaRequirementsForCountryAndNationalityData, GetVisaRequirementsForCountryAndNationalityVariables>;
}
export const getVisaRequirementsForCountryAndNationalityRef: GetVisaRequirementsForCountryAndNationalityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getVisaRequirementsForCountryAndNationalityRef:
```typescript
const name = getVisaRequirementsForCountryAndNationalityRef.operationName;
console.log(name);
```

### Variables
The `GetVisaRequirementsForCountryAndNationality` query requires an argument of type `GetVisaRequirementsForCountryAndNationalityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetVisaRequirementsForCountryAndNationalityVariables {
  countryId: UUIDString;
  nationality: string;
}
```
### Return Type
Recall that executing the `GetVisaRequirementsForCountryAndNationality` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetVisaRequirementsForCountryAndNationalityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetVisaRequirementsForCountryAndNationality`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getVisaRequirementsForCountryAndNationality, GetVisaRequirementsForCountryAndNationalityVariables } from '@dataconnect/generated';

// The `GetVisaRequirementsForCountryAndNationality` query requires an argument of type `GetVisaRequirementsForCountryAndNationalityVariables`:
const getVisaRequirementsForCountryAndNationalityVars: GetVisaRequirementsForCountryAndNationalityVariables = {
  countryId: ..., 
  nationality: ..., 
};

// Call the `getVisaRequirementsForCountryAndNationality()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getVisaRequirementsForCountryAndNationality(getVisaRequirementsForCountryAndNationalityVars);
// Variables can be defined inline as well.
const { data } = await getVisaRequirementsForCountryAndNationality({ countryId: ..., nationality: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getVisaRequirementsForCountryAndNationality(dataConnect, getVisaRequirementsForCountryAndNationalityVars);

console.log(data.visaRequirements);

// Or, you can use the `Promise` API.
getVisaRequirementsForCountryAndNationality(getVisaRequirementsForCountryAndNationalityVars).then((response) => {
  const data = response.data;
  console.log(data.visaRequirements);
});
```

### Using `GetVisaRequirementsForCountryAndNationality`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getVisaRequirementsForCountryAndNationalityRef, GetVisaRequirementsForCountryAndNationalityVariables } from '@dataconnect/generated';

// The `GetVisaRequirementsForCountryAndNationality` query requires an argument of type `GetVisaRequirementsForCountryAndNationalityVariables`:
const getVisaRequirementsForCountryAndNationalityVars: GetVisaRequirementsForCountryAndNationalityVariables = {
  countryId: ..., 
  nationality: ..., 
};

// Call the `getVisaRequirementsForCountryAndNationalityRef()` function to get a reference to the query.
const ref = getVisaRequirementsForCountryAndNationalityRef(getVisaRequirementsForCountryAndNationalityVars);
// Variables can be defined inline as well.
const ref = getVisaRequirementsForCountryAndNationalityRef({ countryId: ..., nationality: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getVisaRequirementsForCountryAndNationalityRef(dataConnect, getVisaRequirementsForCountryAndNationalityVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.visaRequirements);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.visaRequirements);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateEligibilityAssessment
You can execute the `CreateEligibilityAssessment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createEligibilityAssessment(vars: CreateEligibilityAssessmentVariables): MutationPromise<CreateEligibilityAssessmentData, CreateEligibilityAssessmentVariables>;

interface CreateEligibilityAssessmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEligibilityAssessmentVariables): MutationRef<CreateEligibilityAssessmentData, CreateEligibilityAssessmentVariables>;
}
export const createEligibilityAssessmentRef: CreateEligibilityAssessmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createEligibilityAssessment(dc: DataConnect, vars: CreateEligibilityAssessmentVariables): MutationPromise<CreateEligibilityAssessmentData, CreateEligibilityAssessmentVariables>;

interface CreateEligibilityAssessmentRef {
  ...
  (dc: DataConnect, vars: CreateEligibilityAssessmentVariables): MutationRef<CreateEligibilityAssessmentData, CreateEligibilityAssessmentVariables>;
}
export const createEligibilityAssessmentRef: CreateEligibilityAssessmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createEligibilityAssessmentRef:
```typescript
const name = createEligibilityAssessmentRef.operationName;
console.log(name);
```

### Variables
The `CreateEligibilityAssessment` mutation requires an argument of type `CreateEligibilityAssessmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateEligibilityAssessmentVariables {
  userId: UUIDString;
  countryId: UUIDString;
  visaTypeId: UUIDString;
  nationality: string;
  status: string;
}
```
### Return Type
Recall that executing the `CreateEligibilityAssessment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateEligibilityAssessmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateEligibilityAssessmentData {
  eligibilityAssessment_insert: EligibilityAssessment_Key;
}
```
### Using `CreateEligibilityAssessment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createEligibilityAssessment, CreateEligibilityAssessmentVariables } from '@dataconnect/generated';

// The `CreateEligibilityAssessment` mutation requires an argument of type `CreateEligibilityAssessmentVariables`:
const createEligibilityAssessmentVars: CreateEligibilityAssessmentVariables = {
  userId: ..., 
  countryId: ..., 
  visaTypeId: ..., 
  nationality: ..., 
  status: ..., 
};

// Call the `createEligibilityAssessment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createEligibilityAssessment(createEligibilityAssessmentVars);
// Variables can be defined inline as well.
const { data } = await createEligibilityAssessment({ userId: ..., countryId: ..., visaTypeId: ..., nationality: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createEligibilityAssessment(dataConnect, createEligibilityAssessmentVars);

console.log(data.eligibilityAssessment_insert);

// Or, you can use the `Promise` API.
createEligibilityAssessment(createEligibilityAssessmentVars).then((response) => {
  const data = response.data;
  console.log(data.eligibilityAssessment_insert);
});
```

### Using `CreateEligibilityAssessment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createEligibilityAssessmentRef, CreateEligibilityAssessmentVariables } from '@dataconnect/generated';

// The `CreateEligibilityAssessment` mutation requires an argument of type `CreateEligibilityAssessmentVariables`:
const createEligibilityAssessmentVars: CreateEligibilityAssessmentVariables = {
  userId: ..., 
  countryId: ..., 
  visaTypeId: ..., 
  nationality: ..., 
  status: ..., 
};

// Call the `createEligibilityAssessmentRef()` function to get a reference to the mutation.
const ref = createEligibilityAssessmentRef(createEligibilityAssessmentVars);
// Variables can be defined inline as well.
const ref = createEligibilityAssessmentRef({ userId: ..., countryId: ..., visaTypeId: ..., nationality: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createEligibilityAssessmentRef(dataConnect, createEligibilityAssessmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.eligibilityAssessment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.eligibilityAssessment_insert);
});
```

## UpdateEligibilityAssessment
You can execute the `UpdateEligibilityAssessment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateEligibilityAssessment(vars: UpdateEligibilityAssessmentVariables): MutationPromise<UpdateEligibilityAssessmentData, UpdateEligibilityAssessmentVariables>;

interface UpdateEligibilityAssessmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEligibilityAssessmentVariables): MutationRef<UpdateEligibilityAssessmentData, UpdateEligibilityAssessmentVariables>;
}
export const updateEligibilityAssessmentRef: UpdateEligibilityAssessmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateEligibilityAssessment(dc: DataConnect, vars: UpdateEligibilityAssessmentVariables): MutationPromise<UpdateEligibilityAssessmentData, UpdateEligibilityAssessmentVariables>;

interface UpdateEligibilityAssessmentRef {
  ...
  (dc: DataConnect, vars: UpdateEligibilityAssessmentVariables): MutationRef<UpdateEligibilityAssessmentData, UpdateEligibilityAssessmentVariables>;
}
export const updateEligibilityAssessmentRef: UpdateEligibilityAssessmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateEligibilityAssessmentRef:
```typescript
const name = updateEligibilityAssessmentRef.operationName;
console.log(name);
```

### Variables
The `UpdateEligibilityAssessment` mutation requires an argument of type `UpdateEligibilityAssessmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateEligibilityAssessmentVariables {
  id: UUIDString;
  status?: string | null;
  notes?: string | null;
  missingDocuments?: string[] | null;
}
```
### Return Type
Recall that executing the `UpdateEligibilityAssessment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateEligibilityAssessmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateEligibilityAssessmentData {
  eligibilityAssessment_update?: EligibilityAssessment_Key | null;
}
```
### Using `UpdateEligibilityAssessment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateEligibilityAssessment, UpdateEligibilityAssessmentVariables } from '@dataconnect/generated';

// The `UpdateEligibilityAssessment` mutation requires an argument of type `UpdateEligibilityAssessmentVariables`:
const updateEligibilityAssessmentVars: UpdateEligibilityAssessmentVariables = {
  id: ..., 
  status: ..., // optional
  notes: ..., // optional
  missingDocuments: ..., // optional
};

// Call the `updateEligibilityAssessment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateEligibilityAssessment(updateEligibilityAssessmentVars);
// Variables can be defined inline as well.
const { data } = await updateEligibilityAssessment({ id: ..., status: ..., notes: ..., missingDocuments: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateEligibilityAssessment(dataConnect, updateEligibilityAssessmentVars);

console.log(data.eligibilityAssessment_update);

// Or, you can use the `Promise` API.
updateEligibilityAssessment(updateEligibilityAssessmentVars).then((response) => {
  const data = response.data;
  console.log(data.eligibilityAssessment_update);
});
```

### Using `UpdateEligibilityAssessment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateEligibilityAssessmentRef, UpdateEligibilityAssessmentVariables } from '@dataconnect/generated';

// The `UpdateEligibilityAssessment` mutation requires an argument of type `UpdateEligibilityAssessmentVariables`:
const updateEligibilityAssessmentVars: UpdateEligibilityAssessmentVariables = {
  id: ..., 
  status: ..., // optional
  notes: ..., // optional
  missingDocuments: ..., // optional
};

// Call the `updateEligibilityAssessmentRef()` function to get a reference to the mutation.
const ref = updateEligibilityAssessmentRef(updateEligibilityAssessmentVars);
// Variables can be defined inline as well.
const ref = updateEligibilityAssessmentRef({ id: ..., status: ..., notes: ..., missingDocuments: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateEligibilityAssessmentRef(dataConnect, updateEligibilityAssessmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.eligibilityAssessment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.eligibilityAssessment_update);
});
```

