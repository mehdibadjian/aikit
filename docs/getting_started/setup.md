# Setup & Installation

This project is built with Node.js and TypeScript, using `pnpm` as the package manager and `tsup` for rapid bundling.

## 1. Install Dependencies
Run the following command to install all the required modules:
```bash
pnpm install
```

## 2. Build the CLI
Before running the executable, you must bundle the TypeScript code down to a single `dist/index.js` file:
```bash
pnpm run build
```
