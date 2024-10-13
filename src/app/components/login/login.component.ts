import { Component, OnInit } from '@angular/core';
import { Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  alertBox:any;
  loginFlag:any;
  registerFlag:any;
  dashboardFlag:any;

  @Output () gamePageFlag=new EventEmitter<any>();
  

  ngOnInit(): void {
    this.dashboardFlag=true;
    this.alertBox=false;
    this.loginFlag=false;
    this.registerFlag=false;
  }

  guestPlayer()
  {
      this.alertBox=true;
      this.dashboardFlag=false;
  }
  closealert()
  {
    this.alertBox=false;
    this.registerFlag=false;
    this.alertBox=false;
    this.dashboardFlag=false;
    this.dashboardFlag=true;
  }
  continueGame()
  {
    this.alertBox=false;
    this.registerFlag=false;
    this.alertBox=false;
    this.dashboardFlag=false;
    this.gamePageFlag.emit(true);
    localStorage.removeItem("email");
  }
  login()
  {
      this.loginFlag=true;
      this.registerFlag=false;
      this.alertBox=false;
      this.dashboardFlag=false;
  }
  register()
  {
    this.loginFlag=false;
    this.registerFlag=true;
    this.alertBox=false;
    this.dashboardFlag=false;
  }
  refreshPage()
  {
    this.ngOnInit();
  }
}
