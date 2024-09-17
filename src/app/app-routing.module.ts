import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
  // {path:'game',component:BoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
