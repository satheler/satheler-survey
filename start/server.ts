import express from 'express'

const app = express()

const PORT = 8000
app.listen(PORT, () => console.log(`⚡️ Server running at http://localhost:${PORT}`))
