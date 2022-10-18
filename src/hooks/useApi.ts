import { app } from "../api/app";

export async function useApi(url: string | null) {
  const { data } = await app.get(url);

  return data;
}
