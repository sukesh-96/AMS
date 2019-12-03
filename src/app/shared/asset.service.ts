
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Assettype } from './assettype.model';
import { Assetdef } from './assetdef.model';
import { Vendor } from './vendor.model';
import { Purchase } from './purchase.model';
import { Assetmaster } from './assetmaster';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  assetdef: Assetdef;
  assettype: Assettype;

  constructor(private http: HttpClient) { }

  getAsset(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + '/tblAssetDefinitions/' + id);
  }

  getAssetList(): Observable<any> {
    return this.http.get(environment.baseUrl + '/tblAssetDefinitions');
  }

  getAssetType(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + '/tblAssetTypes/' + id);
  }

  getAssetTypeList(): Observable<any> {
    return this.http.get(environment.baseUrl + '/tblAssetTypes');
  }
  addAsset(asset: Assetdef) {
    return this.http.post(environment.baseUrl + '/tblAssetDefinitions', asset);
  }

  deleteAsset(assetId: number) {
    return this.http.delete(environment.baseUrl + '/tblAssetDefinitions/' + assetId);
  }

  updateAsset(assetId: number, asset: Assetdef) {
    return this.http.put(environment.baseUrl + '/tblAssetDefinitions/' + assetId, asset);
  }

  searchAsset(name: string): Observable<any> {
    return this.http.get(environment.baseUrl + '/tblAssetDefinitions?name=' + name);
  }






  getVendor(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + '/tblVendors/' + id);
  }

  getVendorList(): Observable<any> {
    return this.http.get(environment.baseUrl + '/tblVendors/');
  }
  addVendor(vendor: Vendor) {
    return this.http.post(environment.baseUrl + '/tblVendors/' ,vendor);
  }

  deleteVendor(vendorID: number) {
    return this.http.delete(environment.baseUrl + '/tblVendors/' + vendorID);
  }
  updateVendor(id: number, vendor: Vendor) {
    return this.http.put(environment.baseUrl + '/tblVendors/' + id, vendor);
  }



  getPurchaseList(): Observable<any>{
    return this.http.get(environment.baseUrl + '/tblPurchases');
  }
  getpurchase(id: number): Observable<any> {
  
    return this.http.get(environment.baseUrl +'/tblPurchases?iid='+id);
  }
  placeOrder(purchase: Purchase){
    return this.http.post(environment.baseUrl + '/tblPurchases',purchase);
  }
  updateOrder(id:number,purchase:Purchase) {
    return this.http.put(environment.baseUrl + '/tblPurchases/'+ id,purchase);
  }
  searchAssettype(name:string):Observable<any>
  {
    return this.http.get(environment.baseUrl+'/tblPurchases?name='+name);
  }
  searchVendor(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + '/tblPurchases/' + id);
  }
  deleteorder(purchaseId: number) {
    return this.http.delete(environment.baseUrl + '/tblPurchases/' + purchaseId);
  }


  getAssetMasterList():Observable<any>
  {
return this.http.get(environment.baseUrl+'/AssetMasters')
  }
  addAssetMaster(assetmaster:Assetmaster)
  {
return this.http.post(environment.baseUrl+'/AssetMasters',assetmaster);
  }

  getAssetOrders(): Observable<any>{
    return this.http.get(environment.baseUrl+'/Order');
  }

  getAssetOrder(id:string): Observable<any>{
    return this.http.get(environment.baseUrl+'/Order?ordno='+id);
  }

  postAsset(asset: Assetmaster){
    return this.http.post(environment.baseUrl+'/AssetMasters',asset);
  }

  updatePurchase(id:number, purchase: Purchase): Observable<any>{
    return this.http.put(environment.baseUrl+'/AssetMasters/'+ id, purchase);
  }

  getMasterList(): Observable<any>{
    return this.http.get(environment.baseUrl+'/AssetMasters');
  }
  

}
