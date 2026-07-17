const input = document.getElementById("username");
const button = document.getElementById("btn");
const profile = document.getElementById("profile");

button.addEventListener("click", getProfile);

async function getProfile() {

    const username = input.value.trim();

    if (username === "") {
        profile.innerHTML = "<p>Please enter a GitHub username.</p>";
        return;
    }

    try {

        profile.innerHTML = "<p>Loading...</p>";

        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error("User not found");
        }

        const data = await response.json();

        profile.innerHTML = `
            <img src="${data.avatar_url}" width="150">

            <h2>${data.name || data.login}</h2>

            <p><strong>Followers:</strong> ${data.followers}</p>

            <p><strong>Public Repositories:</strong> ${data.public_repos}</p>

            <a href="${data.html_url}" target="_blank">
                Visit GitHub Profile
            </a>
        `;

    } catch (error) {

        profile.innerHTML = "<p>User not found!</p>";

    }

}