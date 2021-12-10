import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "json",
});

export const queryDiscovery = async (searchText, type, itemNum = 5) => {
  if (searchText.length < 1) {
    return {
      data: [],
    };
  }

  const response = await api.post("/search", {
    text: searchText,
    type: type,
    item_num: itemNum,
  });

  let queryResults = [];
  if (response.data.data instanceof Array) {
    queryResults = response.data.data;
  }

  return {
    data: queryResults
  };
};
