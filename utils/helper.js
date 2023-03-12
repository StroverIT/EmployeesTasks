function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export const generateRandomColor = (num) => {
  // const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return hslToHex(num * 35, 65, 50);
};

export const formatDate = (date) => {
  return date.split("-").reverse().join(".");
};
export const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return dd + "." + mm + "." + yyyy;
};
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

export const inputsToState = (data) => {
  const obj = {};
  Object.values(data).forEach((value) => {
    obj[value.name] = "";
  });
  return obj;
};

export const setInputHandler = (e, setState) => {
  const name = e.target.name;
  const value = e.target.value;
  setState((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const numToMonth = function (date) {
  const convertedDate = date.split(".");
  const month = convertedDate[1];
  const year = convertedDate[2];
  let result = "";
  switch (month) {
    case "01":
      result = "January";
      break;
    case "02":
      result = "February";
      break;

    case "03":
      result = "March";
      break;

    case "04":
      result = "April";
      break;

    case "05":
      result = "May";
      break;

    case "06":
      result = "June";
      break;

    case "07":
      result = "July";
      break;

    case "08":
      result = "August";
      break;

    case "09":
      result = "September";
      break;

    case 10:
      result = "October";
      break;

    case 11:
      result = "November";
      break;

    case 12:
      result = "December";
      break;
  }
  return result;
};

export const monthToNum = function (month) {
  let result = "";
  switch (month) {
    case "January":
      result = "01";
      break;
    case "February":
      result = "02";
      break;

    case "March":
      result = "03";
      break;

    case "April":
      result = "04";
      break;

    case "May":
      result = "05";
      break;

    case "June":
      result = "06";
      break;

    case "July":
      result = "07";
      break;

    case "August":
      result = "08";
      break;

    case "September":
      result = "09";
      break;

    case "October":
      result = "10";
      break;

    case "November":
      result = "11";
      break;

    case "December":
      result = "11";
      break;
  }
  return result;
};
