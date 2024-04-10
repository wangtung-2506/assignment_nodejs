import express from 'express';
import mongoose from 'mongoose';
import routerSV from './routers/sinhvien';
import routerAuth from './routers/auth';

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/assignments");

app.use("/api",routerSV);
app.use("/api",routerAuth);

export const viteNodeApp = app