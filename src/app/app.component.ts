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
  registerPage:any;
  ngOnInit()
  {
    this.homePage=false;
    this.gamePage=false;
    this.registerPage=false;
    this.loginPage=true;
    // this.homePage=false;
    // this.gamePage=true;
  }
  gamePageFlag(){
    this.homePage=false;
    this.gamePage=true;
    this.registerPage=false;
    this.loginPage=false;
  }
}
