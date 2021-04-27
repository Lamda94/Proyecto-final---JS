//-------------------------------------------------------- Clase asignaturas ----------------------------------------------------------------------------------
//--> getAsignaturas: Consulta la db de asiganturas en firebase y organiza los datos para retornarlos.
//--> saveAsignaturas: Recibe los datos de la nueva asignatura y reliza el registro de la nueva asignatura en db de firebase
//--> deleteAsignatura: recibe el identificador de un registro en firebase y lo elimina del la db.
//--> searchAsignaturas: mediante el id de la asignatura devuelve el registro de la asignatura que busca.

class asignaturas{
    constructor(){
    }

    async getAsignaturas(){ 
        this.asignaturas = [];  
        const querySnapshot = await db.collection("asignaturas").get();        
        querySnapshot.forEach((doc) => { 
            let data = doc.data(); 
            data.idf = doc.id;  
            this.asignaturas.push(data);               
        });
        this.asignaturas.sort((p,n)=>{ return (p.id - n.id); });
        return  this.asignaturas;
    }

    async saveAsignaturas(name, maestro){
        try {
            let id = this.asignaturas.length;       
            if (id == 0) {
                id = 1; 
            } else {
                id = this.asignaturas[id-1].id;
                id++;
            } 
            let data = {id, maestro, name};
            await db.collection("asignaturas").add(data);
            return "Asignatura registrada correctamente";
        } catch (error) {
            console.error("Error agregando el documento: ", error);
        } 
    }

    async deleteAsignatura(idf){
        try {
            await db.collection("asignaturas").doc(idf).delete();
            return "Documento eliminado correctamente";
        } catch (e) {
            console.log(e);
        }
    }

    searchAsignaturas(ide){
        let data = this.asignaturas.find(as=>as.id == ide);
        return data;
    }
}