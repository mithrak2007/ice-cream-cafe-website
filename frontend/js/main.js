const yearNode = document.getElementById("year");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");

if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}

function renderFlavorCards(items, container) {
    container.innerHTML = items.map((item) => `
        <article class="flavor-card">
            <img src="${item.image_url}" alt="${escapeHtml(item.name)}">
            <h3>${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <div class="flavor-meta">
                <span class="price-tag">Rs. ${Number(item.price).toFixed(0)}</span>
                <span>Fresh Favorite</span>
            </div>
        </article>
    `).join("");
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}
