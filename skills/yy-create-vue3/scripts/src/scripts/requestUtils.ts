import axios, { type AxiosRequestConfig } from "axios";
import { MOCK } from "@src/scripts/constantUtils";
import { fetchMockData } from "@src/scripts/mockUtils";

function getError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  return new Error(String(error));
}

export function resolveMockTopic<D = unknown>(config: AxiosRequestConfig<D>): string {
  const url = config.url;
  if (!url) {
    throw new Error("Mock 请求缺少 url");
  }

  const path = url.startsWith("http") ? new URL(url).pathname : url.split("?")[0] || "";
  const normalizedPath = path.replace(/^\/api\//, "").replace(/^\//, "");
  if (!normalizedPath) {
    throw new Error(`Mock 请求 url 无效: ${url}`);
  }

  return normalizedPath.replace(/\//g, ".");
}

async function doMockRequest<D = unknown, R = unknown>(
  config: AxiosRequestConfig<D>,
): Promise<TReturn<R>> {
  try {
    const data = await fetchMockData<R>(resolveMockTopic(config), {
      payload: config.data,
    });
    return [null, data];
  } catch (error) {
    return [getError(error), undefined];
  }
}

export const doRequest = async <D = unknown, R = unknown>(
  config: AxiosRequestConfig<D>,
): Promise<TReturn<R>> => {
  if (MOCK === "1") {
    return doMockRequest<D, R>(config);
  }

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
