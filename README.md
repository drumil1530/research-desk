# Research Desk

> A focused research workspace for turning a question into an organized collection of sources, notes, and conclusions.

**Project type:** Portfolio application
**Start date:** August 28, 2026
**Deadline:** September 14, 2026
**Primary objective:** Ship a complete, deployed application that demonstrates the ability to build a real full-stack product.

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
- Search research
- Filter research by status
- Write a final research summary
- Mark research as completed
- Authentication and user-owned data

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

The final **Summary** records the user's understanding once the research is complete.

## Development

Research Desk is intentionally scoped as a smaller project focused on shipping a complete product rather than building a sophisticated architecture.

The application uses Server Actions for mutations and server-side behavior where appropriate. User-owned resources are scoped to the authenticated user, and input validation is handled with Zod.

The project deliberately avoids unnecessary abstractions and infrastructure that are not required by the current product.

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

Create a `.env` file in the project root and copy `.env.example` into it.

Replace the placeholders with your local PostgreSQL credentials, authentication secret, and development server port.

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

Additional ideas may be explored after V1, but they are not part of the initial release.

## Project Status

Research Desk is currently under active development.

The V1 target is **September 14, 2026**.

The primary goal is to deliver a complete, usable, deployed application within the defined scope.

## License

This project is built as a portfolio application.
