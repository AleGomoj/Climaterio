import React from 'react';
import HealthProgramForm from './components/HealthProgramForm';
import { FormProvider } from './context/FormContext';

function App() {
  return (
    <FormProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-teal-50">
        <HealthProgramForm />
      </div>
    </FormProvider>
  );
}

export default App;