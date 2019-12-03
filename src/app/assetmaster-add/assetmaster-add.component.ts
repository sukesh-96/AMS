import { Component, OnInit } from '@angular/core';
import { Assetmaster } from '../shared/assetmaster';
import { Purchase } from '../shared/purchase.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssetService } from '../shared/asset.service';

@Component({
  selector: 'app-assetmaster-add',
  templateUrl: './assetmaster-add.component.html',
  styleUrls: ['./assetmaster-add.component.scss']
})
export class AssetmasterAddComponent implements OnInit {
  master:Assetmaster=new Assetmaster();
  purchase:Purchase=new Purchase();
  masterForm:FormGroup;

  constructor(private authService: AuthService,private service:AssetService, private router: Router, private route: ActivatedRoute, private formBuilder:FormBuilder, private toastr:ToastrService) { }
  id:string;

  ngOnInit() {

    this.id=this.route.snapshot.params["id"];
    console.log(this.id);

    this.masterForm=this.formBuilder.group({
      assetDefName: [Validators.required],
      assetTypeName : ['',Validators.compose([Validators.required])],
      makeName: ['',Validators.compose([Validators.required])],
      am_quantity: ['',Validators.compose([Validators.required])],
      makeYear: ['',Validators.compose([Validators.required])],
      warranty: ['',Validators.compose([Validators.required])],
      model: ['',Validators.compose([Validators.required])],
      warrantyFrom:[''],
      warrantyto: ['']

    }); 
    this.service.getAssetOrder(this.id).subscribe(res=>{
      this.purchase=res;
      this.master.assetDefName=res["assetName"];
      this.master.assetTypeName=res["assetType"];
      console.log(res["assetType"]);
      this.master.makeName=res["vendorName"];
      this.master.am_quantity=res["quantity"];
      this.master.purchaseDate=res["purchaseDateStr"];

    })

  }

  getformControls(){
    return this.masterForm.controls;
  }
  addAsset(){
    console.log("Hi Adarsh");
    this.master.makeYear=this.masterForm.controls.makeYear.value;
    this.master.warranty=this.masterForm.controls.warranty.value;
    this.master.warrantyFrom=this.masterForm.controls.warrantyFrom.value;
    this.master.warrantyTo=this.masterForm.controls.warrantyto.value;
   // this.master.make=this.masterForm.controls.makeName.value;
    this.master.assetType=this.purchase.purchaseAssetType;
    this.master.make=this.purchase.purchaseVendorName;
    this.master.assetName=this.purchase.purchaseAssetName;
    this.master.purchaseDate=this.purchase.purchaseDelivDate;
   // this.master.assetName=this.masterForm.controls.assetName.value;
    this.master.model=this.masterForm.controls.model.value;
    this.purchase.purchaseStatus='Asset Approved by Admin';
    this.service.updatePurchase(this.purchase.purchaseId,this.purchase).subscribe();
    this.service.postAsset(this.master).subscribe(x=>{
      this.toastr.success('Asset Registered Successfully');
      this.router.navigateByUrl('masterlist');
    })

  }



}
