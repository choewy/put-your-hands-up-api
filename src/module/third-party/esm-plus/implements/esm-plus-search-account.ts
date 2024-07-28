export class EsmPlusSearchAccount {
  private esm: string = '';
  private gmarket: string = '';
  private auction: string = '';

  public getEsmAccount() {
    return this.esm;
  }

  public setEsmAccount(account: string) {
    this.esm = account;
  }

  public getGmarketAccount() {
    return this.gmarket;
  }

  public setGmarketAccount(account: string) {
    this.gmarket = account;
  }

  public getAuctionAccount() {
    return this.auction;
  }

  public setAuctionAccount(account: string) {
    this.auction = account;
  }
}
