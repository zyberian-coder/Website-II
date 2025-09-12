# Zyberian Corporate Website & Admin Portal

This repository contains the complete source code for the Zyberian corporate website. It is a modern, full-stack application built with React, Node.js, and a serverless Postgres database.

The platform is designed to be a high-performance digital presence that showcases the company's services, attracts top talent through a dynamic careers portal, and captures new business leads.

---

## 1. Key Features

- **Professional Services Showcase:** Detailed pages for core service offerings (Cloud Engineering, Data & AI, Cyber Security, etc.).
- **Dynamic Careers Portal:** A full-featured careers page with the ability to list job vacancies. Candidates can apply directly by uploading their resumes.
- **Client Lead Generation:** A comprehensive contact form for project inquiries.
- **Instant Email Notifications:** The system automatically sends an email notification to a designated company address the moment a new client inquiry or job application is submitted.
- **Secure Admin Dashboard:** A password-protected administrative area for staff to manage job listings and view all form submissions in one place.
- **Modern & Responsive Design:** The website is fully responsive, providing an optimal viewing experience on all devices.

---

## 2. Technology Stack

- **Frontend (User Interface):**
  - **React & TypeScript:** For a fast, robust, and maintainable user interface.
  - **Vite:** Next-generation build tool for rapid development and optimized production builds.
  - **Tailwind CSS:** For a custom, utility-first design system.
  - **Forms**: React Hook Form with Zod validation for type-safe form handling
  - **Animations**: CSS-based animations with Intersection Observer API for scroll-triggered effects

- **Backend (Server-Side Logic):**
  - **Node.js & Express:** A fast and efficient backend runtime and framework.
  - **TypeScript:** Ensures type safety and code quality across the stack.
  - **Request Handling**: Express middleware for JSON parsing, URL encoding, and request logging
  - **Error Handling**: Centralized error handling middleware with proper HTTP status codes
  - **Development**: Hot module replacement via Vite middleware integration

-  **Data Storage Solutions**
   - **ORM**: Drizzle ORM for type-safe database operations
   - **Database**: PostgreSQL configured via Drizzle with Neon serverless driver
   - **Schema Management**: Shared schema definitions between client and server
   - **Validation**: Zod schemas for runtime type validation on both ends
   - **Development Storage**: In-memory storage implementation with seeded data for development

---

## External Dependencies

### UI and Design
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Modern icon library with consistent styling
- **Google Fonts**: Inter font family for clean, professional typography

### Form Handling and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **Hookform Resolvers**: Integration between React Hook Form and Zod

### Data Fetching and State
- **TanStack Query**: Powerful data synchronization for server state
- **Drizzle ORM**: Modern TypeScript ORM with excellent type inference
- **Neon Database**: Serverless PostgreSQL database platform

### Development and Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking throughout the application
- **ESBuild**: Fast JavaScript bundler for production builds


## 3. Setup and Installation

Follow these instructions to set up and run the project on a local machine for development.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v18 or later recommended)
- [pnpm](https://pnpm.io/installation) (or npm/yarn)

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd <repository-folder>
```

### Step 2: Install Dependencies

```bash
pnpm install
# or npm install
```

### Step 3: Set Up Environment Variables

Create a file named `.env` in the root of the project folder. This file will store all necessary credentials and configuration secrets.

Copy the contents of `.env.example` into your new `.env` file and fill in the required values.

### Step 4: Sync the Database Schema

Run the following command to push the schema defined in the code to your Neon database. This will create all the necessary tables.

```bash
pnpm run db:push
# or npm run db:push
```

### Step 5: Seed the Database with Admin User

Run the following command to create the initial admin user in the database. It will use the `ADMIN_USERNAME` and `ADMIN_PASSWORD` from your `.env` file.

```bash
pnpm run db:seed
# or npm run db:seed
```

### Step 6: Run the Development Server

Start the application. This will launch the website on `http://localhost:5173`.

```bash
pnpm run dev
# or npm run dev
```

The website and backend server will now be running. The admin dashboard can be accessed at `/admin`.

---

## 4. Deployment

This application is configured to be deployed on any platform that supports Node.js.

- **Build Command:** `npm run build`
- **Start Command:** `npm start`

When deploying, you must set the same environment variables (`DATABASE_URL`, `SESSION_SECRET`, etc.) in your hosting provider's settings panel. You will also need to run the `db:push` and `db:seed` commands once after the initial deployment.

---

## 5. Available Scripts

- `pnpm run dev`: Starts the development server with hot-reloading.
- `pnpm run build`: Compiles the frontend and backend for production.
- `pnpm start`: Runs the production-ready server (requires `build` to be run first).
- `pnpm run db:push`: Pushes the current Drizzle schema to the database.
- `pnpm run db:seed`: Creates the initial admin user in the database.
- `pnpm run db:studio`: Opens Drizzle Studio, a GUI to view and manage your database.
