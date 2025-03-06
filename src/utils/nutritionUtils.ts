
export const calculateBMI = (weight: number, height: number): number => {
  // Height in meters, weight in kg
  const heightInMeters = height / 100;
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return "abaixo do peso";
  if (bmi < 25) return "peso normal";
  if (bmi < 30) return "sobrepeso";
  if (bmi < 35) return "obesidade grau I";
  if (bmi < 40) return "obesidade grau II";
  return "obesidade grau III";
};

export const calculateIdealWeightRange = (height: number): { min: number; max: number } => {
  const heightInMeters = height / 100;
  const minIdealWeight = parseFloat((18.5 * heightInMeters * heightInMeters).toFixed(1));
  const maxIdealWeight = parseFloat((24.9 * heightInMeters * heightInMeters).toFixed(1));
  
  return { min: minIdealWeight, max: maxIdealWeight };
};

export const suggestWeightGoal = (currentWeight: number, height: number): number => {
  const bmi = calculateBMI(currentWeight, height);
  const { min, max } = calculateIdealWeightRange(height);
  
  if (bmi < 18.5) {
    // Underweight - goal to reach minimum ideal weight
    return min;
  } else if (bmi > 24.9) {
    // Overweight - goal to reach maximum ideal weight
    return max;
  }
  
  // Already in healthy range
  return currentWeight;
};
