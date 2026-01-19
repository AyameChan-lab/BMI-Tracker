# Project Tasks: BMI Web Application

## Phase 1: Project Initialization & Infrastructure

- [x] **Setup Next.js Project**
  - Initialize Next.js app (App Router, TypeScript).
  - Configure Tailwind CSS.
  - Setup project structure (components, lib, types).
- [x] **Database Setup**
  - Install Prisma ORM (or Drizzle) and SQLite driver.
  - Initialize ORM configuration.

## Phase 2: Database Modeling

- [x] **Design Schema**
  - Define `User` model (id, username, password, display_name, etc.).
  - Define `BMIRecord` model (id, user_id, weight, height, bmi, result, date).
- [x] **Migration**
  - Generate and run initial migration to create SQLite database.

## Phase 3: Authentication (User Management)

- [x] **Backend Auth Logic**
  - [x] Setup NextAuth.js (Auth.js) or custom JWT handling.
  - [x] Implement Registration API (hashing passwords).
- [x] **Frontend Auth Pages**
  - [x] Create Register Page.
  - [x] Create Login Page.
  - [x] Implement Logout functionality.
  - [x] Add Route Protection (Middleware) for private pages.

## Phase 4: Core Feature - BMI Tracking

- [x] **BMI Calculator Component**
  - [x] Create input form (Weight, Height).
  - [x] Implement calculation logic `BMI = kg / m^2`.
  - [x] Display result and health status interpretation.
- [x] **Data Persistence**
  - [x] Implement API Route to save BMI record.
  - [x] Connect Frontend form to Save API.
- [x] **History View**
  - [x] Create API to fetch user's BMI history.
  - [x] Display history list (Table view).

## Phase 5: MIS Reports (Dashboard)

- [x] **Report APIs**
  - [x] Implement aggregations for Daily, Weekly, Monthly, Yearly data.
- [x] **Dashboard Visualization**
  - [x] Install Chart library (e.g., Recharts, Chart.js).
  - [x] **Daily Report**: Show records for specific days.
  - [x] **Weekly/Monthly Trends**: Display Line/Bar charts of BMI changes.
  - [x] **Yearly Overview**: Summary stats.

## Phase 6: Refinement & Delivery

- [x] **UI/UX Polish**
  - [x] Improve responsive design (Mobile first).
  - [x] Add loading states and error handling.
- [ ] **Testing**
  - Verify User Flow (Register -> Login -> Record -> View Reports).
  - Validate calculation accuracy.
