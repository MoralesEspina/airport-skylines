import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VueloService {

  url='/vuelos';
  constructor(private http: HttpClient) { }

  //get Vuelos
  getVuelos(){
    return this.http.get(this.url);
  }

  //get id Vuelos
  getIdVuelos(id:string){
    return this.http.get(this.url+'/'+id);
  }

  //agregar Vuelos
  postVuelos(vuelo:Vuelo)
  {
    return this.http.post(this.url, vuelo);
  }

  //modificar Vuelos
  putVuelos(id:string, vuelo:Vuelo){
    return this.http.put(this.url+'/'+id, vuelo);
  }

  //eliminar Vuelos
  deleteVuelos(id:string){
    this.http.delete(this.url+'/'+id).subscribe(
      res => console.log(res)
    )

  }



}

export interface Vuelo{
  id_vuelo?:any;
  id_ruta?:string;
  id_avion?:string;
  fecha_hora_salida?:string;
  id_estado?:string;
}
