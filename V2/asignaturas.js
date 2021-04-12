class asignaturas{
    constructor(){
        this.asignaturas = [];
        db.collection("asignaturas").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.asignaturas.push(doc.data());
            });
        });
    }

    reloadAsignaturas(){
        db.collection("asignaturas").get()
        .then((querySnapshot) => {
            this.asignaturas = [];
            querySnapshot.forEach((doc) => {   
                this.asignaturas.push(doc.data());                
            });
            console.log(this.asignaturas);
            console.log("Actualizado");
        });
    }

    getEstudiantes(){     
        return  this.asignaturas;
    }

    saveAsignaturas(name, curso){
        const id = this.asignaturas.length;
        let data = {id, name, curso, asignaturas:[]};
        db.collection("asignaturas").add(data)
        .then((docRef) => {
            this.reloadAsignaturas();
            console.log("documento guardado con ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error agregando el documento: ", error);
        });     
    }
    searchAsignaturas(ide){
        let data = this.asignaturas.find(as=>as.id == ide);
        return data;
    }
}

const objAsignaturas = new asignaturas();

const getAsignatura = () => {  
    //localStorage.clear();  
    let data="";
    let listAsiganturas = objAsignaturas.getAsignaturas();
    if (listAsiganturas.length == 0) {            

        data = `<center><h2 style="margin-top:60px;">Asignaturas</h2></center>
                <input type ="button" class="btn nuevo" id="aNuevo" value="Nueva Asignatura">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Maestro</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr><td colspan="3">No hay registros de estudiantes</td>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>curso</th>
                            </tr>
                        </tfoot>
                    </table>`;                   
    }else{
        let d="";
        for (const asig of listAsiganturas) {
            let ma = objMaestros.searchMaestro(asig.maestro);
            console.log(ma);
            
            d  +=  `<tr>
                        <td>${asig.id}</td>
                        <td>${asig.name}</td>
                        <td>${ma.name}</td>
                    </tr>`;               
        }

        data = `<center><h2 style="margin-top:60px;">Asignaturas</h2></center>
        <input type ="button" class="btn nuevo" id="aNuevo" value="Nueva Asignatura">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Maestro</th>
                    </tr>
                </thead>
                <tbody>
                <tr><td colspan="3">${d}</td>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>curso</th>
                    </tr>
                </tfoot>
            </table>`;   
    }
    contenido.html(data);
    const btnNuevoM = $("#aNuevo");
    //btnNuevoM.click(setAsignatura);
}

const btnAsignaturas = $("#asignaturas");
btnAsignaturas.click(getAsignatura)