import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { StockFields } from "src/app/common/stock-interface"

@Injectable()
export class StockService {
    constructor(private http: HttpClient) { }

    //private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    public searchStocks(requestParam: any) {
        return this.http.get(`${environment.stockBaseApiUrl}stock/get/${requestParam.companyName}/${requestParam.startDate}/${requestParam.endDate}`);
    }

    public stockList(requestParam: string) {
        return this.http.get(`${environment.stockBaseApiUrl}stock/get/${requestParam}`);
    }

    public addStock(requestParam: StockFields) {
        return this.http.post(`${environment.stockBaseApiUrl}stock/add`, requestParam);
    }

    public removeStocks(requestParam: string) {
        return this.http.delete(`${environment.stockBaseApiUrl}stock/delete/${requestParam}`);
    }
}