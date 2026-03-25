const adminForm = document.getElementById("admin-form");
const adminList = document.getElementById("admin-list");
const adminStatus = document.getElementById("admin-status");
const resetButton = document.getElementById("reset-form");

function getFlavorPayload() {
    return {
        name: document.getElementById("flavor-name").value.trim(),
        price: document.getElementById("flavor-price").value.trim(),
        description: document.getElementById("flavor-description").value.trim(),
        image_url: document.getElementById("flavor-image").value.trim()
    };
}

function clearAdminForm() {
    document.getElementById("flavor-id").value = "";
    document.getElementById("flavor-name").value = "";
    document.getElementById("flavor-price").value = "";
    document.getElementById("flavor-description").value = "";
    document.getElementById("flavor-image").value = "";
}

async function loadAdminList() {
    try {
        const response = await fetch("/api/flavors");
        const items = await response.json();

        adminList.innerHTML = items.map((item) => `
            <article class="admin-row">
                <strong>${escapeHtml(item.name)}</strong>
                <span>Rs. ${Number(item.price).toFixed(0)}</span>
                <span>${escapeHtml(item.description)}</span>
                <span>${escapeHtml(item.image_url)}</span>
                <div class="admin-row-actions">
                    <button class="button button-secondary" data-action="edit" data-id="${item.id}">Edit</button>
                    <button class="button button-secondary" data-action="delete" data-id="${item.id}">Delete</button>
                </div>
            </article>
        `).join("");
    } catch (error) {
        adminList.innerHTML = '<p class="status-line status-error">Could not load admin data.</p>';
    }
}

if (adminForm && adminList && adminStatus) {
    loadAdminList();

    adminForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const flavorId = document.getElementById("flavor-id").value;
        const payload = getFlavorPayload();
        const method = flavorId ? "PUT" : "POST";
        const url = flavorId ? `/api/flavors/${flavorId}` : "/api/flavors";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Could not save flavor.");
            }

            adminStatus.className = "status-line status-success";
            adminStatus.textContent = flavorId ? "Flavor updated successfully." : "Flavor added successfully.";
            clearAdminForm();
            loadAdminList();
        } catch (error) {
            adminStatus.className = "status-line status-error";
            adminStatus.textContent = error.message;
        }
    });

    adminList.addEventListener("click", async (event) => {
        const button = event.target.closest("button[data-action]");

        if (!button) {
            return;
        }

        const id = button.dataset.id;
        const action = button.dataset.action;

        if (action === "edit") {
            const response = await fetch(`/api/flavors/${id}`);
            const item = await response.json();

            document.getElementById("flavor-id").value = item.id;
            document.getElementById("flavor-name").value = item.name;
            document.getElementById("flavor-price").value = item.price;
            document.getElementById("flavor-description").value = item.description;
            document.getElementById("flavor-image").value = item.image_url;
            adminStatus.className = "status-line";
            adminStatus.textContent = "Editing selected flavor.";
        }

        if (action === "delete") {
            const response = await fetch(`/api/flavors/${id}`, { method: "DELETE" });
            const data = await response.json();

            if (!response.ok) {
                adminStatus.className = "status-line status-error";
                adminStatus.textContent = data.message || "Could not delete flavor.";
                return;
            }

            adminStatus.className = "status-line status-success";
            adminStatus.textContent = data.message;
            loadAdminList();
        }
    });

    resetButton.addEventListener("click", () => {
        clearAdminForm();
        adminStatus.className = "status-line";
        adminStatus.textContent = "";
    });
}
