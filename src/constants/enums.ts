export enum UserPrivilige {
  User = 0,
  SystemAdmin = 9,
}

export enum ProductType {
  Single = '단품',
  Set = '세트',
}

export enum ProductUnit {
  Each = 'EA',
  Package = 'PK',
  Case = 'CS',
}

export enum ProductTemperature {
  Room = '실온',
  Refrigerator = '냉장/냉동',
}

export enum OrderStatus {
  Wating = 0,
  Complete = 1,
  Cancle = 2,
}

export enum OrderClaimType {
  Exchange = 0,
  Return = 1,
}
