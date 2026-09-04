# Research Desk

> A focused research workspace for turning a question into an organized collection of sources, notes, and conclusions.

## Overview

Research Desk helps users investigate a question or subject by collecting relevant sources, writing notes while researching, and recording their final understanding.

The core workflow is:
**Question → Sources → Notes → Summary**

Instead of simply collecting bookmarks, Research Desk is designed to represent the research process itself—from the initial question through the final conclusion.

## Features

- Create and manage research
- Collect sources used during research
- Organize sources by type
- Write and edit research notes
- Optionally associate notes with their source
- Search research and sources
- Filter research by status
- Write a final research summary
- Mark research as completed
- Authentication and user-owned data
- Responsive interface with loading, empty, and error states

## Tech Stack

- **Next.js** — application framework and App Router
- **React** — user interface
- **TypeScript** — type safety
- **PostgreSQL** — relational database
- **Prisma 7** — database access and ORM
- **Better Auth** — authentication
- **Zod** — input validation
- **Tailwind CSS** — styling
- **coss/ui** — UI components
- **Lucide** — icons

## Core Domain

Research Desk is intentionally built around a small domain:

```text
User
 │
 └── Research
       │
       ├── Source
       │
       └── Note
              │
              └── Source (optional)
```

A **Research** represents a question or subject being investigated.

A **Source** represents a resource used during that research, such as documentation, an article, video, repository, or paper.

A **Note** records something learned or observed during the investigation and may optionally reference the source it came from.

The **Summary** records the user's final understanding once the research is complete.

## Development

Research Desk is intentionally scoped as a small full-stack application focused on shipping a complete product rather than building a sophisticated architecture.

The application uses Server Actions for mutations and server-side behavior where appropriate. User-owned resources are scoped to the authenticated user, and input validation is handled with Zod.

The project deliberately avoids unnecessary abstractions and infrastructure that are not required by the product.

## Getting Started

### Prerequisites

- Node.js 24+
- pnpm
- PostgreSQL

### Installation

Clone the repository and install dependencies:

```bash
pnpm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Configure the required environment variables, then initialize the database:

```bash
pnpm prisma migrate dev
```

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Environment Variables

The application requires configuration for the PostgreSQL database and authentication.

Create a `.env` file in the project root by copying `.env.example`:

```bash
cp .env.example .env
```

Configure the required PostgreSQL credentials, authentication secret, and application settings.

## Screenshots

Screenshots will be added once the interface is finalized.

## Scope

Research Desk is intentionally a personal research application.

The V1 scope does not include:

- Teams or workspaces
- Collaboration
- Sharing or public research
- Roles or permissions
- AI research features
- Browser extensions
- Mobile applications
- Real-time collaboration
- Knowledge graphs
- File storage
- Social features

Additional ideas may be explored in the future, but they are not part of the current product.

## Project Status

Research Desk is a portfolio application built to demonstrate the ability to take a full-stack product from concept to a complete, deployed application.

The project is currently under active development, with the V1 release focused on completing the defined workflow, polishing the interface, and deploying the application.

## License

This project is built as a portfolio application.
