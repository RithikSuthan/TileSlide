import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  currentScore:any;
  constructor() { }

  ngOnInit(): void 
  {
    this.currentScore=0;
  }

}
