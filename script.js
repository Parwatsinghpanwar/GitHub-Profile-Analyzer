function fetchGitHubProfile() {
    let username = document.getElementById("username").value;
    let profileContainer = document.getElementById("profile-container");
    let repoContainer = document.getElementById("repo-container");

    if (username === "") {
        alert("Please enter a GitHub username.");
        return;
    }

    // Fetch user profile
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.message === "Not Found") {
                alert("User not found!");
                return;
            }

            profileContainer.innerHTML = `
                <img src="${data.avatar_url}" alt="Profile Picture">
                <h3>${data.name || data.login}</h3>
                <p>${data.bio || "No bio available"}</p>
                <p>Followers: ${data.followers} | Following: ${data.following}</p>
                <a href="${data.html_url}" target="_blank">View Profile</a>
            `;
            profileContainer.style.display = "block";

            // Fetch repositories
            fetch(`https://api.github.com/users/${username}/repos`)
                .then(response => response.json())
                .then(repos => {
                    repoContainer.innerHTML = "<h3>Repositories:</h3>";
                    repos.forEach(repo => {
                        repoContainer.innerHTML += `
                            <div class="repo-item">
                                <a href="${repo.html_url}" target="_blank">${repo.name}</a> - 
                                ⭐ ${repo.stargazers_count}
                            </div>
                        `;
                    });
                });
        })
        .catch(error => console.log(error));
}
