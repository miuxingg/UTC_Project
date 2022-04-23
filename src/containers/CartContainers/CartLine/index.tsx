import { styled } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routers } from '../../../configs/navigator';
import { moneyFormat } from '../../../libs/utils';
import {
  LocalStorageKey,
  setItemDataStorage,
} from '../../../libs/utils/localStorage';
import { authSelector } from '../../../redux/auth/selectors';
import {
  deleteItem,
  removeItem,
  updateQuantityCart,
  updateQuantityItem,
} from '../../../redux/cart';
import { allCart } from '../../../redux/cart/selectors';

export const Image = styled('img')({
  width: '80px',
  height: '100px',
});

export interface ICartline {
  id: string;
  item: any;
  quantity: number;
}
const CartLine: React.FC<ICartline> = ({ id, item, quantity }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authSelector);
  const cartItem = useSelector(allCart);

  const [quantityLine, setQuantityLine] = useState<number>(quantity);

  const handleRemoveItemCart = (id: string) => {
    if (isAuthenticated) {
      dispatch(removeItem(id));
    } else {
      dispatch(deleteItem({ id }));
      const newCartlocal = cartItem.items.filter((item) => item.id !== id);
      const transformCartLocal = newCartlocal.map((item) => {
        return { bookId: item.item.id, total: item.quantity };
      });
      setItemDataStorage(
        LocalStorageKey.BookStoreCart,
        JSON.stringify(transformCartLocal),
      );
    }
  };

  const handleChangeQuantity = (e: any) => {
    const value = +e.target.value > 0 ? +e.target.value : 1;
    setQuantityLine(value);

    if (isAuthenticated) {
      dispatch(updateQuantityItem({ id, quantity: value }));
      dispatch(updateQuantityCart({ id, quantity: value }));
    } else {
      const transformCartLocal = cartItem.items.map((item) => {
        return item.id === id
          ? { bookId: item.item.id, total: value }
          : { bookId: item.item.id, total: item.quantity };
      });
      setItemDataStorage(
        LocalStorageKey.BookStoreCart,
        JSON.stringify(transformCartLocal),
      );
      dispatch(updateQuantityCart({ id, quantity: value }));
    }
  };
  return (
    <tr key={id}>
      <td className="product-thumbnail">
        <a>
          <Image src={item.thumbnail} alt="product img" />
        </a>
      </td>
      <td className="product-name">
        <Link href={`${Routers.products.path}/${item.id}`}>
          <a>{item.name}</a>
        </Link>
      </td>
      <td className="product-price">
        <span className="amount">{moneyFormat(item.price)}</span>
      </td>
      <td className="product-quantity">
        <input
          type="number"
          defaultValue={quantityLine}
          value={quantityLine}
          onChange={handleChangeQuantity}
        />
      </td>
      <td className="product-subtotal">
        {moneyFormat(item.price * quantityLine)}
      </td>
      <td className="product-remove">
        <a
          style={{ cursor: 'pointer' }}
          onClick={() => handleRemoveItemCart(id)}
        >
          X
        </a>
      </td>
    </tr>
  );
};

export default CartLine;
