class maestro{
    constructor (){
    }

    async getMaestros(){ 
        this.maestro = [];    
        const querySnapshot = await db.collection("maestros").get()
        querySnapshot.forEach((doc) => {   
            let data = doc.data(); 
            data.idf = doc.id;
            this.maestro.push(data);               
        });
        this.maestro.sort((p,n)=>{ return (p.id - n.id)});
        console.log(this.maestro);
        return this.maestro;
    }

    deleteMaestros(idf){
        db.collection("maestros").doc(idf).delete()
        .then((e)=>{
            console.log("Documento eliminado correctamente");
        })
        .catch((e)=>{
            console.log(e);
        });
    }
    
    saveMaestro(name, title){
        let id = this.maestro.length;
        console.log(`lenght: ${id}`);        
        if (id == 0) {
           id = 1; 
           console.log(`id: ${id}`);
        } else {
            id = this.maestro[id-1].id;
            console.log(`ultimo id: ${id}`);
            id++;
            console.log(`id: ${id}`);
        }
        console.log(id); 
        let data = {id, name, title};
        db.collection("maestros").add(data)
        .then((docRef) => {
            console.log("documento guardado con ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error agregando el documento: ", error);
        });     
    }

    async searchMaestro(id){
        const maestro = [];
        const querySnapshot = await db.collection("maestros").get()
        querySnapshot.forEach((doc) => {   
            let data = doc.data(); 
            data.idf = doc.id;
            maestro.push(data);               
        });
        maestro.sort((p,n)=>{ return (p.id - n.id)});
        return maestro.find(m=>m.id==id);
    }
}