import * as express from 'express'
import {config as dotenvConfig} from 'dotenv';
import * as bodyParser from 'body-parser';

import { authenticateToken, generateAccessToken } from './auth';
import { getSalary } from 'db';

dotenvConfig();

const app = express();
app.use(bodyParser.json());

app.get('/employees', authenticateToken, (req, res) => {
  res.send([{
    id: 1,
    name: 'emp 1',
    designation: 'software developer 3',
    salary: '40k'
  }, {
    id: 2,
    name: 'emp 2',
    designation: 'sr. software developer',
    salary: '60k'
  }])
})


app.get('/employee', authenticateToken, (req, res) => {
  res.send({
    id: 1,
    name: 'emp 1',
    designation: 'software developer',
    salary: '49k'
  })
})


app.get('/salary', authenticateToken, (req, res) => {
  const salary = getSalary();
  res.send({
    salary
  })
})

app.post('/generateToken', (req, res) => {
  const user = req.body;
  const token = generateAccessToken(user);
  res.send({
    token
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})