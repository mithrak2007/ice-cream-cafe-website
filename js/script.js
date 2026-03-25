const fallbackMenu = [
    {
        name: "Rose Pistachio Silk",
        description: "Fragrant rose milk ice cream finished with roasted pistachio crunch.",
        price: 149,
        category: "Signature"
    },
    {
        name: "Sea Salt Caramel Swirl",
        description: "Buttery caramel ribbons folded into smooth sea salt cream.",
        price: 159,
        category: "Classic"
    },
    {
        name: "Mango Saffron Glow",
        description: "Alphonso mango with a warm saffron finish for summer evenings.",
        price: 145,
        category: "Seasonal"
    },
    {
        name: "Dark Cocoa Hazelnut",
        description: "Deep chocolate body with toasted hazelnut praline for rich texture.",
        price: 169,
        category: "Premium"
    },
    {
        name: "Tender Coconut Mist",
        description: "A cooling coconut scoop inspired by fresh beachside desserts.",
        price: 139,
        category: "Fresh"
    },
    {
        name: "Berry Cheesecake Pop",
        description: "Cream cheese notes, strawberry compote, and biscuit crumble.",
        price: 165,
        category: "Favourite"
    }
];

const gradients = [
    "linear-gradient(135deg, #f6b2c8, #ef7b9b)",
    "linear-gradient(135deg, #ffd39a, #b66a32)",
    "linear-gradient(135deg, #ffca7a, #ff8f5a)",
    "linear-gradient(135deg, #8f5d52, #3f2421)",
    "linear-gradient(135deg, #c8f0e2, #79c4b5)",
    "linear-gradient(135deg, #d6bcff, #f78fb2)"
];

document.addEventListener("DOMContentLoaded", () => {
    loadMenuItems();
    setupContactForm();
});

async function loadMenuItems() {
    const response = await fetch("backend/get_menu.php").catch(() => null);

    if (!response || !response.ok) {
        renderMenuItems(fallbackMenu, true);
        return;
    }

    const data = await response.json().catch(() => null);

    if (!data || !data.success || !Array.isArray(data.menu)) {
        renderMenuItems(fallbackMenu, true);
        return;
    }

    renderMenuItems(data.menu);
}

function renderMenuItems(menuItems, isFallback = false) {
    const menuContainer = document.getElementById("menu-items");

    if (!menuItems.length) {
        menuContainer.innerHTML = '<div class="status-card">No flavours are available right now.</div>';
        return;
    }

    menuContainer.innerHTML = menuItems.map((item, index) => `
        <article class="menu-card">
            <div class="menu-card-top" style="--card-gradient: ${gradients[index % gradients.length]}">
                <span class="menu-tag">${escapeHtml(item.category || "Best Seller")}</span>
            </div>
            <div class="menu-card-body">
                <h3>${escapeHtml(item.name)}</h3>
                <p>${escapeHtml(item.description)}</p>
                <div class="menu-meta">
                    <span>${isFallback ? "Sample data mode" : "Loaded from backend"}</span>
                    <strong class="price">Rs. ${Number(item.price || 0).toFixed(0)}</strong>
                </div>
            </div>
        </article>
    `).join("");
}

function setupContactForm() {
    const form = document.getElementById("contact-form");
    const messageBox = document.getElementById("form-message");

    if (!form || !messageBox) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const payload = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            occasion: document.getElementById("occasion").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        messageBox.className = "form-message";
        messageBox.textContent = "Sending your enquiry...";

        try {
            const response = await fetch("backend/contact.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Unable to send the enquiry.");
            }

            form.reset();
            messageBox.className = "form-message success";
            messageBox.textContent = data.message || "Your enquiry has been saved successfully.";
        } catch (error) {
            console.error("Contact form error:", error);
            messageBox.className = "form-message error";
            messageBox.textContent = "The backend is not available right now. Configure PHP and MySQL to enable live form storage.";
        }
    });
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}
