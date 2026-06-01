import axios, { type AxiosRequestConfig } from "axios";

function getError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  return new Error(String(error));
}

export const doRequest = async <D = unknown, R = unknown>(
  config: AxiosRequestConfig<D>,
): Promise<TReturn<R>> => {
  try {
    const response = await axios<R>({
      method: "post",
      timeout: 30_000,
      headers: {
        "Content-Type": "application/json",
      },
      ...config,
    });

    return [null, response.data];
  } catch (error) {
    return [getError(error), undefined];
  }
};
