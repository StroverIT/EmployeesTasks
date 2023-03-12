const endpoint = "/api/employee/";

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
export const edit = async (inputs, employeeId) => {
  const res = await fetch(endpoint + "edit", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputs, employeeId }),
  });
  return res.json();
};
