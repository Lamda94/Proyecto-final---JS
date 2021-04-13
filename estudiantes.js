class estudiantes{
    constructor(){
        this.onGetEstudiantes();
    }

    onGetEstudiantes(){
        db.collection("estudiantes").onSnapshot((querySnapshot) => {
            console.log(`cargando:${this.actualizado}`);
            this.estudiantes = [];
            querySnapshot.forEach((doc) => {  
                let data = doc.data(); 
                data.idf = doc.id;
                this.estudiantes.push(data);            
            });
            console.log(this.estudiantes);
            console.log("Actualizado");
        });
    }

    getEstudiantes(){     
        return  this.estudiantes;
    }

    saveEstudiantes(name, curso){
        const id = this.estudiantes.length;
        let data = {id, name, curso, asignaturas:[]};
        db.collection("estudiantes").add(data)
        .then((docRef) => {
            console.log("documento guardado con ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error agregando el documento: ", error);
        });     
    }

    deleteEstudiantes(id){
        db.collection("estudiantes").doc(id).delete().then((e)=>{
            return "Documento eliminado correctamente";
        })
        .catch((e)=>{
            console.log(e);
        });
    }

    async saveAsignatura(id, cursos){
        console.log(`id es:${id}`);
        const asig = {name: cursos, nota1: 0, nota2: 0, nota3: 0, notaf: 0 };
        const data = this.estudiantes.find((es)=>{
            if (es.idf == id) {
                return {id:es.id, curso: es.curso, name:es.name, asignaturas: es.asignaturas };
            }else{
                console.log(`${es.idf} == ${id}`);
            }
        });
        data.asignaturas.push(asig);
        console.log(data);
        let res = await db.collection("estudiantes").doc(id).update(data);
        console.log(res);
    }

    removeAsignaturas(idf){
        let data = this.estudiantes.find((es)=>{
            if (es.idf == idf) {
                return {id:es.id, curso: es.curso, name:es.name, asignaturas: es.asignaturas };
            }else{
                console.log(`${es.idf} == ${id}`);
            }
        });
        let name = data.name;

        data.asignaturas = data.asignaturas.map(a=>a.name !== name);
        console.log("removed:");
        console.log(data);
    }

    searchEstudiantes(ide){
        let data = this.estudiantes.find(es=>es.id == ide);
        return data;
    }
}

const objEstudiantes = new estudiantes();

$(document).ready(()=>{
    const setEstudiantes = ()=>{
        let name = $("#inputName").val();
        console.log(name);
        
        let curso = $("#inputCurso").val();
        console.log(curso);
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
        contenido.html(data);
        $("#eRegistrar").click(setEstudiantes);
        $("#eCancelar").click(getEstudiantes);
    }

    const setAsigEstu = (idf)=>{
        let asig = $("#inputAsig").val();
        console.log(asig);

        objEstudiantes.saveAsignatura(idf, asig);    
        getEstudiantes(); 
    }

    const removeAsignatura = (idf)=>{
         objEstudiantes.removeAsignaturas(idf);
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
            contenido.html(data);
            $("#asAgregar").click((e)=>{
                let idf = e.target.dataset.idf;
                setAsigEstu(idf);            
            });
            $("#asCancelar").click(getEstudiantes);
        }else{
            alert("Es necesario el registro de almenos una asignatura");
            getAsignatura();
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
                                <td><button type="button" class="btndelete btn btn-danger" data-idf="${idf}">Eliminar</button></td>
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
        alert(msj);
        getEstudiantes();       
    }

    const getEstudiantes = ()=>{
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
                console.log(est);
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
        contenido.html(data);
        const btnNuevoM = $("#eNuevo");
        $(".btnElimnar").click(deleteEstudiante);
        $(".boton").click((e)=>{
            console.log(e.target.dataset.idf);
            let valores = e.target.dataset.id;
            let idf = e.target.dataset.idf;
            const d = objEstudiantes.searchEstudiantes(valores);
            const data = getAsignaturas(d.name, d.asignaturas, d.id, idf);
            contenido.html(data);
            const btnAgAsi = $("#aSigNuevo");
            btnAgAsi.click((e)=>{
                let idf = e.target.dataset.idf;
                console.log(`idf: ${idf}`);
                addAsignatura(d.id, idf)            
            });
            const btndelete = $(".btndelete");
            btndelete.click((e)=>{
                const idf = e.target.dataset.idf;
                removeAsignatura(idf);
            });
        });
        btnNuevoM.click(newEstudiantes);
    }

    const btnEstudiantes = $("#estudiantes");
    btnEstudiantes.click(getEstudiantes);
});
