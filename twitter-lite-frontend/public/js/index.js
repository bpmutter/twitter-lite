document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("http://localhost:8080/tweets", {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("TWITTER_LITE_ACCESS_TOKEN")}`
      }
    });
    const { tweets } = await res.json();
    // console.log(await res.json());

    const tweetsContainer = document.querySelector("#tweets-container");
    const tweetsHtml = tweets.map(
      ({ message, user: { username } }) => `
      <div class="card">
        <div class="card-header>${username}</div>
        <div class="card-body">
          <p class="card-text">${message}</p>
        </div>
      </div>
    `
    );
    tweetsContainer.innerHTML = tweetsHtml.join("");
  } catch (e) {
    console.error(e);
  }
});