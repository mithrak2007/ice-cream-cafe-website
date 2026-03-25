const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const payload = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        if (!payload.name || !payload.email || !payload.message) {
            formStatus.className = "status-line status-error";
            formStatus.textContent = "Please fill out all fields.";
            return;
        }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Submission failed.");
            }

            contactForm.reset();
            formStatus.className = "status-line status-success";
            formStatus.textContent = data.message;
        } catch (error) {
            formStatus.className = "status-line status-error";
            formStatus.textContent = error.message;
        }
    });
}
