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

  registerBox:any;
  @Output() registerFlag=new EventEmitter<any>();

  ngOnInit(): void {
    this.registerBox=true;
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
}
