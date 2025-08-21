# FHC Frontend

A React + TypeScript + Vite project with comprehensive tooling setup.

## 🛠️ Tools & Configuration

This project is configured with:

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling
- **ESLint** + **Prettier** for code formatting
- **Stylelint** for CSS linting (with Tailwind support)
- **Commitlint** + **Commitizen** for conventional commits
- **Husky** for Git hooks
- **Lint-staged** for pre-commit linting
- **Cypress** for E2E testing

## 🚀 Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm lint:css` - Run Stylelint on CSS files
- `pnpm lint:css:fix` - Fix Stylelint issues
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm commit` - Use Commitizen for conventional commits
- `pnpm test:e2e` - Run Cypress E2E tests
- `pnpm test:e2e:open` - Open Cypress test runner

## 🎯 Git Workflow

This project uses conventional commits with automated validation:

1. Stage your changes: `git add .`
2. Commit using Commitizen: `pnpm commit`
3. Or commit manually following conventional format: `git commit -m "feat: add new feature"`

Pre-commit hooks will automatically:

- Lint and fix JavaScript/TypeScript files
- Lint and fix CSS files
- Format all files with Prettier

## 🧪 Testing

Run E2E tests with Cypress:

```bash
# Run tests headlessly
pnpm test:e2e

# Open Cypress test runner
pnpm test:e2e:open
```

## 🎨 Styling

This project uses Tailwind CSS. The configuration is in `tailwind.config.js` and the base styles are imported in `src/index.css`.

## 📋 Code Quality

- **ESLint**: Configured for React + TypeScript
- **Prettier**: Consistent code formatting
- **Stylelint**: CSS linting with Tailwind support
- **Commitlint**: Enforces conventional commit messages
- **Husky**: Git hooks for automated quality checks
