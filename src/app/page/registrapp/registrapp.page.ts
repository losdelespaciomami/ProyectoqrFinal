import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserI } from 'src/app/model/models';

@Component({
  selector: 'app-registrapp',
  templateUrl: './registrapp.page.html',
  styleUrls: ['./registrapp.page.scss'],
})
export class RegistrappPage implements OnInit {


  login: boolean = false;
  logeado: boolean = false;
  roles: 'Alumno' | 'Profesor' = null;
  nombre: string;

  constructor(private auth: AuthService,
              private router: Router, 
              private alertCtrl: AlertController, 
              private authfirebase: AngularFireAuth,
              private firestore: FirestoreService) { }

  stateUser() {
    return this.authfirebase.authState
  }
  
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
      }
    })
  }
  
}
