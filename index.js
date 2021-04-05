$(document).ready(()=>{
    
    //instanciamos elementos a utlizar dentro del DOM
    const contenido = $("#contenido");
    const maestros = $("#maestros");
    const estudiantes = $("#estudiantes");
    const asignaturas = $("#asignaturas");

    maestros.click(getM);
    estudiantes.click(getEs);
    asignaturas.click(getAsignatura);

});