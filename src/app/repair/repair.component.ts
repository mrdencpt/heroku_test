import { Component, OnInit, ɵSWITCH_TEMPLATE_REF_FACTORY__POST_R3__ } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../ShareService';

import Swal from 'node_modules/sweetalert2/dist/sweetalert2.js';

//import { Directive, HostListener, ElementRef } from '@angular/core';


declare function closeModal(): any;

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  customers: any;
  pets: any;
  repairs: any;
  mediceens: any;
  historys: any;

  customer = {
    name: null,
    code: null,
    _id: null
  }
  pet = {
    _id: null,
    name: null //เติมเองไม่ตามสอน 
  }
  repair = {
    problem: null,  // เติมเอง แก้ปัญหา Error
    price: null,
    remark: null
  }

  repairMediceen = {
    _id: null,
    qty: null,
    remark: null,
    mediceen_id: null,
    repair_id: null
  }

  constructor(
    private http: HttpClient,
    private shareService: ShareService

    //private el: ElementRef
  ) { }

  ngOnInit(): void {
  }

  loadCustomers() {
    this.http.get(this.shareService.serverPath + '/customerAll').subscribe((res: any) => {
      this.customers = res //aray customers เก็บรายการไว้
      //console.log(this.customers);
      //this.pet.name = ''; //เพิ่มเอง ไม่ตามสอน แก้ปัญหาเลือกลูกค้าแล้ว ชื่อสัตว์เลี้ยงเก่ายังค้างอยู่
    });
  }

  chooseCustomer(customer) {
    this.customer = customer;
    this.loadPets();
    //this.repair = null // clear object
    this.pet.name = null //เพิ่มเอง ไม่ตามสอน แก้ปัญหาเลือกลูกค้าแล้ว ชื่อสัตว์เลี้ยงเก่ายังค้างอยู่
    // clear object ช่องอาการ ให้ว่าง
    this.repair = {
      problem: null,
      price: null,
      remark: null
    }
  }

  loadPets() {
    this.http.post(this.shareService.serverPath + '/petOfCustomer', this.customer).subscribe((res: any) => {
      this.pets = res;
    });
  }

  choosePet(item) {
    this.pet = item
    this.loadRepairOfPet()

    //this.repair = null // clear object
  }

  saveRepair() {
    //const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');
    var strProblem = this.repair.problem;
    var numPrice = this.repair.price;
    var strRemark = this.repair.remark;

    if (strProblem === null || strProblem.trim() === '') {
      //alert("กรุณาระบุอาการ")
      Swal.fire({
        title: 'เตือน !',
        text: "กรุณาระบุ 'อาการ'",
        icon: 'warning',
        showCloseButton: true
      })

      //invalidControl.focus();

      //this.repair.problem.focus();
      //this.repair.problem.select();
      //this.repair.problem.nativeElement.focus();
      //this.repair.problem.problem.focus();
      //strProblem.focus(repair.component.html.problem)
      //document.getElementById(repair.component.problem).select();
      //this.repair.problem.nativeElement.focus();
      return
    }

    if (!Number(numPrice)) {
      Swal.fire(
        'เตือน !',
        "ค่าบริการ ไม่เป็นตัวเลข",
        'error'
      )
      return
    }

    if (Number(numPrice) < 0) {
      Swal.fire(
        'เตือน !',
        "ค่าบริการ ต้องไม่ติดลบครับ",
        'error'
      )
      return
    }

    if (strRemark === null || strRemark.trim() === '') {
      //alert("กรุณาระบุอาการ")
      Swal.fire(
        'เตือน !',
        "กรุณาระบุ 'หมายเหตุ'",
        'warning'
      )
      return
    }

    var params = {
      repair: this.repair,
      pet: this.pet
    }

    this.http.post(this.shareService.serverPath + "/repairSave", params).subscribe((res: any) => {
      this.loadRepairOfPet()
      //alert("บันทึกข้อมูลแล้ว")
      Swal.fire(
        'สำเร็จ !',
        'บันทึกข้อมูลแล้ว',
        'success'
      )
      // clear object ช่องอาการ ให้ว่าง
      this.repair = {
        problem: null,
        price: null,
        remark: null
      }
    });
  }
  /**
   * ประวัติการรักษา
  */
  loadRepairOfPet() {
    var params = {
      pet_id: this.pet._id
    }
    this.http.post(this.shareService.serverPath + "/repairOfPet", params).subscribe((res: any) => {
      this.repairs = res
      //console.log(res);
    })
  }
  /**
   * ลบประวัติการรักษา ที่เลือก
   */
  removeRepair(item) {
    Swal.fire({
      title: 'ยืนยัน ลบ !',
      text: 'คุณต้องการลบข้อมูล ใช่หรือไม่ ?',
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true,
      //focusConfirm: false,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      this.http.post(this.shareService.serverPath + "/repairRemove", item).subscribe((res: any) => {
        this.loadRepairOfPet()
        //alert("ลบรายการแล้ว")
      })
    })
  }
  /**
   * แก้ไขรายการ
   */
  editRepair(item) {
    this.repair = item
  }

  modalMediceen(item) {
    this.repairMediceen.repair_id = item._id;
    this.http.get(this.shareService.serverPath + '/madiceenAll', item).subscribe((res: any) => {
      this.mediceens = res
    });
  }

  saveRepairMediceen() {
    //console.log(this.repairMediceen._id)

    if (this.repairMediceen._id == null) {
      if (confirm("คุณต้องการเพิ่มการรักษา ใช่หรือไม่?")) {
        //var path = this.shareService.serverPath + "/repairMediceenSave"
        var tmpStr = "เพิ่ม"
      } else {
        return
      }
    } else {
      if (confirm("คุณต้องการแก้ไขข้อมูลการรักษา ใช่หรือไม่?")) {
        //var path = this.shareService.serverPath + "/repairMediceenUpdate"
        var tmpStr = "แก้ไข"
      } else {
        // var newItem = {
        //   _id: this.repairMediceen.repair_id
        // }
        //this.modalHistory(this.repairMediceen.repair_id); //ลบรายการแล้วเรียกข้อมูลมาใหม่ตาม newItem
        return
      }
    }
    var path = this.shareService.serverPath + "/repairMediceenSave"
    this.http.post(path, this.repairMediceen).subscribe((res: any) => {
      alert(tmpStr + " รายการรักษาเรียบร้อย")
      // ล้างค่า ฟอร์ม input
      this.repairMediceen = {
        _id: null,
        qty: null,
        remark: null,
        mediceen_id: null,
        repair_id: null
      }
      closeModal(); //ปิด modalMediceen
    })

  }

  chooseMediceen(item) {
    this.repairMediceen.mediceen_id = item._id;
    this.repairMediceen._id = null;
    this.repairMediceen.qty = null;
    this.repairMediceen.remark = null;

  }

  modalHistory(item) {
    this.http.post(this.shareService.serverPath + '/history', item).subscribe((res: any) => {
      this.historys = res;
    });
  }

  removeHistory(item) {
    if (confirm("คุณต้องการลบประวัติการรักษา '" + item.mediceen[0].name + "' ใช่หรือไม่?")) {
      this.http.post(this.shareService.serverPath + '/historyRemove', item).subscribe((res: any) => {
        var newItem = {
          _id: item.repair_id
        }
        this.modalHistory(newItem); //ลบรายการแล้วเรียกข้อมูลมาใหม่ตาม newItem
      });
    }
  }

  editHistory(item) {
    this.repairMediceen = item
  }
}
