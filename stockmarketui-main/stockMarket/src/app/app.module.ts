import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { StockService } from './service/stock/stock.service';
import { HttpClientModule } from '@angular/common/http';

import { CompanyModule } from "./component/company/company.module";
import { StockModule } from "./component/stock/stock.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CompanyModule,
    StockModule
  ],
  declarations: [
    AppComponent
  ],
  exports: [
    AppComponent,
    MaterialModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
