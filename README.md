# Password Generator

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The Password Generator is a web application that allows users to generate strong and secure passwords. It offers various customization options to include uppercase letters, lowercase letters, numbers, and symbols in the generated password.

## Features
- **Generate Passwords with Customizable Length:** Users can specify the desired length of the password using a convenient slider, allowing for flexibility based on security needs.
- **Include Uppercase Letters:** Option to include uppercase alphabets (A-Z) in the generated password, enhancing complexity.
- **Include Lowercase Letters:** Option to include lowercase alphabets (a-z) in the generated password, ensuring a mix of character cases.
- **Include Numbers:** Option to include numeric characters (0-9) in the password, adding an extra layer of security.
- **Include Symbols:** Option to include special symbols (e.g., !, @, #, $) in the password, increasing its unpredictability.
- **Password Strength Indicator:** Visual feedback that assesses the strength of the generated password based on length and character variety, categorized as Weak, Moderate, or Strong.
- **Copy Password to Clipboard:** Easily copy the generated password to the clipboard with a single click for convenient use.
- **Dark Mode Support:** Toggle between light and dark themes to enhance user experience based on preference or ambient lighting conditions.

## Technologies Used

- **HTML5:** Structure and layout of the web application.
- **CSS3:** Styling and responsive design.
- **JavaScript:** Functionality and interactivity.
- **Font Awesome:** Icons for UI elements.
- **Google Fonts:** Custom fonts for enhanced typography.

## Screenshots
![Password Generator Desktop](screenshots/desktop.png)
*Desktop view of the Password Generator.*

![Password Generator Dark Mode](screenshots/dark-mode.png)
*Password Generator in Dark Mode.*

## Live Demo

Access the live version of the Password Generator [here](https://your-live-demo-link.com).
![Password Generator Desktop](https://github.com/user-attachments/assets/6a5a1f8d-2bb1-4be3-973d-c92ee2b6fcae)
*Desktop view of the Password Generator.*

![Password Generator Dark Mode](https://github.com/user-attachments/assets/d9e6e945-4641-4cb6-bed4-aa1d628a3447)
*Password Generator in Dark Mode.*

## Installation

To set up this project locally, follow these steps:

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/ALOK-CST/Password-Generator.git
    ```
2. **Navigate to the Project Directory:**
    ```bash
    cd Password-Generator
    ```
3. **Open `index.html` in Your Browser:**
    - **Option 1:** Double-click the `index.html` file to open it directly in your default web browser.
    - **Option 2:** Serve the project using a local development server for enhanced functionality:
        ```bash
        # Using Python's Simple HTTP Server
        python -m http.server 8000
        ```
        Then, navigate to [http://localhost:8000](http://localhost:8000) in your browser.
    
4. **Ensure Internet Connectivity:**
    - The project utilizes external resources like Font Awesome and Google Fonts. Ensure you have an active internet connection to load these assets properly.

## Usage

1. **Set Password Length:**
    - Adjust the slider under the "Length" section to choose a password length between 4 and 30 characters.

2. **Select Character Types:**
    - Toggle the buttons for **Uppercase**, **Lowercase**, **Numbers**, and **Symbols** to include or exclude these character sets in your password.

3. **Generate Password:**
    - Click the **"Generate Password 🗝️"** button.
    - The generated password will appear in the display area below the heading.
    - The strength indicator will update to reflect the strength of the generated password.

4. **Copy Password:**
    - Click the **"Copy Password 📋"** button to copy the generated password to your clipboard for easy use.

5. **Toggle Dark Mode:**
    - Click the moon icon to switch to Dark Mode.
    - Click the sun icon to revert to Light Mode.

## Contributing

Contributions are welcome! To contribute to the Password Generator project, please follow these guidelines:

1. **Fork the Repository:**
    - Click the **"Fork"** button at the top right corner of the repository page to create a personal copy of the project.

2. **Clone Your Fork:**
    ```bash
    git clone https://github.com/your-username/Password-Generator.git
    ```
3. **Navigate to the Project Directory:**
    ```bash
    cd Password-Generator
    ```
4. **Create a New Branch:**
    - Use a descriptive name for your branch related to the feature or fix you're implementing.
    ```bash
    git checkout -b feature/your-feature-name
    ```
5. **Implement Your Changes:**
    - Make your desired changes or additions in your local environment.

6. **Commit Your Changes:**
    ```bash
    git add .
    git commit -m "Add [description of your changes]"
    ```

7. **Push to Your Fork:**
    ```bash
    git push origin feature/your-feature-name
    ```

8. **Create a Pull Request:**
    - Navigate to your fork on GitHub.
    - Click the **"Compare & pull request"** button.
    - Provide a clear and concise description of your changes.
    - Submit the pull request for review.

**Please Ensure That:**
- Your code adheres to the existing code style and best practices.
- You have thoroughly tested your changes.
- You have updated the documentation if your changes affect it.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---
