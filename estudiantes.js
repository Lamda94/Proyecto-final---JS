//Funciones para controlar el registro y listado de estudiantes
const setEstudiante = ()=>{
    let name = $("#inputName").val();
    console.log(name);
    
    let curso = $("#inputCurso").val();
    console.log(curso);
    obj.saveEstudiante(name, curso);    
    getEs();    
}

const getAsigEst = (name,d,id)=>{
    if (d == null || d.length == 0) { 
        let data = `<h2 class="mb-4 text-center">Asignaturas de ${name}</h2>
                    <button type="button" class="btn btn-primary mb-4" id="aSigNuevo">Agregar</button>
                    <table class="table table-striped table-borderless">
                        <thead class="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Nota 1</th>
                                <th>Nota 2</th>
                                <th>Nota 3</th>
                                <th>Nota Final</th>
                                <th>Editar Notas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center" colspan="7">No hay asignaturas registradas</td>
                            </tr>
                        </tbody>
                        <tfoot class="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Nota 1</th>
                                <th>Nota 2</th>
                                <th>Nota 3</th>
                                <th>Nota Final</th>
                                <th>Editar Notas</th>
                            </tr>
                        </tfoot>
                    </table>`;                
        return data;
    }else{
        let da = "";
        for (const dat of d) {
            da = da + `<tr>
                            <td>${dat.id}</td>
                            <td>${dat.name}</td>
                            <td>${dat.nota1}</td>
                            <td>${dat.nota2}</td>
                            <td>${dat.nota3}</td>
                            <td>${dat.notaf}</td>
                            <td><button type="button" class="boton btn btn-success">Editar</button></td>
                        </tr>`; 
        }

        const data =    `<h2 class="mb-4 text-center">Asignaturas de ${name}</h2>
                        <button type="button" class="btn btn-primary mb-4" id="aSigNuevo">Agregar</button>
                        <table class="table table-striped table-borderless">
                            <thead class="table-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Nota 1</th>
                                    <th>Nota 2</th>
                                    <th>Nota 3</th>
                                    <th>Nota Final</th>
                                    <th>Editar Notas</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    ${da}
                                </tr>
                            </tbody>
                            <tfoot class="table-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Nota 1</th>
                                    <th>Nota 2</th>
                                    <th>Nota 3</th>
                                    <th>Nota Final</th>
                                    <th>Editar Notas</th>
                                </tr>
                            </tfoot>
                        </table>`;        
        return data;
    }
}

const setAsigEstu = (id)=>{
    let asig = $("#inputAsig").val();
    console.log(asig);

    obj.saveAsingEst(id, asig);    
    getEs();    
}

const setAsigEst = (id)=>{
    let data = "";
    let asi = obj.getAsignaturas();
    if (asi == null || asi.length == 0) {}else{
    let lista = '<select class="form-control" name="inputAsig" id="inputAsig">';
    for (const asig of asi) {
        lista += `<option value="${asig.id}">${asig.name}</option>`;
    }
    lista += '</select>';
    data = `<div id="formulario" class="d-flex justify-content-center ">
                <form id="fAsAgregar" class="col-7">
                    <h2 class="text-center">Agregar Asignatura</h2>
                    <div class="mb-3">
                        <label for="inputName" class="form-label">Asignatura</label>
                        ${lista}
                    </div>
                    <div class="mb-3">
                        <input type ="button" class="btn btn-primary" id="asAgregar" value="Agregar">
                        <input type ="button" class="btn btn-danger" id="asCancelar" value="Cancelar">
                    </div>
                </form>
            </div>`;
    }
    contenido.html(data);
   $("#asAgregar").click(()=>setAsigEstu(id));
    $("#asCancelar").click(getEs);
}

const getEs = () => {  
    //localStorage.clear();  
    let data = "";
    let es = obj.getEstudiantes();
    if (es == null || es.length == 0) {            
        es = [];
        localStorage.setItem("estudiantes", JSON.stringify(es));
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
        for (const est of es) {
            console.log(est);
            d = d + `<tr >
                        <td id="numero">${est.id}</td>
                        <td>${est.name}</td>
                        <td>${est.curso}</td>
                        <td><button type="button" class="boton btn btn-success">Ver</button></td>
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
                        </tr>
                    </tfoot>
                </table>`;        
    }

    contenido.html(data);
    const btnNuevoM = $("#eNuevo");
    $(".boton").click(function() {
        let valores;
        $(this).parents("tr").find("#numero").each(function() {
        valores = parseInt($(this).html());
        });
        const d = obj.searchEstudiantes(valores);
        const data = getAsigEst(d.name, d.asignaturas, d.id);
        contenido.html(data);
        const btnAgAsi = $("#aSigNuevo");
        btnAgAsi.click(()=>setAsigEst(d.id));
    });
    btnNuevoM.click(setEs);
}

const setEs = () =>{
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

    contenido.html(data);
    $("#eRegistrar").click(setEstudiante);
    $("#eCancelar").click(getEs);
}
