// GitHub Projects Loader
document.addEventListener('DOMContentLoaded', function() {
    const githubUsername = 'tejasmmali'; // Your GitHub username
    const projectsContainer = document.getElementById('projects-container');
    const projectsLoading = document.getElementById('projects-loading');
    const projectsError = document.getElementById('projects-error');

    // Fetch GitHub repositories
    async function fetchGitHubProjects() {
        try {
            const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }

            const repos = await response.json();
            
            // Filter out forks and sort by stars
            const projects = repos
                .filter(repo => !repo.fork && !repo.archived)
                .sort((a, b) => b.stargazers_count - a.stargazers_count);

            // Hide loading
            projectsLoading.style.display = 'none';

            if (projects.length === 0) {
                projectsError.style.display = 'block';
                projectsError.textContent = 'No projects found.';
                return;
            }

           
            projectsContainer.innerHTML = projects.map(repo => `
                <div class="project-card">
                    <div class="project-header">
                        <h3 class="project-title">
                            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                                ${repo.name}
                            </a>
                        </h3>
                        ${repo.language ? `<span class="project-language">${repo.language}</span>` : ''}
                    </div>
                    <p class="project-description">${repo.description || 'No description available.'}</p>
                    <div class="project-footer">
                        <div class="project-stats">
                            <span class="project-stat">
                                <i class="fas fa-star"></i>
                                <span>${repo.stargazers_count}</span>
                            </span>
                            <span class="project-stat">
                                <i class="fas fa-code-branch"></i>
                                <span>${repo.forks_count}</span>
                            </span>
                        </div>
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
                            View on GitHub <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `).join('');

        } catch (error) {
            console.error('Error fetching projects:', error);
            projectsLoading.style.display = 'none';
            projectsError.style.display = 'block';
        }
    }

   
    fetchGitHubProjects();
});
