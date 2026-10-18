const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

document.querySelectorAll(".choose-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("categorySelect").value = button.dataset.category;
    document.getElementById("register").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.querySelector('[name="name"]').focus({ preventScroll: true }), 450);
  });
});

const form = document.getElementById("registerForm");
const message = document.getElementById("formMessage");
form.addEventListener("submit", async event => {
  event.preventDefault();
  message.className = "";
  message.textContent = "Submitting your registration…";
  const data = Object.fromEntries(new FormData(form).entries());
  data.consent = form.elements.consent.checked;
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Unable to submit. Please try again.");
    message.className = "success";
    message.textContent = `${result.message} Your reference ID is ${result.registrationId}.`;
    form.reset();
  } catch (error) {
    message.className = "error";
    message.textContent = error.message || "Could not connect to the server. Make sure the backend is running.";
  }
});
