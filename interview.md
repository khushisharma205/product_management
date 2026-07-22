```markdown


# 🚀 FINAL MERN Interview Cram Sheet

## 1. HTML & CSS (Basics)
- **Semantic HTML:** `<header>`, `<nav>`, `<main>`, `<footer>` → SEO, accessibility.
- **Forms:** `method="POST"`, `required`, `pattern`. Input types: `text`, `email`, `password`.
- **CSS Box Model:** `content → padding → border → margin`; use `box-sizing: border-box`.
- **Flexbox:** `display: flex`, `justify-content`, `align-items`. Grid: `display: grid`, `grid-template-columns`.
- **Responsive:** `@media`, relative units (`rem`, `%`, `vw`). `position` values: `static`, `relative`, `absolute`, `fixed`, `sticky`.

## 2. HTTP & REST
- **Methods:** GET (safe, idempotent), POST (non‑idempotent), PUT (idempotent), PATCH, DELETE.
- **Status codes:** `200 OK`, `201 Created`, `301 Moved`, `304 Not Modified`, `400`, `401`, `403`, `404`, `500`.
- **REST principles:** Stateless, resource‑based URLs (`/users`), HTTP verbs, proper status codes.
- **Pagination/Filtering:** `?page=2&limit=20`, `?role=admin`.
- **CORS:** `Access-Control-Allow-Origin` header; preflight `OPTIONS`.
- **Caching:** `Cache-Control`, `ETag`, `If-None-Match`.

## 3. JWT (JSON Web Token)
- **Structure:** `header.payload.signature` (Base64Url, not encrypted!).
- **Flow:** Login → server signs JWT (secret, expiry) → client stores in **httpOnly cookie** → send via `Authorization: Bearer`.
- **Access vs Refresh:** Access short‑lived (15min), Refresh long‑lived (7d) – rotate refresh token on use.
- **Security:** Always HTTPS, use `SameSite=Strict` cookie, never store sensitive data in payload, keep secret strong.

## 4. JavaScript Essentials
- **Hoisting:** `var` → `undefined`; `let`/`const` → TDZ. Function declarations fully hoisted.
- **Closure:** Inner function remembers outer scope. Used for data privacy, React hooks.
- **Event Loop:** Microtasks (Promise callbacks) before macrotasks (`setTimeout`). Output: 1 4 3 2.
- **`this`:** Dynamic; arrow functions take lexical `this`. Bind with `.bind()` or use arrow for class methods.
- **Promises/Async-Await:** Async returns promise; await pauses inside function; use `try/catch`.
- **Array methods:** `map`, `filter`, `reduce` – immutable. `some`, `every`.
- **ES6+:** Destructuring, spread/rest, template literals, optional chaining `?.`, nullish coalescing `??`.

## 5. React – High-Frequency Concepts
**Core**
- Virtual DOM diffing (O(n)) with keys for list stability.
- JSX → `React.createElement`. Functional components + hooks.
- **State vs Props:** Props read‑only; state internal mutable.
- **Controlled components:** `value` + `onChange` in React state.
- **Keys:** Stable, unique ID; never index when order changes.

**Hooks**
- `useState`, `useEffect` (cleanup return), `useContext`, `useRef`, `useReducer`.
- `useMemo` (value), `useCallback` (function) – prevent unnecessary re‑renders.
- Custom hooks: extract logic, start with `use`.
- `useEffect` dependency array: `[]` = mount, `[dep]` = run on dep change.
- `useLayoutEffect` synchronous after DOM (measuring layout).

**State Management**
- Context API for low‑frequency global data (auth, theme); Redux Toolkit (`createSlice`, `useSelector`) for complex state.
- Redux async: `createAsyncThunk` or saga.

**Routing & Performance**
- React Router: `<BrowserRouter>`, `<Routes>`, `useParams`, `useNavigate`.
- `React.memo` (shallow compare), code splitting `React.lazy` + `<Suspense>`.
- Virtualization for large lists (`react-window`). Portals for modals.

## 6. Node.js & Express
**Node.js**
- Event loop phases: timers → pending → poll → check (setImmediate) → close. `process.nextTick` before each.
- Streams (Readable/Writable), backpressure via `pipe()`.
- `cluster` (multicore), `worker_threads` (CPU tasks), `child_process.fork`.
- `require` vs `import`: CommonJS sync, ESM static/tree‑shakeable.
- `fs.promises` for async I/O. `path.join` vs `path.resolve`.

**Express**
- Middleware: `(req, res, next)`. Order matters. Error‑handling has 4 params.
- `express.Router()` to modularise routes. `express.json()` for body parsing.
- JWT Auth middleware: extract token, verify, attach user to `req`.
- Security: `helmet`, `cors`, `express-rate-limit`, bcrypt, input validation (`express-validator`).
- File upload: `multer`. Static files: `express.static`.

## 7. MongoDB & Mongoose
**Database**
- **Embed vs Reference:** Embed one‑to‑few, read together; Reference one‑to‑many.
- **Aggregation:** `$match` → `$group` → `$sort` → `$project` → `$lookup` (join).
- **Indexing:** Single, compound (ESR: Equality → Sort → Range), unique, TTL, text.
- `explain()` for query performance. Transactions: `startSession` on replica set.

**Mongoose**
- Schema with types, validators (`required`, `enum`).
- `pre('save')` to hash password. `populate` to resolve references.
- `lean()` for fast plain JS objects. Statics (model methods) vs methods (instance).
- Query helpers for chainable logic.

## 8. System Design (One‑liners)
- **URL Shortener:** Hash → cache (Redis) → 301 redirect.
- **Chat App:** WebSocket, message queue (Kafka), MongoDB/Cassandra, Redis presence.
- **E‑commerce:** Microservices (catalog, cart, order, payment), DB per service.
- **File Upload:** Presigned URL S3 / multer, async processing.
- **Caching:** Redis cache‑aside pattern, TTL invalidation.

## 9. Machine Coding (React Patterns)
- **Autocomplete:** Debounced input, dropdown, keyboard nav.
- **Modal:** Portal, focus trap, ESC/backdrop close.
- **Infinite scroll:** Intersection Observer, page fetch.
- **Star rating:** Controlled component, hover/click states.
- **Form validation:** Custom hook, errors object.
- **Shopping cart:** Context + reducer.

## 10. MERN Project Setup (Fast Recall)
1. **Backend:** `npm init`, `express mongoose dotenv cors morgan helmet jsonwebtoken bcryptjs`. Folders: `config`, `controllers`, `routes`, `models`, `middleware`. `server.js`: connect DB, use middlewares, mount routes, error handler.
2. **Frontend:** `npm create vite@latest client -- --template react`, install `react-router-dom axios`. `services/api.js` with Axios instance + interceptor. Auth context with `useState`/`useEffect`. Protected routes.
3. **Connect:** Vite proxy `/api` to backend in dev. Production: serve React build from Express `dist` or deploy separately.

## 11. HR & Behavioral
- **Tell me about yourself:** Past → Present → Future (tailored to job).
- **Strengths:** Quick learner, problem‑solver; example.
- **Weakness:** Genuine, show improvement (e.g., “public speaking – joined Toastmasters”).
- **Conflict:** STAR (Situation, Task, Action, Result) – focus on resolution.
- **Why company?:** Mention tech stack, culture, impact.
- **Questions for them:** Ask about team, tech challenges, growth.

---

**Last word:** Stay calm, explain concepts in simple terms, and always provide examples. You’ve got this! 🚀



# ⚡ MERN Stack Interview – Expanded Cram Sheet

## Node.js & Express

### Node.js Core (Extra)

1. **How does the event loop handle I/O?**  
   Non‑blocking I/O operations are offloaded to the kernel (libuv thread pool). When complete, their callbacks are queued and processed in the poll phase.
2. **What is `process.nextTick()` and when to use it?**  
   Defers a callback to run immediately after the current operation, before any I/O or timers. Use when you need to guarantee execution order after the current script.
3. **Difference between `setImmediate()` and `setTimeout(fn,0)`?**  
   `setImmediate` runs in the check phase (after poll). `setTimeout(fn,0)` runs in the timers phase. Inside an I/O callback, `setImmediate` always runs first.
4. **What is backpressure in streams?**  
   When a writable stream can't keep up with the readable stream, the readable stream pauses to prevent memory overflow. Use `pipe()` or handle `drain` event.
5. **How to create a HTTPS server?**  
   `https.createServer({ key, cert }, app)`.
6. **Explain the `Buffer` class methods: `alloc`, `from`, `concat`.**  
   `Buffer.alloc(size)` creates a zero‑filled buffer. `Buffer.from(string)` creates from encoding. `Buffer.concat([buf1, buf2])` merges.
7. **How does Node.js handle child processes?**  
   `spawn` for streaming data; `exec` for shell commands (buffers output); `fork` for Node scripts with IPC.
8. **What is `__dirname` vs `process.cwd()`?**  
   `__dirname` is the directory of the current module file; `process.cwd()` is the directory from where the Node process was launched.
9. **Explain the `path` module methods: `join` vs `resolve`.**  
   `path.join` concatenates path segments with correct separator; `path.resolve` resolves to an absolute path, starting from current working directory if not given absolute.
10. **How to read a file line by line?**  
    Use `readline` module or `fs.createReadStream` piped to a `Transform` stream splitting by newline.

### Express Deep Dive

11. **How to create a global error handler?**  
    ```javascript
    app.use((err, req, res, next) => {
      res.status(err.status || 500).json({ message: err.message });
    });
    ```
    Must be defined after all routes.
12. **What is the difference between `app.use` and `router.use`?**  
    `app.use` applies middleware globally; `router.use` applies only to routes defined on that router.
13. **How to handle URL parameters and query strings?**  
    `req.params.id` for `/users/:id`; `req.query` for `?page=2&limit=10`.
14. **How to structure a scalable Express app?**  
    Separate folders: `routes`, `controllers`, `services`, `models`, `middleware`, `config`, `utils`. Use `express.Router()` to split routes by feature.
15. **What is `morgan` and how to customise it?**  
    HTTP request logger. Use predefined formats (`dev`, `combined`) or custom tokens.
16. **How to implement request validation with `express-validator`?**  
    ```javascript
    const { body, validationResult } = require('express-validator');
    app.post('/user', body('email').isEmail(), (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      // proceed
    });
    ```
17. **How to handle CORS dynamically?**  
    Use `cors({ origin: function(origin, callback) { ... } })` to whitelist specific origins.
18. **Explain `express.static` and caching headers.**  
    Serves static files with `Cache-Control`, `Last-Modified`, and `ETag` headers automatically.
19. **How to upload multiple files?**  
    `multer({ storage }).array('photos', 12)` – files accessible via `req.files`.
20. **How to implement rate limiting per user?**  
    Use `express-rate-limit` with a `keyGenerator` function that returns user ID or IP.

## React

### Hooks & Advanced Patterns

1. **Explain `useLayoutEffect` with an example.**  
    Fires synchronously after DOM mutations but before paint. Use for measuring layout (e.g., scroll position, tooltip placement).
2. **What is `useImperativeHandle`?**  
    Customize the instance value exposed to parent when using `ref`. Often with `forwardRef`.
3. **How does `useDebugValue` help?**  
    Displays a label for custom hooks in React DevTools.
4. **What is the difference between `useMemo` and `React.memo`?**  
    `useMemo` memoizes a value inside a component; `React.memo` memoizes the entire component (shallow prop compare).
5. **Explain `useReducer` vs `useState`.**  
    `useReducer` is better for complex state logic with multiple sub‑values or when next state depends on previous. `useState` for simple values.
6. **How to create a custom hook for form handling?**  
    ```javascript
    function useForm(initialValues) {
      const [values, setValues] = useState(initialValues);
      const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value });
      return { values, handleChange };
    }
    ```
7. **How to share logic between components without hooks?**  
    Higher‑Order Components (HOCs) or Render Props. Hooks are now the standard.
8. **Explain `useCallback` and referential equality.**  
    `useCallback` returns a memoized version of a callback that only changes if dependencies change, preventing child re‑renders when passing callbacks.
9. **How to fetch data with `useEffect` and cleanup?**  
    Use an abort controller or a cancelled flag to avoid setting state on unmounted component.
10. **What is the `useId` hook?**  
    Generates unique IDs that are stable across server and client renders; used for accessibility attributes.

### State Management

11. **When to use Context API vs Redux vs Zustand?**  
    Context for simple global state (theme, auth). Redux Toolkit for complex, large‑scale apps with time‑travel debugging. Zustand for lightweight alternative with less boilerplate.
12. **How to avoid unnecessary re‑renders with Context?**  
    Split reading context (e.g., separate context for value and updater) or memoize components with `React.memo`.
13. **Explain the Redux Toolkit flow: slice, store, useSelector, useDispatch.**  
    `createSlice` defines reducers and actions. `configureStore` creates the store. `useSelector` reads state; `useDispatch` dispatches actions.
14. **How to handle async logic in Redux?**  
    Use `createAsyncThunk` or middleware like Redux Saga.

### Routing & Code Splitting

15. **What are nested routes?**  
    `<Routes>` inside a component rendered by an `<Outlet>`.
16. **How to protect routes?**  
    Create a `<ProtectedRoute>` component that checks auth context and redirects to login if not authenticated.
17. **How to pass props to a route component?**  
    Use `element={<Component prop={value} />}` (not `component` prop).
18. **Explain `React.lazy` and `Suspense` with a fallback.**  
    Lazy loads component bundle; `<Suspense fallback={<Loading />}>` shows while loading.
19. **What is code splitting based on routes?**  
    Use `React.lazy(() => import('./About'))` for each page.

### Performance & Testing

20. **What is virtualization?**  
    Rendering only visible rows in a large list (e.g., `react‑window`).
21. **How to profile React apps?**  
    React DevTools Profiler; record interactions, see flame graph.
22. **What is the purpose of `shouldComponentUpdate`?**  
    Class lifecycle to prevent unnecessary renders; `React.memo`/`PureComponent` equivalent.
23. **How to test async components?**  
    Use `findBy*` queries from React Testing Library, mock API calls with `msw`.
24. **What is snapshot testing?**  
    Renders UI and compares to stored snapshot; good for unintended changes.

## MongoDB & Mongoose

### Database Operations

1. **How to perform a JOIN (lookup) in MongoDB?**  
    ```javascript
    db.orders.aggregate([{
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
      }
    }]);
    ```
2. **How to update nested documents?**  
    Use dot notation: `{ $set: { "address.city": "New York" } }` or array filters: `{ $set: { "comments.$[elem].text": "new" } }` with `arrayFilters: [{ "elem.id": 1 }]`.
3. **What is `$unwind` used for?**  
    Deconstructs an array field, outputting a document for each element; useful before grouping or joining.
4. **Explain `$group` and accumulators.**  
    Groups input docs by a key; accumulators: `$sum`, `$avg`, `$push`, `$addToSet`, `$first`, `$last`.
5. **How to use `$facet` for multiple aggregations in one query?**  
    Runs several pipelines on the same input; result contains each output as a field.
6. **What are the benefits of TTL indexes?**  
    Automatically delete documents after a certain time; used for session expiry, logs.
7. **How to handle transactions in Mongoose?**  
    ```javascript
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // operations with { session }
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
    ```
8. **What is `$expr`?**  
    Allows use of aggregation expressions within query language (e.g., compare two fields).
9. **How to do full‑text search?**  
    Create a text index: `db.articles.createIndex({ body: "text" })`, then query: `db.articles.find({ $text: { $search: "coffee" } })`.
10. **What is the Aggregation Pipeline `$merge` stage?**  
    Writes results of aggregation into a specified collection (merge or replace).

### Mongoose Specifics

11. **How to define a custom validator?**  
    ```javascript
    validate: {
      validator: function(v) { return /\d{3}-\d{3}/.test(v); },
      message: props => `${props.value} is not a valid phone!`
    }
    ```
12. **Difference between `doc.save()` and `Model.updateOne()`?**  
    `doc.save()` runs middleware and validators; `updateOne` runs directly in DB, bypassing some middleware.
13. **What are query middleware and document middleware?**  
    Query middleware (`pre('find')`, `post('find')`) runs on queries. Document middleware (`pre('save')`, `post('validate')`) on document creation/update.
14. **How to populate multiple levels deep?**  
    ```javascript
    await Model.find().populate({
      path: 'friends',
      populate: { path: 'posts' }
    });
    ```
15. **What is a discriminator?**  
    Schema inheritance mechanism; allows multiple models with overlapping schemas on the same collection.

## MERN Project Architecture & Common Questions

**Folder Structure Best Practice**
```
root/
├── client/ (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   └── vite.config.js
└── server/
    ├── controllers/
    ├── routes/
    ├── models/
    ├── middleware/
    ├── config/
    ├── utils/
    └── server.js
```

**Key Project Interview Questions**
1. **Explain your project's authentication flow.**  
   JWT stored in httpOnly cookie. Access token short‑lived (15min), refresh token long‑lived (7d) rotated on each use. Middleware verifies token on protected routes.
2. **How did you handle state management?**  
   React Context for auth user and theme; Redux Toolkit for complex shopping cart state with async thunks.
3. **How did you optimise performance?**  
   React.memo on product cards, useMemo for filtering, lazy loading routes, DB indexing on frequently queried fields, Redis caching for product list.
4. **What security measures did you implement?**  
   Helmet, CORS, rate limiting, bcrypt password hashing, input sanitization (express-validator), MongoDB injection prevention via Mongoose, HTTPS.
5. **How did you deploy the app?**  
   Frontend on Vercel, backend on Render with environment variables, MongoDB Atlas. CI/CD via GitHub Actions.
6. **Explain a challenge you faced and how you solved it.**  
   e.g., "We had N+1 query problem when loading posts and comments. I solved it with Mongoose `populate` and later with aggregation `$lookup` for heavy queries, cutting response time by 70%."

## Machine Coding (MERN Focus)

**Express + Mongoose Tasks**
- **Build a blog API** with CRUD posts, comments, and user authentication.
- **Implement pagination** in a route that returns `{ data, total, page, pages }`.
- **Create a search endpoint** using `$text` or `$regex`.
- **Design a middleware** to log request duration.

**React Coding**
- **Build a registration form** with validation, error display, and API call.
- **Create a custom hook** `useDebounce` and use it in a search component.
- **Implement a shopping cart** with Context/Reducer: add, remove, update quantity.
- **Build a real‑time notification component** using Socket.IO (client‑side).
- **Create a modal** with portal and keyboard trap.
- **Infinite scroll** component fetching paginated data from Express.

---

**Stay focused on these MERN topics; they'll cover most technical interviews. Good luck!**
```
