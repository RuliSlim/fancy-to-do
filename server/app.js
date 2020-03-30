const express = require('express')
const app     = express()
const PORT    = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extend: true}))

// router
app.use(require('./routes/index'))

// start app
app.listen(PORT, () => console.log(`Server start on port ${PORT}`))