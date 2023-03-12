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
  let value = e.target.value;

  setState((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};
