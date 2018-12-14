import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LivroDetailPage } from './livro-detail';

@NgModule({
  declarations: [
    LivroDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LivroDetailPage),
  ],
})
export class LivroDetailPageModule {}
