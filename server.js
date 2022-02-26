const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const port = process.env.PORT || 9000
const uri = process.env.MONGODB_URI
const path = require('path')
const secret = process.env.SECRET || 'local deployment phrase'

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'client', 'build')))

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log('Connected to mongodb')
)

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressJwt({ secret: secret,  algorithms: ['HS256'] })) // req.user
// app.use('/api/user', require('./routes/userRouter.js'))
app.use('/api/exercise', require('./routes/exerciseRouter'))
app.use('/api/workout', require('./routes/workoutRouter'))
app.use('/api/forum', require('./routes/forumRouter'))
app.use('/api/comment', require('./routes/commentRouter'))

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(port, () => {
  console.log(`server is on ${port}`)
})