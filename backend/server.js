const app = require("./app")

const dotenv = require("dotenv")
dotenv.config({ path: "backend/config/config.env" })
const port = process.env.PORT
const connectDatabase = require("./config/database")

connectDatabase()

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
