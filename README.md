# Amble

## About

A link aggregator, forum and chat app.

## Setup

1. Install dependencies:
   1. NodeJS
   2. Yarn
   3. Docker
   4. Docker Compose
2. Ensure docker is running.
3. Clone the repo.
4. In the root directory, run:

   1. `yarn install`
   2. `yarn dev:services`

      This will download and start up local Docker containers containing Postgres and Redis instances.

      When the command stabilizes and you see that both instances are ready to receive connections, go ahead and ctrl-c out.

   3. `yarn dev`

      This will spin up everything needed for local development of Amble. It's really just an alias for the following commands all running in parallel:

      1. `yarn dev:server`

         Start the NodeJS server found in the `server` directory. The server will host the NextJS app found in the `client` directory.

         The server depends on the docker container instances created by `yarn dev:services`.

      2. `yarn dev:services`

         Start up Postgres and Redis in Docker containers exposed to the host on their standard port numbers.

      3. `yarn dev:codegen`

         Watch for changes in TypeScript files and generate these files when there is an update:

         1. `common/generated/schema.graphql`

            The server's graphql schema. The server uses `type-graphql` so the schema is defined and generated from classes in the server's TypeScript code.

         2. `client/generated/graphql.tsx`

            Types generated from the server's graphql schema and associated TypeScript code found in the `client` directory. Any gql\`...\` fragment in code will have an associated type generated in this file.
