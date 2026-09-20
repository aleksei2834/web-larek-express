import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number,
}

const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode: number = err.statusCode || 500;
  const message: string = err.message || 'Произошла ошибка';

  res.status(statusCode).send({ message });
};

export default errorHandler;
