import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from "rxjs/internal/Observable/of";
import { CompanyDetailsComponent } from './company-details.component';
import { CompanyService } from '../../../service/company/company.service';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { StockService } from 'src/app/service/stock/stock.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CompanyDetailsComponent', () => {
  let component: CompanyDetailsComponent;
  let fixture: ComponentFixture<CompanyDetailsComponent>;
  let companyService: CompanyService;
  let stockService: StockService;
  let modalServiceSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpyObj = jasmine.createSpyObj(
    {
      close: null,
      componentInstance: {
        onAdd: (data: any) => of({ data })
      }
    }
  );

  const companyDetails = [{
    "name": "Cognizant",
    "ceo": "Brian Brian",
    "companyCode": "CT01",
    "turnover": 10000000,
    "website": "www.google.com",
    "bse": true,
    "nse": false,
    "latestStock": 0
  }];

  beforeEach(async () => {
    modalServiceSpy = jasmine.createSpyObj('modalService', ['open']);
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, BrowserAnimationsModule],
      declarations: [CompanyDetailsComponent],
      providers: [
        CompanyService,
        StockService,
        Overlay,
        { provide: MAT_DIALOG_DATA, useValue: modalServiceSpy }
      ]
    })
      .compileComponents();
    companyService = TestBed.inject(CompanyService);
    stockService = TestBed.inject(StockService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    modalServiceSpy.open.and.returnValue(dialogRefSpyObj);
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
  });

  it('should get company stocks', () => {
    component.companyList = companyDetails;
    spyOn(stockService, 'stockList').and.returnValue(of(
      [{
        price: '1234',
        createdAt: '2022'
      }]
    ));
    component.getStocks('CT01', 0);
    expect(stockService.stockList).toHaveBeenCalledWith("CT01");
    expect(component.companyList[0].latestStock).toBe('1234');
  });

  it('should get company stocks', () => {
    component.companyList = companyDetails;
    spyOn(stockService, 'stockList').and.returnValue(of(
      []
    ));
    component.getStocks('CT01', 0);
    expect(stockService.stockList).toHaveBeenCalledWith("CT01");
    expect(component.companyList[0].latestStock).toBe(0);
  });

  /* it('should open mat dialog', () => {
     const returnedVal = {
       open: () => of({
 
       })
     };
     let stockDetails = [{
       price: "123.3",
       createdAt: "2022-03-22"
     }];
 
     component.viewCompanyDetails('CT01', {});
     let company = {
       name: "Cognizant",
       ceo: "Brian Brian",
       companyCode: "CT01",
       turnover: 10000000,
       website: "www.google.com",
       bse: true,
       nse: false,
       latestStock: 0
     }
     expect(component.companyDetails).toEqual(companyDetails);
     expect(component.stockList).toEqual(stockDetails);
   });
 
   it('should open mat dialogv for deleteCompany ', () => {
     const returnedVal = {
       open: () => of({
 
       })
     };
     component.deleteCompany('CT01', {});
     expect(component.companyCodeHidden).toBe('CT01');
   });*/

  it('should call remove company ', () => {
    component.removeCompany();
  });
});
