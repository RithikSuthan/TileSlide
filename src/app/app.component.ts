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
  loginPage:any;
  ngOnInit()
  {
    this.homePage=false;
    this.gamePage=false;
    this.loginPage=true;
  }
  gamePageFlag(){
    this.homePage=false;
    this.gamePage=true;
    this.loginPage=false;
  }
}
