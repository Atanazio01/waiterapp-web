import type { Order } from '../types/Order';

export const orders: Order[] = [
  {
    _id: '6aad8d6f1465dc06c6c5a3f7',
    table: '123',
    status: 'WAITING',
    products: [
      {
        product: {
          name: 'Pizza quatro queijos',
          imagePath: '1789744059772-quatro-queijos.png',
          price: 40,
        },
        quantity: 2,
        _id: '6aad8d6f1465dc06c6c5a3f8'
      },
      {
        product: {
          name: 'Coca-Cola',
          imagePath: '1789755606660-coca-cola.png',
          price: 7,
        },
        quantity: 2,
        _id: '6aad8d6f1465dc06c6c5a3f9'
      }
    ],
  }
];
