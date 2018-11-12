import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import * as morgan from "morgan";

import Error from "./interfaces/error";
import mainRoutes from "./routes/main.routes";

const mongoUrl: string = process.env.MONGO_URL || "mongodb://localhost/diligentTime";
mongoose.connect(mongoUrl, { useNewUrlParser: true });

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use("/", mainRoutes);
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  /* tslint:disable-next-line */
  console.error(error);
  res.status(error.statusCode || 500).json({ error: error.message });
});

export default app;
