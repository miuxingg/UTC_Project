import { IHistoryBookLine } from '../../containers/CheckoutHistoryContainer/HistoryLine';
import { IOrderOutput } from '../../libs/apis/order/types';

export const transfromOrderHistory = (
  item: IOrderOutput[],
): IHistoryBookLine[] => {
  return item.map((item, i) => {
    return {
      stt: i + 1,
      id: item?.id ?? '',
      createdAt: item?.createdAt ?? new Date(),
      address: `${item?.shippingMethod.privateHome}-${
        item?.shippingMethod.wards?.name ?? ''
      }-${item?.shippingMethod.district?.name ?? ''}-${
        item?.shippingMethod.province?.name ?? ''
      }`,
      total: item.totalMoney,
      status: item.status,
      books: item.orderLines.map((line, i) => {
        return {
          id: line.id,
          thumbnail: line.book[0].thumbnail,
          name: line.book[0].name,
          price: line.price,
          author: line.book[0].author,
          quantity: line.quantity,
        };
      }),
    };
  });
};
