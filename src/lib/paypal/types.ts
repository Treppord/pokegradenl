export interface PaymentItem {
  name: string
  description: string
  quantity: number
  unit_amount: {
    currency_code: string
    value: string
  }
}

export interface PaymentOrder {
  id: string
  email: string
  amount: number
  currency: string
  items: PaymentItem[]
  customer_info?: {
    first_name?: string
    last_name?: string
    phone?: string
  }
}

export interface CreateOrderResponse {
  orderId: string
  approvalUrl: string
}

export interface CaptureOrderResponse {
  orderId: string
  payerInfo: {
    email: string
    firstName?: string
    lastName?: string
    payerId: string
  }
  amount: number
  currency: string
  status: string
}
