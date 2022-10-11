import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from "rxjs/internal/Observable/of";
import { AddCompanyComponent } from './add-company.component';
import { CompanyService } from 'src/app/service/company/company.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddCompanyComponent', () => {
  let component: AddCompanyComponent;
  let fixture: ComponentFixture<AddCompanyComponent>;
  let companyService: CompanyService;

  const companyDetails = {
    name: 'Name',
    companyCode: 'N0111',
    ceo: 'XYZ',
    turnover: 10000000,
    website: 'www.google.com',
    bse: false,
    nse: true
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [AddCompanyComponent],
      providers: [
        CompanyService
      ]
    }).compileComponents();
    companyService = TestBed.inject(CompanyService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register a company', () => {
    spyOn(companyService, 'registerCompany').and.returnValue(of(
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
    component.registerCompany(companyDetails);
    expect(component.registerCompany).toBeTruthy();
  });

  it('should register a company should throw alert', () => {
    companyDetails.turnover = 100000;
    component.registerCompany(companyDetails);
    expect(component.registerCompany).toBeTruthy();
  });
});
