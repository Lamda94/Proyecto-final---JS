$(document).ready(()=>{
    const setMaestro = ()=>{
        let name = $("#inputName").val();        
        let titulo = $("#inputTitulo").val();
        objMaestros.saveMaestro(name, titulo);    
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
        let data = "";
        const getMaestros = await objMaestros.getMaestros();
                
        if (getMaestros.lenght == 0) {   
            console.log("aqui");
                     
            data = `<h2 class="mb-4 text-center">Maestros</h2>
                    <button type="button" class="btn btn-primary mb-4" id="mNuevo">Nuevo Maestro</button>
                    <table class="table table-striped table-borderless">
                        <thead class="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Titulo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center" colspan="3">No hay registros de maestros</td>
                            </tr>
                        </tbody>
                        <tfoot class="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Titulo</th>
                            </tr>
                        </tfoot>
                    </table>`;       
        }else{            
            let d = "";
            for (const maestro of getMaestros) {
                d += `<tr>
                        <td>${maestro.id}</td>
                        <td>${maestro.name}</td>
                        <td>${maestro.title}</td>
                        <td><input type ="button" class="btnDeleteM btn btn-danger" data-idf="${maestro.idf}" data-id="${maestro.id}" value="Eliminar"></td>
                    </tr>`;
            }
            data =  `<h2 class="mb-4 text-center">Maestros</h2>
                    <button type="button" class="btn btn-primary mb-4" id="mNuevo">Nuevo Maestro</button>
                    <table class="table table-striped">
                    <thead class="table-dark">
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Titulo</th>
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
                            <th>Titulo</th>
                            <th>Eliminar</th>
                        </tr>
                    </tfoot>
                    </table>`; 
        }
        contenido.fadeOut("slow",()=>{
            contenido.html(data);
        });        
        contenido.fadeIn("slow",()=>{
            const btnNuevoM = $("#mNuevo");
            const btnDeleteM = $(".btnDeleteM");
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

