function allReplace(str, obj) {
  for (const x in obj) {
    str = str?.replace(new RegExp(x, "g"), obj[x]);
  }
  return str;
}

function formatCapilize(text) {
  const arr = text?.split(" ");
  for (var i = 0; i < arr?.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr?.join(" ");
  return str2;
}

function formatNumber(number, decimalPlaces = 0) {
  if (isNaN(number)) {
    return ""; // Return an empty string for non-numeric values
  }

  const options = {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  };

  return new Intl.NumberFormat("en-US", options).format(number);
}

const getDateDifference = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  const diffTime = Math.abs(d2 - d1);
  const diffDays = d1 < d2 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : NaN;

  return diffDays;
};

export { allReplace, formatCapilize, formatNumber, getDateDifference };
