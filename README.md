# DAZN Movie APIs

## Requirements

```
NodeJS 18 and later
MongoDB
```

## Setup

Update the following values in `.env.development.local` and `.evn.test.local` file

```
PORT = 3000 // port on which you want to run the server

# DATABASE
DB_HOST = 127.0.0.1 // your local mongo host
DB_PORT = 27017 // your local mongo post
DB_DATABASE = movies // your local mongo database or create one called movies
```

## About the project

- All the API are written using Typescript
- The web server is written using ExpressJS
- For storage we are using MongoDB
- For test cases we are using Jest
- For linting and formatting we are using Biome
- For documentation we are using Swagger

## Getting started

In your terminal run

```
npm install
npm run dev
```

The database is automatically seeded with movies data using the file `src/database/seedData.json`

The `Add`, `Update` and `Delete` endpoints are only accessible to admins. Use the following token to invoke them. This token has `role: Admin`

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE3MDI4Mjk1NTksImV4cCI6MTczNDM2NTU1OSwiYXVkIjoiIiwic3ViIjoiIiwicm9sZSI6IkFkbWluIn0.fD2s37pPRLWgz6x3nG-780x8CC1Gxsw-OG-6aSYNuRI
```

If testing from postman, this needs to sent in the following format:
`Authorization: Bearer {token}`

If testing from swagger docs, set the token in the Authorize option available on top right corner

## API Documentation

Swagger docs can be found on path `http://localhost:3000/api-docs`

You can directly test the APIs from the docs

![Docs](docs.png)
