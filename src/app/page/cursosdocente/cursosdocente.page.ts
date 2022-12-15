import { Component, OnInit } from '@angular/core';
import { CursoI, UserI } from 'src/app/model/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cursosdocente',
  templateUrl: './cursosdocente.page.html',
  styleUrls: ['./cursosdocente.page.scss'],
})
export class CursosdocentePage implements OnInit {

  constructor(private firestore: FirestoreService, private auth: AuthService) { }

  cursosArray: any = [];
  nombre: string;

  ngOnInit() {
    const path = '/Cursos'
    this.firestore.getCollection<CursoI>(path).subscribe( res => {
      for (let x = 0; x < res.length; x++) {
        this.cursosArray = res;
      }
    });

    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.getUsuarios(res.uid);
      }
    });
    console.log(this.eligioCurso);
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


  value: string = "";
  eligioCurso: boolean = false;
  onFocusPlace(event){
    this.value = event.target.value;
    this.eligioCurso = true;
    console.log(this.value, this.eligioCurso);
  }

}
