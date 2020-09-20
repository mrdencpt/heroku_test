import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../ShareService';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  name: string
  tel: string
  tax: string
  address: string
  _id: string

  constructor(
    private http: HttpClient,
    private sharservice: ShareService
  ) { }

  ngOnInit(): void {
    //ให้ loadInfo ทำงาน
    this.loadInfo();
  }
  //เรียก Data กลับมาใส่จอ  res: any ค่านี้ไม่ให้ Error ตอนที่ไม่มีข้อมูล
  loadInfo() {
    this.http.get(this.sharservice.serverPath + '/clinicInfo').subscribe((res: any) => {
      this.name = res.name;
      this.tel = res.tel;
      this.tax = res.tax;
      this.address = res.address;
      this._id = res._id;
    });
  }

  save() {
    var params = {
      name: this.name,
      tel: this.tel,
      tax: this.tax,
      address: this.address,
      _id: this._id
    }
    // เดิม กรณี ยังไม่มีข้อมูล
    // if (this._id == null) {
    //   this.http.post(this.sharservice.serverPath + '/clinicSave', params).subscribe((res: any) => {
    //     console.log(res.data)
    //   });
    // } else {
    //   this.http.post(this.sharservice.serverPath + '/clinicUpdate', params).subscribe((res: any) => {

    //   }); เขียนใหม่เป็น
    var path = this.sharservice.serverPath + '/clinicSave';
    if (this._id != null) {
      var path = this.sharservice.serverPath + '/clinicUpdate';
    }

    this.http.post(path, params).subscribe((res: any) => {
      console.log(res.data)
    });

  }
}
