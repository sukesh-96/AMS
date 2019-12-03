import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AssetService } from '../shared/asset.service';
import { Observable } from 'rxjs';
import { Assettype } from '../shared/assettype.model';
import { Assetdef } from '../shared/assetdef.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-add',
  templateUrl: './asset-add.component.html',
  styleUrls: ['./asset-add.component.scss']
})
export class AssetAddComponent implements OnInit {
  assetForm: FormGroup;
  asset: Assetdef = new Assetdef();
  assettypes: Observable<Assettype[]>;
  constructor(private toastr: ToastrService, private service: AssetService,
    private authservice: AuthService, private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.assetForm = this.formBuilder.group({
      assetName: ['', Validators.compose([Validators.required])],
      assetType: ['', Validators.compose([Validators.required])],
      assetClass: ['', Validators.compose([Validators.required])]
    });
    this.assettypes = this.service.getAssetTypeList();

  }
  addAsset() {
    this.asset.assetName = this.assetForm.controls.assetName.value;
    this.asset.assetType = this.assetForm.controls.assetType.value;
    this.asset.assetClass = this.assetForm.controls.assetClass.value;

    this.service.addAsset(this.asset).subscribe(data => {
      if (data == 0) {
        this.toastr.success('Asset Added Succesfully');
        this.router.navigateByUrl('/list');
      }
      else {
        this.toastr.error("Asset having this name already exists");
      }
    });
    this.ngOnInit();
  }
  logout() {
    this.authservice.isLoggedOut();
    this.router.navigateByUrl('login');
  }
}
