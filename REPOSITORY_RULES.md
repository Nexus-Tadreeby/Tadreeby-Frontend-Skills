# Tadreeby Frontend — Repository Rules, Guidelines & Protocols

> **Last Updated:** 2025-11-28  
> **Version:** 1.0  
> **Audience:** All contributors (new & existing)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Versions](#2-tech-stack--versions)
3. [Directory Structure & Conventions](#3-directory-structure--conventions)
4. [Code Style & Patterns](#4-code-style--patterns)
5. [State Management Rules](#5-state-management-rules)
6. [API & Data Fetching Protocols](#6-api--data-fetching-protocols)
7. [Caching Strategy](#7-caching-strategy)
8. [Routing & Authorization](#8-routing--authorization)
9. [Component Architecture](#9-component-architecture)
10. [Asset Management](#10-asset-management)
11. [Performance & PWA](#11-performance--pwa)
12. [Build & Deployment](#12-build--deployment)
12. [Security Protocols](#13-security-protocols)
14. [Git & Collaboration](#14-git--collaboration)
15. [Testing & Quality](#15-testing--quality)
16. [Onboarding Checklist](#16-onboarding-checklist)

---

## 1. Project Overview

**Tadreeby** — Field Training Management System connecting **Students**, **Universities**, **Companies**, and **Admins** in a unified platform for internship management.

### Roles
| Role | Path Prefix | Dashboard | Key Features |
|------|-------------|-----------|--------------|
| **Student** | `/student/*` | `/student/dashboard` | Browse opportunities, track applications, attendance, tasks, chat |
| **University Admin** | `/universityAdmin/*` | `/universityAdmin/dashboard` | Oversee student placements |
| **Company Trainer** | `/company/trainer/*` | `/company/trainer/dashboard` | Manage trainees, review applications, tasks |
| **Company Admin** | `/company/admin/*` | `/company/admin/dashboard` | Manage opportunities, trainers |
| **Super Admin** | `/superAdmin/*` | `/superAdmin/dashboard` | System-wide governance |

---

## 2. Tech Stack & Versions

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | React | 19.2.6 | UI library |
| **Build Tool** | Vite | 8.0.12 | Bundler + dev server |
| **Language** | JavaScript (ESM) | — | No TypeScript currently |
| **Styling** | Tailwind CSS | 4.3.1 | Utility-first CSS |
| **Routing** | React Router DOM | 7.18.0 | SPA navigation |
| **State** | Context API + React Query | 5.108.4 | Global + server state |
| **HTTP** | Axios / fetch | 1.16.1 | API communication |
| **Icons** | Lucide React | 1.23.0 | Icon library |
| **Charts** | Recharts | 3.9.2 | Data visualization |
| **PWA** | vite-plugin-pwa / Workbox | 2.0.0 | Service Worker, offline |
| **Analytics** | @vercel/analytics | 2.0.1 | Privacy-friendly analytics |
| **Linting** | ESLint | 10.3.0 | Code quality |

### Key Config Files
| File | Purpose |
|------|---------|
| `vite.config.js` | Build, PWA, proxy, plugins |
| `vercel.json` | CDN headers, API rewrites |
| `package.json` | Scripts, dependencies |
| `src/main.jsx` | App entry, providers |
| `.kilo/plans/*.md` | Implementation plans |

---

## 3. Directory Structure & Conventions

```
src/
├── assets/                 # Static assets (images, SVGs in public/ for caching)
│   ├── logo.svg            # Main logo (served from /assets/logo.svg)
│   └── Temp/               # Temporary/demo images
├── components/
│   ├── charts/             # Recharts wrappers
│   ├── common/             # Shared UI primitives
│   │   ├── pagesAssets/    # Page-specific complex components
│   │   ├── Button.jsx
│   │   ├── Icons.jsx       # All inline SVG icons (currentColor pattern)
│   │   └── ...
│   ├── internship/         # Internship-specific components
│   ├── landing/            # Landing page icons (extracted to public/)
│   ├── navigation/         # Nav-related components
│   └── steps/              # Stepper/wizard components
├── constants/              # Static data, enums
├── context/                # React Context providers
│   ├── AuthContext.jsx     # Auth state, login/logout
│   ├── ToastContext.jsx    # Global notifications
│   ├── AppShellContext.js  # Layout shell flag
│   └── ProfileContext.jsx  # User profile data
├── hooks/                  # Custom React hooks
│   ├── useApi.js           # React Query hooks (NEW)
│   ├── useOpportunities.js # Legacy (migrate to useApi)
│   ├── useOpportunityDetails.js
│   └── useUrlSearch.js
├── layout/                 # Layout shells
│   ├── Header.jsx          # Top navigation (public + authenticated)
│   ├── Footer.jsx          # Landing + internal footers
│   ├── Sidebar.jsx         # Role-based sidebar (memoized)
│   ├── RoleLayout.jsx      # Authenticated shell + sidebar + header
│   └── roleNavigation.js   # Role-based nav config
├── pages/                  # Route-level components
│   ├── auth/               # Login, Register, ForgotPassword, etc.
│   ├── student/            # Student dashboard, profile, tasks, etc.
│   ├── company-admin/      # Company admin pages
│   ├── company-trainer/    # Trainer pages
│   ├── university-admin/   # University admin
│   └── super-admin/        # Super admin
├── routes/
│   └── ProtectedRoute.jsx  # Role-based route guard
├── services/
│   ├── api.js              # Central API client + cache
│   └── apiCache.js         # In-memory response cache
├── utils/                  # Pure utilities
├── App.jsx                 # Route definitions
├── main.jsx                # Entry point, providers
└── index.css               # Tailwind + global styles
```

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `StudentDashboard.jsx` |
| Hooks | camelCase + `use` prefix | `useApi.js`, `useOpportunities.js` |
| Context | PascalCase + `Context` | `AuthContext.jsx` |
| Services | camelCase + domain | `api.js`, `apiCache.js` |
| Utils | camelCase | `formatDate.js` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_CACHE_TTL` |
| CSS Classes | Tailwind utilities | `flex items-center gap-2` |

---

## 4. Code Style & Patterns

### 4.1 React Patterns
- **Function components only** — no class components
- **Hooks** for all stateful logic (`useState`, `useEffect`, `useContext`, `useMemo`, `useCallback`)
- **React.memo** for pure presentational components (`Sidebar`, `Footer`, `Header`)
- **Custom hooks** for reusable logic (`useApi`, `useInView`, `usePrefetch`)
- **Compound components** for complex UI (`Sidebar` + `SidebarItem`)

### 4.2 Component Props
```jsx
// Destructure with defaults
export function Button({ 
  variant = "primary", 
  className = "", 
  children, 
  ...props 
}) {
  // Spread rest props to root element
  return <button {...props} className={cn(base, variants[variant], className)}>{children}</button>;
}
```

### 4.3 Inline SVG Icon Pattern
All icons in `src/components/common/Icons.jsx` follow:
```jsx
export const IconName = ({ className = "w-4 h-4", ...props }) => (
  <svg 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
    {...props}  // Pass through onClick, style, etc.
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="..." />
  </svg>
);
```
- **`currentColor`** for stroke → color controlled by Tailwind `text-*` classes
- **`className` default** for sizing (`w-4 h-4`)
- **Spread `...props`** for flexibility

### 4.4 Conditional Rendering
```jsx
// Early returns for guards
if (!isAuthenticated) return <Navigate to="/login" />;

// Ternary for simple conditionals
{isLoading ? <Skeleton /> : <Content data={data} />}

// && for optional elements
{error && <Alert message={error} />}
```

### 4.4 Styling with Tailwind
- **Utility-first** — no custom CSS unless necessary
- **Responsive prefixes**: `sm:`, `md:`, `lg:`, `xl:`
- **Dark mode**: not configured (light only)
- **Custom colors** in `tailwind.config.js` (if exists) or arbitrary values `#1677FF`
- **Animation classes**: `animate-fade-in-up`, `animate-float`, `hover-lift`

---

## 5. State Management Rules

### 5.1 Context API (Global Client State)
| Context | Scope | Provides |
|---------|-------|----------|
| `AuthContext` | App-wide | `user`, `isAuthenticated`, `login()`, `logout()`, `refreshUser()` |
| `ToastContext` | App-wide | `showToast(message, type)`, `toasts[]` |
| `AppShellContext` | Layout only | `hasPersistentShell` boolean (prevents duplicate headers) |
| `ProfileContext` | Profile pages | Profile form state |

### 5.2 React Query (Server State) — **NEW**
```javascript
// src/main.jsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 min fresh
      gcTime: 24 * 60 * 60 * 1000,   // 24h garbage collection
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

**Rules:**
- All new API calls use `useQuery` / `useMutation` from `src/hooks/useApi.js`
- **Query keys** are centralized in `queryKeys` object (nested by domain)
- **Mutations** auto-invalidate related queries via `onSuccess`
- **Deduplication** automatic for same query key
- **DevTools** available in development

### 5.3 Legacy In-Memory Cache (`apiRequest`)
- `responseCache` Map in `api.js` — 2 min TTL, per-token keys
- `pendingRequests` Map — deduplicates in-flight GETs
- **Being phased out** in favor of React Query

### 5.4 What Goes Where
| State Type | Where |
|------------|-------|
| User session, tokens | `AuthContext` |
| UI notifications | `ToastContext` |
| Layout shell flag | `AppShellContext` |
| API responses, lists, details | React Query (`useApi`) |
| Form input state | Local `useState` |
| UI toggle state (modals, dropdowns) | Local `useState` |

---

## 6. API & Data Fetching Protocols

### 6.1 Central API Client (`src/services/api.js`)
```javascript
// Single entry point for all HTTP
export const apiRequest = async (endpoint, options = {}) => {
  // 1. Build headers (auth token from localStorage)
  // 2. Check in-memory cache (GET only)
  // 3. Deduplicate in-flight requests
  // 4. Fetch with timeout, error handling
  // 5. Cache successful GET responses
  // 6. Clear cache on mutations
  // 7. Handle 401 → logout redirect
};
```

### 6.2 API Domain Modules
```javascript
export const opportunitiesAPI = {
  getAvailableOpportunities: () => apiRequest('/student/opportunities'),
  getOpportunityDetails: (id) => apiRequest(`/student/opportunities/${id}`),
  applyForOpportunity: (id) => apiRequest(`/student/opportunities/${id}/apply`, { method: 'POST' }),
  // ...
};
```

### 6.3 Request Rules
| Rule | Implementation |
|------|----------------|
| **Auth header** | Auto-attached from `localStorage.getItem('accessToken')` |
| **Content-Type** | `application/json` default; removed for `FormData` |
| **Error handling** | Throws structured `{ status, data, message }` |
| **401 handling** | Clears auth, redirects to `/login` (except login endpoint) |
| **Performance timing** | Logs slow requests (>200ms) |
| **Cache key** | `${token || 'anonymous'}:${endpoint}` |

### 6.4 Migration to React Query
```javascript
// OLD (useEffect + useState)
const [data, setData] = useState([]);
useEffect(() => { opportunitiesAPI.get().then(setData) }, []);

// NEW (React Query)
const { data } = useQuery({
  queryKey: queryKeys.opportunities.available(),
  queryFn: () => opportunitiesAPI.getAvailableOpportunities(),
});
```

---

## 7. Caching Strategy

### 7.1 Three-Layer Cache Architecture

| Layer | Technology | Scope | TTL | Invalidation |
|-------|------------|-------|-----|--------------|
| **CDN (Vercel)** | `vercel.json` headers | Static assets + HTML | Assets: 1yr immutable<br>HTML: 5min CDN / 24h stale | Deploy (new hashes) |
| **Service Worker** | Workbox (`vite-plugin-pwa`) | Precached assets + API GET | Assets: permanent<br>API: 24h / 100 entries LRU | SW update / manual |
| **Client (React Query)** | `@tanstack/react-query` | Parsed JSON + state | 5min fresh / 24h gc | `invalidateQueries()` |

### 7.2 CDN Headers (`vercel.json`)
```json
{
  "headers": [
    { "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/sw.js", "headers": [{ "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }] },
    { "source": "/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400, must-revalidate" }] }
  ],
  "rewrites": [{ "source": "/api/(.*)", "destination": "https://tadreeby-backend-production.up.railway.app/api/$1" }]
}
```

### 7.3 Service Worker (`vite.config.js`)
```javascript
VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
    runtimeCaching: [{
      urlPattern: /^https:\/\/tadreeby-backend-production\.up\.railway\.app\/api\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: { maxEntries: 100, maxAgeSeconds: 86400 },
        networkTimeoutSeconds: 10,
        cacheableResponse: { statuses: [0, 200] }
      }
    }]
  }
})
```

### 7.4 Asset Rules
- **Static SVGs** → `public/assets/` → served at `/assets/...` → 1yr immutable cache
- **Landing icons** → `public/assets/landing/*.svg` → loaded via `<img>` in `LandingIcons.jsx`
- **Contact icons** → `public/assets/contact/*.svg` → used in `Footer.jsx`
- **Logo** → `public/assets/logo.svg` → used in `Header`, `Footer`, `Sidebar`
- **Images** → `src/assets/*.png` → hashed by Vite, imported in components

---

## 8. Routing & Authorization

### 8.1 Route Structure (`App.jsx`)
```jsx
<Routes>
  {/* Public */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/terms-privacy" element={<TermsAndPrivacyPage />} />
  
  {/* Protected */}
  <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
    <Route path="/student/dashboard" element={<StudentDashboard />} />
    <Route path="/student/opportunities" element={<Opportunities />} />
    {/* ... */}
  </Route>
  
  <Route element={<ProtectedRoute allowedRoles={['COMPANY_TRAINER']} />}>
    <Route path="/company/trainer/*" element={<RoleLayout role="COMPANY_TRAINER" />} />
  </Route>
  {/* ... other roles */}
</Routes>
```

### 8.2 ProtectedRoute (`src/routes/ProtectedRoute.jsx`)
```javascript
export function ProtectedRoute({ allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;
  
  return <Outlet />;
}
```

### 8.3 Role-Based Navigation (`src/layout/roleNavigation.js`)
- Central config mapping roles → nav groups, items, paths
- Used by `Sidebar` and `RoleLayout`
- **Single source of truth** for role permissions

### 8.4 Role Constants
```javascript
const ROLES = {
  STUDENT: 'STUDENT',
  COMPANY_TRAINER: 'COMPANY_TRAINER',
  COMPANY_ADMIN: 'COMPANY_ADMIN',
  UNIVERSITY_ADMIN: 'UNIVERSITY_ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
};
```

---

## 9. Component Architecture

### 9.1 Layout Components
| Component | Responsibility | Memoized |
|-----------|----------------|----------|
| `Header` | Top nav, logo, auth links, mobile menu | ❌ (planned) |
| `Footer` | Landing + internal footer variants | ✅ `React.memo` |
| `Sidebar` | Role-based nav, collapsible, user menu | ✅ `React.memo` |
| `RoleLayout` | Authenticated shell (sidebar + header + outlet) | ❌ |

### 9.2 Common Components (`src/components/common/`)
| Component | Purpose | Props |
|-----------|---------|-------|
| `Button` | Primary/secondary/ghost variants | `variant`, `className`, `children` |
| `InputField` | Form input with validation UI | `label`, `error`, `icon`, `type` |
| `Icons.jsx` | 40+ inline SVG icons | `className`, `...props` |
| `LoadingSkeleton` | Placeholder during loading | `className` |
| `EmptyState` | No-data illustration | `title`, `description`, `action` |
| `StatCard` | Dashboard metric card | `number`, `label`, `dotColor` |
| `StatusBadge` | Colored status pill | `status`, `variant` |

### 9.3 Page Components
- **Self-contained** — compose layout + data fetching + UI
- **Use `useApi` hooks** for data (not raw `useEffect`)
- **Compose from common components** — minimal custom JSX

### 9.4 Reusable Patterns
```jsx
// Animate on scroll (used in LandingPage)
const AnimateOnScroll = ({ children, delay = 0, from = "bottom" }) => {
  const [ref, inView] = useInView();
  return <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: ... }}>{children}</div>;
};

// Page header with search, notifications, user menu
<PageHeader 
  persistent 
  fullName={user.name} 
  onSearchChange={handleSearch}
  profilePath="/student/profile"
  chatPath="/student/chats"
  onLogout={handleLogout}
/>
```

---

## 10. Asset Management

### 10.1 Public Assets (Cached at CDN)
```
public/
├── assets/
│   ├── logo.svg                    # 5.3 KB
│   ├── favicon.svg
│   ├── icons.svg
│   ├── contact/
│   │   ├── email.svg      (303 B)
│   │   ├── linkedin.svg   (668 B)
│   │   └── wa.svg         (1.3 KB)
│   └── landing/
│       ├── student.svg    (578 B)
│       ├── university.svg (595 B)
│       ├── company.svg    (610 B)
│       └── matching.svg   (795 B)
└── manifest.webmanifest
```

### 10.2 Source Assets (Bundled)
```
src/assets/
├── *.png (hero images, illustrations)
└── Temp/ (demo images)
```

### 10.3 Usage Rules
| Asset Type | Location | Import Method | Cache |
|------------|----------|---------------|-------|
| Logo | `public/assets/logo.svg` | `<img src="/assets/logo.svg" />` | CDN 1yr |
| Contact icons | `public/assets/contact/*.svg` | `<img src="/assets/contact/email.svg" />` | CDN 1yr |
| Landing icons | `public/assets/landing/*.svg` | `<img src="/assets/landing/student.svg" />` | CDN 1yr |
| Hero images | `src/assets/*.png` | `import img from '../assets/hero.png'` | Vite hash |
| Inline icons | `src/components/common/Icons.jsx` | `import { UserIcon } from '../components/common/Icons'` | In bundle |

---

## 11. Performance & PWA

### 11.1 PWA Features
- **Service Worker**: `generateSW` mode, `autoUpdate`
- **Precaching**: All build outputs (`globPatterns: ['**/*.{js,css,html,svg,png,woff2}']`)
- **Runtime Caching**: API `NetworkFirst` (10s timeout, 24h TTL)
- **Manifest**: `name: 'Tadreeby'`, `theme_color: '#1677FF'`
- **Offline**: Layout shell renders without network

### 11.2 Performance Patterns
- **Code splitting**: Vite automatic (route-based via dynamic imports)
- **React.memo**: `Sidebar`, `Footer`, `Header` (planned)
- **Lazy loading**: Images use native `loading="lazy"` where applicable
- **Bundle analysis**: `vite build` shows chunk sizes
- **Tailwind JIT**: Only used classes in output

### 11.3 Metrics (Current Build)
```
dist/assets/index-*.js        ~200 KB (gzipped ~70 KB)
dist/assets/index-*.css       ~127 KB (gzipped ~20 KB)
Total precache                126 entries, 4.6 MB
Workbox runtime               ~5.6 KB (gzipped ~2.2 KB)
```

---

## 12. Build & Deployment

### 12.1 Scripts
```json
{
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

### 12.2 Build Output
```
dist/
├── index.html
├── manifest.webmanifest
├── sw.js
├── workbox-*.js
└── assets/
    ├── index-*.js
    ├── index-*.css
    ├── logo-*.svg
    ├── landing/*.svg
    ├── contact/*.svg
    └── *.png
```

### 12.3 Vercel Deployment
- **Auto-deploy** on push to `main` / `assets-optimization`
- **Preview deployments** for PRs
- **Headers** from `vercel.json`
- **Rewrites**: `/api/*` → Railway backend
- **Environment variables**: `VITE_API_URL`

### 12.4 Environment Variables
| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_API_URL` | Backend base URL | `http://localhost:6060` |

---

## 13. Security Protocols

### 13.1 Authentication
- **Tokens**: Stored in `localStorage` (`accessToken`, `refreshToken`, `user`)
- **Auto-attach**: `apiRequest` reads token from `localStorage`
- **401 Handling**: Auto-logout + redirect to `/login`
- **Role checks**: `ProtectedRoute` validates `user.role` against `allowedRoles`

### 13.2 API Security
- **HTTPS only** in production (Vercel + Railway)
- **CORS**: Configured on backend
- **No secrets in frontend** — all auth logic server-side
- **FormData** for file uploads (auto `Content-Type`)

### 13.3 Content Security
- **No `dangerouslySetInnerHTML`** used
- **SVGs inline** — no external SVG loading
- **CSP**: Not explicitly configured (Vercel defaults)

---

## 14. Git & Collaboration

### 14.1 Branching
| Branch | Purpose |
|--------|---------|
| `main` | Production-ready |
| `dev` | Integration branch |
| `assets-optimization` | Feature branch (current) |
| `feat/*`, `fix/*`, `chore/*` | Short-lived feature branches |

### 14.2 Commit Conventions
```
feat(pwa): add service worker with Workbox
perf(assets): move SVGs to public/ for caching
build(config): add vercel.json cache headers
refactor(hooks): migrate to React Query
```

### 14.3 PR Requirements
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] No console errors in preview
- [ ] SW registers in preview
- [ ] Offline layout shell works

### 14.4 Code Review Focus
- React Query migration correctness
- Cache invalidation on mutations
- Accessibility (ARIA, semantic HTML)
- Mobile responsiveness
- Bundle size impact

---

## 15. Testing & Quality

### 15.1 Current State
| Tool | Status |
|------|--------|
| Unit tests | ❌ Not configured |
| Integration tests | ❌ Not configured |
| E2E tests | ❌ Not configured |
| Linting | ✅ `npm run lint` (ESLint) |
| Type checking | ❌ No TypeScript |
| Build verification | ✅ `npm run build` |

### 15.2 ESLint Config (Implicit)
```javascript
// From package.json devDependencies
"eslint": "^10.3.0",
"eslint-plugin-react-hooks": "^7.1.1",
"eslint-plugin-react-refresh": "^0.5.2",
"@eslint/js": "^10.0.1",
"globals": "^17.6.0"
```
- **React Hooks** rules enforced
- **React Refresh** for HMR safety
- **ES2024** globals

### 15.3 Manual QA Checklist
- [ ] `npm run build` — no errors
- [ ] `npm run preview` — SW registers, offline works
- [ ] DevTools → Network → verify cache headers
- [ ] Mobile viewport (375px, 768px, 1440px)
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Screen reader (NVDA/VoiceOver) — ARIA labels

---

## 16. Onboarding Checklist

### New Contributor Setup
```bash
# 1. Clone
git clone https://github.com/Nexus-Tadreeby/Tadreeby-Frontend-Skills.git
cd Tadreeby-Frontend-Skills

# 2. Install
npm install

# 3. Configure env
echo "VITE_API_URL=https://tadreeby-backend-production.up.railway.app" > .env

# 4. Run dev
npm run dev

# 5. Verify
# - Open http://localhost:5173
# - Check console for errors
# - Navigate landing page
# - Check DevTools → Application → Service Worker (should show "activated" after reload)
```

### Key Files to Understand First
1. `src/main.jsx` — Entry, providers
2. `src/App.jsx` — Route map
2. `src/services/api.js` — API client
3. `src/hooks/useApi.js` — React Query hooks
4. `src/layout/roleNavigation.js` — Role permissions
5. `vite.config.js` — Build, PWA, proxy
6. `vercel.json` — CDN headers

### Common Tasks
| Task | Files to Touch |
|------|----------------|
| Add new API endpoint | `src/services/api.js` + `src/hooks/useApi.js` |
| Add new role | `roleNavigation.js` + `App.jsx` routes + `ProtectedRoute` |
| New page component | `src/pages/<role>/NewPage.jsx` + route in `App.jsx` |
| New shared component | `src/components/common/NewComponent.jsx` |
| New icon | `src/components/common/Icons.jsx` |
| Modify caching | `vite.config.js` (SW) + `vercel.json` (CDN) |

---

## Appendix: Key References

| Document | Location |
|----------|----------|
| Caching Strategy Plan | `.kilo/plans/1795700616424-layout-caching-plan.md` |
| Cache Config Guide | `.kilo/docs/cache-configuration-guide.md` |
| API Cache Rules | `src/services/apiCache.js` |
| Role Navigation Config | `src/layout/roleNavigation.js` |
| React Query Hooks | `src/hooks/useApi.js` |
| Vite/PWA Config | `vite.config.js` |
| Vercel Headers | `vercel.json` |

---

> **Maintainers:** Update this document when conventions change. Last sync: 2025-11-28.