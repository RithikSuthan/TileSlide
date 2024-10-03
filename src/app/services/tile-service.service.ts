import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EndPoints } from '../Contants/EndPoints';
@Injectable({
  providedIn: 'root'
})
export class TileServiceService {

  url:any;
  constructor(private http:HttpClient) {
    this.url=environment.tile_service_url;
   }
  login(postObj:any)
  {
    const url=this.url+EndPoints.login;
    return this.http.post<any>(url,postObj);
  }
  register(postObj:any)
  {
    const url=this.url+EndPoints.register;
    return this.http.post<any>(url,postObj);
  }
}
