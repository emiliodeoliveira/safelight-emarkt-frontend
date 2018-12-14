import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LivroDTO } from '../../models/livro.dto';
import { LivroService } from '../../services/domain/livro.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-livro-detail',
  templateUrl: 'livro-detail.html',
})
export class LivroDetailPage {

  item: LivroDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public livroService: LivroService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let livro_id = this.navParams.get('livro_id');
    this.livroService.findById(livro_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
      error => {});
  }

  getImageUrlIfExists() {
    this.livroService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      error => {});
  }

  addToCart(livro: LivroDTO) {
    this.cartService.addLivro(livro);
    this.navCtrl.setRoot('CartPage');
  }
}
