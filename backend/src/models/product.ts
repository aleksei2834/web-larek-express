import mongoose from 'mongoose';

interface IImage {
  fileName: string,
  originalName: string
}

export interface IProduct {
  title: string,
  image: IImage,
  category: string,
  description: string,
  price: number
}

const imageSchema = new mongoose.Schema<IImage>({
  fileName: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'Поле "title" должно быть заполнено'],
    unique: true,
    minlength: [2, 'Минимальная длина поля "title" - 2'],
    maxlength: [30, 'Максимальная длина поля "title" - 30'],
  },
  image: imageSchema,
  category: {
    type: String,
    required: [true, 'Поле "category" должно быть заполнено'],
  },
  description: String,
  price: {
    type: Number,
    default: null,
  },
});

export default mongoose.model<IProduct>('product', productSchema);
