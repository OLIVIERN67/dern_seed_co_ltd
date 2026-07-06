import "express";

declare global {
  namespace Express {
    interface User {
      id: number;
    }
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  namespace Express {
    interface Request {
      user?: Express.User;
    }
  }
}

export {};


