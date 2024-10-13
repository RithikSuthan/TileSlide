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
  otpVerified:any;
  sentOTP:any;
  generatedOTP:any;
  otpDialog:any;
  emailExists:any;
  userExists:any;
  @Output() registerFlag=new EventEmitter<any>();

  ngOnInit(): void {
    this.registerBox=true;
    this.showPassword=false;
    this.otpVerified=false;
    this.otpDialog=true;
    this.emailExists=false;
    this.userExists=false;
  }

  register()
  {
    if(this.userExists && this.emailExists)
    {
      this.service.register(this.registerObj).subscribe(
        (response)=>{
          console.log(response);
          alert("Player added Successfully");
          this.close();
        },
        (error)=>{
          console.error(error);
        }
      )
    }
      else
      {
        alert("Email or User name used already");
      }
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
            this.userExists=false;
          }
          else
          {
            this.userExists=true;
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
            this.emailExists=false;
          }
          else
          {
            this.emailExists=true;
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
  sendOtp()
  {
    if(this.emailExists && this.userExists)
    {
      let obj={
        "send_to_email":this.registerObj.email,
        "name":this.registerObj.userName
    }
    this.service.sendOtp(obj).subscribe(
      (response)=>
      {
          alert("OTP sent successfully");
          console.log(response);
          this.generatedOTP=response["otp"];
      },
      (error)=>
      {
        console.error(error);
      }
    );
    }
    else
    {
      alert("Username or Email used already");
    }
  }
  verifyOTP()
  {
    if(this.sentOTP==this.generatedOTP)
    {
        alert("OTP Matched successfully");   
        this.otpVerified=true;
        this.otpDialog=false;
    }
    else
    {
      alert("Resend OTP");
    }
  }
}
