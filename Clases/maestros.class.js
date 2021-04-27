//-------------------------------------------------------- Clase maestros ----------------------------------------------------------------------------------
//--> getMaestros: Consulta la db de maestros en firebase y organiza los datos para retornarlos.
//--> saveMaestro: Recibe los datos del nuevo maestro y reliza el registro del nuevo maestro en db de firebase
//--> deleteMaestros: recibe el identificador de un registro en firebase y lo elimina del la db.
//--> searchMaestro: mediante el id del maestro devuelve el registro del maestro que busca.

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

    async deleteMaestros(idf){
        try {
            await db.collection("maestros").doc(idf).delete();
            return "Documento eliminado correctamente";
        } catch (e) {
            console.log(e);
        }
    }
    
    async saveMaestro(name, title){
        try {
            let id = this.maestro.length;       
            if (id == 0) {
                id = 1; 
            } else {
                id = this.maestro[id-1].id;
                id++;
            }
            let data = {id, name, title};
            await db.collection("maestros").add(data);
            return "Maestro registrado correctamente";
        } catch (e) {
            console.error("Error agregando el documento: ", e);
        }    
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