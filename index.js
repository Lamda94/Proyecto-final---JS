class Plataforma{
    constructor(){
    }

    saveMaestro(name, titulo){        
        let ma = JSON.parse(localStorage.getItem("maestros"));
        let id = ma.length;
        let data = {id: id, name: name, titulo: titulo};
        ma.push(data);
        
        localStorage.setItem("maestros", JSON.stringify(ma));
    }

    getMaestro(){
        let ma = JSON.parse(localStorage.getItem("maestros"));
        if (ma == null || ma.length == 0) {            
            ma = [];
            localStorage.setItem("maestros", JSON.stringify(ma));
            let c = 'colspan = "3"';
            let data =  '<input type ="button" class="btn nuevo" id="mNuevo" value="Nuevo Maestro">'+
                        "<table>"+
                            "<thead>"+
                                "<tr>"+
                                    "<th>Id</th>"+
                                    "<th>Nombre</th>"+
                                    "<th>Titulo</th>"+
                                "</tr>"+
                            "</thead>"+
                            "<tbody>"+
                            "<tr><td "+c+">No hay registros de maestros</td>"+
                            "</tbody>"+
                            "<tfoot>"+
                                "<tr>"+
                                    "<th>Id</th>"+
                                    "<th>Nombre</th>"+
                                    "<th>Titulo</th>"+
                                "</tr>"+
                            "</tfoot>"+
                        "</table>";   
            return data;                   
        }else{
            let d="";
            for (const maes of ma) {
                console.log(maes);
                d = d + "<tr>"+
                            "<td>" + maes.id + "</td>"+
                            "<td>" + maes.name + "</td>"+
                            "<td>" + maes.titulo + "</td>"+
                        "</tr>";               
            }

            let data =  '<input type ="button" class="btn nuevo" id="mNuevo" value="Nuevo Maestro">'+
                        "<table>"+
                            "<thead>"+
                                "<tr>"+
                                    "<th>Id</th>"+
                                    "<th>Nombre</th>"+
                                    "<th>Titulo</th>"+
                                "</tr>"+
                            "</thead>"+
                            "<tbody>"
                            + d +
                            "</tbody>"+
                            "<tfoot>"+
                                "<tr>"+
                                    "<th>Id</th>"+
                                    "<th>Nombre</th>"+
                                    "<th>Titulo</th>"+
                                "</tr>"+
                            "</tfoot>"+
                        "</table>";
            return data;
        }
    }

    saveEstudiante(name, curso){        
        let es = JSON.parse(localStorage.getItem("estudiantes"));
        let id = es.length;
        let data = {id: id, name: name, curso: curso, asignaturas:{}};
        es.push(data);
        
        localStorage.setItem("estudiantes", JSON.stringify(es));
    }

    getEstudiantes(){
        let es = JSON.parse(localStorage.getItem("estudiantes"));
        if (es == null || es.length == 0) {            
            es = [];
            localStorage.setItem("estudiantes", JSON.stringify(es));
            let c = 'colspan = "4"';
            let data =  '<input type ="button" class="btn nuevo" id="eNuevo" value="Nuevo Estudiante">'+
                        "<table>"+
                            "<thead>"+
                                "<tr>"+
                                    "<th>Id</th>"+
                                    "<th>Nombre</th>"+
                                    "<th>curso</th>"+
                                    "<th>Asignaturas</th>"+
                                "</tr>"+
                            "</thead>"+
                            "<tbody>"+
                            "<tr><td "+c+">No hay registros de estudiantes</td>"+
                            "</tbody>"+
                            "<tfoot>"+
                                "<tr>"+
                                    "<th>Id</th>"+
                                    "<th>Nombre</th>"+
                                    "<th>curso</th>"+
                                    "<th>Asignaturas</th>"+
                                "</tr>"+
                            "</tfoot>"+
                        "</table>";   
            return data;                   
        }else{
            let d="";
            for (const est of es) {
                console.log(est);
                d = d + "<tr>"+
                            "<td>" + est.id + "</td>"+
                            "<td>" + est.name + "</td>"+
                            "<td>" + est.curso + "</td>"+
                            '<td><input type ="button" class="btn ver" id="mNuevo" value="Ver"></td>'+
                        "</tr>";               
            }

            let data =  '<input type ="button" class="btn nuevo" id="eNuevo" value="Nuevo Estudiante">'+
                        "<table>"+
                            "<thead>"+
                                "<tr>"+
                                    "<th>Id</th>"+
                                    "<th>Nombre</th>"+
                                    "<th>curso</th>"+
                                    "<th>Asignaturas</th>"+
                                "</tr>"+
                            "</thead>"+
                            "<tbody>"
                            + d +
                            "</tbody>"+
                            "<tfoot>"+
                                "<tr>"+
                                    "<th>Id</th>"+
                                    "<th>Nombre</th>"+
                                    "<th>curso</th>"+
                                    "<th>Asignaturas</th>"+
                                "</tr>"+
                            "</tfoot>"+
                        "</table>";
            return data;
        }
    }
}

