import cors from "cors";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";

import { routes } from "./routes";
import { AppError } from "../../errors/AppError";

const app = express();

const listOrigins = `${process.env.URLS_ORIGINS_LIST}`.replace(/ /gm, "").split(",");

app.use(express.json());
app.use(cors());
app.use((request: Request, response: Response, next: NextFunction) => {
  if(!listOrigins[0]) return next();
  if(listOrigins.indexOf(request.headers.host || "") !== -1){
    return next();
  }
  return response.status(400).json({
    error: "Request Origin invalid!"
  });
    
});

app.use(routes);

app.use(
  // eslint-disable-next-line no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(400).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };