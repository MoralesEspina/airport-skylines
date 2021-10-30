import { Component, OnInit } from '@angular/core';
import { VueloService, Vuelo} from '../../services/vuelo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  ListarVuelo: Vuelo[] | undefined;
  constructor(private VueloService:VueloService, private router:Router) { }

  ngOnInit(): void {
    this.listarVuelo();
  }

  listarVuelo()
  {
    this.VueloService.getVuelos().subscribe(
      res=>{
        console.log(res);
        this.ListarVuelo=<any>res;
      },
      err => console.log(err)
    );
  }

  eliminar(id:string)
  {
    this.VueloService.deleteVuelos(id);
    (res:any) => console.log(res);
    this.listarVuelo();
  }

  modificar(id:string){
    this.router.navigate(['/edit/'+id]);
    }
}
