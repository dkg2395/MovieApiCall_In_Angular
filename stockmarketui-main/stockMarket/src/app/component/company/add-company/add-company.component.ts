import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/service/company/company.service';
import { CompanyFields } from 'src/app/common/company-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  public newCompanyForm!: FormGroup;

  constructor(
    private companyService: CompanyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.newCompanyForm = new FormGroup({
      name: new FormControl('', Validators.required),
      companyCode: new FormControl('', Validators.required),
      ceo: new FormControl('', Validators.required),
      turnover: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      stockExchange: new FormControl('', Validators.required)
    });
  }

  registerCompany = (value:CompanyFields) => {
    if(value.turnover < 10000000) {
      alert('Please enter turnover greater than 10000000.');
      return;
    }
    value.bse = value.stockExchange === 'bse' ? true : false;
    value.nse = value.stockExchange === 'nse' ? true : false;
    this.companyService.registerCompany(value).subscribe((data) => {
      alert("Successfully registered company");
      this.router.navigate(['./list']);
    });
  }

}
