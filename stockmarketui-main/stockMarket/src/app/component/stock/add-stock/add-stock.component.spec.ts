import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from "rxjs/internal/Observable/of";
import { AddStockComponent } from './add-stock.component';
import { StockService } from 'src/app/service/stock/stock.service';
import { CompanyService } from 'src/app/service/company/company.service';

describe('AddStockComponent', () => {
  let component: AddStockComponent;
  let fixture: ComponentFixture<AddStockComponent>;
  let stockService: StockService;
  let companyService: CompanyService;

  const companyDetails = [{
    "name": "Cognizant",
    "ceo": "Brian Brian",
    "companyCode": "CT01",
    "turnover": 10000000,
    "website": "www.google.com",
    "bse": true,
    "nse": false
  }]

  const stockDetails = [
    {
      "price": 1505.56,
      "createdAt": "2022-06-20T06:58:06.339+00:00"
    },
    {
      "price": 1505,
      "createdAt": "2022-06-20T06:57:55.327+00:00"
    },
    {
      "price": 505,
      "createdAt": "2022-06-16T14:11:02.241+00:00"
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [AddStockComponent],
      providers: [
        StockService,
        CompanyService
      ]
    })
      .compileComponents();

    stockService = TestBed.inject(StockService);
    companyService = TestBed.inject(CompanyService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get company details on init', () => {
    spyOn(companyService, 'companyList').and.returnValue(of(
      [{
        name: "Cognizant",
        ceo: "Brian Brian",
        companyCode: "CT01",
        turnover: 10000000,
        website: "www.google.com",
        bse: true,
        nse: false
      }]
    ));
    component.ngOnInit();
    expect(companyService.companyList).toHaveBeenCalled();
    expect(component.companyNames).toEqual(companyDetails);
  });

  it('should search stock details', () => {
    spyOn(stockService, 'stockList').and.returnValue(of(stockDetails));

    component.searchStock('CT01');

    expect(component.searchStock).toBeTruthy();
    expect(component.stockList.length).toEqual(3);
  });

  it('should search stock details with no data', () => {
    const requestParam = {
      companyName: 'CT01',
      startDate: '2022-06-18',
      endDate: '2022-06-25'
    }

    spyOn(stockService, 'stockList').and.returnValue(of([]));

    component.searchStock('CT01');

    expect(component.searchStock).toBeTruthy();
    expect(component.stockList.length).toBe(0);
  });

  it('should search stock details with no data', () => {
    const requestParam = {
      companyCode: 'CT02',
      price: '123.3'
    }

    spyOn(stockService, 'addStock').and.returnValue(of(stockDetails));

    component.addStocks(requestParam);

    expect(component.addStocks).toBeTruthy();
  });
});
