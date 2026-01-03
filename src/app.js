const express = require('express')

const errorHandler = require('./middleware/errorHandler')
const ratelimiter = require('./middleware/rateLimiter')

const helmet = require('helmet')
const cors = require('cors')
//const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')


const connectDB = require('./config/db')
const { port } = require('./config/env')

const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')


const app = express()
app.use(express.json())
const PORT = port
connectDB();

//Security Middlewares
app.use(helmet());
app.use(cors());
//app.use(xss());
app.use(mongoSanitize({
    replaceWith: '_'
}));

app.use(errorHandler)
app.use(ratelimiter)

app.get('/', (req, res) => {
    res.send('Welcome to Task Manager API')
})

app.use('./auth', authRoutes)
app.use('./tasks', taskRoutes)



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})