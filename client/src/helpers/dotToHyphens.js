export const replaceDotWithHeypen = (token) => {
  const updatedToken = token.replace(/\./g, "stringversionofhyphen");
  return updatedToken;
};

export const replaceHeypenWithDot = (token) => {
  const updatedToken = token.replace(/stringversionofhyphen/g, ".");
  return updatedToken;
};
