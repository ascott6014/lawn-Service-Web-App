import './config'; // Load environment variables
import express, {Express} from 'express';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import { registerUser, login } from './controllers/UserController';
import { handleAddService, handleGetServicesByUserId } from './controllers/ServiceController';
import { handleAddPropery } from './controllers/PropertyController';
import { handleAddJob, handleGetJobsByUserId } from './controllers/JobController';

const app: Express = express();
const { PORT, COOKIE_SECRET } = process.env;

const SQLiteStore = connectSqlite3(session);

app.use(
    session({
        store: new SQLiteStore ({ db: 'sessions.sqlite'}),
        secret: COOKIE_SECRET,
        cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 hours
        name: 'session',
        resave: false,
        saveUninitialized: false,
    })
)

app.use(express.json());

// Implement endpoints here

// post (creation)
app.post("/api/users", registerUser);
app.post("api/login", login);
app.post("api/contractors/services", handleAddService);
app.post("api/users/properties", handleAddPropery);
app.post("api/users/jobs", handleAddJob);

// get(viewing)
app.get("api/contractors/:targetUserId/services", handleGetServicesByUserId);
app.get("api/users/jobs", handleGetJobsByUserId);

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});


