import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Purchase } from '../shared/purchase.model';
import { Observable } from 'rxjs';
import { Assetdef } from '../shared/assetdef.model';
import { Assettype } from '../shared/assettype.model';
import { Vendor } from '../shared/vendor.model';
import { Router } from '@angular/router';
import { AssetService } from '../shared/asset.service';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { identifierModuleUrl } from '@angular/compiler';
import { element } from 'protractor';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {
  purchaseForm: FormGroup;
  purchase: Purchase= new Purchase();
  Purchases: Observable<Purchase[]>;
  assetdefs: Observable<Assetdef[]>;
  assettype: Observable<Assettype[]>;
  vendors: Observable<Vendor[]>; 
  assetId: number;
  constructor(private formbuilder:FormBuilder, private route:Router,private service :AssetService,private authservice:AuthService,private toastr:ToastrService) { }
 
  ngOnInit() {
    this.purchaseForm=this.formbuilder.group({
      purchaseOrderNo:['PRO'+Math.floor((Math.random()*10000)+1),Validators.compose([Validators.required])],
      purchaseAssetName:['',[Validators.required]],
      purchaseAssetType:['',[Validators.required]],
      quantity:['',[Validators.required]],
      purchaseVendorName:['',[Validators.required]],
     // purchaseDateStr:['',[Validators.required]],
      // purchaseDelivDateStr:['',[Validators.required]],
      purchaseStatus:['PO-Raised with Supplier',[Validators.required]]

    });
  }

  searchAsset(name:string)
  {
    this.assettype=this.service.searchAssettype(name);
    this.service.searchAsset(name).subscribe(data=>{
      data.forEach(element => {
        this.assetId=element["assetId"];
        console.log(this.assetId);
        
      });
      
    })
  }

  onOptionsSelected(value: number){
    this.vendors= this.service.searchVendor(value);

    this.vendors.subscribe(x=>{
      x.forEach(element=>{
        console.log(element["vendorName"]);
      })
    })
  }

placeOrder() {
  this.purchase.purchaseOrderNo=this.purchaseForm.controls.purchaseOrderNo.value;
  this.purchase.purchaseAssetName= this.assetId;
  this.purchase.purchaseAssetType=this.purchaseForm.controls.purchaseAssetType.value;
  this.purchase.quantity=this.purchaseForm.controls.quantity.value;
  this.purchase.purchaseVendorName=this.purchaseForm.controls.purchaseVendorName.value;
 
  this.purchase.purchaseStatus=this.purchaseForm.controls.purchaseStatus.value;

  this.service.placeOrder(this.purchase).subscribe(x=>{
    this.toastr.success("Order placed Successfully");
    this.route.navigateByUrl('/orderlist');
  });
      
   
  this.ngOnInit();
}

logout() {
  this.authservice.isLoggedOut();
  this.route.navigateByUrl('login');
}


  }
