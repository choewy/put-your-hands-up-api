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
  Ambient = '실온',
  RefrigeratedOrFrozen = '냉장/냉동',
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

export enum RecallStatus {
  Wating = 0,
  Complete = 1,
  Cancel = 2,
}

export enum LockTarget {}

export enum InventoryStatus {
  Availabled = 1,
  Disabled = 2,
}

export enum BoxType {
  Ambient = '실온',
  Refrigerated = '냉장',
  Frozen = '냉동',
}
