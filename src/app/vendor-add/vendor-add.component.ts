import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AssetService } from '../shared/asset.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vendor } from '../shared/vendor.model';
import { Observable } from 'rxjs';
import { Assettype } from '../shared/assettype.model';

@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.component.html',
  styleUrls: ['./vendor-add.component.scss']
})
export class VendorAddComponent implements OnInit {
  vendorForm: FormGroup;
  vendor: Vendor = new Vendor();
  assettype: Observable<Assettype[]>;

  constructor(private toastr: ToastrService, private service: AssetService,
    private authservice: AuthService, private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {

    this.vendorForm = this.formBuilder.group({
      vendorName: ['', Validators.compose([Validators.required])],
      vendorType: 'Supplier',
      vendorAssetType: ['', Validators.compose([Validators.required])],
      validFrom: ['', Validators.compose([Validators.required])],
      vaildTo: ['', Validators.compose([Validators.required])],
      vendorAddress: ['', Validators.compose([Validators.required])]
    });
    this.assettype = this.service.getAssetTypeList();
  }

  getformControls() {
    return this.vendorForm.controls;
  }

  addVendor() {
    if (this.vendorForm.invalid) {
      return;
    }
    this.vendor.vendorName = this.vendorForm.controls.vendorName.value;
    this.vendor.vendorType = this.vendorForm.controls.vendorType.value;
    this.vendor.vendorAssetType = this.vendorForm.controls.vendorAssetType.value;
    this.vendor.validFrom = this.vendorForm.controls.validFrom.value;
    this.vendor.vaildTo = this.vendorForm.controls.vaildTo.value;
    this.vendor.vendorAddress = this.vendorForm.controls.vendorAddress.value;

    this.service.addVendor(this.vendor).subscribe(data => {
      if (data == 0) {
        this.toastr.success('Vendor Added Succesfully');
        this.router.navigateByUrl('/vendorlist');
      }
      else {
        this.toastr.error("Vendor having this name already exists");
      }
    });
    this.ngOnInit();
  }
  logout() {
    this.authservice.isLoggedOut();
    this.router.navigateByUrl('login');
  }

}
