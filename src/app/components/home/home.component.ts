import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }
  
  @Output() homePageFlag=new EventEmitter<any>();
  @Output() gamePageFlag=new EventEmitter<any>();

  ngOnInit(): void {
  }

  // playPage():void
  // {
  //   this.router.navigateByUrl('/game').then(()=>
  //   {
  //       // console.log("Page traversal");
  //   }).catch((err)=>
  //   {
  //       console.error(err);
  //   })
  // }

playPage():void{
  this.gamePageFlag.emit(true);
}

  } 

