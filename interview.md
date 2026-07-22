```markdown
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
