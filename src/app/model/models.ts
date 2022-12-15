export interface UserI {
    id: string;
    Email: string;
    Nombre: string;
    Rol: 'Alumno' | 'Profesor';
    Rut: string;
    Cursos: any;
}

export interface CursoI {
    id: string;
    Alumno: any;
    Docente: string;
    Nombre: string;
    Seccion: string;
    Siglas: string;
    Clases: number;
}

export interface Asistencia {
    id: string;
    nombreDocente: string;
    fecha: any;
    hora: any;
    cursoNombre: string;
    nombreAlumno: string;
    Clase: any;
}

export interface ClasesI {
    id: string;
    fecha: any;
    hora: any;
    cursoNombre: string;
    nombreDocente: string;
}

export interface CursoClaseI {
    id: string;
    ClasesTotales: number;
    nombreCurso: string;
}