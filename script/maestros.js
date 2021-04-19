//------------- Funciones de interaccion con los maestros ----------------------------------
//Esta funcion construye una tabla con los datos que le envian
//-> getMaestros : los titulos de cada columna
//-> data: un objeto con los datos que se van a pintar en la tabla
//-> claves: las claves para acceder alos datos del onjeto
//-> titulo: titulo que llevará la tabla
//-> edit: si se agrega o no un boton editar (true, false)
//-> ver: si se agrega o no un boton ver (true, false)
//-> eli: si se agrega o no un boton aliminar (true, false)
//-> idf: identificador del documento en firebase en caso de que no este incluido en el objeto de datos.
$(document).ready(()=>{
    const setMaestro = ()=>{
        let name = $("#inputName").val();        
        let titulo = $("#inputTitulo").val();
        objMaestros.saveMaestro(name, titulo);  
        notificaion.fadeIn("slow",()=>{
      
        });
          
        getMaestros();    
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
        
        getMaestros();
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

