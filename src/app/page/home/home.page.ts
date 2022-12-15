import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserI } from 'src/app/model/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  logeado: boolean = false;
  roles: 'Alumno' | 'Profesor' = null;

  constructor(private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private authfirebase: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private firestore: FirestoreService) { }

  stateUser() {
    return this.authfirebase.authState
  }

  ngOnInit() {
    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.logeado = true;
        this.getUsuarios(res.uid);
        this.router.navigate(["/registrapp"])
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
      }
    })
  }

  nombreUsuario: String;
  contrasena: String;

  lista_usuarios = new Array();

  errorlogin: string;

  correo: any;
  password: any;

  async AuthMissingEmail() {
    await this.alertCtrl.create({
      header: "¡Error!",
      message: "Los campos estan vacios. Compruebe los campos y vuelva a rellenar ",
      buttons: [
        { text: "Confirmar" }
      ]
    }).then(resp => resp.present());
  }

  async UserNotFound() {
    await this.alertCtrl.create({
      header: "¡Error!",
      message: "El correo electronico que ingresaste no pertenece a ninguna cuenta. Comprueba el correo electronico y vuelve a intentarlo.",
      buttons: [
        { text: "Confirmar" }
      ]
    }).then(resp => resp.present());
  }

  async wrongPassword() {
    await this.alertCtrl.create({
      header: "¡Error!",
      message: "La contraseña no es correcta. Compruébala.",
      buttons: [
        { text: "Confirmar" }
      ]
    }).then(resp => resp.present());
  }

  async invalidEmail() {
    await this.alertCtrl.create({
      header: "¡Error!",
      message: "El correo electronico esta mal digitado, Compruebe el correo electronico .",
      buttons: [
        { text: "Confirmar" }
      ]
    }).then(resp => resp.present());
  }

  private loading;

  async login() {
    const res = await this.auth.login(this.correo, this.password).catch(error => {
      this.errorlogin = error.code;
    })
    if (res) {
      this.loadingCtrl.create({
        message: 'Entrando...'
      }).then((overlay) => {
        this.loading = overlay;
        this.loading.present();
      });

      setTimeout(() => {
        this.loading.dismiss();
        this.router.navigate(["/registrapp"])
      }, 2000);
    }
    if (this.errorlogin == 'auth/missing-email') {
      this.AuthMissingEmail();
      this.errorlogin = 'x';
    } else if (this.errorlogin == 'auth/wrong-password') {
      this.wrongPassword();
      this.errorlogin = 'x';
    } else if (this.errorlogin == 'auth/user-not-found') {
      this.UserNotFound();
      this.errorlogin = 'x';
    } else if (this.errorlogin == 'auth/invalid-email') {
      this.invalidEmail();
      this.errorlogin = 'x';
    }

  }

}
