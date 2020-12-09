import type { SearchResponse } from "../types/nyaa";

const NYAA_API_URL = "https:/nyaa.net/api";
const nyaafetch = async (resource: string, queryString: string) => {
  const response = await fetch(`${NYAA_API_URL}/${resource}?${queryString}`);
  const data = await response.json();
  return data;
};

const search = async (queryString: string): Promise<SearchResponse> => {
  const data = await nyaafetch("search", queryString);
  return data;
};
export const nyaa = { search };
