import { Component, OnInit } from '@angular/core';
import { Vuelo, VueloService } from '../../services/vuelo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  vuelo:Vuelo={
    id_vuelo: '',
    id_ruta: '',
    id_avion: '',
    fecha_hora_salida: '',
    id_estado: ''
  };
  constructor(private VueloService:VueloService, private router:Router) { }

  ngOnInit(): void {
  }

  agregar(){
    delete this.vuelo.id_vuelo;

    this.VueloService.postVuelos(this.vuelo).subscribe();
    this.router.navigate(['/inicio'])
  }

}
