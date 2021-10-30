import { Component, OnInit } from '@angular/core';
import { Vuelo, VueloService } from '../../services/vuelo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  vuelo:Vuelo={
    id_vuelo: '',
    id_ruta: '',
    id_avion: '',
    fecha_hora_salida: '',
    id_estado: ''
  };
  constructor(private VueloService:VueloService,
              private router:Router,
              private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const id_entrada =<string>this.activeRoute.snapshot.params.id;
    console.log('id de entrada: '+id_entrada);

    if(id_entrada){
      this.VueloService.getIdVuelos(id_entrada).subscribe(
        (res:any)=>{
          this.vuelo=res;
          console.log(res);
        },
          err=>console.log(err)
      )
    }
  }

  modificar(){
    this.VueloService.putVuelos(this.vuelo.id_vuelo, this.vuelo).subscribe(
      res=>{
        console.log(res);
      },
      err=>console.log(err)
    );
    this.router.navigate(['/inicio']);
  }
}
