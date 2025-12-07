const BASE_URL = "http://localhost:3000/users";  // mock API port 3000

export async function fetchUsers() {
  const resp = await fetch(BASE_URL);
  if (!resp.ok) {
    throw new Error("Failed to fetch users");
  }
  return resp.json();
}

export async function fetchUserById(id) {
  const resp = await fetch(`${BASE_URL}/${id}`);
  if (!resp.ok) {
    throw new Error("Failed to fetch user by ID");
  }
  return resp.json();
}

export async function deleteUser(id) {
  const resp = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!resp.ok) {
    throw new Error("Failed to delete user");
  }
  return resp.json();
}

export async function addUser(user) {
  const resp = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!resp.ok) throw new Error("Failed to create new user");
  return resp.json();
}

export async function updateUser(id, user) {
  const resp = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!resp.ok) throw new Error("Failed to update user");
  return resp.json();
}
