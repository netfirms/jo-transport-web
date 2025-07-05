# J.O Transportation and service Co..Ltd. Website

This repository contains the website for J.O Transportation and service Co..Ltd., a premium transportation service company.

## Deploying to GitHub Pages

This repository is configured to automatically deploy to GitHub Pages using GitHub Actions. Here's how to set it up:

### Prerequisites

1. Push this repository to GitHub.
2. Ensure your repository is public, or you have a GitHub Pro account (for private repository GitHub Pages).

### Setup GitHub Pages

1. Go to your GitHub repository.
2. Navigate to Settings > Pages.
3. Under "Source", select "GitHub Actions" as the deployment source.

### Automatic Deployment

The website will automatically deploy to GitHub Pages when:
- You push changes to the `main` branch
- You manually trigger the workflow from the Actions tab

### Manual Deployment

To manually deploy:
1. Go to your GitHub repository.
2. Navigate to the Actions tab.
3. Select the "Deploy to GitHub Pages" workflow.
4. Click "Run workflow" and select the branch you want to deploy.

### Viewing Your Deployed Site

After successful deployment, your site will be available at:
`https://[your-github-username].github.io/[repository-name]/`

## Local Development

To work on this website locally:

1. Clone the repository
2. Open `index.html` in your browser to view the site
3. Make changes to the HTML, CSS, or JavaScript files
4. Refresh your browser to see the changes
5. Commit and push your changes to GitHub to trigger deployment

## Project Structure

- `index.html` - Main page of the website
- `services.html` - Services details page
- `css/` - Contains stylesheets
- `js/` - Contains JavaScript files
- `images/` - Contains image assets
- `info/` - Contains additional images and information
- `.github/workflows/deploy.yml` - GitHub Actions workflow for deployment
- `.nojekyll` - Prevents GitHub Pages from processing the site with Jekyll

## Implementation Summary

The following files have been added to enable GitHub Pages deployment:

1. `.github/workflows/deploy.yml` - A GitHub Actions workflow that automatically deploys the website to GitHub Pages when changes are pushed to the main branch or when manually triggered.
2. `.nojekyll` - An empty file that prevents GitHub Pages from processing the site with Jekyll, ensuring that all files are served exactly as they are in the repository.
3. `README.md` - This file, which provides documentation on how to deploy the website to GitHub Pages.

To use this deployment setup:

1. Push this repository to GitHub
2. Go to your repository's Settings > Pages
3. Under "Source", select "GitHub Actions"
4. Your site will automatically deploy when you push changes to the main branch

## Contact

For questions or issues regarding this website, please contact the repository owner.
