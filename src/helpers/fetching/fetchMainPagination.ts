import { BASE_URL } from "../globalVariables";

export async function fetchMainPagination(page: number, nameFilter?: string) {
  let url = `${BASE_URL}/character?page=${page}`;

  if (nameFilter && nameFilter.length >= 1) {
    url += `&name=${nameFilter}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  return data;
}
