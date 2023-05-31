const getNumberFromString = (str) =>
  parseInt(
    str
      .split("")
      .filter((x) => !isNaN(x))
      .join("")
  );

export default getNumberFromString;
