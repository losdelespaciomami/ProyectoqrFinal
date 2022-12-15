import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Asistencia, ClasesI, CursoClaseI, UserI } from 'src/app/model/models';
import { CursoI } from 'src/app/model/models';
import { LoadingController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-scanqr',
  templateUrl: './scanqr.page.html',
  styleUrls: ['./scanqr.page.scss'],
})
export class ScanqrPage implements OnInit, OnDestroy{

  stateUser() {
    return this.authfirebase.authState
  }
  
  login: boolean = false;
  logeado: boolean = false;
  roles: 'Alumno' | 'Profesor' = null;
  nombre:string;
  data:any;
  idcurso:string;
  uid: string;
  
  
  constructor(private authfirebase: AngularFireAuth, 
              private router: Router,
              private firestore: FirestoreService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private auth: AuthService) {
    
  }

  scannedResult: any;
  scannerObject: any; //El restulado scaneado se conviert en Objecto
  content_visibility = '';
  value: string;
  eligioCurso: boolean = false;
  qrCreado: any;
  clasesArray: any;
  asistenciaArray: any;

  ngOnInit() {
    this.stateUser().subscribe(res => {
      if (res) {
        this.logeado = true;
        this.getUsuarios(res.uid);
        this.uid = res.uid;
      } else {
        this.logeado = false;
      }
    });

    const path = '/Cursos'
    this.firestore.getCollection<CursoI>(path).subscribe( res => {
      for (let x = 0; x < res.length; x++) {
        this.cursosArray = res;
      }
    });

    this.firestore.getCollection<ClasesI>('Clases').subscribe( res => {
      this.clasesArray = res;
    });

    this.firestore.getCollection<Asistencia>('Asistencia').subscribe(res => {
      this.asistenciaArray = res;
    });
    
    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.getUsuarios(res.uid);
        console.log(true);
      }
    });


  }


  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch(e) {
      console.log(e);
    }
  }
  
  async yaAsistio() {
    await this.alertCtrl.create({
      header: "¡Advertencia!",
      message: "Ya estabas presente",
      buttons: [
        { text: "Confirmar" }
      ]
    }).then(resp => resp.present());
  }

  async Asistido() {
    await this.alertCtrl.create({
      header: "¡Excelente!",
      message: "Has quedado presente",
      buttons: [
        { text: "Confirmar" }
      ]
    }).then(resp => resp.present());
  }

  async yaExisteClase() {
    await this.alertCtrl.create({
      header: "¡Advertencia!",
      message: "Esta clase ya existe, pero puedes ver el Qr",
      buttons: [
        { text: "Confirmar" }
      ]
    }).then(resp => resp.present());
  }


  async startScan() {
    try {
      const permission = await this.checkPermission();
      if(!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      if(result?.hasContent) {
        this.scannedResult = result.content;
        this.scannerObject = JSON.parse(this.scannedResult);
        const data = { 
          nombreDocente: this.scannerObject.nombreDocente, 
          fecha: this.now.toLocaleDateString(), 
          hora: this.now.toLocaleTimeString(),
          cursoNombre: this.scannerObject.cursoNombre,
          nombreAlumno: this.nombre
        }

        const alumno = this.asistenciaArray.find((x) => x.cursoNombre === data.cursoNombre && x.fecha === data.fecha && x.nombreDocente === data.nombreDocente && x.nombreAlumno === data.nombreAlumno)

        if (alumno) {
          this.yaAsistio();
        } else {
          this.firestore.addData('Asistencia', data);
          this.Asistido();
        }

      }
    } catch(e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
  }

  cursosArray: any = [];
  
  getUsuarios(uid: string){
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<UserI>(path, id).subscribe(res => {
      if (res) {
        this.roles = res.Rol;
        this.nombre = res.Nombre;
      };
    })
  }

  datosQr(event){
    this.eligioCurso = true;
    this.value = event.target.value;
    this.firestore.getDoc<UserI>('Usuarios', this.uid).subscribe(res => {
      if (res) {
        this.roles = res.Rol;
        this.nombre = res.Nombre;
        this.data = { 
          nombreDocente: this.nombre, 
          fecha: this.now.toLocaleDateString(), 
          hora: this.now.toLocaleTimeString(),
          cursoNombre: this.value
        }
      };

    })
  }


  valores: any;
  elementType: NgxQrcodeElementTypes.CANVAS
  now = new Date();

  generarQr() {
    //const loading = await this.loadingCtrl.create({
      //message: 'Generado Código, espere...',
      //spinner: 'circles',
    //});
    //loading.present();
    
    //setTimeout(() => {
      //loading.dismiss();

      this.valores = JSON.stringify(this.data);
      this.qrCreado = true;

      const clase = this.clasesArray.find((x) => x.cursoNombre === this.data.cursoNombre && x.fecha === this.data.fecha && x.nombreDocente === this.data.nombreDocente)

      if (clase) {
       this.yaExisteClase()
      } else {
       this.firestore.addData('Clases', this.data);
      }
      
    //}, 2000);
  }


  borrarQr(){
    this.qrCreado = false;
    this.eligioCurso = false;
  }

  async exito() {
    const loading = await this.loadingCtrl.create({
      message: '¡Asistencia Registrada!',
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.router.navigate(["/registrapp"])
    }, 1500);

  }

  async asistencia() {
    const loading = await this.loadingCtrl.create({
      message: 'Registrando su asistencia, espere...',
      spinner: 'circles',
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.exito();
    }, 2000);

  }

  ngOnDestroy(): void {
    this.stopScan();
  }
  
}
