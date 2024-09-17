import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TileSlide';
  homePage:any;
  gamePage:any;

  ngOnInit()
  {
    this.homePage=true;
    this.gamePage=false;
  }
  gamePageFlag(){
    this.homePage=false;
    this.gamePage=true;
  }
}
