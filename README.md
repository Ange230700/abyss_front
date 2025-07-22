<!-- README.md -->

# Abyss_front

<!-- ![Project Logo](assets/logo.png) -->

**Abyss** is a modern furniture inventory and management platform developed using Angular and PrimeNG, designed to efficiently showcase furniture products, their details, availability, pricing, and administrative management. Users can browse furniture items, view detailed product information, manage inventory, and perform administrative tasks seamlessly.

## Table of Contents

<!-- * [Demo](#demo) -->

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
  <!-- * [License](#license) -->
  <!-- * [Acknowledgements](#acknowledgements) -->
  <!-- * [Contact](#contact) -->

<!-- ## Demo

Link to a live demo or screenshots:

![Screenshot](assets/demo-screenshot.png) -->

## Tech Stack

**Frontend:**

- Angular 20
- TailwindCSS
- PrimeNG (UI components)

**Backend:**

- Node.js
- Express

**Database:**

- MySQL

**Tools:**

- Git
- Husky (Git hooks)
- Commitizen (commit message standardization)
- ESLint and Prettier (code formatting and linting)

## Getting Started

### Prerequisites

- Node.js (>=20.x)
- MySQL database
- Docker (optional for containerization)

### Installation

```bash
git clone https://github.com/Ange230700/abyss_front.git
cd abyss-front
npm install
```

## Running the Project

Start the frontend Angular app:

```bash
npm start
```

Ensure backend API server is running separately at the configured URL.

## Project Structure

```
abyss-front
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── footer
│   │   │   ├── header
│   │   │   └── navbar
│   │   ├── models
│   │   ├── pages
│   │   │   ├── furniture-details
│   │   │   ├── furniture-management
│   │   │   └── home-page
│   │   ├── services
│   │   ├── utils
│   │   └── app.routes.ts
│   ├── environments
│   ├── styles
│   ├── assets
│   └── main.ts
├── public
├── package.json
├── angular.json
├── tsconfig.json
└── README.md
```

## API Documentation

The backend API documentation will be available soon at:

- [Backend API Documentation](https://abyss-back.onrender.com/docs)

## Testing

Run unit and integration tests:

```bash
npm test
```

Continuous Integration tests:

```bash
npm run test:ci
```

## Deployment

Deployment scripts and instructions will be provided soon. Project setup supports deployment platforms such as Render, Vercel, or custom VPS.

## Environment Variables

Define these environment variables in your environment files:

```env
API_BASE_URL=https://abyss-back.onrender.com
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feat/new-feature` or `git checkout -b fix/issue-description`)
3. Commit changes (`npm run commit` for standardized commit messages)
4. Push the branch (`git push origin feat/new-feature`)
5. Create a Pull Request

<!-- ## License

MIT License

## Acknowledgements

Special thanks to the following libraries and frameworks:

* [Angular](https://angular.io/)
* [PrimeNG](https://primeng.org/)
* [TailwindCSS](https://tailwindcss.com/)

## Contact

Ange-Eric-Stephane KOUAKOU - [your.email@example.com](mailto:your.email@example.com) -->

[Project Link](https://github.com/Ange230700/abyss-front)
