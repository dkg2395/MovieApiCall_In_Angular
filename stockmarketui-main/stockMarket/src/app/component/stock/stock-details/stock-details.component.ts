import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StockService } from 'src/app/service/stock/stock.service';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { StockFields } from 'src/app/common/stock-interface';
import { CompanyService } from 'src/app/service/company/company.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit, AfterViewInit {
  public stockDetailsForm!: FormGroup;
  companyNames: any = [];
  stockDetailsList: any = [];
  maxStock!: StockFields;
  minStock!: StockFields;
  avgStock: number = 0;
  noRecords: boolean = false;
  displayedColumns: string[] = ['price', 'lastUpdate','time'];

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private stockService: StockService,
    private companyService: CompanyService
  ) { }

  ngAfterViewInit() {
    this.stockDetailsList.paginator = this.paginator;
  }

  ngOnInit() {
    this.stockDetailsForm = new FormGroup({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required)
    });
    this.getCompanyDetails();
  }

  getCompanyDetails = () => {
    this.companyService.companyList().subscribe((data:any) => {
      this.companyNames = data;
    });
  }

  searchStocks = (value: any) => {
    value.startDate = moment(value.startDate).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
    value.endDate = moment(value.endDate).endOf('day').format('YYYY-MM-DDTHH:mm:ss');
    this.stockService.searchStocks(value).subscribe((data) => {
      this.stockDetailsList = data;
      let totalPrice = 0;
      this.noRecords = this.stockDetailsList.length > 0 ? false : true;
      if (this.stockDetailsList.length > 0) {
        this.stockDetailsList.forEach((element: { price: number; }) => {
          totalPrice += element.price;
        });
        this.maxStock = this.stockDetailsList.reduce((prev:StockFields, curr:StockFields) => 
          prev.price < curr.price ? curr : prev
        );
        
        this.minStock = this.stockDetailsList.reduce((prev:StockFields, curr:StockFields) =>
          prev.price < curr.price ? prev : curr
        );
        this.avgStock = totalPrice / this.stockDetailsList.length;
      }
    });
  }

}
