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
  @Output () gamePageFlag=new EventEmitter<any>();
  

  ngOnInit(): void {
    this.alertBox=false;
  }

  guestPlayer()
  {
      this.alertBox=true;
  }
  closealert()
  {
    this.alertBox=false;
  }
  continueGame()
  {
    this.alertBox=false;
    this.gamePageFlag.emit(true);
  }
}
