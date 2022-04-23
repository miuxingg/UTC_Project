import { IHistoryBookLine } from './HistoryLine';

export const data: IHistoryBookLine[] = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
  (item, i) => {
    return {
      stt: i + 1,
      id: String(new Date()),
      createdAt: new Date(),
      address: 'Thai Binh',
      total: 1000000,
      books: [1, 2, 3, 4, 5, 6].map((item, i) => {
        return {
          id: String(new Date()),
          thumbnail:
            'https://nld.mediacdn.vn/k:2016/anh-tin-2-1461684345785/toi-thay-hoa-vang-tren-co-xanh-doat-giai-thuong-quoc-te.jpg',
          name: 'Toi thay hoa vang tren co xanh',
          price: 1037182,
          author: 'Nguyen Nhat Anh',
        };
      }),
    };
  },
);
