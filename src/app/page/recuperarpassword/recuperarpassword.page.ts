import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperarpassword',
  templateUrl: './recuperarpassword.page.html',
  styleUrls: ['./recuperarpassword.page.scss'],
})
export class RecuperarpasswordPage implements OnInit {

  constructor(private authfirebase: AngularFireAuth, private alertCtrl: AlertController) { }

  ngOnInit() {
  }
  email: string;
  errorlogin: string;

  async AuthMissingEmail() {
    await this.alertCtrl.create({
      header: "¡Error!",
      message: "Los campos estan vacios. Compruebe los campos y vuelva a rellenar ",
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

  async UserNotFound() {
    await this.alertCtrl.create({
      header: "¡Error!",
      message: "El correo electronico que ingresaste no pertenece a ninguna cuenta. Comprueba el correo electronico y vuelve a intentarlo.",
      buttons: [
        { text: "Confirmar" }
      ]
    }).then(resp => resp.present());
  }

  async exito() {
    await this.alertCtrl.create({
      header: "¡Aviso!",
      message: "Se ha enviado un enlace para recuperar tu contraseña",
      buttons: [
        { text: "Confirmar" }
      ]
    }).then(resp => resp.present());
  }

  enviarLinkReset(){
    this.authfirebase.sendPasswordResetEmail(this.email)
    .then(()=>{
      this.exito();
    },(err)=>{
      this.errorlogin = err.code;
    })
    if (this.errorlogin == 'auth/missing-email') {
      this.AuthMissingEmail();
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
