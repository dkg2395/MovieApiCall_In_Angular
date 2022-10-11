import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from "rxjs/internal/Observable/of";
import { StockDetailsComponent } from './stock-details.component';
import { StockService } from 'src/app/service/stock/stock.service';
import { CompanyService } from 'src/app/service/company/company.service';

describe('StockDetailsComponent', () => {
  let component: StockDetailsComponent;
  let fixture: ComponentFixture<StockDetailsComponent>;
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
      declarations: [StockDetailsComponent],
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
    fixture = TestBed.createComponent(StockDetailsComponent);
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
    spyOn(stockService, 'searchStocks').and.returnValue(of(stockDetails));
    const requestParam = {
      companyName: 'CT01',
      startDate: '2022-06-16',
      endDate: '2022-06-20'
    }

    component.searchStocks(requestParam);

    expect(component.searchStocks).toBeTruthy();
    expect(component.stockDetailsList.length).toEqual(3);
  });

  it('should search stock details with no data', () => {
    const requestParam = {
      companyName: 'CT01',
      startDate: '2022-06-18',
      endDate: '2022-06-25'
    }

    spyOn(stockService, 'searchStocks').and.returnValue(of([]));

    component.searchStocks(requestParam);

    expect(component.searchStocks).toBeTruthy();
    expect(component.stockDetailsList.length).toBe(0);
  });
});
