import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  constructor(private httpC: HttpClient) { }

  httpOptions={
    Headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  direccion = 'https://mindicador.cl/api/euro';
  gatos = 'https://catfact.ninja/fact';
  perros = 'https://dog.ceo/api/breeds/image/random';
  zona = 'http://worldtimeapi.org/api/timezone/America/Santiago';
  api_django = 'http://127.0.0.1:8000/api/usuario';

  getUsuariosDjango():Observable<any>{
    return this.httpC.get(this.api_django).pipe(retry(3))
  }

  getUsuarioDjango(email):Observable<any>{
    return this.httpC.get(this.api_django+"/"+email+"/").pipe(retry(3))
  }
  
  getDinero():Observable<any>{
    return this.httpC.get(this.direccion).pipe(retry(3));
  }
  
  getGatos():Observable<any>{
    return this.httpC.get(this.gatos).pipe(retry(3));
  }

  getPerros():Observable<any>{
    return this.httpC.get(this.perros).pipe(retry(3));
  }
  
  getZona():Observable<any>{
    return this.httpC.get(this.zona).pipe(retry(3));
  }

  
}