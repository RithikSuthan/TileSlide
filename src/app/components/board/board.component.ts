import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  currentScore:any;
  currentTime:any;
  board:any;
  constructor() { }

  ngOnInit(): void 
  {
    this.currentScore=0;
    this.currentTime=0;
    this.board=[];
    for(let i=0;i<4;i++)
    {
      let temp=[];
      for(let j=0;j<4;j++)
      {
        temp.push("");
      }
      this.board.push(temp);
    }
    let ind=Math.floor(Math.random() * 15);
    let row=Math.floor(ind/4);
    let col=ind%4;
    console.log(ind,row,col);
    this.board[row][col]=2;
    console.log(this.board,Math.floor(Math.random() * 15));
  }
}
