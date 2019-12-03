
import { Component, OnInit } from '@angular/core';
import { Assetdef } from '../shared/assetdef.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Assettype } from '../shared/assettype.model';
import { AssetService } from '../shared/asset.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.scss']
})
export class AssetEditComponent implements OnInit {
  asset: Assetdef;
  assetForm: FormGroup;
  assettypes: Observable<Assettype[]>;
  assets:Observable<Assetdef[]>;
  id:number;

  constructor(private service :AssetService,private route:ActivatedRoute,private toastr:ToastrService,private formBuilder:FormBuilder) { }

  ngOnInit()
   {
     this.id=this.route.snapshot.params["id"];
     this.assetForm=this.formBuilder.group({
       assetId:[Validators.required],
       assetName:[Validators.compose([Validators.required])],
       assetType:[Validators.compose([Validators.required])],
       assetClass:[Validators.compose([Validators.required])]
     });
     this.service.getAsset(this.id).subscribe(data=>{this.asset=data;});
     this.assettypes=this.service.getAssetTypeList();
   }
   get formControls()
   {
     return this.assetForm.controls;
   }

   updateAsset()
   {
     this.asset.assetId=this.id;
     this.asset.assetName=this.assetForm.controls.assetName.value;
     this.asset.assetType=this.assetForm.controls.assetType.value;
     this.asset.assetClass=this.assetForm.controls.assetClass.value;
     this.service.updateAsset(this.id,this.asset).subscribe(data=>{
       this.toastr.success('Asset Updated Successfully');
     })
   }
  }
