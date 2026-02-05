import axios from "axios";

export const BaseUrl = axios.create({
  baseURL: "https://note-flow-backend-3.onrender.com/api/user",
  withCredentials: true,
});

export const NoteBaseUrl = axios.create({
  baseURL: "https://note-flow-backend-3.onrender.com/api/note",
  withCredentials: true,
});

// export const BaseUrl = axios.create({
//   baseURL: "http://localhost:8000/api/user","https://note-flow-backend-3.onrender.com/",
//   withCredentials: true,
// });
