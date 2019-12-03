import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Assetdef } from '../shared/assetdef.model';
import { Observable } from 'rxjs';
import { Assettype } from '../shared/assettype.model';
import { AssetService } from '../shared/asset.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {

  //assetdef: Assetdef = new Assetdef();
  assetdefs: Observable<Assetdef[]>;
  assettype: Observable<Assettype[]>;

  public popoverTitle: string = 'Delete';
  public popoverMessage: string = 'Do you want to delete?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  constructor(private router: Router, private toastr: ToastrService, private service: AssetService,public authservice:AuthService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.assetdefs = this.service.getAssetList();
  }

  deleteAsset(assetId:number)
  {
    this.service.deleteAsset(assetId).subscribe(data=>{
    console.log(data);
    this.toastr.error("Deleted successfully");
    })
  
  }
  search(assetName:string)
  {
    this.assetdefs=this.service.searchAsset(assetName);
    if(assetName="")
    {
      this.assetdefs=this.service.getAssetList();
    }
  }
  logout(){
    this.authservice.isLoggedOut();
    this.router.navigateByUrl('login');
 }
}