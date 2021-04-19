$(document).ready(()=>{    
    const deleteAsignatura = (idf)=>{
        objAsignaturas.deleteAsignatura(idf); 
        getAsignatura();
    }
    
    const getAsignatura = async () => {   
        const asignaturas = [];
        let listAsiganturas = await objAsignaturas.getAsignaturas();
        for (let doc  of listAsiganturas) {
            const ma = await objMaestros.searchMaestro(doc.maestro);
            doc.maestro = ma.name;
            asignaturas.push(doc);
        }
        console.log("data");
        console.log(asignaturas); 
        const heads = ["Id", "Nombre", "Maestro"]; 
        const claves = ["id", "name", "maestro"];          
        const data = templateTable(heads, asignaturas, claves, "Asignatura", false, false, true, "");       
        contenido.fadeOut("slow",()=>{
            contenido.html(data);
        });        
        contenido.fadeIn("slow",()=>{
            const btnNuevoM = $("#Nuevo");
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

    const newAsignatura = async () =>{
        let data = "";
        let ma = await objMaestros.getMaestros();
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

