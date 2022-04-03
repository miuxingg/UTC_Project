export interface IBookCart {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  priceUnDiscount: number;
}

export interface ICartApi {
  id: string;
  item: IBookCart;
  quantity: number;
}

export interface ICartApiUpload {
  bookId: string;
  quantity: number;
}
