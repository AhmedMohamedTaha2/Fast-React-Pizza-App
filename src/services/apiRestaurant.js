const API_URL = "https://react-fast-pizza-api.jonas.io/api";

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);
  if (!res.ok) throw Error("Failed getting menu");

  const { data } = await res.json();
  return data;
}

export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });
``
    if (!res.ok) {
      let serverMessage = "Failed creating your order";
      try {
        const body = await res.json();
        if (body?.message) serverMessage = body.message;
      } catch {
        // ignore parse error
      }
      throw new Error(serverMessage);
    }

    const { data } = await res.json();
    return data;
  } catch (err) {
    const message =
      err instanceof Error && err.message
        ? err.message
        : "Failed creating your order";
    throw new Error(message);
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
  } catch {
    throw new Error("Failed updating your order");
  }
}
