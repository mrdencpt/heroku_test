import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../ShareService';

@Component({
  selector: 'app-madiceen',
  templateUrl: './madiceen.component.html',
  styleUrls: ['./madiceen.component.css']
})
export class MadiceenComponent implements OnInit {

  madiceens: any

  madiceen = {
    code: null,
    name: null,
    buy: null,
    sale: null,
    remark: null,
    _id: null
  }

  constructor(
    private http: HttpClient,
    private shareService: ShareService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  save() {
    //console.log(this.madiceen)

    if (this.madiceen._id != null) {
      if (confirm("คุณต้องการแก้ไขข้อมูล '" + this.madiceen.code + "' ใช่หรือไม่?")) {
        var path = this.shareService.serverPath + '/madiceenUpdate'
        var tmpStr = "แก้ไข"
      } else {
        return;
      }
    } else {
      if (confirm("คุณต้องการเพิ่มข้อมูล ใช่หรือไม่")) {
        var path = this.shareService.serverPath + '/madiceenSave'
        var tmpStr = "เพิ่ม"
      } else {
        return;
      }
    }

    // alert("aaaa");
    // return;

    this.http.post(path, this.madiceen).subscribe((res: any) => {
      alert(tmpStr + " ข้อมูลเรียบร้อยแล้วครับ");
      // ล้างค่า ฟอร์ม input
      this.madiceen = {
        code: null,
        name: null,
        buy: null,
        sale: null,
        remark: null,
        _id: null
      }

      this.loadData();
    });
  }

  loadData() {
    this.http.get(this.shareService.serverPath + '/madiceenAll').subscribe((res: any) => {
      this.madiceens = res
    });

    //console.log(this.madiceens);
  }

  mediceenDelete(item) {
    if (confirm("ต้องการลบ รหัส '" + item.code + "' ใช่หรือไม่? ")) {
      var param = {
        _id: item._id
      }

      var path = this.shareService.serverPath + '/mediceenDelete'

      this.http.post(path, param).subscribe((res: any) => {
        //alert('ลบสำเร็จ');
        this.loadData();
      });
    }
  }

  mediceenInfo(item) {
    this.madiceen = {
      code: item.code,
      name: item.name,
      buy: item.buy,
      sale: item.sale,
      remark: item.remark,
      _id: item._id
    }
  }

  mediceenAdd() {
    this.madiceen = {
      code: null,
      name: null,
      buy: null,
      sale: null,
      remark: null,
      _id: null
    }
  }
}

