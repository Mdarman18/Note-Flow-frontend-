import axios from "axios";

export const BaseUrl = axios.create({
  baseURL: "http://localhost:8000/api/user",
  withCredentials: true,
});

export const NoteBaseUrl = axios.create({
  baseURL: "http://localhost:8000/api/note",
  withCredentials: true,
});
