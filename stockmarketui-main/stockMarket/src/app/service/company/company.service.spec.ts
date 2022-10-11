import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from "rxjs/internal/Observable/of";
import { CompanyService } from './company.service';

describe('CompanyService', () => {
    let companyService: CompanyService;
    let http: HttpClient;
    const httpSpy = jasmine.createSpyObj('http', ['post']);

    const companyDetails = {
        name: 'Name',
        code: 'N0111',
        ceo: 'ABC',
        companyCode: 'XYZ',
        turnover: 100000000,
        website: 'www.google.com',
        stockExchange: 'bse',
        bse: true,
        nse: false
    }

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                CompanyService,
                { provide: HttpClient, useValue: httpSpy }
            ]
        });

        companyService = TestBed.inject(CompanyService);
        http = TestBed.inject(HttpClient);
    });

    it('should register company', () => {
        http.post = jasmine.createSpy().and.returnValue(of(companyDetails));
        companyService.registerCompany(companyDetails).subscribe((data) => {
            expect(data).toEqual(companyDetails);
        })
    });

    it('should get Company Details', () => {
        http.get = jasmine.createSpy().and.returnValue(of(companyDetails));
        companyService.getCompanyDetails("CT01").subscribe((data) => {
            expect(data).toEqual(companyDetails);
        })
    });
})