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
        let data = `<div id="formulario" class="d-flex justify-content-center ">
                    <form id="fMNuevo" class="col-7">
                        <h2 class="text-center">Nuevo Maestro</h2>
                        <div class="mb-3">
                        <label for="inputName" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="inputName" placeholder="Nombre completo del Maestro">
                        </div>
                        <div class="mb-3">
                        <label for="inputTitulo" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="inputTitulo" placeholder="Titulo del Maestro">
                        </div>
                        <div class="mb-3">
                            <input type ="button" class="btn btn-primary" id="mRegistrar" value="Enviar">
                            <input type ="button" class="btn btn-danger" id="mCancelar" value="Cancelar">
                        </div>
                    </form>
                </div>`;

        contenido.html(data);
        const registrar = $("#mRegistrar");
        registrar.click(setMaestro);
        const cancelar = $("#mCancelar");
        cancelar.click(getM);
    }

    const  getM = async () => {          
        localStorage.clear(); 
        let data="";                  
        let ma = await obj.getMaestro();
        console.log(ma);        
        if (ma.length == 0) {        
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
            let d="";
            for (const maes of ma) {
                console.log(maes);
                d = d+`<tr>
                            <td>${maes.id}</td>
                            <td>${maes.name}</td>
                            <td>${maes.titulo}</td>
                        </tr>`;               
            }
            console.log(d);
            

            data =  `<h2 class="mb-4 text-center">Maestros</h2>
                    <button type="button" class="btn btn-primary mb-4" id="mNuevo">Nuevo Maestro</button>
                    <table class="table table-striped">
                    <thead class="table-dark">
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Titulo</th>
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
                        </tr>
                    </tfoot>
                    </table>`;     
        }
        contenido.html(data);
        const btnNuevoM = $("#mNuevo");
        btnNuevoM.click(saveM);      
    }