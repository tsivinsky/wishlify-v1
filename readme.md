# Wishlify

## Docs for each part of Wishlify

### [Web App](./web/readme.md)

### [Backend](./server/readme.md)

## How to run in development

### Backend

```bash
make dev
```

### Web App

```bash
cd web && npm run dev
```

## How to run in production

```bash
make up
```

This will start both the backend and frontend.

## Environment

### Backend

Add these in root `.env` file

```bash
POSTGRES_USER=someuser
POSTGRES_PASSWORD=someuser_password
POSTGRES_DB=somedbname

DATABASE_HOST=db                    # variable for backend to connect to database (in development name of postgres docker service)
JWT_SECRET=topsecret                # secret string for signing jwt tokens
APP_HOST=localhost                  # variable for backend to use as domain for authentication cookies
WEB_URL=http://localhost:3000       # url where frontend is running
APP_URL=http://localhost:5000       # full url where backend is running

EMAIL_USER="email user"
EMAIL_PASSWORD="password for this user"
EMAIL_HOST="email service host"
EMAIL_PORT="email service port"
```

### Web App

Add these in `.env` file inside `web` directory

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000           # url for app to connect to backend
```
