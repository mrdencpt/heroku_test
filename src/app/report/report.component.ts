import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../ShareService';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  search = {
    from: null,
    to: null
  }

  repairs: any; //ตั้งตัวแปรขึ้นมารับข้อมูล จาก nodejs backend
  totalPrice: Number;

  constructor(
    private http: HttpClient,
    private sharService: ShareService
  ) { }

  ngOnInit(): void {
  }

  showReport() {
    //console.log(this.search);
    this.http.post(this.sharService.serverPath + '/reportAll', this.search).subscribe((res: any) => {
      //console.log(res);
      this.repairs = res;
      this.totalPrice = 0;
      for (var i = 0; i < res.length; i++) {
        this.totalPrice += res[i].price;
      }
    });
  }
}
