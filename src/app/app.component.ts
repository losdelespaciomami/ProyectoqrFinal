import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserI } from './model/models';
import { FirestoreService } from './services/firestore.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ComunicacionService } from './services/comunicacion.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  stateUser() {
    return this.authfirebase.authState
  }

  login: boolean = false;
  logeado: boolean = false;
  roles: 'Alumno' | 'Profesor' = null;
  nombre: string;
  zona: string;

  constructor(private authfirebase: AngularFireAuth,
    private router: Router,
    private firestore: FirestoreService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private api: ComunicacionService,
    private geolocation: Geolocation) {

  }

  ngOnInit() {

    this.getCurrentlocation();

    this.stateUser().subscribe(res => {
      if (res) {
        console.log('Esta logeado')
        this.logeado = true;
        this.getUsuarios(res.uid);
      } else {
        console.log('No esta logeado')
        this.logeado = false;
        this.router.navigate(["/home"])
      }
    });

    this.recuperarZona();
  }

  duocCordLatA = -33.5712061 //menor
  duocCordLongA = -70.5875103 //menor

  duocCordLatB = -33.5718891 //mayor
  duocCordLongB = -70.5867607 //mayor



  CordLatA = -33.5981577 //menor
  CordLongA= -70.5784174 //menor

  CordLatB = -33.5989373 //mayor
  CordLongB= -70.5803932 //mayor

  xLat = -33.5986480
  xLong= -70.5792519

  getCurrentlocation(){
    this.geolocation.getCurrentPosition().then((resp) => {

      //No olvidar cambiar los X lat por el resp
      if (this.xLat > this.CordLatB && this.xLat < this.CordLatA) {
        if (this.xLong > this.CordLongB && this.xLong < this.CordLongA) {
          console.log('esta en el duoc')
        }
      }

     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
     });
  }

  getUsuarios(uid: string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<UserI>(path, id).subscribe(res => {
      if (res) {
        this.roles = res.Rol;
        this.nombre = res.Nombre;
      }
    })
  }

  logout(){
    this.authfirebase.signOut();
  }

  async cerrarSesion() {
    const alert = await this.alertCtrl.create({
      header: '¿Estas seguro de Cerrar Sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Confirmar',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  private loading;

  async paginar() {
    
    this.loadingCtrl.create({
      message: 'Cargando...'
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
    });

    setTimeout(() => {
      this.loading.dismiss();
    }, 1000);
  }

  recuperarZona() {
    this.api.getZona().subscribe(
      (data) => {
        console.log(data);
        this.zona = data.week_number;
      },
      (e) => { console.log(e); }
    )
  }

}