//Creamos objeto de la clase colegio
const obj = new Plataforma();

//instanciamos elementos a utlizar dentro del DOM
const contenido = $("#contenido");
const maestros = $("#maestros");
const estudiantes = $("#estudiantes");
const asignaturas = $("#asignaturas");

//Funciones para controlar el registro y listado de maestros
const setMaestro = ()=>{
    let name = $("#inputName").val();
    console.log(name);
    
    let titulo = $("#inputTitulo").val();
    console.log(titulo);
    obj.saveMaestro(name, titulo);    
    getMaestro();    
}

const saveM = () =>{
    let data = '<div id="formulario">'+
                    '<form id="fMNuevo">'+
                        '<h2>Nuevo Maestro</h2>'+
                        '<br>'+
                        '<label for="inputName">Nombre</label>'+
                        '<input type="text" placeholder="Nombre Completo" name="inputName" id="inputName" required>'+
                        '<br><br>                    '+
                        '<label for="inputTitulo">Titulo</label>'+
                        '<input type="text" placeholder="Titulo" name="inputTitulo" id="inputTitulo" required>'+
                        '<input type ="button" class="btn nuevo" id="mRegistrar" value="Enviar">'+
                        '<input type ="button" class="btn cancelar" id="mCancelar" value="Cancelar">'+
                    '</form>'+
                "</div>";

    contenido.html(data);
    const registrar = $("#mRegistrar");
    registrar.click(setMaestro);
    const cancelar = $("#mCancelar");
    cancelar.click(getM);
}

const getM = () => {  
    //localStorage.clear();  
    let data = obj.getMaestro();
    contenido.html(data);
    const btnNuevoM = $("#mNuevo");
    btnNuevoM.click(saveM);
}


//Funciones para controlar el registro y listado de estudiantes
const setEstudiante = ()=>{
    let name = $("#inputName").val();
    console.log(name);
    
    let curso = $("#inputCurso").val();
    console.log(curso);
    obj.saveEstudiante(name, curso);    
    getEs();    
}

const getEs = () => {  
    //localStorage.clear();  
    let data = obj.getEstudiantes();
    contenido.html(data);
    const btnNuevoM = $("#eNuevo");
    btnNuevoM.click(setEs);
}

const setEs = () =>{
    let data = '<div id="formulario">'+
                    '<form id="fMNuevo">'+
                        '<h2>Nuevo Estudiante</h2>'+
                        '<br>'+
                        '<label for="inputName">Nombre</label>'+
                        '<input type="text" placeholder="Nombre Completo" name="inputName" id="inputName" required>'+
                        '<br><br>'+
                        '<label for="inputCurso">Curso</label>'+
                        '<input type="text" placeholder="Titulo" name="inputCurso" id="inputCurso" required>'+
                        '<input type ="button" class="btn nuevo" id="eRegistrar" value="Enviar">'+
                        '<input type ="button" class="btn cancelar" id="eCancelar" value="Cancelar">'+
                    '</form>'+
                "</div>";

    contenido.html(data);
    $("#eRegistrar").click(setEstudiante);
    $("#eCancelar").click(getEs);
}

maestros.click(getM);
estudiantes.click(getEs);

