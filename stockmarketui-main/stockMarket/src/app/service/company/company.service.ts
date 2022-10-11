import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyFields } from 'src/app/common/company-interface';
import { Constants } from 'src/app/common/constants';
import { environment } from "../../../environments/environment";

@Injectable()
export class CompanyService {
    constructor(private http: HttpClient) { }
    //private url = Constants.Company_BASE_URL;
    //private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    public registerCompany(requestParam: CompanyFields) {
        return this.http.post(`${environment.companyBaseApiUrl}company/register`, requestParam);
    }

    public companyList() {
        return this.http.get(`${environment.companyBaseApiUrl}company/getall`);
    }

    public getCompanyDetails(code: string) {
        return this.http.get(`${environment.companyBaseApiUrl}company/info/${code}`);
    }

    public removeCompanyDetails(code: string) {
        return this.http.delete(`${environment.companyBaseApiUrl}company/delete/${code}`);
    }
}