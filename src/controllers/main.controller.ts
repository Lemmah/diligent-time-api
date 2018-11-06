import { Request, Response } from "express";

const root = (req: Request, res: Response): void => {
  res.status(200);
  res.send({
    message: "Welcome to the Diligent Time API!",
  });
};

export default { root };
