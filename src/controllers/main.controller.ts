import { Request, Response } from "express";

class MainControler {
  public root(req: Request, res: Response): void {
    res.status(200);
    res.send({
      message: "Welcome to the Diligent Time API!",
    });
  }
}

export const mainController: MainControler = new MainControler();
