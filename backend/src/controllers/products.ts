import { Response, Request, NextFunction } from 'express';
import Product from '../models/product';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/not-found-error';

export const getProducts = (_req: Request, res: Response, next: NextFunction) => Product.find({})
  .then((products) => {
    if (!products) {
      next(new NotFoundError('Продукты не найдены'));
    }
    res.send({
      items: products,
      total: products.length,
    });
  })
  .catch((err) => next(err));

export const postProduct = (req: Request, res: Response, next: NextFunction) => Product.create({
  title: req.body.title,
  image: req.body.image,
  description: req.body.description,
  category: req.body.category,
  price: req.body.price,
})
  .then((product) => res.status(201).send(product))
  .catch((error) => {
    if (error instanceof Error && error.message.includes('E11000')) {
      next(new ConflictError('Продукт с таким названием уже существует'));
    }

    next(error);
  });
