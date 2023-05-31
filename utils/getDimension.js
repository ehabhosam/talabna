import getNumberFromString from "./getNumberFromString";

const getDimension = (dim, windowWidth, windowHeight) => {
  if (!isNaN(dim)) {
    return parseInt(dim);
  }
  if (dim.includes("vh")) {
    return (getNumberFromString(dim) / 100) * windowHeight;
  }
  if (dim.includes("vw")) {
    return (getNumberFromString(dim) / 100) * windowWidth;
  }
  if (dim.includes("%")) {
    return `${getNumberFromString(dim)}%`;
  }
  return "auto";
};

export default getDimension;
