const db = firebase.firestore();
const data = menu();
const nav = $("#nav");
nav.html(data);
const contenido = $("#contenido");
const notificaion = $("#notificacion");
notificaion.fadeOut();
const objAsignaturas = new asignaturas();
const objMaestros = new maestro();
const objEstudiantes = new estudiantes();
 $("#cerrar").click(()=>{      
    sessionStorage.clear();
    window.location = "login.html";    
});