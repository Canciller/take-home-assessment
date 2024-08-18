# Take-Home Assessment

See here [https://take-home-assessment-sandy.vercel.app](https://take-home-assessment-sandy.vercel.app/)

## Why I Chose This Tech Stack

- **Next.js**: I have experience with this framework and wanted to explore some of its recent APIs for routing, such as parallel routes and intercepting routes for modals.
- **TailwindCSS**: I have experience with this and like how quickly you can style components.
- **shadcn**: I have experience with this library. It integrates with TailwindCSS, and I like how the components look and how easily they can be customized.
- **MongoDB**: I have experience with this database, and its simplicity fits well with this project.
- **Google Cloud Storage**: I like the API that GCS provides for Node.js, and I have used it before in a personal project.
- **Docker**: It simplifies setting up a local development environment, avoiding the need to download binaries manually.

## Requirements

- Node.js (Tested on v20.11.1)
- Docker

## How to Run the Project Locally

1. Copy `.env.example` to `.env.local` and leave it as is:
   
   ```bash
   cp .env.example .env.local
   ```

2. Install dependendies:

   ```bash
   npm install
   ```

3. Run Docker containers in detached mode:

   ```bash
   docker compose up -d
   ```
   This will run the MongoDB and fake Google Cloud Storage containers for testing the API locally.

4. Run the Next.js project:

   ```bash
   npm run dev
   ```

5. Preview the project at [http://localhost:3000](http://localhost:3000)
