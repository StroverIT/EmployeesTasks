const endpoint = "/api/employee/";

export const get = async (id) => {
  const fetch = await fetch(endpoint + "get/" + id, {
    method: "GET",
  });
};
export const create = async (data) => {
  const fetch = await fetch(endpoint + "create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const del = async (id) => {
  const fetch = await fetch(endpoint + "delete/" + id, {
    method: "DELETE",
  });
};

export const edit = async (data) => {
  const fetch = await fetch(endpoint + "create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
