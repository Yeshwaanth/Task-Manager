const http = require('http')
const server = http.createServer((req, res) => {
    const url = req.url
    res.setHeader('Content-Type', 'text/html')

    if (url == '/') {
        res.statusCode = 200
        res.end('Welcome to Task Manager API')
    }
    else if (url == '/tasks') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ 'id': 1, 'title': 'Learn Node' }))
    }
    else {
        res.statusCode = 404
        res.end('404 Not Found')
    }
})
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
})