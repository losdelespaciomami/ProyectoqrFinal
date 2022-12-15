import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserI } from 'src/app/model/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private auth: AuthService,
    private authfirebase: AngularFireAuth,
    private firestore: FirestoreService) { }

    stateUser() {
      return this.authfirebase.authState
    }
    logeado: boolean = false;
    roles: 'Alumno' | 'Profesor' = null;
    nombre: string;
    rut: string;
    email: string;

    ngOnInit() {
      
      this.auth.stateUser().subscribe(res => {
        if (res) {
          this.logeado = true;
          this.getUsuarios(res.uid);
        } else {
          this.logeado = false;
        }
      });
  
    }

    getUsuarios(uid: string){
      const path = 'Usuarios';
      const id = uid;
      this.firestore.getDoc<UserI>(path, id).subscribe(res => {
        if (res) {
          this.roles = res.Rol;
          this.nombre = res.Nombre;
          this.email = res.Email;
          this.rut = res.Rut
        }
      })
    }

}
