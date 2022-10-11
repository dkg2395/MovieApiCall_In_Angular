import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from 'src/app/service/company/company.service';
import { StockService } from 'src/app/service/stock/stock.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit, AfterViewInit {
  companyList: any = [];
  stockList: any = [];
  displayedColumns: string[] = ['code', 'name', 'ceo', 'turnover', 'website', 'stockExchange', 'stockPrice', 'action'];
  displayStockColumns: string[] = ['price', 'lastUpdate'];

  companyDetails: any = {};
  latestStock: number = 0;
  @ViewChild('paginator2', { read: MatPaginator }) paginator2?: MatPaginator;
  @ViewChild(MatPaginator) paginator1?: MatPaginator;
  companyCodeHidden!: string;

  constructor(
    private dialog: MatDialog,
    private companyService: CompanyService,
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.getCompanyList();
  }

  ngAfterViewInit() {
    this.companyList.paginator = this.paginator1;
    this.stockList.paginator = this.paginator2;
  }

  getCompanyList = () => {
    this.companyService.companyList().subscribe((data) => {
      this.companyList = data;
      this.companyList.forEach((element: any, i: number) => {
        this.getStocks(element.companyCode, i);
      });
    });
  }

  getStocks = (companyCode: string, i: number) => {
    this.stockService.stockList(companyCode).subscribe((stockdata: any) => {
      this.companyList[i].latestStock = stockdata.length > 0 ? stockdata[0].price : 0;
    });
  }

  viewCompanyDetails = (code: string, template: any) => {
    let dialogRef = this.dialog.open(template, {
      width: '80%'
    });
    forkJoin([this.companyService.getCompanyDetails(code), this.stockService.stockList(code)]).subscribe(([companyDetails, stockDetails]) => {
      this.companyDetails = companyDetails;
      this.stockList = stockDetails;
    });
    this.companyList.paginator = this.paginator1;
  }

  deleteCompany = (code: string, template: any) => {
    let dialogRef = this.dialog.open(template);
    this.companyCodeHidden = code;
  }

  removeCompany = () => {
    forkJoin([this.companyService.removeCompanyDetails(this.companyCodeHidden), this.stockService.removeStocks(this.companyCodeHidden)]).subscribe()
    alert('Successfully delete company and stock details of ' + this.companyCodeHidden);
    this.getCompanyList();
  }
}
