export const isEmpty = (data) => {
  let checker = true;

  for (const item of Object.entries(data)) {
    const [key, value] = item;
    if (!value) {
      checker = false;
      break;
    }
  }

  return checker;
};
