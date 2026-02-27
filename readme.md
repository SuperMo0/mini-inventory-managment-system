### install guide

1. Clone the repository.
2. **cd backend** and run **npm install**.
3. Inside the backend directory, create a .env file with DATABASE_URL="postgresql://user:password@localhost:5432/whms"
4. Inside the backend directory, create a .env.test file with DATABASE_URL="postgresql://user:password@localhost:5432/whms_test"
5. **cd ../frontend/mini_inventory** and run **npm install**.
6. Create a database with the name whms for development.
7. Create a database with the name whms_test for testing purposes.
8. **cd ../../backend** and run **npm run migrate_dev**.
9. in the backend directory, run **npm run dev**.
10. Open a second terminal window, **cd frontend/mini_inventory**, and run **npm run dev**.

### testing

1. Ensure the whms_test database is created.
2. Open a terminal in the backend directory and run **npm run test**.
