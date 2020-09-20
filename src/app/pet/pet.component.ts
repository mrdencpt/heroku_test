import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../ShareService';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {

  customers: any;

  customer = {
    name: null,
    code: null,
    _id: null
  }

  pets: any;

  pet = {
    customer_id: null,
    name: null,
    remark: null
  }

  constructor(
    private http: HttpClient,
    private shareService: ShareService
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadPets();
  }

  loadCustomers() {
    var path = this.shareService.serverPath + '/customerAll';
    this.http.get(path).subscribe((res: any) => {
      this.customers = res //aray customers เก็บรายการไว้
    });
  }

  chooseCustomer(customer) {
    this.customer = customer;
    //console.log(this.customer);
  }

  save() {
    //if (confirm("คุณต้องการบันทึกข้อมูล ใช่หรือไม่?")) {
    this.pet.customer_id = this.customer._id
    this.http.post(this.shareService.serverPath + '/petSave', this.pet).subscribe((res: any) => {
      this.loadPets();
      //เคลียร์ หน้าจอ
      this.pet.name = '';
      this.pet.remark = '';
      this.customer.name = '';
    });
    //}
  }

  loadPets() {
    this.http.get(this.shareService.serverPath + '/petAll').subscribe((res: any) => {
      this.pets = res //aray customers เก็บรายการไว้
      //console.log(this.pets);
    });
  }

  deletePet(item) {
    //console.log(item);
    // var param = {
    //   _id: item._id
    // }
    if (confirm("คุณต้องการลบข้อมูล ใช่หรือไม่?")) {
      this.http.post(this.shareService.serverPath + '/petDelete', item).subscribe((res: any) => {
        this.loadPets();
      })
    }
  }

  editPet(item) {
    this.pet = item;
    this.customer = item.customer[0];
  }
}
