export const calculateAverageHeight = (height: any) => {
    const imperialRange = height.imperial.split(' - ').map(Number);
    const metricRange = height.metric.split(' - ').map(Number);
  
    const averageImperialInches = (imperialRange[0] + imperialRange[1]) / 2;
    const averageMetricCm = (metricRange[0] + metricRange[1]) / 2;
  
    const averageImperialFeet = averageImperialInches / 12;
    const averageImperialCm = averageImperialInches * 2.54;
  
    return {
      averageImperialHeightFt: averageImperialFeet.toFixed(2), 
      averageMetricHeightCm: averageMetricCm.toFixed(2), 
    };
  };
  

export const calculateAverageWeight = (weight: any) => {
  const imperialRange = weight.imperial.split(' - ').map(Number);
  const metricRange = weight.metric.split(' - ').map(Number);

  const averageImperialPounds = (imperialRange[0] + imperialRange[1]) / 2;
  const averageMetricKg = (metricRange[0] + metricRange[1]) / 2;

  const averageImperialKg = averageImperialPounds * 0.453592;

  return {
    averageImperialWeightKg: averageImperialKg,
    averageMetricWeightKg: averageMetricKg,
  };
};

export const getDogImageUrl = (referenceImageId: string | undefined) => {
  return referenceImageId
    ? `https://cdn2.thedogapi.com/images/${referenceImageId}.jpg`
    : '';
};
