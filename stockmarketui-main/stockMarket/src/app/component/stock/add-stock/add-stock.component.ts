import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StockService } from 'src/app/service/stock/stock.service';
import { StockFields } from 'src/app/common/stock-interface';
import { CompanyService } from 'src/app/service/company/company.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit, AfterViewInit {
  public addStockForm!: FormGroup;
  companyNames: any = [];
  stockList: any = [];
  displayedColumns: string[] = ['price', 'lastUpdate'];

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private stockService: StockService,
    private companyService: CompanyService,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.stockList.paginator = this.paginator;
  }

  ngOnInit() {
    this.addStockForm = new FormGroup({
      price: new FormControl('', Validators.required),
      companyCode: new FormControl('', Validators.required)
    });
    this.getCompanyDetails();
  }

  getCompanyDetails = () => {
    this.companyService.companyList().subscribe((data) => {
      this.companyNames = data;
    });
  }

  addStocks = (value: StockFields) => {
    value.price = parseFloat(value.price).toFixed(2);
    this.stockService.addStock(value).subscribe((data) => {
      alert('Successfully added stock for ' + value.companyCode);
      this.searchStock(value.companyCode);
    });
  }

  searchStock = (companyCode: string) => {
    this.stockService.stockList(companyCode).subscribe((stockdata: any) => {
      this.stockList = stockdata;
      this.stockList.paginator = this.paginator;
    })
  }
}
