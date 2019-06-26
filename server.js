const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:1f3056ca-986a-4f1d-b9e0-0cb679445f90',
  key: '212bfbea-5c34-451d-851a-ad0ef15aac35:zS8GMXh3Bxigu6zuKWalAjJKexHhMbTzn+RbmJxvi+4='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// app.post('/users', (req, res) => {
//   const username = req.body

//   chatkit.createUser({
//     name: username,
//     id: username
//   })
//   .then(() => res.status(201))
//   .catch(error => {
//     if (error.error_type = 'services/chatkit/user_already_exsits'){
//       res.sendStatus(200)
//     } else {
//       res.status(error.status).json(error)
//     }
//   })
// })

app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})

// app.post('/authenticate', (req, res) => {
//   // const { grant_type } = req.body
//   // res.json(chatkit.authenticate({ grant_type, userId: req.query.user_id }))
//   const authData = chatkit.authenticate({
//     userId: req.query.user_id
//   });

//   res.status(authData.status)
//      .send(authData.body);
// })

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id })
  res.status(authData.status).send(authData.body)
})
// app.post('/authenticate', (req, res) => {
//   console.log('cadel: ', req.query.user_id)
//   const authData = chatkit.authenticate({
//     userId: req.query.user_id
//   });

//   res.status(authData.status)
//      .send(authData.body);
// })

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
