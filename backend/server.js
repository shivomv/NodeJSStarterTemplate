const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const setupSwaggerDocs = require('./config/swaggerConfig');

// Handle Uncaught Exception
process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down the server due to Uncaught Exception");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

// Config
dotenv.config({ path: "backend/config/config.env" });

// Connect to database
connectDatabase();

const port = process.env.PORT || 5000;

// Integrate Swagger
setupSwaggerDocs(app);

let server;
server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Handle Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down the server due to Unhandled Promise Rejection");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});
