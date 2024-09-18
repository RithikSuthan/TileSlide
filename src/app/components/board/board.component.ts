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
  gameStarted:any;
  startGameTime:any;
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
      let ind1=Math.floor(Math.random() * 15);
      while(ind1==ind){
        ind1=Math.floor(Math.random() * 15);
      }
      let row1=Math.floor(ind1/4);
      let col1=ind1%4;
      this.board[row][col]=2;
      this.board[row1][col1]=2;
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
  this.startTimer();
  }
  getColor(val:any)
  {
    return this.colorMap[val];
  }
  startTimer()
  {
      if(!this.gameStarted)
      {
        this.gameStarted=true;
        this.startGameTime=Date.now();
        if(this.startGameTime)
        {
          let intervalId=setInterval(()=>
            {
              let currTime=Date.now();
              // console.log(currTime," ",this.startGameTime)
              let diff=currTime-this.startGameTime;
              // console.log(diff);
              this.displayTimer(diff);
            },1000);
        }
        
      }
  }
  displayTimer(time:any)
  {
    let ele=document.getElementById("displayTimer");
    if(ele)
    {
      const minutes = Math.floor(time / 1000 / 60);
      const seconds = Math.floor((time / 1000) % 60);
    
      const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
      ele.innerText=`${displayMinutes}:${displaySeconds}`;
    }
    else
    {
      console.error("Element retrieval failed");
    }
  }
}
