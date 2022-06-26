import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import  {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) {}

registerUser(data:any){

    return this.http.post(environment.apiUrl+'api/register',data);

}
  loginUser(data:any){

    return this.http.post(environment.apiUrl+'api/login',data);

  }
  mostrarUser(){
    console.log(environment.apiUrl+'api/mostrar');

    return this.http.get(environment.apiUrl+'api/mostrar');

  }
  eliminarUser(id){


    return this.http.get(environment.apiUrl+'api/eliminar/'+id);

  }
  modificarUser(data:any,id){
console.log(data);

    return this.http.post(environment.apiUrl+'api/actualizar/'+id,data);

  }
}
