# Dashboard Frontend

Angular 21 dashboard frontend with authentication screens (login, register, reset password), token-based API access, and a starter dashboard page.

## Stack

- Angular `21.1.x` (standalone components + router)
- Angular SSR (server files included)
- PrimeNG + PrimeUIX themes
- Tailwind CSS (via PostCSS)
- `ngx-cookie-service` for auth token persistence in cookies
- RxJS + Angular `HttpClient`

## Project Structure

```text
src/
  app/
    app.ts
    app.html
    app.config.ts
    app.routes.ts
    auth/
      auth.ts
      login/
      register/
      forget-password/
      dashboard/
      Vaildtors/
    intercetor/
      auth-interceptor.ts
    service/
      api.ts
      auth.ts
      token-service.ts
      toast.ts
    types/
      Login.ts
      LoginResponse.ts
      Register.ts
      RegisterResponse.ts
  environments/
    environment.ts
    environment.development.ts
```

## Routes

Defined in `src/app/app.routes.ts`:

- `/` -> redirects to `/auth`
- `/auth` -> auth layout
- `/auth/login` -> login page
- `/auth/register` -> register page
- `/auth/forget-password` -> reset password page
- `/dashboard` -> dashboard page

## Authentication Flow

- Login and register pages call backend endpoints through `Api` service (`src/app/service/api.ts`).
- On successful auth, token is saved via `TokenService` in browser cookies.
- `authInterceptor` (`src/app/intercetor/auth-interceptor.ts`) reads token cookie and adds:
  - `Authorization: Bearer <token>`
- User-related data is stored in `localStorage` by `Auth` service (`src/app/service/auth.ts`).

## API and Environments

Base URL comes from `src/environments/*`:

- `environment.ts`
- `environment.development.ts`

Current value in both files:

```ts
apiUrl: 'http://127.0.0.1:8000';
```

Update these files to match your backend host.

## Scripts

From `package.json`:

- `npm start` -> run dev server (`ng serve`)
- `npm run build` -> production build
- `npm run watch` -> build in watch mode (development config)
- `npm test` -> unit tests
- `npm run serve:ssr:dashboard` -> run built SSR server (`dist/dashboard/server/server.mjs`)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure backend URL in `src/environments/environment*.ts`.

3. Start development server:

```bash
npm start
```

4. Open:

`http://localhost:4200`

## Docker

Project includes a `Dockerfile` that:

- Uses `node:20`
- Installs dependencies
- Exposes port `4200`
- Runs `npm start`

Build and run:

```bash
docker build -t dashboard-frontend .
docker run --rm -p 4200:4200 dashboard-frontend
```

## Notes and Current Gaps

- `Auth` service navigates to `/welcome`, but route is not defined yet.
- No route guard currently protects `/dashboard`.
- Directory names include typos kept as-is for now (`intercetor`, `Vaildtors`).
- Dashboard page is currently a placeholder.

## Testing

Run tests with:

```bash
npm test
```
