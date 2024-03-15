import { BASE_URL } from "../globalVariables";

export async function fetchMainPagination(page: number) {
  const res = await fetch(`${BASE_URL}/character?page=${page}`);
  const data = await res.json();

  return data;
}
