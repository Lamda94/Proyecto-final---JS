$(document).ready(()=>{
    const setEstudiantes = ()=>{
        let name = $("#inputName").val();
        let curso = $("#inputCurso").val();
        objEstudiantes.saveEstudiantes(name, curso);    
        getEstudiantes();    
    }

    const newEstudiantes = () =>{
        let data = `<div id="formulario" class="d-flex justify-content-center ">
                        <form id="fMNuevo" class="col-7">
                            <h2 class="text-center">Nuevo Estudiante</h2>
                            <div class="mb-3">
                            <label for="inputName" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="inputName" placeholder="Nombre completo del Estudiante">
                            </div>
                            <div class="mb-3">
                            <label for="inputCurso" class="form-label">Curso</label>
                            <input type="text" class="form-control" id="inputCurso" placeholder="Curso al que pertenece el  Estudiante">
                            </div>
                            <div class="mb-3">
                                <input type ="button" class="btn btn-primary" id="eRegistrar" value="Enviar">
                                <input type ="button" class="btn btn-danger" id="eCancelar" value="Cancelar">
                            </div>
                        </form>
                    </div>`;
        contenido.fadeOut("slow",()=>{
            contenido.html(data);
        });        
        contenido.fadeIn("slow",()=>{
            $("#eRegistrar").click(setEstudiantes);
            $("#eCancelar").click(getEstudiantes);
        });
        
    }

    const setAsigEstu = (idf)=>{
        let asig = $("#inputAsig").val();
        console.log(asig);

        objEstudiantes.saveAsignatura(idf, asig);    
        getEstudiantes(); 
    }

    const removeAsignatura = (idf,name)=>{
         objEstudiantes.removeAsignaturas(idf,name);
         getEstudiantes();         
    }

    const addAsignatura = (id, idf)=>{
        let data = "";
        let asi = objAsignaturas.getAsignaturas();
        if (asi.length > 0) {
            let lista = '<select class="form-control" name="inputAsig" id="inputAsig">';
            for (const asig of asi) {
                lista += `<option value="${asig.name}">${asig.name}</option>`;
            }
            lista += '</select>';
            data = `<div id="formulario" class="d-flex justify-content-center ">
                        <form id="fAsAgregar" class="col-7">
                            <h2 class="text-center">Agregar Asignatura</h2>
                            <div class="mb-3">
                                <label for="inputName" class="form-label">Asignatura</label>
                                ${ lista }
                            </div>
                            <div class="mb-3">
                                <input type ="button" class="btn btn-primary" id="asAgregar" data-idf = "${ idf }" value="Agregar">
                                <input type ="button" class="btn btn-danger" id="asCancelar" value="Cancelar">
                            </div>
                        </form>
                    </div>`;
            contenido.fadeOut("slow",()=>{
                contenido.html(data);
            });        
            contenido.fadeIn("slow",()=>{
                 $("#asAgregar").click((e)=>{
                    let idf = e.target.dataset.idf;
                    setAsigEstu(idf);            
                });
                $("#asCancelar").click(getEstudiantes);
            });           
        }else{
            alert("Es necesario el registro de almenos una asignatura");
            getAsignaturas();
        }    
    }

    const getAsignaturas = (name,d,id, idf)=>{
        if (d.length == 0) { 
            let data = `<h2 class="mb-4 text-center">Asignaturas de ${name}</h2>
                        <button type="button" class="btn btn-primary mb-4"  data-idf="${idf}" id="aSigNuevo">Agregar</button>
                        <table class="table table-striped table-borderless">
                            <thead class="table-dark">
                                <tr>
                                    <th class="text-center">Nombre</th>
                                    <th class="text-center">Nota 1</th>
                                    <th class="text-center">Nota 2</th>
                                    <th class="text-center">Nota 3</th>
                                    <th class="text-center">Nota Final</th>
                                    <th class="text-center">Editar Notas</th>
                                    <th class="text-center">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center" colspan="7">No hay asignaturas registradas</td>
                                </tr>
                            </tbody>
                            <tfoot class="table-dark">
                                <tr>
                                    <th class="text-center">Nombre</th>
                                    <th class="text-center">Nota 1</th>
                                    <th class="text-center">Nota 2</th>
                                    <th class="text-center">Nota 3</th>
                                    <th class="text-center">Nota Final</th>
                                    <th class="text-center">Editar Notas</th>
                                    <th class="text-center">Eliminar</th>
                                </tr>
                            </tfoot>
                        </table>`;                
            return data;
        }else{
            let da = "";
            for (const dat of d) {
                da = da + `<tr>
                                <td class="text-center">${dat.name}</td>
                                <td class="text-center">${dat.nota1}</td>
                                <td class="text-center">${dat.nota2}</td>
                                <td class="text-center">${dat.nota3}</td>
                                <td class="text-center">${dat.notaf}</td>
                                <td><button type="button" class="boton btn btn-success" data-idf="${idf}">Editar</button></td>
                                <td><button type="button" class="btndelete btn btn-danger" data-idf="${idf}" data-name="${dat.name}">Eliminar</button></td>
                            </tr>`; 
            }

            const data =    `<h2 class="mb-4 text-center">Asignaturas de ${name}</h2>
                            <button type="button" class="btn btn-primary mb-4" data-idf="${idf}" id="aSigNuevo">Agregar</button>
                            <table class="table table-striped table-borderless">
                                <thead class="table-dark">
                                    <tr>
                                        <th class="text-center">Nombre</th>
                                        <th class="text-center">Nota 1</th>
                                        <th class="text-center">Nota 2</th>
                                        <th class="text-center">Nota 3</th>
                                        <th class="text-center">Nota Final</th>
                                        <th class="text-center">Editar Notas</th>
                                        <th class="text-center">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        ${da}
                                    </tr>
                                </tbody>
                                <tfoot class="table-dark">
                                    <tr>
                                        <th class="text-center">Nombre</th>
                                        <th class="text-center">Nota 1</th>
                                        <th class="text-center">Nota 2</th>
                                        <th class="text-center">Nota 3</th>
                                        <th class="text-center">Nota Final</th>
                                        <th class="text-center">Editar Notas</th>
                                        <th class="text-center">Eliminar</th>
                                    </tr>
                                </tfoot>
                            </table>`;        
            return data;
        }
    }

    const deleteEstudiante = async (e)=>{
        let idf = e.target.dataset.idf;
        const msj = await objEstudiantes.deleteEstudiantes(idf);
        getEstudiantes();       
    }

    const getEstudiantes = async ()=>{
        let data = "";
        const getEstudiantes = objEstudiantes.getEstudiantes();
        if (getEstudiantes.length == 0) { 
            data = `<h2 class="mb-4 text-center">Estudiantes</h2>
                    <button type="button" class="btn btn-primary mb-4" id="eNuevo">Nuevo Maestro</button>
                    <table class="table table-striped table-borderless">
                        <thead class="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>curso</th>
                                <th>Asignaturas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center" colspan="4">No hay registros de estudiantes</td>
                            </tr>
                        </tbody>
                        <tfoot class="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>curso</th>
                                <th>Asignaturas</th>
                            </tr>
                        </tfoot>
                    </table>`;                 
        }else{
            let d="";
            for (const est of getEstudiantes) {
                d = d + `<tr >
                            <td id="numero">${est.id}</td>
                            <td>${est.name}</td>
                            <td>${est.curso}</td>
                            <td><button type="button" class="boton btn btn-success" data-id="${est.id}" data-idf="${est.idf}">Ver</button></td>
                            <td><button type="button" class="btnElimnar btn btn-danger " data-idf="${est.idf}">Eliminar</button></td>
                        </tr>`;            
            }

            data = `<h2 class="mb-4 text-center">Estudiantes</h2>
                    <button type="button" class="btn btn-primary mb-4" id="eNuevo">Nuevo Estudiante</button>
                    <table class="table table-striped table-borderless">
                        <thead class="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>curso</th>
                                <th>Asignaturas</th>
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
                                <th>Asignaturas</th>
                                <th>Eliminar</th>
                            </tr>
                        </tfoot>
                    </table>`;        
        }
        contenido.fadeOut("slow",()=>{
            contenido.html(data);
        });        
        contenido.fadeIn("slow",()=>{
            const btnNuevoM = $("#eNuevo");
            $(".btnElimnar").click(deleteEstudiante);
            $(".boton").click((e)=>{
                let valores = e.target.dataset.id;
                let idf = e.target.dataset.idf;
                const d = objEstudiantes.searchEstudiantes(valores);
                const data = getAsignaturas(d.name, d.asignaturas, d.id, idf);
                contenido.fadeOut("slow",()=>{
                    contenido.html(data);
                });        
                contenido.fadeIn("slow",()=>{
                    const btnAgAsi = $("#aSigNuevo");
                    btnAgAsi.click((e)=>{
                        let idf = e.target.dataset.idf;
                        addAsignatura(d.id, idf)            
                    });
                    const btndelete = $(".btndelete");
                    btndelete.click((e)=>{
                        const idf = e.target.dataset.idf;
                        const name = e.target.dataset.name;
                        removeAsignatura(idf, name);
                    });
                });
                
            });
            btnNuevoM.click(newEstudiantes);
        });        
    }

    const btnEstudiantes = $("#estudiantes");
    btnEstudiantes.click(getEstudiantes);
});
