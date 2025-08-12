export enum PaymentMethod {
    cash = 'cash',
    debit = 'debit',
    credit = 'credit',
    mercadopago = 'mercadopago',
}
  
export enum UserType {
    customer = 'customer',
    admin = 'admin'
}

export enum OrderStatus {
    created = 'created',
    running = 'running',
    done = 'done',
    failure = 'failure',
}

export enum UserGender {
    male = 'male',
    female = 'female',
}