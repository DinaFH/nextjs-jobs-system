import {apiUrl} from "./constants";

const api = async (url, method = "GET", body = undefined) => {
  try {
    const token = localStorage.getItem("USER_TOKEN");
    const response = await fetch(`${apiUrl}${url}`, {
      method,
      body,
      headers: {
        Authorization: token ? `Token ${token}` : undefined
      }
    });
    return response.json();
  } catch (e) {
    return e;
  }
}
export default api;
