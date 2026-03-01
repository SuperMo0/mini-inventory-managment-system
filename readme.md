### install guide

1. Clone the repository.
2. Create a postgres database for development.
3. **cd backend** and run **npm install**.
4. Inside the backend directory, create a .env file with your own database url as  DATABASE_URL="postgresql://user:password@localhost:5432/whms"
5. Inside the backend directory run **npm run migrate_dev**.
6. in the backend directory run **npm run generate**
7. in the backend directory, run **npm run dev**.
8. Open a second terminal, **cd frontend/mini_inventory**, **run npm install** and then **npm run dev**.



