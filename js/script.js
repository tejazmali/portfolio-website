


document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission
    const form = event.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById('formMessage');
    const submitButton = form.querySelector('.submit-button');

    // Add loading animation to button
    submitButton.classList.add('loading');

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            formMessage.style.display = 'block';
            formMessage.style.color = 'green';
            formMessage.textContent = 'Your message has been sent successfully!';
            form.reset(); // Reset the form after successful submission
        } else {
            formMessage.style.display = 'block';
            formMessage.style.color = 'red';
            formMessage.textContent = 'Oops! There was a problem sending your message.';
        }
    } catch (error) {
        formMessage.style.display = 'block';
        formMessage.style.color = 'red';
        formMessage.textContent = 'An error occurred. Please try again later.';
    } finally {
        // Remove loading animation from button
        submitButton.classList.remove('loading');
    }
});






// Wait until the entire page has loaded
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    document.getElementById('content').style.display = 'block';
});






    // Function to load the Google site verification code from the config.json
    function loadGoogleSiteVerification() {
        fetch('config.json') // Fetch the JSON file containing the verification code
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load config.json');
                }
                return response.json(); // Parse the JSON file
            })
            .then(data => {
                // Create and insert the meta tag into the head section
                var metaTag = document.createElement('meta');
                metaTag.name = 'google-site-verification';
                metaTag.content = data.google_site_verification; // Get the verification code from JSON
                document.head.appendChild(metaTag); // Append the meta tag to the head section
            })
            .catch(error => {
                console.error('Error loading verification code:', error);
            });
    }

    // Call the function to insert the meta tag
    loadGoogleSiteVerification();




    // Fetch the access key from config.json
    fetch('/config.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Config file not found");
            }
            return response.json();
        })
        .then(data => {
            // Set the access key in the hidden input field
            document.getElementById('access_key').value = data.access_key;
            
        })
        .catch(error => {
            console.error('Error loading access key:', error);
        });

//JavaScript to Handle Scroll and Active Section

// JavaScript to Handle Scroll and Active Section
const navbar = document.querySelector('.navbar');
const header = document.getElementById('header');

// Detect sections and links
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll listener to update active link and navbar transparency
window.addEventListener('scroll', () => {
// Toggle navbar background on scroll
if (window.scrollY > header.offsetHeight) {
    navbar.classList.add('scrolled');
} else {
    navbar.classList.remove('scrolled');
}

// Highlight active section in navbar
let current = 'header'; // Default to "Home" section
sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute('id');
    }
});

navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-target') === current) {
        link.classList.add('active');
    }
});
});
document.addEventListener("DOMContentLoaded", function () {
    const repoCardsContainer = document.getElementById("repo-cards");
    
    // const GITHUB_TOKEN = "YOUR_TOKEN"; // Replace with your token if you want to use repo card

    const githubUser = "tejazmali"; // Change to the GitHub username you want to fetch repos for
  
    // Clear any previous content
    repoCardsContainer.innerHTML = '';
  
    // Fetch all public repositories for the user
    fetch(`https://api.github.com/users/${githubUser}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(repos => {
        // Sort repositories by pushed_at (most recent code push on top)
        repos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
  
        repos.forEach(repo => {
          // Skip the repo with URL: https://github.com/tejazmali/tejazmali
          if (repo.full_name === "tejazmali/tejazmali") return;
  
          // Limit the description length (if needed)
          const maxLength = 170;
          let description = repo.description || "No description provided.";
          if (description.length > maxLength) {
            description = description.substring(0, maxLength) + "...";
          }
  
          // Format the pushed_at date (when code was last updated)
          const pushedDate = new Date(repo.pushed_at).toLocaleString();
  
          // Create the repo card element including a placeholder for commit count.
          // We use repo.pushed_at instead of updated_at so that we show only code updates.
          const card = document.createElement("div");
          card.className = "repo-card";
          card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${description}</p>
           
            <div class="repo-stats">
              <span><i class="fa-solid fa-star"></i> ${repo.stargazers_count} Stars</span>
              <span><i class="fa-solid fa-code-fork"></i> ${repo.forks_count} Forks</span>
              <span><i class="fa-solid fa-code"></i> <span id="commit-count-${repo.id}">Loading commits...</span> Commits</span>
            </div>
            <a class="repo-link" href="${repo.html_url}" target="_blank">View on GitHub</a>
          `;
          repoCardsContainer.appendChild(card);
  
          // Fetch commit count for the repository.
          // We use per_page=1 and then read the "Link" header to determine the total commit count.
          fetch(`https://api.github.com/repos/${githubUser}/${repo.name}/commits?per_page=1`, {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`
            }
          })
            .then(response => {
              // For empty repositories, GitHub returns a 409 error.
              if (response.status === 409) {
                return { commitCount: 0 };
              }
              const linkHeader = response.headers.get("Link");
              if (linkHeader) {
                // The Link header will have a URL for the last page in the format:
                // <https://api.github.com/repositories/xxx/commits?page=Y>; rel="last"
                const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
                if (match && match[1]) {
                  return { commitCount: parseInt(match[1], 10) };
                }
              }
              // If no pagination is needed, then there is only one commit (if any)
              return response.json().then(commits => ({ commitCount: commits.length }));
            })
            .then(data => {
              const commitCountElem = document.getElementById(`commit-count-${repo.id}`);
              if (commitCountElem) {
                commitCountElem.textContent = data.commitCount;
              }
            })
            .catch(err => {
              console.error("Error fetching commit count for", repo.full_name, err);
              const commitCountElem = document.getElementById(`commit-count-${repo.id}`);
              if (commitCountElem) {
                commitCountElem.textContent = "N/A";
              }
            });
  
          // Fetch the languages used in the repository
          fetch(repo.languages_url, {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`
            }
          })
            .then(response => response.json())
            .then(languages => {
              // Calculate the total bytes of code across all languages
              const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  
              // Mapping of languages to colors (customize as needed)
              const languageColors = {
                JavaScript: "#f1e05a",
                Python: "#3572A5",
                HTML: "#e34c26",
                CSS: "#563d7c",
                "C++": "#f34b7d",
                "C#": "#178600",
                Java: "#b07219",
                Ruby: "#701516",
                PHP: "#4F5D95",
                TypeScript: "#2b7489"
                // Add additional languages and colors as desired
              };
  
              // Create the language bar container
              const languageBar = document.createElement("div");
              languageBar.className = "language-bar";
  
              // Create a segment in the bar for each language
              for (const [language, bytes] of Object.entries(languages)) {
                const percentage = ((bytes / totalBytes) * 100).toFixed(2);
                const segment = document.createElement("div");
                segment.className = "language-segment";
                segment.style.width = `${percentage}%`;
                segment.style.backgroundColor = languageColors[language] || "#ccc";
                // Tooltip shows the language and its percentage
                segment.title = `${language}: ${percentage}%`;
                languageBar.appendChild(segment);
              }
  
              // Create a container for language dots/legend below the bar
              const languageDotsContainer = document.createElement("div");
              languageDotsContainer.className = "language-dots";
  
              // Create a dot with label (including percentage) for each language
              for (const [language, bytes] of Object.entries(languages)) {
                const percentage = ((bytes / totalBytes) * 100).toFixed(2);
                const dotContainer = document.createElement("div");
                dotContainer.className = "language-dot-container";
  
                // Create the colored dot
                const dot = document.createElement("span");
                dot.className = "language-dot";
                dot.style.backgroundColor = languageColors[language] || "#ccc";
  
                // Create the language label with percentage
                const label = document.createElement("span");
                label.textContent = language + " "; // e.g., "JavaScript "
                
                const percentageSpan = document.createElement("span");
                percentageSpan.className = "language-percentage";
                percentageSpan.textContent = `${percentage}%`;  // e.g., "85%"
                
                label.appendChild(percentageSpan);
                document.body.appendChild(label);
                
  
                dotContainer.appendChild(dot);
                dotContainer.appendChild(label);
                languageDotsContainer.appendChild(dotContainer);
              }
  
              // Insert languageBar and languageDotsContainer above the repo link
              const repoLink = card.querySelector('.repo-link');
              card.insertBefore(languageBar, repoLink);
              card.insertBefore(languageDotsContainer, repoLink);
            })
            .catch(err => {
              console.error("Error fetching languages for", repo.full_name, err);
            });
        });
      })
      .catch(error => {
        console.error("Error fetching repositories:", error);
        const errorCard = document.createElement("div");
        errorCard.className = "repo-card";
        errorCard.innerHTML = `<p>Error loading repositories for ${githubUser}.</p>`;
        repoCardsContainer.appendChild(errorCard);
      });
  });
  