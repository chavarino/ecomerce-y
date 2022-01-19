import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './pages/products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { CatFilterPipe } from './pipes/cat-filter.pipe';
import { GetCategoriasPipe } from './pipes/get-categorias.pipe';
import { FilterListNComponent } from './components/filter-list-n/filter-list-n.component';
import { SortFilterPipe } from './pipes/sort-filter.pipe'
@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,
    ProductListComponent,
    FooterComponent,
    ProductsComponent,
    ProductDetailComponent,
    CatFilterPipe,
    GetCategoriasPipe,
    FilterListNComponent,
    SortFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
