document
    .getElementById("contactForm")
    .addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission
        const form = event.target;
        const formData = new FormData(form);
        const formMessage = document.getElementById("formMessage");
        const submitButton = form.querySelector(".submit-button");

        // Add loading animation to button
        submitButton.classList.add("loading");

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                formMessage.style.display = "block";
                formMessage.style.color = "green";
                formMessage.textContent = "Your message has been sent successfully!";
                form.reset(); // Reset the form after successful submission
            } else {
                formMessage.style.display = "block";
                formMessage.style.color = "red";
                formMessage.textContent =
                    "Oops! There was a problem sending your message.";
            }
        } catch (error) {
            formMessage.style.display = "block";
            formMessage.style.color = "red";
            formMessage.textContent = "An error occurred. Please try again later.";
        } finally {
            // Remove loading animation from button
            submitButton.classList.remove("loading");
        }
    });

// Wait until the entire page has loaded
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    document.getElementById("content").style.display = "block";
});





// Fetch the access key from config.json
fetch("/config.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Config file not found");
        }
        return response.json();
    })
    .then((data) => {
        // Set the access key in the hidden input field
        document.getElementById("access_key").value = data.access_key;
    })
    .catch((error) => {
        console.error("Error loading access key:", error);
    });

//JavaScript to Handle Scroll and Active Section

// JavaScript to Handle Scroll and Active Section
const navbar = document.querySelector(".navbar");
const header = document.getElementById("header");

// Detect sections and links
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");

// Scroll listener to update active link and navbar transparency
window.addEventListener("scroll", () => {
    // Toggle navbar background on scroll
    if (window.scrollY > header.offsetHeight) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Highlight active section in navbar
    let current = "header"; // Default to "Home" section
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("data-target") === current) {
            link.classList.add("active");
        }
    });
});
