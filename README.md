# Game Level Management Portal

A Vue 3 + TypeScript application for managing game levels. This portal provides an interface for creating, editing, and managing game level configurations.

## Technology Stack

- **Frontend Framework**: Vue 3
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Pinia
- **Styling**: Bootstrap 5
- **HTTP Client**: Axios
- **Router**: Vue Router

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Backend API running on `https://localhost:44365`

## Project Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd Game.Level.Management.Portal
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.dev.example` to `.env.dev` for development
   - Copy `.env.prod.example` to `.env.prod` for production
   - Update API URLs as needed

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or next available port)

### Available Scripts

- `npm run dev` - Start development server with dev environment
- `npm run build:dev` - Build for development environment
- `npm run build:prod` - Build for production environment
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── Api/                    # API client implementations
│   └── GameLevelAPI.ts    # Game level API methods
├── assets/                # Static assets
├── components/            # Shared components
├── pages/                 # Page components
│   ├── game-level/       # Game level management
│   ├── adjust-game-level/# Level editor
│   └── demo/             # Demo page
├── router/               # Route configurations
├── stores/               # Pinia stores
│   ├── gameLevelStore.ts # Game level state management
│   ├── loadingStore.ts   # Loading state management
│   └── errorMsgStore.ts  # Error handling store
└── utils/                # Utility functions
    └── axiosInstance.ts  # Axios configuration
```

## Environment Configuration

The project uses different environment files for development and production:

### Development
```env
# .env.dev
VITE_API_BASE_URL=https://localhost:44365/api
```

### Production
```env
# .env.prod
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

## Build and Deployment

### Development Build

1. Ensure `.env.dev` is configured correctly
2. Run the development build:
```bash
npm run build:dev
```

### Production Build

1. Ensure `.env.prod` is configured correctly
2. Build the application:
```bash
npm run build:prod
```

### GitHub Pages Deployment

The project is configured for GitHub Pages deployment:

1. The base URL is configured in `vite.config.ts`:
```typescript
base: mode === 'prod'
  ? "/Game.Level.Management.Portal/"
  : "/",
```

2. Deploy to GitHub Pages using:
```bash
npm run deploy
```

This script will:
- Build the production version
- Copy `index.html` to `404.html` for SPA routing
- Deploy to the `gh-pages` branch

### Other Deployment Options

The `dist/` directory can be deployed to various platforms:
- Nginx
- Apache
- Azure Static Web Apps
- AWS S3 + CloudFront
- Netlify
- Vercel

## Development Guidelines

1. **TypeScript**
   - Maintain strict typing
   - Use interfaces for API responses
   - Avoid `any` types

2. **State Management**
   - Use Pinia stores for global state
   - Keep component state local when possible
   - Handle loading and error states globally

3. **Components**
   - Use composition API with `<script setup>`
   - Keep components focused and reusable
   - Document complex component props

4. **Error Handling**
   - Use global error store for API errors
   - Provide user-friendly error messages
   - Log errors appropriately

5. **Code Style**
   - Follow ESLint configuration
   - Use Prettier for formatting
   - Write meaningful commit messages

## IDE Setup

Recommended setup for VS Code:

1. Install extensions:
   - Vue - Official (Vue Language Features)
   - ESLint
   - Prettier

2. Disable Vetur if installed

3. Configure workspace settings:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Features

- Game level management (CRUD operations)
- Real-time level editing
- Error handling with user feedback
- Loading state management
- Responsive design with Bootstrap

## API Integration

The application integrates with a .NET backend API. Key endpoints:

- `GET /gamelevels` - Fetch all levels
- `GET /gamelevels/{id}` - Fetch specific level
- `POST /gamelevels` - Create new level
- `PUT /gamelevels/{id}` - Update level
- `DELETE /gamelevels/{id}` - Delete level

## Development Guidelines

1. **TypeScript**
   - Maintain strict typing
   - Use interfaces for API responses
   - Avoid `any` types

2. **State Management**
   - Use Pinia stores for global state
   - Keep component state local when possible
   - Handle loading and error states globally

3. **Components**
   - Use composition API with `<script setup>`
   - Keep components focused and reusable
   - Document complex component props

4. **Error Handling**
   - Use global error store for API errors
   - Provide user-friendly error messages
   - Log errors appropriately

5. **Code Style**
   - Follow ESLint configuration
   - Use Prettier for formatting
   - Write meaningful commit messages

## IDE Setup

Recommended setup for VS Code:

1. Install extensions:
   - Vue - Official (Vue Language Features)
   - ESLint
   - Prettier

2. Disable Vetur if installed

3. Configure workspace settings:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Run tests and linting
4. Submit a pull request to `develop`

## License

MIT License

Copyright (c) 2024 [Your Name/Organization]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
