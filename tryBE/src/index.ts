import { AppDataSource } from "./data-source";
import * as express from "express";
import userRoute from "./routes/userRoute";
import threadRoute from "./routes/threadRoute";
import replyRoute from "./routes/replyRoute";
import likeRoute from "./routes/likeRoute";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(express.json());
    app.use("/api/v1", userRoute);
    app.use("/api/v1", threadRoute);
    app.use("/api/v1", replyRoute);
    app.use("/api/v1", likeRoute);

    app.listen(5001, () => {
      console.log("Server is running on port 5001");
    });
  })
  .catch((error) => console.log(error));
