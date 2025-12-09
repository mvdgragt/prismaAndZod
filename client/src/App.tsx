import { useState, useEffect } from "react";
import { userApi } from "./types/api/userApi";
import type { User, NewUser } from "./types/user";

type EditUserForm = {
  name: string;
  email: string;
  age: string; // keep as string in the form, convert to number on save
  isMarried: boolean;
  sport: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    age: 0,
    isMarried: false,
    sport: "",
  });

  // Modal state
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingForm, setEditingForm] = useState<EditUserForm | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userApi.getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    try {
      setError(null);
      const created = await userApi.createUser(newUser);
      setUsers((prev) => [...prev, created]);
      setNewUser({
        name: "",
        email: "",
        age: 0,
        isMarried: false,
        sport: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to create user");
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      setError(null);
      await userApi.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete user");
    }
  };

  const handleToggleMarried = async (user: User) => {
    try {
      setError(null);
      const updated = await userApi.updateUser(user.id, {
        isMarried: !user.isMarried,
      });
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    } catch (err) {
      console.error(err);
      setError("Failed to update user");
    }
  };

  // Open modal with user data
  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditingForm({
      name: user.name,
      email: user.email,
      age: String(user.age),
      isMarried: user.isMarried,
      sport: user.sport,
    });
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setEditingForm(null);
  };

  const handleSaveEdit = async () => {
    if (!editingUser || !editingForm) return;

    try {
      setError(null);
      const updated = await userApi.updateUser(editingUser.id, {
        name: editingForm.name,
        email: editingForm.email,
        age: Number(editingForm.age),
        isMarried: editingForm.isMarried,
        sport: editingForm.sport,
      });

      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      closeEditModal();
    } catch (err) {
      console.error(err);
      setError("Failed to update user");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Users</h1>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-sky-500 disabled:opacity-60"
          >
            {loading ? "Loading..." : "Refresh users"}
          </button>
        </header>

        {error && (
          <div className="mb-4 rounded-md border border-red-500 bg-red-950/40 px-4 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* Add new user form */}
        <section className="mb-8 rounded-xl border border-slate-700 bg-slate-800/60 p-4 shadow">
          <h2 className="mb-3 text-lg font-semibold">Add new user</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <input
              type="number"
              className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              placeholder="Age"
              value={newUser.age || ""} // show placeholder when 0
              onChange={(e) =>
                setNewUser({ ...newUser, age: Number(e.target.value) })
              }
            />
            <input
              className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              placeholder="Sport"
              value={newUser.sport}
              onChange={(e) =>
                setNewUser({ ...newUser, sport: e.target.value })
              }
            />
            <label className="flex items-center gap-2 text-sm text-slate-200">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-500"
                checked={newUser.isMarried}
                onChange={(e) =>
                  setNewUser({ ...newUser, isMarried: e.target.checked })
                }
              />
              Married
            </label>
          </div>
          <div className="mt-4">
            <button
              onClick={handleCreateUser}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-500"
            >
              Add user
            </button>
          </div>
        </section>

        {/* Users list */}
        <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 shadow">
          <h2 className="mb-3 text-lg font-semibold">Existing users</h2>

          {users.length === 0 ? (
            <p className="text-sm text-slate-400">No users yet.</p>
          ) : (
            <ul className="divide-y divide-slate-700">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-medium">
                      {user.name}{" "}
                      <span className="text-xs text-slate-400">
                        (id: {user.id})
                      </span>
                    </p>
                    <p className="text-sm text-slate-300">{user.email}</p>
                    <p className="text-xs text-slate-400">
                      Age {user.age} • Sport: {user.sport} • Married:{" "}
                      {user.isMarried ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="rounded-md bg-sky-600 px-3 py-1 text-xs font-medium text-white hover:bg-sky-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleMarried(user)}
                      className="rounded-md bg-amber-600 px-3 py-1 text-xs font-medium text-white hover:bg-amber-500"
                    >
                      Toggle married
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="rounded-md bg-rose-600 px-3 py-1 text-xs font-medium text-white hover:bg-rose-500"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Modal */}
      {editingUser && editingForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={closeEditModal}
        >
          <div
            className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <h2 className="mb-4 text-lg font-semibold">
              Edit user #{editingUser.id}
            </h2>

            <div className="space-y-3">
              <input
                className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                placeholder="Name"
                value={editingForm.name}
                onChange={(e) =>
                  setEditingForm((prev) =>
                    prev ? { ...prev, name: e.target.value } : prev
                  )
                }
              />
              <input
                className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                placeholder="Email"
                value={editingForm.email}
                onChange={(e) =>
                  setEditingForm((prev) =>
                    prev ? { ...prev, email: e.target.value } : prev
                  )
                }
              />
              <input
                type="number"
                className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                placeholder="Age"
                value={editingForm.age}
                onChange={(e) =>
                  setEditingForm((prev) =>
                    prev ? { ...prev, age: e.target.value } : prev
                  )
                }
              />
              <input
                className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                placeholder="Sport"
                value={editingForm.sport}
                onChange={(e) =>
                  setEditingForm((prev) =>
                    prev ? { ...prev, sport: e.target.value } : prev
                  )
                }
              />
              <label className="flex items-center gap-2 text-sm text-slate-200">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-500"
                  checked={editingForm.isMarried}
                  onChange={(e) =>
                    setEditingForm((prev) =>
                      prev ? { ...prev, isMarried: e.target.checked } : prev
                    )
                  }
                />
                Married
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={closeEditModal}
                className="rounded-md border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
