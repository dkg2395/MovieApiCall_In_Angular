import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from "rxjs/internal/Observable/of";
import { StockService } from './stock.service';

describe('StockService', () => {
    let stockService: StockService;
    let http: HttpClient;
    const httpSpy = jasmine.createSpyObj('http', ['get']);

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
        TestBed.configureTestingModule({
            providers: [
                StockService,
                { provide: HttpClient, useValue: httpSpy }
            ]
        });

        stockService = TestBed.inject(StockService);
        http = TestBed.inject(HttpClient);
    });

    it('should search stock details', () => {
        http.get = jasmine.createSpy().and.returnValue(of(stockDetails));
        const requestParam = {
            companyName: 'CT01',
            startDate: '2022-06-16T00:00:00',
            endDate: '2022-06-25T23:59:59'
        }
        stockService.searchStocks(requestParam).subscribe((data) => {
            expect(data).toEqual(stockDetails);
        })
    });

    it('should search stock details in service without data', () => {
        http.get = jasmine.createSpy().and.returnValue(of([]));
        const requestParam = {
            companyName: 'CT02',
            startDate: '2022-06-18T00:00:00',
            endDate: '2022-06-25T23:59:59'
        }
        stockService.searchStocks(requestParam).subscribe((data) => {
            expect(data).toEqual([]);
        })
    });

    it('should addStock stock for company', () => {
        const requestParam = {
            companyCode: 'CT02',
            price: '123.3'
        }
        http.post = jasmine.createSpy().and.returnValue(of({ price: 123.3, createdAt: '2022-06-20T06:57:55.327+00:00' }));

        stockService.addStock(requestParam).subscribe((data) => {
            expect(data).toEqual(jasmine.objectContaining({
                price: 123.3,
                createdAt: '2022-06-20T06:57:55.327+00:00'
            }));
        })
    });
})