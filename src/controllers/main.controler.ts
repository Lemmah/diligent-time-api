import { Request, Response } from "express";

export class MainControler {
  public root(req: Request, res: Response): void {
    res.status(200).send({
      message: "GET request successful!",
    });
  }
}

export const mainController: MainControler = new MainControler();