export default class ShirtModel {

  id = '';
  size = 's';
  price = 0;
  isMens = false;
  caption = '';
  color = '';
  thumbnailUri = '';

  constructor(id, size, isMens, caption, color, thumbnailUri) {
    this.id = id;
    this.size = size;
    this.isMens = isMens;
    this.caption = caption;
    this.color = color;
    this.thumbnailUri = thumbnailUri;

    let price = 10;
    switch (size) {
      case 'S' :
        price = 10;
        break;
      case 'M' :
        price = 11;
      break;
      case 'L' :
        price = 12;
      break;
    }
    this.price = price;
  }

}
