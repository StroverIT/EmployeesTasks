const endpoint = "/api/task/";

export const get = async (id) => {
  const res = await fetch(endpoint + "get/" + id, {
    method: "GET",
  });
  return res.json();
};
export const create = async (data) => {
  const res = await fetch(endpoint + "create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const del = async (id) => {
  const res = await fetch(endpoint + "delete/" + id, {
    method: "DELETE",
  });
  return res.json();
};

export const edit = async (data) => {
  const res = await fetch(endpoint + "edit", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const getCompletedAndNon = async (id) => {
  const res = await fetch(endpoint + "getCompletedAndNon/" + id, {
    method: "GET",
  });
  return res.json();
};
export const topFiveTasksMonthly = async () => {
  const res = await fetch(endpoint + "topFiveTasksMonthly", {
    method: "GET",
  });
  return res.json();
};
export const topFiveTasksYearly = async () => {
  const res = await fetch(endpoint + "topFiveTasksYearly", {
    method: "GET",
  });
  return res.json();
};
export const completeTask = async (data) => {
  const res = await fetch(endpoint + "complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
