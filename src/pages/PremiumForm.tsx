import { useState } from "react";
import ProgressBar from "../ui/ProgressBar";
import Form from "../features/formPages/Form";
function PremiumForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  return (
    <div>
      <ProgressBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <Form currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
}

export default PremiumForm;
