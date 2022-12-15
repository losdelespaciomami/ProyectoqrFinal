import { Component, OnInit } from '@angular/core';
import { Asistencia, ClasesI, CursoI, UserI } from 'src/app/model/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-asistencia-profesor',
  templateUrl: './asistencia-profesor.page.html',
  styleUrls: ['./asistencia-profesor.page.scss'],
})
export class AsistenciaProfesorPage implements OnInit {

  constructor(private firestore: FirestoreService, private auth: AuthService) { }

  nombre: string;

  cursosArray: any;
  clasesArray: any;
  asistenciasArray: any;

  ngOnInit() {

    this.firestore.getCollection<CursoI>('Cursos').subscribe( res => {
      this.cursosArray = res;
    });

    this.firestore.getCollection<ClasesI>('Clases').subscribe( res => {
      this.clasesArray = res;
    });
    
    this.firestore.getCollection<Asistencia>('Asistencia').subscribe( res => {
      this.asistenciasArray = res;
    });

    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.getUsuarios(res.uid);
      }
    });

  }

  getUsuarios(uid: string){
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<UserI>(path, id).subscribe(res => {
      if (res) {
        this.nombre = res.Nombre;
      }
    })
  }

}
