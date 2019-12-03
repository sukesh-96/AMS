import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Purchase } from '../shared/purchase.model';
import { Observable } from 'rxjs';
import { Assettype } from '../shared/assettype.model';
import { Assetdef } from '../shared/assetdef.model';
import { Vendor } from '../shared/vendor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { AssetService } from '../shared/asset.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchase-edit',
  templateUrl: './purchase-edit.component.html',
  styleUrls: ['./purchase-edit.component.scss']
})
export class PurchaseEditComponent implements OnInit {
  purchaseForm: FormGroup;
  purchase: Purchase= new Purchase();
  Purchases: Observable<Purchase[]>;
  assetdefs: Observable<Assetdef[]>;
  assettype: Observable<Assettype[]>;
  vendors: Observable<Vendor[]>; 
  id:number;
 

  constructor(private router:ActivatedRoute,private formbuilder:FormBuilder,private route:Router,private service :AssetService,private authservice:AuthService,private toastr:ToastrService) { }

  ngOnInit() {
    this.purchaseForm=this.formbuilder.group({
      purchaseId:'null',
      purchaseOrderNo:['',[Validators.required]],
      assetName:['',[Validators.required]],
      assetType:['',[Validators.required]],
      quantity:['',[Validators.required]],
      vendorName:['',[Validators.required]],
      purchaseDateStr:['',[Validators.required]],
      purchaseDelivDateStr:['',[Validators.required]],
      purchaseStatus:['',[Validators.required]]

    });

    this.id=this.router.snapshot.params["id"];
    console.log(this.id);
    this.service.getpurchase(this.id).subscribe(data=>{
      console.log(data);
      this.purchase=data;
    });
  }

  getformControls() {
    return this.purchaseForm.controls;
  }



  updateOrder() {
    this.purchase.purchaseId =  this.id;
    this.purchase.purchaseOrderNo = this.purchaseForm.controls.purchaseOrderNo.value;
   // this.purchase.purchaseAssetName = this.purchaseForm.controls.assetName.value;
   // this.purchase.purchaseAssetType = this.purchaseForm.controls.assetType.value;
    this.purchase.quantity = this.purchaseForm.controls.quantity.value;
   // this.purchase.purchaseVendorName = this.purchaseForm.controls.vendorName.value;
    this.purchase.purchaseDate = this.purchaseForm.controls.purchaseDateStr.value;
    this.purchase.purchaseDelivDate = this.purchaseForm.controls.purchaseDelivDateStr.value;
    this.purchase.purchaseStatus = 'Asset Registered Internally';

    if (this.purchase.purchaseDate<this.purchase.purchaseDelivDate)
    {
      this.service.updateOrder(this.id, this.purchase).subscribe(res=>{
      this.toastr.success('Order details updated successfully');
      this.route.navigateByUrl('/orderlist');
      });    
    }
   else
    {
      this.toastr.warning('Purchase date must be less than delivery date');
    }

   
    
  }
logout()
{
  this.authservice.isLoggedOut();
  this.route.navigateByUrl('login');
}

}
