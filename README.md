# Regula

A compliance monitoring engine that ingests trade/position data, applies configurable rules, and flags regulatory breaches.  

## Repositories
**Frontend**

regula-fe-react (https://github.com/theutkarshsoni/regula-fe-react)

**Backend**

regula-be (https://github.com/theutkarshsoni/regula-be)

## Use Case
Regula helps financial institutions ensure regulatory compliance by:  
- Uploading datasets of trades/positions
- Defining rules (e.g., issuer concentration, asset class exposure, large trade limits)
- Running those rules to automatically detect breaches
- Tracking breaches through their lifecycle with audit logs
- Reviewing KPIs and charts for overall exposure and breach trends

This mirrors real-world compliance monitoring similar to what regulators and risk SaaS providers require.  

## Tech Stack
- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **UI Library**: Material UI (MUI)
- **Forms & Validation**: React Hook Form + Zod
- **Data Fetching & Caching**: React Query (TanStack Query)
- **Tables**: TanStack Table with server-side pagination & filters
- **Charts**: Recharts (exposure and breach trends)
- **Routing**: React Router v6
- **State Management**: Zustand (lightweight store for UI state)
- **CSV Handling**: Papa Parse (client-side preview & validation)
- **Testing (later)**: Vitest + React Testing Library, Cypress (e2e)

## Milestones
1. Project scaffold + health check  
2. Database setup & migrations  
3. Datasets & CSV upload  
4. Rules CRUD  
5. Rule execution (concentration, exposure, large trade)  
6. Breach management & audit log  
7. Validation, auth & polish  
8. Search & Analytics (Elasticsearch integration) 

# 🚀 Design Decisions in Practice

## Handling Auth Flow: Protected vs AppLayout

- At first, I wrapped `<AppLayout>` around the routes and placed `<Protected>` inside.  
- This caused the **sidebar and topbar to render even when the user wasn’t authenticated**, leading to confusing redirects and blank states.  
- I used `console.log` inside the components to trace where the flow broke and confirmed the auth check was happening *after* the shell was already rendered.  
- After some debugging, I flipped the structure:  
  ```tsx
  <Route element={<Protected />}>
    <Route element={<AppLayout />}>
      {/* protected routes */}
    </Route>
  </Route>

---
