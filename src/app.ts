import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import mainRoutes from "./routes/main.routes";

const mongoUrl: string = process.env.MONGO_URL || "mongodb://localhost/diligentTime";
mongoose.connect(mongoUrl, { useNewUrlParser: true });

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use("/", mainRoutes);

export default app;
