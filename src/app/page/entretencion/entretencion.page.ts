import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-entretencion',
  templateUrl: './entretencion.page.html',
  styleUrls: ['./entretencion.page.scss'],
})
export class EntretencionPage implements OnInit {

  constructor(private api: ComunicacionService) { }

  ngOnInit() {
    this.recuperarPerros();
    this.recuperarGatos();
    this.recuperarDinero();
  }

  imagenesPerro : string;

  listarDjango(){
    this.api.getUsuariosDjango().subscribe(
     (data) => {
      console.log(data)
     },(e) =>{
      console.log(e)
     }
    )
  }

  recuperarPerros(){
    this.api.getPerros().subscribe(
      (data) =>{
        console.log(data); 
        this.imagenesPerro = data.message;
      },
      (e) =>{console.log(e); }
    )
  }

  datos : string;
  recuperarGatos(){

    this.api.getGatos().subscribe(
      (data) =>{
        console.log(data); 
        this.datos = data.fact;
      },
      (e) =>{console.log(e); }
    )
  }

  euro : string;
  recuperarDinero(){
    this.api.getDinero().subscribe(
      (data) =>{
        console.log(data); 
        console.log(data.serie[0].valor);
        this.euro=data.serie[0].valor
      },
      (e) =>{console.log(e); }
    )
  }


}
