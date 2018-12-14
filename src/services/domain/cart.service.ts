import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Cart } from '../../models/cart';
import { LivroDTO } from '../../models/livro.dto';

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {
    }

    createOrClearCart() : Cart {
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addLivro(livro: LivroDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.livro.id == livro.id);
        if (position == -1) {
            cart.items.push({quantidade: 1, livro: livro});
        }
        this.storage.setCart(cart);
        return cart;
    }

    removeLivro(livro: LivroDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.livro.id == livro.id);
        if (position != -1) {
            cart.items.splice(position, 1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    increaseQuantity(livro: LivroDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.livro.id == livro.id);
        if (position != -1) {
            cart.items[position].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(livro: LivroDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.livro.id == livro.id);
        if (position != -1) {
            cart.items[position].quantidade--;
            if (cart.items[position].quantidade < 1) {
                cart = this.removeLivro(livro);
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    total() : number {
        let cart = this.getCart();
        let sum = 0;
        for (var i=0; i<cart.items.length; i++) {
            sum += cart.items[i].livro.preco * cart.items[i].quantidade;
        }
        return sum;
    }
}
