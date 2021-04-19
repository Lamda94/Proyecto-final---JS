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

    const addAsignatura = async (id, idf)=>{
        let data = "";
        let asi = await objAsignaturas.getAsignaturas();
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

    const getAsignaturas = (name, d, id, idf)=>{
        const heads = ["Nombre", "Nota 1", "Nota 1", "Nota 1", "Nota Final"];
        const claves = ["name", "nota1", "nota2", "nota3", "notaf"]; 
        console.log("d:");
        console.log(d);
        
          
        const data = templateTable(heads, d, claves,`Asignatura`, true, false, true, idf);
        return data;
    }

    const deleteEstudiante = async (e)=>{
        let idf = e.target.dataset.idf;
        const msj = await objEstudiantes.deleteEstudiantes(idf);
        getEstudiantes();       
    }

    const getEstudiantes = async ()=>{
        const getEstudiantes = await objEstudiantes.getEstudiantes();
        const heads = ["Id", "Nombre", "Curso"];
        const claves = ["id", "name", "curso"];   
        const data = templateTable(heads, getEstudiantes, claves,"Estudiante", false, true, true, "");
        contenido.fadeOut("slow",()=>{
            contenido.html(data);
        });        
        contenido.fadeIn("slow",()=>{
            const btnNuevoM = $("#Nuevo");
            $(".btnDelete").click(deleteEstudiante);
            $(".boton").click((e)=>{
                let valores = e.target.dataset.id;
                let idf = e.target.dataset.idf;
                const d = objEstudiantes.searchEstudiantes(valores);
                d.idf = idf;
                const data = getAsignaturas(d.name, d.asignaturas, d.id, idf);
                contenido.fadeOut("slow",()=>{
                    contenido.html(data);
                });        
                contenido.fadeIn("slow",()=>{
                    const btnAgAsi = $("#Nuevo");
                    btnAgAsi.click((e)=>{
                        let idf = e.target.dataset.idf;
                        addAsignatura(d.id, idf)            
                    });
                    const btndelete = $(".btnDelete");
                    btndelete.click((e)=>{
                        const idf = e.target.dataset.idf;
                        const name = e.target.dataset.id;
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
