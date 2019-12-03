import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../shared/login.model';
import { Observable } from 'rxjs';
import { element } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  login: Login = new Login();
  isSubmitted=false;
  logins:Observable<Login[]>;

  constructor(private service: AuthService, private router: Router,
    private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {

    this.loginForm=this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    });
  }

  get formControls()
  {
    return this.loginForm.controls;
  }

loginUser()
{
  console.log(this.loginForm.value);
//this.login.username=this.loginForm.controls.username.value;
//this.login.password=this.loginForm.controls.password.value;
this.isSubmitted=true;
if(this.loginForm.invalid)
{
  this.toastr.error('enter username and password');
  return;
}
this.service.Login(this.loginForm.value).subscribe(element=>{
 if (element!=null){
   
    localStorage.setItem('ACCESS_TOKEN',element["username"])
   
   if(element["usertype"]=='Admin')
   {
     localStorage.setItem('ACCESS_TOKEN',element["username"]);
     this.toastr.success('Successfully Logged in');
     this.router.navigateByUrl('/admin');
     
   }
     else if(element["usertype"]=='Purchase Manager'){
       this.router.navigateByUrl('/purchasemanager')
     }
    }
    else
     {
       this.toastr.warning('Enter valid username and password');
     }  
});
}

}
