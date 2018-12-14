import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderConfirmationPage } from './order-confirmation';
import { RetiradaService } from '../../services/domain/retirada.service';

@NgModule({
  declarations: [ 
    OrderConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderConfirmationPage),
  ],
  providers: [
    RetiradaService
  ]
})
export class OrderConfirmationPageModule {}
