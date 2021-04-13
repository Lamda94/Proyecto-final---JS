class maestro{
    constructor (){
        this.onGetMaestros();
    }

    async onGetMaestros(){
        this.maestro = [];
        await db.collection("maestros").onSnapshot((querySnapshot) => {
            this.maestro = [];
            querySnapshot.forEach((doc) => {   
                this.maestro.push(doc.data());                
            });
            console.log(this.maestro);
            console.log("Actualizado");
        });
    }

    getMaestros(){     
        return  this.maestro;
    }

    saveMaestro(name, title){
        const id = this.maestro.length;
        let data = {id, name, title};
        db.collection("maestros").add(data)
        .then((docRef) => {
            console.log("documento guardado con ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error agregando el documento: ", error);
        });     
    }

    searchMaestro(id){
        return this.maestro.find(m=>m.id==id);
    }
}

const objMaestros = new maestro();

const setMaestro = ()=>{
    let name = $("#inputName").val();
    console.log(name);
    
    let titulo = $("#inputTitulo").val();
    console.log(titulo);
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
    cancelar.click(getMaestros);
}

const getMaestros = ()=>{
    let data = "";
    const getMaestros = objMaestros.getMaestros();
    if (getMaestros.lenght == 0) {
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
    btnNuevoM.click(newMaestro);
}

$(document).ready(()=>{
    const btnMaestros = $("#maestros");
    btnMaestros.click(getMaestros);
});

