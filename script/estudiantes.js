//------------------------------------------ Funciones de interaccion con las Estudiantes ---------------------------------------------------
//-> getEstudiantes : consulta los registros de la tabla estudiantes y los pinta en el dom haciendo uso del del template de las tablas.
//-> newEstudiantes: Pinta en el dom un formulario para el registro de una nueva estudiantes.
//-> setEstudiantes: captura los datos del formulario y los envia ala db haciendo uso de un objeto de la clase estudiantes
//-> deleteEstudiante: captura el id del estudiante que se desea eliminar y lo envia mediante el objeto de la clase estudiantes para eliminar el registro. 
//-> getAsignaturas : Mediante el id de un estudiante busca en la db el regustro de las asignaturas que le han asignado al estudiante y las pinta en el dom.
//-> addAsignatura: pinta un formulario con la lista de asignaturas registradas para agregarle una al estudiante.
//-> setAsigEstu: captura la asignatura seleccionada y se la asigna al estudiante.
//-> removeAsignatura: mediante el id de una de las asignaturas del estudiante se busca el registro de esta asignatura y se elimina de la lista de las asignaturas asignadas al estudiante.

$(document).ready(()=>{
    const setEstudiantes = async ()=>{
        let name = $("#inputName").val();
        let curso = $("#inputCurso").val();
        const msj = await objEstudiantes.saveEstudiantes(name, curso); 
        notificacion(msj, getEstudiantes, "success");   
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

    const setAsigEstu = async (idf)=>{
        let asig = $("#inputAsig").val();

        const msj = await objEstudiantes.saveAsignatura(idf, asig);    
        notificacion(msj, getEstudiantes, "success");  
    }

    const removeAsignatura = async (idf,name)=>{
         const msj = await objEstudiantes.removeAsignaturas(idf,name);
         notificacion(msj, getEstudiantes, "success");                
    }

    const addAsignatura = async (idf)=>{
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
            notificacion("Se necesita el registro mínimo de un maestro", getAsignaturas, "danger");  
        }    
    }

    const updateAsignatura = (name, idf)=>{
       const d = objEstudiantes.searchEstudiantes(idf);
       const asig = d.asignaturas.find(e=>e.name===name);
       console.log(asig);
       
       const data = `<div id="formulario" class="d-flex justify-content-center ">
                        <form id="fAsAgregar" class="col-7">
                            <h2 class="text-center">Notas de la asignatura ${name}</h2>
                            <div class="mb-3">
                                <label for="inputNota1" class="form-label">Nota 1</label>
                                <input type="number" class="form-control" id="inputNota1" placeholder="0" value="${asig.nota1}">
                            </div>
                            <div class="mb-3">
                                <label for="inputNota2" class="form-label">Nota 2</label>
                                <input type="number" class="form-control" id="inputNota2" placeholder="0" value="${asig.nota2}">
                            </div>
                            <div class="mb-3">
                                <label for="inputNota3" class="form-label">Nota 3</label>
                                <input type="number" class="form-control" id="inputNota3" placeholder="0" value="${asig.nota3}">
                            </div>
                            <div class="mb-3">
                                <input type ="button" class="btn btn-primary" id="Agregar" data-idf = "${idf}" data-name = "${ name }" value="Agregar">
                                <input type ="button" class="btn btn-danger" id="Cancelar" value="Cancelar">
                            </div>
                        </form>
                    </div>`;
        return data;
    }

    const getAsignaturas = (d, idf)=>{
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
        notificacion(msj, getEstudiantes, "success");    
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
                const d = objEstudiantes.searchEstudiantes(idf);
                d.idf = idf;
                const data = getAsignaturas(d.asignaturas, idf);
                contenido.fadeOut("slow",()=>{
                    contenido.html(data);
                });        
                contenido.fadeIn("slow",()=>{
                    const btnAgAsi = $("#Nuevo");
                    btnAgAsi.click((e)=>{
                        let idf = e.target.dataset.idf;
                        addAsignatura(idf)            
                    });

                    const btndelete = $(".btnDelete");
                    btndelete.click((e)=>{
                        const idf = e.target.dataset.idf;
                        const name = e.target.dataset.id;
                        removeAsignatura(idf, name);
                    });

                    $(".boton").click((e)=>{
                        const name = e.target.dataset.name;
                        const idf = e.target.dataset.idf;
                        const data = updateAsignatura(name, idf);
                        contenido.fadeOut("slow",()=>{
                            contenido.html(data);
                        });
                        contenido.fadeIn("slow", ()=>{
                            $("#Agregar").click(()=>{
                                saveNotas(name, idf);                               
                            });
                            $("#Cancelar").click(cancelar);
                        });  
                    });
                });
                
            });
            btnNuevoM.click(newEstudiantes);
        });        
    }
    
    const saveNotas = async (name,idf)=>{        
        let n1 = parseFloat($("#inputNota1").val()), n2 = parseFloat($("#inputNota2").val()), n3 = parseFloat($("#inputNota3").val());
        if (isNaN(n1)) {
            n1 = 0;
        }
        if(isNaN(n2)){
            n2 = 0;
        }
        if(isNaN(n3)){
            n3 = 0;
        }

        if (n1>5 || n1<0 || n2>5 || n2<0 || n3>5 || n3<0) {
            notificacion("La nota no debe ser inferior a 0 ni superior a 5", ()=>{}, "danger"); 
        }else{
            let nf = (n1+n2+n3)/3;
            nf = nf.toFixed(2);            
            const data = {name, nota1:n1, nota2:n2, nota3:n3, notaf:nf};
            await objEstudiantes.removeAsignaturas(idf,name);       
            const msj = await objEstudiantes.updateAsignatura(idf,data); 
            notificacion(msj, getEstudiantes, "success");
        }        
    }

    const cancelar = ()=>{ getEstudiantes() };

    const btnEstudiantes = $("#estudiantes");
    btnEstudiantes.click(getEstudiantes);
});
