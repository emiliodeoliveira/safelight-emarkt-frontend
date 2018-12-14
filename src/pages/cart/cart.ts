import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { LivroService } from '../../services/domain/livro.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { LivroDTO } from '../../models/livro.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public livroService: LivroService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.livroService.getSmallImageFromBucket(item.livro.id)
        .subscribe(response => {
          item.livro.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.livro.id}-small.jpg`;
        },
        error => {});
    }
  }  

  removeItem(livro: LivroDTO) {
    this.items = this.cartService.removeLivro(livro).items;
  }

  increaseQuantity(livro: LivroDTO) {
    this.items = this.cartService.increaseQuantity(livro).items;
  }

  decreaseQuantity(livro: LivroDTO) {
    this.items = this.cartService.decreaseQuantity(livro).items;
  }

  total() : number {
    return this.cartService.total();
  }  

  goOn() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout() {
    this.navCtrl.push('PickAddressPage');
  }
}
