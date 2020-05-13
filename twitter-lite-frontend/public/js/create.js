const form = document.querySelector(".create-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const body = {
        name
    };
    await fetch("http://localhost:8080/tasks", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });

    window.location.href = "/";
});