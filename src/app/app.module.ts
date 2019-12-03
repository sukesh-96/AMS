import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AssetAddComponent } from './asset-add/asset-add.component';

import { AssetEditComponent } from './asset-edit/asset-edit.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NgxPaginationModule } from 'ngx-pagination';

import { HttpClientModule } from '@angular/common/http';
import { AssetListComponent } from './asset-list/asset-list.component';
import { AdminComponent } from './admin/admin.component';
import { VendorAddComponent } from './vendor-add/vendor-add.component';
import { VendorEditComponent } from './vendor-edit/vendor-edit.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
import { PurchaseEditComponent } from './purchase-edit/purchase-edit.component';
import { PurchasemanagerComponent } from './purchasemanager/purchasemanager.component';

import { AssetmasterAddComponent } from './assetmaster-add/assetmaster-add.component';
import { AssetmasterListComponent } from './assetmaster-list/assetmaster-list.component';
import { AssetmasterEditComponent } from './assetmaster-edit/assetmaster-edit.component';
import { OrderlistComponent } from './orderlist/orderlist.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AssetAddComponent,
    AssetEditComponent,
  
    AssetListComponent,
  
    AdminComponent,
  
    VendorAddComponent,
  
    VendorEditComponent,
  
    VendorListComponent,
  
    PurchaseOrderComponent,
  
    PurchaseOrderListComponent,
  
    PurchaseEditComponent,
  
    PurchasemanagerComponent,
  
    
  
    AssetmasterAddComponent,
  
    AssetmasterListComponent,
  
    AssetmasterEditComponent,
  
    OrderlistComponent,
  
   
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
