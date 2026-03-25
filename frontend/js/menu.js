const menuContainer = document.getElementById("menu-grid");

if (menuContainer) {
    fetch("/api/flavors")
        .then((response) => response.json())
        .then((items) => renderFlavorCards(items, menuContainer))
        .catch(() => {
            menuContainer.innerHTML = '<p class="status-line status-error">Menu data could not be loaded.</p>';
        });
}
