const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const auth = require('./routes/auth.routes')
const link = require('./routes/link.routes')
const redirect = require('./routes/redirect.routes')
const path = require('path')

const app = express()

app.use(express.json({ exteded: true }))
app.use('/api/auth', auth)
app.use('/api/link', link)
app.use('/t', redirect)

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}`)
        })
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
