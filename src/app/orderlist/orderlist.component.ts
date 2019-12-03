import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AssetService } from '../shared/asset.service';
import { Observable } from 'rxjs';
import { Purchase } from '../shared/purchase.model';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit {
  purchases: Observable<Purchase[]>;

  constructor(private authService:AuthService,private toastr:ToastrService,private router:Router,private service:AssetService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(){
    
    this.purchases=this.service.getAssetOrders();
  }
  Logout(){
    this.authService.isLoggedOut();
    this.router.navigateByUrl('logout');
  }

}
