import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './component/company/add-company/add-company.component';
import { CompanyDetailsComponent } from './component/company/company-details/company-details.component';
import { StockDetailsComponent } from './component/stock/stock-details/stock-details.component';
import { AddStockComponent } from './component/stock/add-stock/add-stock.component';

const routes: Routes = [
  {
    path: 'registercompany',
    component: AddCompanyComponent
  },
  {
    path: 'list',
    component: CompanyDetailsComponent
  },
  {
    path: 'stocklist',
    component: StockDetailsComponent
  },
  {
    path: 'addstock',
    component: AddStockComponent
  },
  {
    path: '',
    component: CompanyDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
