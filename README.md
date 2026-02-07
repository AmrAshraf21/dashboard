# Admin Dashboard - Angular Application

## Overview

A responsive admin dashboard built with Angular 18, featuring analytics cards, interactive charts, and a recent orders table. The application follows Angular best practices with modular architecture, lazy loading, and clean code structure.

## Features

- ✅ Responsive sidebar navigation with collapsible functionality
- ✅ Top navbar with user profile and notifications
- ✅ Analytics cards showing key metrics (Revenue, Sales, Active Users)
- ✅ Interactive line and bar charts using ApexCharts
- ✅ Recent orders table with pagination
- ✅ Routing and lazy loading
- ✅ Mock data services with error handling
- ✅ Angular Material + Tailwind CSS styling
- ✅ TypeScript strict mode
- ✅ Unit tests included
- ✅ Responsive design for mobile, tablet, and desktop

## Tech Stack

- Angular 18+ 
- TypeScript 5+
- Angular Material
- Tailwind CSS
- ApexCharts (ng-apexcharts)
- RxJS for reactive programming
- Jasmine & Karma for testing

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd admin-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   ng serve
   ```

   Navigate to `http://localhost:4200/`

4. **Run tests**

   ```bash
   ng test
   ```

5. **Build for production**
   ```bash
   ng build --configuration production
   ```

## Project Structure

```
src/
├── app/
│   ├── core/                    # Core module (singleton services, guards)
│   │   ├── services/            # Global services
│   │   │   ├── analytics.service.ts
│   │   │   ├── orders.service.ts
│   │   │   
│   │   ├── models/              # TypeScript interfaces
│   │   │   ├── analytics.model.ts
│   │   │   ├── order.model.ts
│   │   │   └── user.model.ts
│   │         
│   │             
│   │
│   ├── shared/                  # Shared module (reusable components)
│   │   ├── components/
│   │   │   ├── sidebar/
│   │   │   ├── navbar/
│   │   │   ├── analytics-card/
│   │   │   ├── chart-card/
│   │   │   
│   │   └── shared.module.ts
│   │
│   ├── features/                # Feature modules (lazy loaded)
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── dashboard-main/
│   │   │   │   ├── analytics-section/
│   │   │   │   ├── reports-chart/
│   │   │   │   ├── visits-chart/
│   │   │   │   └── recent-orders/
│   │   │   ├── dashboard-routing.module.ts
│   │   │   └── dashboard.module.ts
│   │   │
│   │   ├── orders/
│   │   │   ├── components/
│   │   │   │   ├── orders-list/
│   │   │   │   └── order-detail/
│   │   │   ├── orders-routing.module.ts
│   │   │   └── orders.module.ts
│   │   │
│   │   
│   │       
│   │       
│   │       
│   │
│   ├── layout/                  # Layout components
│   │   └── main-layout/
│   │
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
│
├── assets/                      # Static assets
│   ├── images/
│   └── icons/
│
├── environments/                # Environment configurations
│   ├── environment.ts
│   └── environment.prod.ts
│
└── styles/                      # Global styles
    ├── styles.scss
    └── _variables.scss
```

## Architecture Decisions

### 1. **Modular Architecture**

- **Core Module**: Contains singleton services, models, and guards (imported once in AppModule)
- **Shared Module**: Reusable components, directives, and pipes (imported in feature modules)
- **Feature Modules**: Lazy-loaded modules for dashboard, orders, etc.

### 2. **Lazy Loading**

- Feature modules are lazy-loaded to improve initial load time
- Only the dashboard is loaded initially; other routes load on demand

### 3. **State Management**

- Services use BehaviorSubject for reactive state management
- RxJS operators for data transformation and error handling


### 4. **Styling Approach**

- **Angular Material**: Used for consistent UI components (tables, buttons, cards)
- **Tailwind CSS**: Used for utility-first responsive styling
- **SCSS**: For custom component styles and theming

### 5. **Data Handling**

- Mock data services simulate API calls with delay
- Error handling with try-catch and RxJS catchError
- Loading states for better UX

### 6. **Charting Library**

- **ng-apexcharts**: Chosen for its rich features, interactivity, and Angular integration
- Responsive and interactive charts with tooltips and legends

## Key Features Implementation

### Analytics Cards

- Reusable `AnalyticsCardComponent`
- Props: title, value, change percentage, icon
- Responsive grid layout

### Charts

- **Line Chart**: Shows revenue trends over time (daily/weekly/monthly)
- **Bar Chart**: Displays visit statistics
- Both charts are interactive with tooltips and responsive sizing

### Recent Orders Table

- Angular Material table with sorting
- Pagination for large datasets
- Status badges with color coding
- Click to navigate to order details

### Responsive Sidebar

- Collapsible on mobile devices (<768px)
- Smooth animations
- Active route highlighting

## API Integration

Currently using mock data. To integrate a real API:

1. Update `environment.ts`:

   ```typescript
   export const environment = {
     production: false,
     apiUrl: "https://your-api.com/api",
   };
   ```

2. Update services to use HttpClient:
   ```typescript
   return this.http.get<Order[]>(`${environment.apiUrl}/orders`);
   ```

## Testing

Run unit tests:

```bash
ng test
```

Run e2e tests:

```bash
ng e2e
```

Tests are included for:

- Components (analytics cards, charts, tables)
- Services (data fetching, error handling)
- Routing and lazy loading

## Linting

```bash
ng lint
```

ESLint configuration is included for code quality.



```bash
ng serve --port 4201
```

### Module not found

```bash
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Contact

For questions or feedback, please open an issue in the repository.
