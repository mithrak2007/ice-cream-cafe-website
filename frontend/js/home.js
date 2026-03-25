const featuredContainer = document.getElementById("featured-flavors");

if (featuredContainer) {
    fetch("/api/flavors")
        .then((response) => response.json())
        .then((items) => renderFlavorCards(items.slice(0, 3), featuredContainer))
        .catch(() => {
            featuredContainer.innerHTML = '<p class="status-line status-error">Unable to load featured flavors right now.</p>';
        });
}
