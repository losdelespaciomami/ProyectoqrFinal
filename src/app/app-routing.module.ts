import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'registrapp',
    loadChildren: () => import('./page/registrapp/registrapp.module').then( m => m.RegistrappPageModule)
  },
  {
    path: 'scanqr',
    loadChildren: () => import('./page/scanqr/scanqr.module').then( m => m.ScanqrPageModule)
  },
  {
    path: 'recuperarpassword',
    loadChildren: () => import('./page/recuperarpassword/recuperarpassword.module').then( m => m.RecuperarpasswordPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./page/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'asistencia-profesor',
    loadChildren: () => import('./page/asistencia-profesor/asistencia-profesor.module').then( m => m.AsistenciaProfesorPageModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./page/cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./page/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'entretencion',
    loadChildren: () => import('./page/entretencion/entretencion.module').then( m => m.EntretencionPageModule)
  },
  {
    path: 'cursosdocente',
    loadChildren: () => import('./page/cursosdocente/cursosdocente.module').then( m => m.CursosdocentePageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./page/p404/p404.module').then( m => m.P404PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
