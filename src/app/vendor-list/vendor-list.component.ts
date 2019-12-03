import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssetService } from '../shared/asset.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Assettype } from '../shared/assettype.model';
import { Vendor } from '../shared/vendor.model';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {

  assettype: Observable<Assettype[]>;
  vendors: Observable<Vendor[]>;

  public popoverTitle: string = 'Delete';
  public popoverMessage: string = 'Do you want to delete?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  constructor(private router: Router, private toastr: ToastrService, private service: AssetService,public authservice:AuthService) { }

  ngOnInit() {
this.reloadData();
  }
  reloadData() {
    this.vendors = this.service.getVendorList();
  }

  deleteVendor(vendorId:number)
  {
    this.service.deleteVendor(vendorId).subscribe(data=>{
    console.log(data);
    this.toastr.error("Deleted successfully");
    })
  
  }
  logout(){
    this.authservice.isLoggedOut();
    this.router.navigateByUrl('login');
 }

}