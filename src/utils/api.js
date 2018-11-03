/* Api methods to call /functions */

const create = data => {
  return fetch("/.netlify/functions/gifs-create", {
    body: JSON.stringify(data),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const readAll = () => {
  return fetch("/.netlify/functions/gifs-read-all").then(response => {
    return response.json();
  });
};

const update = (gifId, data) => {
  return fetch(`/.netlify/functions/gifs-update/${gifId}`, {
    body: JSON.stringify(data),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

export default {
  create: create,
  readAll: readAll,
  update: update
};
