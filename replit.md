# Zyberian IT Services Corporate Website

## Overview

This is a professional corporate website for Zyberian, an IT services company based in London. The application is built as a full-stack web application using modern React and Express.js architecture. The website showcases the company's services, displays client testimonials, manages job postings for careers, and provides a contact form for potential clients. The design follows a modern, minimal corporate aesthetic with British Racing Green (#004225) as the primary brand color.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **UI Components**: Radix UI primitives with custom shadcn/ui components for consistent design
- **Styling**: Tailwind CSS with custom CSS variables for theming and brand colors
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **State Management**: TanStack Query (React Query) for server state management
- **Animations**: CSS-based animations with Intersection Observer API for scroll-triggered effects

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript throughout the entire stack
- **API Design**: RESTful API endpoints under `/api` namespace
- **Request Handling**: Express middleware for JSON parsing, URL encoding, and request logging
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Development**: Hot module replacement via Vite middleware integration

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL configured via Drizzle with Neon serverless driver
- **Schema Management**: Shared schema definitions between client and server
- **Validation**: Zod schemas for runtime type validation on both ends
- **Development Storage**: In-memory storage implementation with seeded data for development

### API Structure
- **Jobs Management**: 
  - GET `/api/jobs` - Retrieve active job listings
  - POST `/api/jobs` - Create new job posting (admin)
  - PUT `/api/jobs/:id` - Update existing job posting (admin)
  - DELETE `/api/jobs/:id` - Remove job posting (admin)
- **Contact Form**: POST `/api/contact` - Submit contact form data
- **Data Models**: Jobs, Users, and Contact Submissions with proper TypeScript interfaces

### Authentication and Authorization
- Currently implements basic structure for user management with username/password fields
- Session-based authentication setup (connect-pg-simple for session store)
- Admin endpoints protected (basic implementation in place)
- Ready for expansion to full authentication system

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
- **Replit Integration**: Development environment integration and runtime error handling

### Utility Libraries
- **date-fns**: Modern date utility library
- **clsx & class-variance-authority**: Conditional class name utilities
- **cmdk**: Command palette component library
- **Embla Carousel**: Lightweight carousel library