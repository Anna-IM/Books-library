import authService from "./authService.js";

let baseUrl = "http://localhost:3030/data/books";

async function getAll() {
  let response = await fetch(`${baseUrl}?sortBy=_createdOn%20desc`);
  let result = await response.json();
  return result;
}

async function get(id) {
  let url = `${baseUrl}/${id}`;
  // console.log(url);
  let response = await fetch(`${baseUrl}/${id}`);
  let result = await response.json();
  return result;
}

async function create(item) {
  let response = await fetch(`${baseUrl}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": authService.getAuthToken(),
    },
    method: "Post",
    body: JSON.stringify(item),
  });

  let result = await response.json();
  return result;
}

async function update(item, id) {
  let response = await fetch(`${baseUrl}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": authService.getAuthToken(),
    },
    method: "Put",
    body: JSON.stringify(item),
  });

  let result = await response.json();
  return result;
}

async function deleteItem(id) {
  // console.log(`${baseUrl}/${id}`);
  try {
    let response = await fetch(`${baseUrl}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": authService.getAuthToken(),
      },
      method: "Delete",
    });
    return response;
  } catch(err) {
    console.log(err);
  } 
}

async function getMyBooks(id) {
  let url = `${baseUrl}?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`;
  let response = await fetch(url);
  let result = await response.json();
  return result;
}

async function like(item) {
  // console.log(item)
  let url = `http://localhost:3030/data/likes`;
  let response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": authService.getAuthToken(),
    },
    method: "Post",
    body: JSON.stringify(item),
  });

  let result = await response.json();
  return result;
}

async function getLikes(id) {
  // console.log(id)
  let url = `http://localhost:3030/data/likes?where=bookId%3D%22${id}%22&distinct=_ownerId&count`;
  let response = await fetch(url);
  let result = await response.json();
  return result;
}

async function getALike(bookId, userId) {
  // console.log(bookId, userId)
  let url = `http://localhost:3030/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
  let response = await fetch(url);
  let result = await response.json();
  return result;
}

export default {
  getAll,
  get,
  create,
  update,
  deleteItem,
  getMyBooks,
  like,
  getLikes,
  getALike
};
