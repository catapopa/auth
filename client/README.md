# Client (Angular Frontend)

Modern Angular app with NgRx state management and PrimeNG components.

## 🚀 Quick Start

Use the root scripts instead:

```bash
cd ..
./start-docker.sh    # or ./start-local.sh
```

Or run manually:

```bash
npm install
npm start
```

## 📚 Scripts

```bash
ng serve    # Development server (http://localhost:4200)
ng build    # Build for production
ng test     # Unit tests
ng lint     # ESLint
```

## 🎨 Features

- **Authentication**: Login/logout with JWT
- **User Management**: CRUD operations (admin only)
- **Responsive UI**: PrimeNG components
- **State Management**: NgRx for app state

1. Login with email/password
2. JWT token stored in localStorage
3. Automatic token refresh
4. Route guards protect authenticated areas
5. Role-based access control (Admin/User)
