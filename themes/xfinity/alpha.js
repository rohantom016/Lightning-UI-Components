const alpha = {
  alpha1: 0.15,
  alpha2: 0.3,
  alpha3: 0.6,
  alpha4: 0.8,
  alpha5: 0.9
};

export default {
  inactive: alpha.alpha2,
  secondary: alpha.alpha3,
  tertiary: alpha.alpha1,
  ...alpha
};
