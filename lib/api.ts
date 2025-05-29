export async function LoginUser(credentials: { username: string; password: string }) {
  const response = await fetch("/api/proxy/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const contentType = response.headers.get("content-type") || "";

  if (!response.ok) {
    const errMessage = contentType.includes("application/json")
      ? (await response.json()).message
      : await response.text();
    throw new Error(errMessage || "Failed to fetch");
  }

  if (contentType.includes("application/json")) {
    return await response.json();
  } else {
    throw new Error("Unexpected non-JSON response");
  }
}
