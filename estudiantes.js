//Funciones para controlar el registro y listado de estudiantes
const setEstudiante = ()=>{
    let name = $("#inputName").val();
    console.log(name);
    
    let curso = $("#inputCurso").val();
    console.log(curso);
    obj.saveEstudiante(name, curso);    
    getEs();    
}

const getAsigEst = (name,d,id)=>{
    if (d == null || d.length == 0) { 
        const data  =   '<center><h2 style="margin-top:60px;">Asignaturas de '+name+'</h2></center>'+
                        '<input type ="button" class="btn nuevo" id="aSigNuevo" value="Agregar Asignaturas">'+
                        "<table>"+
                            "<thead>"+
                                "<tr>"+
                                    "<th>Id</th>"+
                                    "<th>Nombre</th>"+
                                    "<th>Nota 1</th>"+
                                    "<th>Nota 2</th>"+
                                    "<th>Nota 3</th>"+
                                    "<th>Nota Final</th>"+
                                    "<th>Editar Notas</th>"+
                                "</tr>"+
                            "</thead>"+
                            "<tbody>"+
                                '<tr >'+
                                    '<td colspan="7">No hay asignaturas registradas</td>'+
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
                                    "<th>Editar Notas</th>"+
                                "</tr>"+
                            "</tfoot>"+
                        "</table>";
        return data;
    }else{
        let da = "";
        for (const dat of d) {
            da = da +  '<tr >'+
                            '<td>' + dat.id + "</td>"+
                            '<td>' + dat.name + "</td>"+
                            '<td>' + dat.nota1 + "</td>"+
                            '<td>' + dat.nota2 + "</td>"+
                            "<td>" + dat.nota3 + "</td>"+
                            "<td>" + dat.notaf + "</td>"+
                            '<td class="boton" style="cursor:pointer;"><span class="ver span">Editar</span></td>'+
                        "</tr>"; 
        }

        const data =    '<center><h2 style="margin-top:60px;">Asignaturas de '+name+'</h2></center>'+
                        '<input type ="button" class="btn nuevo" id="aSigNuevo" value="Agregar Asignaturas">'+
                        "<table>"+
                            "<thead>"+
                                "<tr>"+
                                    "<th>Id</th>"+
                                    "<th>Nombre</th>"+
                                    "<th>Nota 1</th>"+
                                    "<th>Nota 2</th>"+
                                    "<th>Nota 3</th>"+
                                    "<th>Nota Final</th>"+
                                    "<th>Editar Notas</th>"+
                                "</tr>"+
                            "</thead>"+
                            "<tbody>"+
                                '<tr >'+
                                    da+
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
                                    "<th>Editar Notas</th>"+
                                "</tr>"+
                            "</tfoot>"+
                        "</table>";        
        return data;
    }
}

const setAsigEstu = (id)=>{
    let asig = $("#inputAsig").val();
    console.log(asig);

    obj.saveAsingEst(id, asig);    
    getEs();    
}

const setAsigEst = (id)=>{
    let data = "";
    let asi = obj.getAsignaturas();
    if (asi == null || asi.length == 0) {}else{
    let lista = '<select name="inputAsig" id="inputAsig">';
    for (const asig of asi) {
        lista += `<option value="${asig.id}">${asig.name}</option>`;
    }
    lista += '</select>';;
    data = '<div id="formulario">'+
                '<form id="fAsAgregar">'+
                    '<h2>Agregar Asignatura</h2>'+
                    '<br>'+
                    '<label for="inputAsig">Asignatura</label>'+
                    lista+
                    '<input type ="button" class="btn nuevo" id="asAgregar" value="Agregar">'+
                    '<input type ="button" class="btn cancelar" id="asCancelar" value="Cancelar">'+
                '</form>'+
            "</div>";
    }
    contenido.html(data);
   $("#asAgregar").click(()=>setAsigEstu(id));
    $("#asCancelar").click(getEs);
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
        const data = getAsigEst(d.name, d.asignaturas, d.id);
        contenido.html(data);
        const btnAgAsi = $("#aSigNuevo");
        btnAgAsi.click(()=>setAsigEst(d.id));
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
