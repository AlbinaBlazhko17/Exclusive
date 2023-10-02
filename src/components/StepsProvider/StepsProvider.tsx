import { createContext, useState } from 'react';

const StepContext = createContext({});

export function StepsProvider({ children }) {
	const [currentStep, setCurrentStep] = useState(0);

	const nextStep = () => {
		setCurrentStep(currentStep + 1);
	};

	const previousStep = () => {
		setCurrentStep(currentStep - 1);
	};

	const resetStep = () => {
		setCurrentStep(0);
	}

	return (
		<StepContext.Provider value={{ currentStep, nextStep, previousStep, resetStep }}>
			{children}
		</StepContext.Provider>
	);
}

export default StepContext;
