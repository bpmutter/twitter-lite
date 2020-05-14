const form = document.querySelector(".create-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const message = formData.get("message");
    const body = {
        message
    };
    
    try{
        await fetch("http://localhost:8080/tweets", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("TWITTER_LITE_ACCESS_TOKEN")}`
            }
        });
        window.location.href = "/";
    } catch(err){
        if(err.status === 401){
            window.location.href = "/";
        }
        if(err.status >= 400 && err.status < 600){
            const errorJSON = await err.json();
            const errorsContainer = document.querySelector(".errors-container");
            let errorsHtml = [
                `
                <div class="alert alert-danger">
                    Something went wrong. Please try again.
                </div>
                `,
            ];
            const {errors} = errorJSON;
            if (errors && Array.isArray(errors)) {
                errorsHtml = errors.map(
                    (message) => `
                    <div class="alert alert-danger">
                    ${message}
                    </div>
                    `
                );
                errorsContainer.innerHTML = errorsHtml.join("");
            } else {
                alert("Something went wrong. Please check your internet connection and try again!");
            }
        }
    }

    
});

