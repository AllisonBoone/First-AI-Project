import express from 'express';
import axios from 'axios';
import body from 'body-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(express.static('public'));
app.use(bodyParser.json());
