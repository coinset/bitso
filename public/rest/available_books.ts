import { BASE_URL, fetch } from "../../constants.ts";
import { AVAILABLE_BOOKS } from "./constants.ts";

async function fetchAvailableBooks() {
  const url = new URL(AVAILABLE_BOOKS, BASE_URL);
  const res = await fetch(url.toString());
  const json = await res.json();

  return json;
}

export { fetchAvailableBooks };
