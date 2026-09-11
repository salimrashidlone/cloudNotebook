const connectDB=require('./db')
const express = require('express');
const app = express()
const port = 3000
connectDB();
app.use(express.json());

//Route Mounting done below
app.use('/api/auth',require('./routes/auth'))
app.use('/api/auth',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`)
})



