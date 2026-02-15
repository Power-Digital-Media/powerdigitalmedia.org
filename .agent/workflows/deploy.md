---
description: How to deploy the Power Digital Media website
---

# Deployment Protocol

> [!IMPORTANT]
> **ALWAYS PUSH TO MASTER.**
> The `master` branch is the ONLY source of truth for production deployments.
> Do NOT push to `main`, `deploy-production`, or any other branch for live updates.

## Steps

1.  **Build Verification**
    Run the build locally to ensure no errors:
    ```bash
    npm run build
    ```

2.  **Git Sync**
    Ensure you are on the `master` branch and strictly up to date:
    ```bash
    git checkout master
    git pull origin master
    ```

3.  **Deployment**
    Push directly to `origin master`.
    ```bash
    git push origin master
    ```

4.  **Verification**
    - Check Netlify dashboard.
    - Verify live site changes.
