import { createContext, useState, useEffect } from 'react';

const StepContext = createContext({});

export function StepsProvider({ children }) {

  const [currentStep, setCurrentStep] = useState(() => {
    const storedStep = localStorage.getItem('currentStep');
    return storedStep ? parseInt(storedStep, 10) : 0;
  });

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const resetStep = () => {
    setCurrentStep(0);
  };

  // Store currentStep in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentStep', currentStep.toString());
  }, [currentStep]);

  return (
    <StepContext.Provider value={{ currentStep, nextStep, previousStep, resetStep }}>
      {children}
    </StepContext.Provider>
  );
}

export default StepContext;
