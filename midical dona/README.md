# Dona Medical Center - Demo Website

A simple medical center website covering:

- Pages: Home, About, Services, Team, Contact, Privacy.
- Demo sign-in page (`login.html`) using `localStorage`.
- Automatic light/dark theme support.
- Local contact message storage with view page `messages.html`.

Run locally:

If you have Python installed, run a simple server from the project folder:

```bash
# Python 3.x
python -m http.server 8000
```

Then open your browser at `http://localhost:8000`.

## Publish to GitHub Pages

1. Install Git if it is not already installed.
2. Create a new repository on GitHub.
3. Run this command from the project folder:

```powershell
.\deploy.ps1 https://github.com/USERNAME/REPOSITORY.git
```

4. Open the repository settings on GitHub, enable GitHub Pages, and select the `main` branch with the `/root` folder.

> Note: Git is not installed in the current environment, so you may need to install it if it is missing.
