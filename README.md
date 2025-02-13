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
   - Copy `.env.example` to `.env`
   - Update API URL if needed (default: `https://localhost:44365/api`)

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or next available port)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
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

## Production Build

1. Update environment variables for production
2. Build the application:
```bash
npm run build
```
3. Deploy the contents of `dist/` to your hosting service

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

[Your License Here]
