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
  colorMap:any;
  constructor() { }

  intializeBoard()
  {
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
      this.board[row][col]=8;
      // this.board[0][0]=16;
      console.log(this.board,Math.floor(Math.random() * 15));
  }
  ngOnInit(): void 
  {
    this.currentScore=0;
    this.currentTime=0;
    this.board=[];
    this.intializeBoard();
    this.colorMap = {
      0:'gray',
      2: 'red',
      4: 'green',
      8: 'yellow',
      16: 'blue',
      32: 'purple',
      64: 'orange',
      128: 'pink',
      256: 'cyan',
      512: 'lime',
      1024: 'teal',
      2048: 'gold'
  };
  }
  getColor(val:any)
  {
    return this.colorMap[val];
  }
}
