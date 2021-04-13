class asignaturas{
    constructor(){
        this.onGetAsignaturas();
    }

    onGetAsignaturas(){
        db.collection("asignaturas").onSnapshot((querySnapshot) => {
            this.asignaturas = [];
            querySnapshot.forEach((doc) => { 
                let data = doc.data(); 
                data.idf = doc.id;  
                this.asignaturas.push(data);               
            });
            this.asignaturas.sort((p,n)=>{ return (p.id - n.id); });
        });
    }

    getAsignaturas(){     
        return  this.asignaturas;
    }

    saveAsignaturas(name, maestro){
        let id = this.asignaturas.length;
        console.log(`lenght: ${id}`);        
        if (id == 0) {
           id = 1; 
           console.log(`id: ${id}`);
        } else {
            id = this.asignaturas[id-1].id;
            console.log(`ultimo id: ${id}`);
            id++;
            console.log(`id: ${id}`);
        }
        console.log(id);        
        let data = {id, maestro, name};
        console.log(data);
        
        db.collection("asignaturas").add(data)
        .then((docRef) => {
            console.log("documento guardado con ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error agregando el documento: ", error);
        });     
    }

    deleteAsignatura(idf){
        db.collection("asignaturas").doc(idf).delete()
        .then((e)=>{
            return "Documento eliminado correctamente";
        })
        .catch((e)=>{
            console.log(e);
        });
    }

    searchAsignaturas(ide){
        let data = this.asignaturas.find(as=>as.id == ide);
        return data;
    }
}