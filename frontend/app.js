const API_BASE = "http://localhost:5000";

// ── Health Check ─────────────────────────────────────────
async function checkHealth() {
  const badge = document.getElementById("healthBadge");
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    if (data.status === "OK") {
      badge.textContent = "🟢 Backend Online";
      badge.className = "badge online";
    }
  } catch {
    badge.textContent = "🔴 Backend Offline";
    badge.className = "badge offline";
  }
}

// ── Fetch Users ───────────────────────────────────────────
document.getElementById("fetchUsersBtn").addEventListener("click", async () => {
  const list = document.getElementById("userList");
  list.innerHTML = "<li style='color:#8888a0'>Loading...</li>";

  try {
    const res = await fetch(`${API_BASE}/api/users`);
    const data = await res.json();

    if (data.success && data.data.length > 0) {
      list.innerHTML = data.data
        .map(
          (u) => `
          <li>
            <span class="name">${u.name}</span>
            <span class="role">${u.role}</span>
          </li>`
        )
        .join("");
    } else {
      list.innerHTML = "<li style='color:#8888a0'>No users found.</li>";
    }
  } catch {
    list.innerHTML = "<li style='color:#ef4444'>❌ Could not reach backend.</li>";
  }
});

// ── Add User ──────────────────────────────────────────────
document.getElementById("addUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("nameInput").value.trim();
  const role = document.getElementById("roleInput").value.trim();
  const msg = document.getElementById("formMsg");

  msg.textContent = "";
  msg.className = "form-msg";

  try {
    const res = await fetch(`${API_BASE}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      msg.textContent = `✅ User "${data.data.name}" added successfully!`;
      document.getElementById("nameInput").value = "";
      document.getElementById("roleInput").value = "";
    } else {
      msg.textContent = `❌ ${data.message}`;
      msg.className = "form-msg error";
    }
  } catch {
    msg.textContent = "❌ Could not reach backend.";
    msg.className = "form-msg error";
  }
});

// ── Init ──────────────────────────────────────────────────
checkHealth();
setInterval(checkHealth, 30000); // poll every 30s
