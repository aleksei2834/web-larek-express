import { Response, Request, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import isEmail from 'validator/lib/isEmail';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const postOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      payment,
      email,
      phone,
      address,
      total,
      items,
    } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return next(new BadRequestError('Поле items должно быть непустым массивом'));
    }

    const products = await Product.find({
      _id: { $in: items },
    });

    if (products.length !== items.length) {
      return next(new BadRequestError('Некоторые товары не найдены'));
    }

    if (products.some((product) => product.price === null)) {
      return next(new BadRequestError('Один из товаров недоступен'));
    }

    const calculatedTotal = products.reduce((sum, product) => sum + (product.price ?? 0), 0);

    if (calculatedTotal !== total) {
      return next(new BadRequestError('Неверная сумма заказа'));
    }

    if (!payment || (payment !== 'online' && payment !== 'cash')) {
      return next(new BadRequestError('Не указан способ оплаты'));
    }

    if (!email || !isEmail(email)) {
      return next(new BadRequestError('Некорректный email'));
    }
    if (!phone) {
      return next(new BadRequestError('Не указан телефон'));
    }

    // address
    if (!address) {
      return next(new BadRequestError('Не указан адрес'));
    }

    return res.status(201).send({
      id: faker.string.uuid(),
      total: calculatedTotal,
    });
  } catch (err) {
    return next(err);
  }
};

export default postOrder;
