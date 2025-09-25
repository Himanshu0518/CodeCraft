# 🎨 CodeCraft

> A modern, full-featured web development platform inspired by CodePen, enabling developers to create, share, and collaborate on web projects in real-time.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://codecraft-2f10d.web.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Himanshu0518/CodeCraft)


## 🌟 Project Overview

CodeCraft is a comprehensive web development platform that empowers developers to create, experiment, and share their code seamlessly. Built with modern technologies and best practices, it offers a CodePen-like experience with enhanced features for project management and social collaboration.

### 🎯 Key Highlights
- **Real-time Code Execution**: Instant preview and compilation of HTML, CSS, and JavaScript
- **Social Platform**: Follow creators, bookmark projects, and build a developer community
- **Authentication System**: Secure user management with Firebase Authentication
- **Project Management**: Create, save, and organize development projects
- **Responsive Design**: Optimized for all devices and screen sizes
- **Performance Optimized**: Built with Vite for lightning-fast development and production builds

## 🚀 Live Demo

Experience CodeCraft in action: **[codecraft-2f10d.web.app](https://codecraft-2f10d.web.app/)**

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Author](#-author)

## ✨ Features

### 🔧 Core Functionality
- **Live Code Editor**: Multi-pane editor with syntax highlighting for HTML, CSS, and JavaScript
- **Real-time Preview**: Instant rendering of code changes with hot reload
- **Project Persistence**: Save and manage multiple projects with cloud storage


### 👥 Social Features
- **User Profiles**: Customizable developer profiles with project showcases
- **Follow System**: Connect with other developers and stay updated with their work
- **Bookmarking**: Save interesting projects for later reference

### 🔐 Authentication & Security
- **Firebase Authentication**: Secure login with multiple providers (Google, GitHub, Email)
- **Protected Routes**: Role-based access control for user-specific features

### 📱 User Experience
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Dark Theme**: Customizable interface themes for better user comfort

## 🛠️ Tech Stack

### Frontend
- **React** - Component-based UI library with hooks and context
- **Vite** - Next-generation frontend tooling for faster builds
- **JavaScript** - Modern JavaScript with async/await and modules
- **TailwindCSS** - Utility-first CSS framework for rapid styling
- **Shadcn/ui** - Reusable component library built on Radix UI
- **Framer Motion** - Production-ready motion library for React

### Backend & Services
- **Firebase Hosting** - Global CDN with automatic SSL and custom domains
- **Firebase Authentication** - Secure user authentication and management
- **Firebase Firestore** - NoSQL document database for real-time data

### Development Tools
- **ESLint** - Code linting for consistent code quality
- **Prettier** - Code formatting for maintainable codebase
- **Git** - Version control with feature branch workflow

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Himanshu0518/CodeCraft.git
   cd CodeCraft
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   ```bash
VITE_FIREBASE_API_KEY = 
VITE_FIREBASE_AUTH_DOMAIN = 
VITE_FIREBASE_PROJECT_ID = 
VITE_FIREBASE_STORAGE_BUCKET = 
VITE_FIREBASE_MESSAGING_SENDER_ID = 
VITE_FIREBASE_APP_ID = 
   ```

4. **Start development server**
   ```bash
   pnpm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start development server with hot reload |
| `pnpm run build` | Build production-ready application |
| `pnpm run preview` | Preview production build locally |
| `pnpm run lint` | Run ESLint for code quality checks |
| `pnpm run format` | Format code with Prettier |

## 📁 Project Structure

```bash 
CodeCraft/
├── public/                    # Static assets and PWA configuration
│   └── vite.svg              # Application favicon and branding
├── node_modules/              # Dependencies
├── src/
│   ├── 🎨 animations/
│   ├── 🧱 assets/            # Static assets (images, icons, fonts)
│   ├── 🔧 components/         # Reusable React components
│   │   └── ui/               # Shadcn/ui design system components
│   │       ├── Alert.jsx     # Alert notifications
│   │       ├── AppSideBar.jsx # Application sidebar navigation
│   │       ├── AuthWatcher.jsx # Authentication state monitor
│   │       ├── Footer.jsx    # Application footer
│   │       ├── Header.jsx    # Main header component
│   │       ├── ProjectCard.jsx # Project display cards
│   │       └── Protected.jsx # Route protection wrapper
│   ├── ⚙️ config/            # Configuration files
│   ├── 🎯 features/          # Feature-based component organization
│   │   ├── authSlice.js       # Redux slice for authentication
│   │   ├── projectSlice.js   # Redux slice for project management
│   │   └── searchSlice.js    # Redux slice for search functionality
│   ├── 🪝 hooks/             # Custom React hooks
│   ├── 🎨 layouts/           # Layout components
│   │   ├── AuthLayout.jsx    # Authentication page layouts
│   │   └── RootLayout.jsx    # Main application layout
│   ├── 📚 lib/               # Utility libraries and helpers
│   ├── 📄 pages/             # Route components (page-level)
│   │   ├── Bookmarks.jsx     # User bookmarks page
│   │   ├── Following.jsx     # Following users page
│   │   ├── Home.jsx          # Landing/home page
│   │   ├── LoginPage.jsx     # User authentication page
│   │   ├── NewProject.jsx    # Project creation page
│   │   ├── Profile.jsx       # User profile page
│   │   ├── Project.jsx       # Individual project view
│   │   ├── SignupPage.jsx    # User registration page
│   │   └── YourWork.jsx      # User's projects dashboard
│   ├── 🔧 services/          # External service integrations
│   │   ├── auth.js           # Firebase authentication service
│   │   ├── bookmarks.js      # Bookmark management service
│   │   └── subscriptions.js  # User follow/following service
│   ├── 🗄️ stores/           # State management (Redux store)
│   │   ├── store.js          # Main Redux store configuration
│   │   └── index.css         # Global styles and CSS variables
│   ├── main.jsx              # Application entry point
│   └── routes.jsx            # React Router configuration
├── .env                      # Environment variables
├── .gitignore               # Git ignore rules
├── components.json          # Shadcn/ui component registry
├── eslint.config.js         # ESLint configuration
├── firebase.json            # Firebase project configuration
├── index.html               # Main HTML template
├── package.json             # Dependencies and scripts
└── vite.config.js           # Vite build configuration
```

## 🤝 Contributing

We welcome contributions from the developer community! Here's how you can help:

### Contribution Guidelines

1. **Fork the repository** and create your feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes** following our coding standards
   - Write clean, documented code
   - Follow existing code patterns

3. **Commit your changes** with conventional commit messages
   ```bash
   git commit -m "feat: add amazing new feature"
   ```

4. **Push to your branch** and create a Pull Request
   ```bash
   git push origin feature/amazing-feature
   ```

### Development Workflow

- **Issues**: Report bugs or request features through GitHub Issues
- **Pull Requests**: Submit PRs with clear descriptions and test coverage
- **Code Review**: All PRs require review before merging

## 👨‍💻 Author

**Himanshu Singh**  
*Full Stack AI/ML Developer | IIIT Una*

- 📧 **Email**: [himanshu.iiitu2027@gmail.com](mailto:himanshu.iiitu2027@gmail.com)
- 💼 **LinkedIn**: [Connect with me](www.linkedin.com/in/himanshu-singh23226)
- 🐙 **GitHub**: [@Himanshu0518](https://github.com/Himanshu0518)

---

**Built with ❤️ using React and Firebase**

---

*If you found this project helpful, please consider giving it a ⭐ on GitHub!*