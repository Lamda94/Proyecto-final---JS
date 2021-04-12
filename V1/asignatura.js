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