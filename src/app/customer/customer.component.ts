import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../ShareService';

import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';

//import 'node_modules/sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  code: string
  name: string
  email: string
  tel: string
  line_id: string
  address: string
  _id: string
  tmpMsg: string
  // ประกาศตัวแปร เป็น aray
  customers: [];

  constructor(
    private http: HttpClient,
    private shareService: ShareService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    var path = this.shareService.serverPath + '/customerAll';
    this.http.get(path).subscribe((res: any) => {
      this.customers = res //aray customers เก็บรายการไว้
    });
  }

  save() {
    //มีข้อความถาม
    Swal.fire({
      title: 'ยืนยันบันทึก !',
      text: 'คุณต้องกาบันทึกข้อมูล ใช่หรือไม่ ?',
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        var param = {
          code: this.code,
          name: this.name,
          email: this.email,
          tel: this.tel,
          line_id: this.line_id,
          address: this.address,
          _id: null
        }

        var path = this.shareService.serverPath + '/customerSave';
        this.tmpMsg = "เพิ่มข้อมูล สำเร็จ";

        if (this._id != null) {
          path = this.shareService.serverPath + '/customerUpdate';
          param._id = this._id;
          this.tmpMsg = "แก้ไขข้อมูล สำเร็จ";
        }

        this.http.post(path, param).subscribe((res: any) => {
          Swal.fire(
            'สำเร็จ !',
            this.tmpMsg,
            'success'
          )

          this.loadData();
          this._id = null;
        });
      }
    })
  }

  customerDelete(item) {

    Swal.fire({
      title: 'ยืนยันการลบ !',
      text: 'คุณต้องการลบข้อมูล ใช่หรือไม่ ?',
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      //focusConfirm: false,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        var param = {
          _id: item._id
        }
        var path = this.shareService.serverPath + '/customerDelete';
        this.http.post(path, param).subscribe((res: any) => {
          //alert("ลบเรียบร้อย");
          Swal.fire(
            'สำเร็จ !',
            'ลบข้อมูลแล้ว',
            'success'
          )
          this.loadData();
        });
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        // } else if (result.dismiss === Swal.DismissReason.cancel) {
        //    Swal.fire(
        //       'ยกเลิก',
        //       'ยกเลิกการลบแล้ว :)',
        //       'error'
        //    )
      }
    })

    // if (confirm("คุณต้องการลบข้อมูล ใช่หรือไม่ ?")) {
    //   var param = {
    //     _id: item._id
    //   }
    //   var path = this.shareService.serverPath + '/customerDelete';
    //   this.http.post(path, param).subscribe((res: any) => {
    //     //alert("ลบเรียบร้อย");
    //     Swal.fire(
    //       'สำเร็จ !',
    //       'ลบข้อมูลแล้ว',
    //       'success'
    //     )
    //     this.loadData();
    //   });
    //}
  }

  customerInfo(item) {
    this.code = item.code
    this.name = item.name
    this.email = item.email
    this.tel = item.tel
    this.line_id = item.line_id
    this.address = item.address
    this._id = item._id
  }

}
