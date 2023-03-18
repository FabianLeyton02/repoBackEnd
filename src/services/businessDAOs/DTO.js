export default class BusinessDTO {
  constructor(business) {
    this.id = business._id;
    this.name = business.name;
    this.description = business.description;
    this.products = business.products;
  }
}
