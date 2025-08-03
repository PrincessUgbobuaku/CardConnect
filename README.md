# CardConnect

CardConnect is a dual-platform application built with:

- 📱 **React Native** for mobile (located in `apps/mobile`)
- 🌐 **React** for the web interface (located in `apps/web`)

---

## 🏗️ Project Structure

---

## 🚀 Getting Started

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/en/download/) (includes npm)
- [Git](https://git-scm.com/downloads)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (for running the mobile app)

---

## 📦 Installation & Running

### Clone the repo:

```bash
git clone https://github.com/PrincessUgbobuaku/CardConnect.git
cd CardConnect

cd apps/mobile
npm install          # Install dependencies
npx expo start       # Start the Expo development server

* This will open Expo Dev Tools in your browser.
* You can run the app on a physical device with the Expo Go app or on an emulator.
* The mobile apps configuration and entry point is handled by app.json and App.js inside this folder.

---

cd apps/web
npm install          # Install dependencies
npm start            # Start the development server

* Opens the web app at http://localhost:3000
* The main entry file is src/index.js, which renders the React component from src/App.js.
* App.js is the main wrapper where you import and render your screens or components.
