import { Component, OnInit } from '@angular/core';
import { Asistencia, ClasesI, CursoI, UserI } from 'src/app/model/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  constructor(private firestore: FirestoreService, private auth: AuthService) { }

  cursosArray: any;
  nombre: string;
  cursosAlumnoArray: any;
  clasesArray: any;
  asistenciaArray: any;

  ngOnInit() {
    
    this.firestore.getCollection<CursoI>('Cursos').subscribe( res => {
      this.cursosArray = res;
    });

    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.getUsuarios(res.uid);
      }
    });

    this.firestore.getCollection<ClasesI>('Clases').subscribe( res => {
      this.clasesArray = res;
    });

    this.firestore.getCollection<Asistencia>('Asistencia').subscribe( res => {
      this.asistenciaArray = res;
    });
  }

  getUsuarios(uid: string){
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<UserI>(path, id).subscribe(res => {
      if (res) {
        this.nombre = res.Nombre;
        this.cursosAlumnoArray = res.Cursos;
      }
    })
  }

}
