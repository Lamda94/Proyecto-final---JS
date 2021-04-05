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