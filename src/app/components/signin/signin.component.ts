import { Component, OnInit } from '@angular/core';
import { Output,EventEmitter } from '@angular/core';
import { TileServiceService } from 'src/app/services/tile-service.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private tile:TileServiceService) { }

  signInBox:any;

  @Output() signInFlag=new EventEmitter<any>();

  signInobj:any={
    email:"",
    password:""
  };

  ngOnInit(): void {
    this.signInBox=true;
  }
  close()
  {
    this.signInBox=false;
      this.signInFlag.emit(true);
  }
  login()
  {
      this.tile.login(this.signInobj).subscribe(
      (response)=>{

      },(error)=>
      {
        console.error(error);
      }
      )
  }

}
