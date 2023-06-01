export class CartItem {
  public id?: number;
  public cartId?: number;
  public productId?: number;
  public amount?: number;

  constructor(props: CartItem) {
    Object.assign(this, props);
  }
}
