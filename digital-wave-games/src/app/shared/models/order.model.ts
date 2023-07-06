export interface Order {
    id: number;
    totalPrice: number;
    expectedDeliveryDate: Date;
    purchaseDate: Date;
    paymentType: number;
    userClientId: number;
}