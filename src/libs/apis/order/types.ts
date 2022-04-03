export interface ShippingMethod {
  firstName?: string;
  lastName?: string;
  provice?: string;
  district?: string;
  wards?: string;
  privateHome?: string;
  phoneNumber?: string;
  email?: string;
}

export enum IPaymentMethod {
  VisaCard = 'VisaCard',
  COD = 'COD',
}

export enum IPaymentStatus {
  Pending = 'pending',
  Success = 'success',
  Rejected = 'rejected',
}

export interface IOrderLine {
  bookId: string;
  quantity: number;
  price: number;
}

export interface IOrderInput {
  totalMoney: number;
  discount: number;
  status: IPaymentStatus;
  paymentMethod: IPaymentMethod;
  shippingMethod: ShippingMethod;
  orderLines: IOrderLine[];
}
