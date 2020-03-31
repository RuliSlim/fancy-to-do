const express = require('express')
const app     = express()
const PORT    = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// router
app.use(require('./routes/index'))

// middlewares errorHandler
app.use(require('./middlewares').errorHandler)

// start app
app.listen(PORT, () => console.log(`Server start on port ${PORT}`))