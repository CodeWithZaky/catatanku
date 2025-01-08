## Getting Started

### Environment Variables
To run this project, you will need to add the following environment variables to your .env file

```bash
DATABASE_URL="postgresql://postgres:<DB-PASSWORD>@localhost:<DB-PORT>/<DB-NAME>"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="EXAMPLEa8s9c4eKgiEyTGL419dIGPE8ETDIybXsKwOQr7xoS9M03z"
```

### Clone the repository and install dependencies:

Clone the project
```bash
git clone https://github.com/CodeWithZaky/catatanku.git
```
Go to the project directory
```bash
cd catatanku
```
Install dependencies
```bash
pnpm install
```
Apply migrations to database
```bash
pnpm run db:generate
```
Start the server
```bash
pnpm run dev
```
### Available Scripts

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "db:generate": "prisma migrate dev",
  "db:migrate": "prisma migrate deploy",
  "db:push": "prisma db push",
  "db:studio": "prisma studio",
  "postinstall": "prisma generate"
},
```

- `dev`: Start the development server.
- `build`: Build the application for production.
- `start`: Start the production server.
- `lint`: Run ESLint.
- `db:generate`: Generate Prisma migrations.
- `db:migrate`: Deploy Prisma migrations.
- `db:push`: Push Prisma schema state to the database.
- `db:studio`: Open Prisma Studio for database management.

### Technologies

- **Frontend**: Next.js, Tailwind CSS, Radix UI
- **Backend**: Prisma, tRPC, NextAuth.js
- **Utilities**: TypeScript, ESLint, Prettier

### Package Manager

- **pnpm**: ^9.6.0
