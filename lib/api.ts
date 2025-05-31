export async function clientFetch<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any,
  token?: string,
): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get("content-type") || "";
  const isJSON = contentType.includes("application/json");

  if (!res.ok) {
    const errMessage = isJSON ? (await res.json()).message : await res.text();
    throw new Error(errMessage || "Request failed");
  }

  return isJSON ? await res.json() : ({} as T);
}


export async function LoginUser(credentials: {
  username: string;
  password: string;
}) {
  return clientFetch<{ token: string }>(
    "/api/proxy/login",
    "POST",
    credentials
  );
}
