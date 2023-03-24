export const generateNonce = (): number => {
  const min = 1000000000000; // minimum value for 13 digits
  const max = 9999999999999; // maximum value for 13 digits
  return Math.floor(Math.random() * (max - min + 1) + min);
};
