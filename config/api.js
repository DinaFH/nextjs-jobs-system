import {apiUrl, USER_TOKEN} from "./constants";

const api = async (url, method = "GET", body = undefined, headers = {}) => {
  try {
    const token = localStorage.getItem(USER_TOKEN);
    const response = await fetch(`${apiUrl}${url}`, {
      method,
      body,
      headers: {
        ...headers,
        Authorization: token ? `Token ${token}` : undefined
      }
    });
    return response.json();
  } catch (e) {
    throw e;
  }
}
export default api;
