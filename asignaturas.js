
$(document).ready(()=>{
    const deleteAsignatura = (idf)=>{
        objAsignaturas.deleteAsignatura(idf); 
        getAsignatura();
    }
    
    const getAsignatura = () => {   
        let data="";
        let listAsiganturas = objAsignaturas.getAsignaturas();
        if (listAsiganturas.length == 0) {            

            data = `<center><h2 style="margin-top:60px;">Asignaturas</h2></center>
                    <button type="button" class="btn btn-primary mb-4" id="aNuevo">Nueva Asignatura</button>
                    <table class="table table-striped table-borderless">
                        <thead class="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Maestro</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td class="text-center" colspan="3">No hay registros de estudiantes</td>
                            </tbody>
                            <tfoot class="table-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>curso</th>
                                </tr>
                            </tfoot>
                        </table>`;                   
        }else{
            let d="";
            for (const asig of listAsiganturas) {
                let ma = objMaestros.searchMaestro(asig.maestro);
                console.log(ma);
                
                d  +=  `<tr>
                            <td>${asig.id}</td>
                            <td>${asig.name}</td>
                            <td>${ma.name}</td>
                            <td><input type ="button" class="btnDelete btn btn-danger" data-idf="${asig.idf}" id="asDelete" value="Eliminar"></td>
                        </tr>`;               
            }

            data = `<center><h2 style="margin-top:60px;">Asignaturas</h2></center>
                    <button type="button" class="btn btn-primary mb-4" id="aNuevo">Nueva Asignatura</button>
                    <table class="table table-striped table-borderless">
                        <thead class="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Maestro</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                ${d}
                            </tr>
                        </tbody>
                        <tfoot class="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>curso</th>
                                <th>Eliminar</th>
                            </tr>
                        </tfoot>
                    </table>`;   
        }
        contenido.fadeOut("slow",()=>{
            contenido.html(data);
        });        
        contenido.fadeIn("slow",()=>{
            const btnNuevoM = $("#aNuevo");
            const btnDelete = $(".btnDelete");
            btnDelete.click((e)=>{
                let idf = e.target.dataset.idf;
                deleteAsignatura(idf);
            });
            btnNuevoM.click(newAsignatura);
        });
    }

    const setAsignaturas = ()=>{
        let name = $("#inputName").val();
        console.log(name);
        
        let maestro = $("#inputMaes").val();
        console.log(maestro);
        objAsignaturas.saveAsignaturas(name, maestro);    
        getAsignatura();    
    }

    const newAsignatura = () =>{
        let data = "";
        let ma = objMaestros.getMaestros();
        if (ma.length > 0) {
            let lista = '<select class="form-control" name="inputMaes" id="inputMaes">';
            for (const maes of ma) {
                lista += `<option value="${maes.id}">${maes.name}</option>`;
            }        
            lista += '</select>';
            data = `<div id="formulario" class="d-flex justify-content-center ">
                        <form id="fAsAgregar" class="col-7">
                            <h2 class="text-center">Nueva Asignatura</h2>
                            <div class="mb-3">
                                <label for="inputName">Nombre</label>
                                <input type="text" class="form-control" placeholder="Nombre de la asignatura" name="inputName" id="inputName" required>
                            </div>
                            <div class="mb-3">
                                <label for="inputCurso">Maestro</label>
                                ${lista}
                            </div>
                            <div class="mb-3">
                                <input type ="button" class="btn btn-primary" id="asAgregar" value="Agregar">
                                <input type ="button" class="btn btn-danger" id="asCancelar" value="Cancelar">
                            </div>
                        </form>
                    </div>`;
            contenido.fadeOut("slow",()=>{
                contenido.html(data);
            });        
            contenido.fadeIn("slow",()=>{
                $("#asAgregar").click(setAsignaturas);
                $("#asCancelar").click(getAsignatura);  
            });  
        }else{
            alert("es necesario el registro de al menos un maestro.");
            getMaestros();
        }    
    }

    const btnAsignaturas = $("#asignaturas");
    btnAsignaturas.click(getAsignatura);
});

