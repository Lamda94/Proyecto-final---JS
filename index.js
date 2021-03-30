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
        return ma;
    }

    searchMaestro(idm){
        let ma = JSON.parse(localStorage.getItem("maestros"));
        if (ma == null || ma.length == 0) { }else{
            return ma.find(m=>m.id==idm);
        }
    }

    saveEstudiante(name, curso){        
        let es = JSON.parse(localStorage.getItem("estudiantes"));
        let id = es.length;
        let data = {id: id, name: name, curso: curso, asignaturas:[]};
        es.push(data);
        
        localStorage.setItem("estudiantes", JSON.stringify(es));
    }

    getEstudiantes(){
        let es = JSON.parse(localStorage.getItem("estudiantes"));
        return es;
    }

    saveAsignatura(name, maestro){        
        let as = JSON.parse(localStorage.getItem("asignaturas"));
        let id = as.length;
        let data = {id: id, name: name, maestro: maestro};
        as.push(data);
        
        localStorage.setItem("asignaturas", JSON.stringify(as));
    }

    getAsignaturas(){
        let asi = JSON.parse(localStorage.getItem("asignaturas"));
        return asi;
    }

    searchEstudiantes(ide){
        console.log("ide:"+ide);
        let est = JSON.parse(localStorage.getItem("estudiantes"));
        let data = est.find(es=>es.id == ide);
        console.log("data:"+JSON.stringify(data));
        return data;
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
    getM();    
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
    let data=""; 
    let ma = obj.getMaestro();
    if (ma == null || ma.length == 0) {            
        ma = [];
        localStorage.setItem("maestros", JSON.stringify(ma));
        let c = 'colspan = "3"';
        data =  '<center><h2 style="margin-top:60px;">Maestros</h2></center>'+
                '<input type ="button" class="btn nuevo" id="mNuevo" value="Nuevo Maestro">'+
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

        data =  '<center><h2 style="margin-top:60px;">Maestros</h2></center>'+
                '<input type ="button" class="btn nuevo" id="mNuevo" value="Nuevo Maestro">'+
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
    }
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

const getAsigEst = (name,d)=>{
    console.log(d);
    console.log(d.length);
    if (d == null || d.length == 0) { 
        const data = '<center><h2 style="margin-top:60px;">Asignaturas de '+name+'</h2></center>'+
                        '<input type ="button" class="btn nuevo" id="eNuevo" value="Agregar Asignaturas">'+
                        "<table>"+
                            "<thead>"+
                                "<tr>"+
                                    "<th>Id</th>"+
                                    "<th>Nombre</th>"+
                                    "<th>Nota 1</th>"+
                                    "<th>Nota 2</th>"+
                                    "<th>Nota 3</th>"+
                                    "<th>Nota Final</th>"+
                                "</tr>"+
                            "</thead>"+
                            "<tbody>"+
                            '<tr >'+
                                '<td colspan="6">No hay asignaturas registradas</td>'+
                            "</tr>"+
                            "</tbody>"+
                            "<tfoot>"+
                                "<tr>"+
                                "<th>Id</th>"+
                                "<th>Nombre</th>"+
                                "<th>Nota 1</th>"+
                                "<th>Nota 2</th>"+
                                "<th>Nota 3</th>"+
                                "<th>Nota Final</th>"+
                                "</tr>"+
                            "</tfoot>"+
                        "</table>";
        return data;
    }else{
        let da = "";
        for (const dat of d) {
            da +=   '<tr >'+
                        '<td>' + d.id + "</td>"+
                        '<td>' + d.name + "</td>"+
                        '<td>' + d.nota1 + "</td>"+
                        '<td>' + d.nota2 + "</td>"+
                        "<td>" + d.nota3 + "</td>"+
                        "<td>" + d.notaF + "</td>"+
                    "</tr>"; 
        }
        const data = '<center><h2>Asignaturas de '+name+'</h2></center>'+
                        '<input type ="button" class="btn nuevo" id="eNuevo" value="Nuevo Estudiante">'+
                        "<table>"+
                            "<thead>"+
                                "<tr>"+
                                    "<th>Id</th>"+
                                    "<th>Nombre</th>"+
                                    "<th>Nota 1</th>"+
                                    "<th>Nota 2</th>"+
                                    "<th>Nota 3</th>"+
                                    "<th>Nota Final</th>"+
                                "</tr>"+
                            "</thead>"+
                            "<tbody>"
                            '<tr >'+
                            +da+
                            "</tr>";
                            "</tbody>"+
                            "<tfoot>"+
                                "<tr>"+
                                "<th>Id</th>"+
                                "<th>Nombre</th>"+
                                "<th>Nota 1</th>"+
                                "<th>Nota 2</th>"+
                                "<th>Nota 3</th>"+
                                "<th>Nota Final</th>"+
                                "</tr>"+
                            "</tfoot>"+
                        "</table>";
        return data;
    }
}

const getEs = () => {  
    //localStorage.clear();  
    let data = "";
    let es = obj.getEstudiantes();
    if (es == null || es.length == 0) {            
        es = [];
        localStorage.setItem("estudiantes", JSON.stringify(es));
        let c = 'colspan = "4"';
        data =  '<center><h2 style="margin-top:60px;">Estudiantes</h2></center>'+
                    '<input type ="button" class="btn nuevo" id="eNuevo" value="Nuevo Estudiante">'+
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
    }else{
        let d="";
        for (const est of es) {
            console.log(est);
            d = d + '<tr >'+
                        '<td id="numero">' + est.id + "</td>"+
                        '<td>' + est.name + "</td>"+
                        "<td>" + est.curso + "</td>"+
                        '<td class="boton" style="cursor:pointer;"><span class="ver span">Ver</span></td>'+
                    "</tr>";               
        }

         data =  '<center><h2 style="margin-top:60px;">Estudiantes</h2></center>'+
                    '<input type ="button" class="btn nuevo" id="eNuevo" value="Nuevo Estudiante">'+
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
    }

    contenido.html(data);
    const btnNuevoM = $("#eNuevo");
    $(".boton").click(function() {
        let valores;
        $(this).parents("tr").find("#numero").each(function() {
          valores = parseInt($(this).html());
        });
        const d = obj.searchEstudiantes(valores);
        const data = getAsigEst(d.name, d.asignaturas);
        contenido.html(data);
    });
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


//Funciones para controlar el registro y listado de asignatura
const setAsignaturas = ()=>{
    let name = $("#inputName").val();
    console.log(name);
    
    let maestro = $("#inputMaes").val();
    console.log(maestro);
    obj.saveAsignatura(name, maestro);    
    getAsignatura();    
}

const getAsignatura = () => {  
    //localStorage.clear();  
    let data="";
    let asi = obj.getAsignaturas();
    if (asi == null || asi.length == 0) {            
        asi = [];
        localStorage.setItem("asignaturas", JSON.stringify(asi));
        let c = 'colspan = "3"';
        data =  '<center><h2 style="margin-top:60px;">Asignaturas</h2></center>'+
                '<input type ="button" class="btn nuevo" id="aNuevo" value="Nueva Asignatura">'+
                    "<table>"+
                        "<thead>"+
                            "<tr>"+
                                "<th>Id</th>"+
                                "<th>Nombre</th>"+
                                "<th>Maestro</th>"+
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
                            "</tr>"+
                        "</tfoot>"+
                    "</table>";                   
    }else{
        let d="";
        for (const asig of asi) {
            console.log(asig);
            let ma = obj.searchMaestro(asig.maestro);
            console.log(ma);
            
            d = d + "<tr>"+
                        "<td>" + asig.id + "</td>"+
                        "<td>" + asig.name + "</td>"+
                        "<td>" + ma.name + "</td>"+
                    "</tr>";               
        }

        data =  '<center><h2 style="margin-top:60px;">Asignaturas</h2></center>'+
                '<input type ="button" class="btn nuevo" id="aNuevo" value="Nueva Asignatura">'+
                    "<table>"+
                        "<thead>"+
                            "<tr>"+
                                "<th>Id</th>"+
                                "<th>Nombre</th>"+
                                "<th>Maestro</th>"+
                            "</tr>"+
                        "</thead>"+
                        "<tbody>"
                        + d +
                        "</tbody>"+
                        "<tfoot>"+
                            "<tr>"+
                            "<th>Id</th>"+
                            "<th>Nombre</th>"+
                            "<th>Maestro</th>"+
                            "</tr>"+
                        "</tfoot>"+
                    "</table>";
    }
    contenido.html(data);
    const btnNuevoM = $("#aNuevo");
    btnNuevoM.click(setAsignatura);
}

const setAsignatura = () =>{
    //localStorage.clear();
    let data = "";
    let ma = obj.getMaestro();
    if (ma == null || ma.length == 0) {}else{
    let lista = '<select name="inputMaes" id="inputMaes">';
    for (const maes of ma) {
        lista = lista+ `<option value="${maes.id}">${maes.name}</option>`;
    }
    
    data = '<div id="formulario">'+
                '<form id="fMNuevo">'+
                    '<h2>Nueva Asignatura</h2>'+
                    '<br>'+
                    '<label for="inputName">Nombre</label>'+
                    '<input type="text" placeholder="Nombre de la asignatura" name="inputName" id="inputName" required>'+
                    '<br><br>'+
                    '<label for="inputCurso">Maestro</label>'+
                    lista+
                    '<input type ="button" class="btn nuevo" id="eRegistrar" value="Enviar">'+
                    '<input type ="button" class="btn cancelar" id="eCancelar" value="Cancelar">'+
                '</form>'+
            "</div>";
    }
    contenido.html(data);
    $("#eRegistrar").click(setAsignaturas);
    $("#eCancelar").click(getAsignatura);
}

maestros.click(getM);
estudiantes.click(getEs);
asignaturas.click(getAsignatura);

