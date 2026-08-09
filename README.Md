# 🔒 Personal Password Manager

## Live Demo
   https://ritik-singh-bit.github.io/Password-Manager/

A simple password manager built two ways as a learning project — a Python CLI version and a browser-based web version.

## Features

- **Save** a website and password
- **View** saved entries (masked by default in the web version, click "reveal" to see one)
- **Generate** a random password using letters, digits, and symbols (`@#$%&*`)
- **Exit** the app

## Project Structure


password-manager/
├── front/
│ ├── index.html # Web app markup
│ ├── style.css # Styling
│ └── script.js # App logic
├── Code.py # CLI version
├── .gitignore
└── README.md

## Running the Web Version

No install or server needed — just open the file in a browser:

1. Navigate to the `front/` folder
2. Open `index.html` directly in any browser

Passwords are stored in the browser's local storage on your device — nothing is sent anywhere.

## Running the CLI Version

Requires Python 3.

```bash
python Code.py
```

You'll see a menu:

-------PERSONAL PASSWORD MANAGER-----

1. Save Password
2. View Password
3. Generate Password
4. Exit

Passwords are saved to `password.txt` in the same folder. This file is git-ignored (see `.gitignore`) so your saved passwords never get pushed to the repo.

## Tech Used

- **CLI version:** Python (built-in `random` and `string` modules)
- **Web version:** HTML, CSS, JavaScript (no frameworks or dependencies)

## ⚠️ Security Note

This is a learning/portfolio project, not a production-ready password manager. Passwords are stored in **plain text** (in `password.txt` for the CLI version, and in unencrypted browser storage for the web version) — they are not hashed or encrypted. Please don't use this to store real, sensitive passwords.

## Possible Future Improvements

- Encrypt stored passwords (e.g. with a master password)
- Add password strength indicator
- Add search/filter for saved entries
- Export/import vault as a file

## License

Feel free to use, modify, or learn from this project.