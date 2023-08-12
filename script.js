window.addEventListener("DOMContentLoaded", () => {
  const fetchBtn = document.getElementById("fetchBtn");
  const usernameInput = document.getElementById("username");
  const profileDiv = document.getElementById("profile");

  fetchBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();

    if (username === "") {
      profileDiv.innerHTML = "<p>Please enter a GitHub username.</p>";
      return;
    }

    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found");
        }
        return response.json();
      })
      .then((data) => {
        profileDiv.innerHTML = `
                <h2>${data.login}</h2>
                <img src="${data.avatar_url}" alt="${data.login}" width="100">
                <p>Name: ${data.name || "N/A"}</p>
                <p>Location: ${data.location || "N/A"}</p>
                <p>Followers: ${data.followers}</p>
                <p>Following: ${data.following}</p>
                <p>Site Admin: ${data.site_admin}</p>
                <p>Type: ${data.type}</p>
            `;
      })
      .catch((error) => {
        profileDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
});
