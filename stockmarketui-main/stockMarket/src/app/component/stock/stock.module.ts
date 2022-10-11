import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { StockDetailsComponent } from "./stock-details/stock-details.component";
import { AddStockComponent } from "./add-stock/add-stock.component";
import { StockService } from 'src/app/service/stock/stock.service';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [
    StockDetailsComponent,
    AddStockComponent
  ],
  exports: [
    StockDetailsComponent,
    AddStockComponent
  ],
  providers: [StockService]
})
export class StockModule { }
