//------------------------------------------ Funciones de interaccion con los maestros ---------------------------------------------------
//-> getMaestros : consulta los registros de la tabla maestros y los pinta en el dom haciendo uso del del template de las tablas.
//-> newMaestro: Pinta en el dom un fromaulario para el registro de un nuevo maestro.
//-> setMaestro: captura los datos del formulario y los envia ala bd haciendo uso de un objeto de la clase maestros
//-> deleteMaestro: captura el id del maestro que se desea eliminar y lo envia al objeto de la clase maestros para eliminar el registro. 

$(document).ready(()=>{
    const setMaestro = ()=>{
        let name = $("#inputName").val();        
        let titulo = $("#inputTitulo").val();
        objMaestros.saveMaestro(name, titulo);  
        const not  = `<div class="alert alert-success" role="alert">
                            Maestro registrado correctamente.
                    </div>`;
        notificaion.fadeIn("slow",()=>{
        notificaion.html(not)
        });
        getMaestros();     
        setTimeout(()=>{
            notificaion.fadeOut("slow", ()=>{
                notificaion.html("");
            });
        }, 5000);  
    }

    const newMaestro = () =>{
        let data = `<div id="formulario" class="d-flex justify-content-center ">
                    <form id="fMNuevo" class="col-7">
                        <h2 class="text-center">Nuevo Maestro</h2>
                        <div class="mb-3">
                        <label for="inputName" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="inputName" placeholder="Nombre completo del Maestro">
                        </div>
                        <div class="mb-3">
                        <label for="inputTitulo" class="form-label">Titulo</label>
                        <input type="text" class="form-control" id="inputTitulo" placeholder="Titulo del Maestro">
                        </div>
                        <div class="mb-3">
                            <input type ="button" class="btn btn-primary" id="mRegistrar" value="Enviar">
                            <input type ="button" class="btn btn-danger" id="mCancelar" value="Cancelar">
                        </div>
                    </form>
                </div>`;
        contenido.fadeOut("slow",()=>{
            contenido.html(data);
        });        
        contenido.fadeIn("slow",()=>{
            const registrar = $("#mRegistrar");
            registrar.click(setMaestro);
            const cancelar = $("#mCancelar");
            cancelar.click(getMaestros);
        });
    }

    const deleteMaestro = async (idf,id)=>{
        objMaestros.deleteMaestros(idf);         
        const asigna = await objAsignaturas.getAsignaturas();
        console.log("regreso");
        console.log(asigna);
                
        for (const doc of asigna) {
            console.log("ingreso"); 
            console.log(`${doc.maestro} == ${id}`);
                      
            if (parseInt(doc.maestro) == id) {
                const idfa = doc.idf;
                objAsignaturas.deleteAsignatura(idfa);
            }
        }  
        
        const not  = `<div class="alert alert-success" role="alert">
                            Maestro eliminado correctamente.
                    </div>`;
        notificaion.fadeIn("slow",()=>{
        notificaion.html(not)
        });
        getMaestros();     
        setTimeout(()=>{
            notificaion.fadeOut("slow", ()=>{
                notificaion.html("");
            });
        }, 5000);  
    }

    const getMaestros = async ()=>{        
        const getMaestros = await objMaestros.getMaestros();
        const heads = ["Id", "Nombre", "Titulo"]; 
        const claves = ["id", "name", "title"];          
        const data = templateTable(heads, getMaestros, claves, "Maestro", false, false, true, "");
        contenido.fadeOut("slow",()=>{
            contenido.html(data);
        });        
        contenido.fadeIn("slow",()=>{
            const btnNuevoM = $("#Nuevo");
            const btnDeleteM = $(".btnDelete");
            btnDeleteM.click((e)=>{
                let idf = e.target.dataset.idf;
                let id = e.target.dataset.id;
                deleteMaestro(idf, id);
            });
            btnNuevoM.click(newMaestro);
        });
    }

    const btnMaestros = $("#maestros");
    btnMaestros.click(getMaestros);  
});

