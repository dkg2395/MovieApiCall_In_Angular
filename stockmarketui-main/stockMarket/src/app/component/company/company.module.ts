import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { AddCompanyComponent } from "./add-company/add-company.component";
import { CompanyDetailsComponent } from "./company-details/company-details.component";
import { CompanyService } from 'src/app/service/company/company.service';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [
    AddCompanyComponent,
    CompanyDetailsComponent
  ],
  exports: [
    AddCompanyComponent,
    CompanyDetailsComponent,
    MaterialModule
  ],
  providers: [CompanyService]
})
export class CompanyModule { }
