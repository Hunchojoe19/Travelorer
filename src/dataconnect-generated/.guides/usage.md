# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useListVisaTypes, useCreateEligibilityAssessment, useGetVisaRequirementsForCountryAndNationality, useUpdateEligibilityAssessment } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useListVisaTypes();

const { data, isPending, isSuccess, isError, error } = useCreateEligibilityAssessment(createEligibilityAssessmentVars);

const { data, isPending, isSuccess, isError, error } = useGetVisaRequirementsForCountryAndNationality(getVisaRequirementsForCountryAndNationalityVars);

const { data, isPending, isSuccess, isError, error } = useUpdateEligibilityAssessment(updateEligibilityAssessmentVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { listVisaTypes, createEligibilityAssessment, getVisaRequirementsForCountryAndNationality, updateEligibilityAssessment } from '@dataconnect/generated';


// Operation ListVisaTypes: 
const { data } = await ListVisaTypes(dataConnect);

// Operation CreateEligibilityAssessment:  For variables, look at type CreateEligibilityAssessmentVars in ../index.d.ts
const { data } = await CreateEligibilityAssessment(dataConnect, createEligibilityAssessmentVars);

// Operation GetVisaRequirementsForCountryAndNationality:  For variables, look at type GetVisaRequirementsForCountryAndNationalityVars in ../index.d.ts
const { data } = await GetVisaRequirementsForCountryAndNationality(dataConnect, getVisaRequirementsForCountryAndNationalityVars);

// Operation UpdateEligibilityAssessment:  For variables, look at type UpdateEligibilityAssessmentVars in ../index.d.ts
const { data } = await UpdateEligibilityAssessment(dataConnect, updateEligibilityAssessmentVars);


```