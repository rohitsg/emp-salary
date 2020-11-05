import * as express from 'express'
import {config as dotenvConfig} from 'dotenv';
import * as bodyParser from 'body-parser';

import { authenticateToken, generateAccessToken } from './auth';
import { getEmployees, getEmployee } from './db';

dotenvConfig();

const app = express();
app.use(bodyParser.json());


app.get('/employee/:id', authenticateToken, async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await getEmployee(id);
    res.send({
      employee
    })
  } catch (error) {
    res.status(404).send({
      error: 'Error while fetching details for employee'
    })
  }
})

app.get('/employees', authenticateToken, async (req, res) => {
  try {
    const employees = await getEmployees();
    res.send({
      employees
    })
  } catch (error) {
    res.status(404).send({
      error: 'Error while fetching details for employees'
    })
  }
});

app.post('/generateToken', async (req, res) => {
  try {
    const user = req.body;
    const token = await generateAccessToken(user);
    res.send({
      token
    })
  } catch (error) {
    res.status(401).send({
      message: error.message
    })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})