import { Component, OnInit } from '@angular/core';
import { Output,EventEmitter } from '@angular/core';
import { TileServiceService } from 'src/app/services/tile-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private service:TileServiceService) { }
  registerObj={
    userName:"",
    email:"",
    password:""
  }

  confirmPassword:any;
  registerBox:any;
  validUserName:any;
  showPassword:any;
  @Output() registerFlag=new EventEmitter<any>();

  ngOnInit(): void {
    this.registerBox=true;
    this.showPassword=false;
  }

  register()
  {
      this.service.register(this.registerObj).subscribe(
        (response)=>{
          console.log(response);
        },
        (error)=>{
          console.error(error);
        }
      )      
  }
  close()
  {
    this.registerBox=false;
    this.registerFlag.emit(true);      
  }
  checkUserName()
  {
      this.service.checkUserName(this.registerObj.userName).subscribe(
        (response)=>
        {
          if(response['message']=="User Name Already Taken")
          {
            alert("User Name Already Taken");
          }
            console.log(response);
        },
        (error)=>
        {
          console.error(error);
        }
      )
  }
  checkEmail()
  {
    this.service.checkEmailExist(this.registerObj.email).subscribe(
      (response)=>
      {
        if(response['message']=="Email exists already")
          {
            alert("Email Used already");
          }
        console.log(response);
      },
      (error)=>
      {
        console.error(error);
      }
    )
  }
  checkChanngePassword()
  {
    if(this.confirmPassword!=this.registerObj.password)
    {
      alert("Password Doesn't match");
      this.confirmPassword="";
      this.registerObj.password="";
    }
  }
  visiblePassword():any{
    this.showPassword=!this.showPassword;
  }
}
