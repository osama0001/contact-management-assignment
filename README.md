# Contact Management Dashboard

A contact management application built with Angular 22, using signal-based architecture, `httpResource` for reactive data fetching, and the `@Service` decorator.

---

## Requirements

| Tool        | Version |
| ----------- | ------- |
| Node.js     | `22.x`  |
| npm         | `11.x`  |
| Angular CLI | `22.x`  |
| TypeScript  | `6.x`   |

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd contact-management-assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The app will be available at `http://localhost:4200`

---

## Available Scripts

| Script          | Description                         |
| --------------- | ----------------------------------- |
| `npm start`     | Start the development server        |
| `npm run build` | Build the app for production        |
| `npm run watch` | Build in watch mode for development |
| `npm test`      | Run unit tests with Vitest          |

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── contact-dashboard/     # Smart container component
│   │   ├── contact-list/          # Dumb component — renders contact list
│   │   └── contact-detail/        # Dumb component — renders selected contact
│   ├── services/
│   │   └── contacts.service.ts    # All API calls and shared signal state
│   └── types/
│       ├── contact.model.ts       # DTOs and domain interfaces
│       └── contact.mapper.ts      # DTO → domain model transformations
├── styles.scss                    # Global styles and Material Icons import
```

---

## API Endpoints

| Method | Endpoint                        | Description                             |
| ------ | ------------------------------- | --------------------------------------- |
| `GET`  | `/contacts`                     | Returns all contacts                    |
| `GET`  | `/contacts/:id`                 | Returns a single contact's full details |
| `GET`  | `/contacts/:id/email_addresses` | Returns email addresses for a contact   |

Base URL: `https://6a2da49a2edd4cb330d1567b.mockapi.io/api`

---

## Angular 22 Features Used

- **`@Service()`** — replaces `@Injectable({ providedIn: 'root' })`, root singleton by default
- **`httpResource()`** — stable signal-native HTTP fetching with built-in loading/error state
- **`input()`** — signal-based component inputs replacing `@Input()`
- **`output()`** — signal-based outputs replacing `@Output()`
- **`signal()`** — local reactive state
- **`computed()`** — derived state that reacts automatically to signal changes
- **`inject()`** — functional dependency injection replacing constructor injection
- **`@for / @if / @empty`** — built-in control flow replacing `*ngFor` / `*ngIf`
- **OnPush by default** — all new components use OnPush change detection automatically

---

## Testing

Tests are written with **Vitest**. Run them with:

```bash
npm test
```

---

## Notes

- Material Icons are installed via the `material-icons` npm package and imported globally in `styles.scss`
- Sass `@use` is used instead of the deprecated `@import`
- Status field from the API is a boolean — `true` maps to `online`, `false` maps to `offline`
- Email addresses are fetched from a separate endpoint and merged in the detail view
