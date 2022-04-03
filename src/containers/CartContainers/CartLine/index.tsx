import { styled } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { moneyFormat } from '../../../libs/utils';
import { removeItem } from '../../../redux/cart';

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

  const [quantityLine, setQuantityLine] = useState<number>(quantity);

  const handleRemoveItemCart = (id: string) => {
    dispatch(removeItem(id));
  };
  return (
    <tr key={id}>
      <td className="product-thumbnail">
        <a>
          <Image src={item.thumbnail} alt="product img" />
        </a>
      </td>
      <td className="product-name">
        <a>{item.name}</a>
      </td>
      <td className="product-price">
        <span className="amount">{moneyFormat(item.price)}</span>
      </td>
      <td className="product-quantity">
        <input
          type="number"
          defaultValue={quantityLine}
          onChange={(e) => setQuantityLine(+e.target.value)}
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
