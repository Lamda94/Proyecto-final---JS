class estudiantes{
    constructor(){
        this.onGetEstudiantes();
    }

    onGetEstudiantes(){
        db.collection("estudiantes").onSnapshot((querySnapshot) => {
            this.estudiantes = [];
            querySnapshot.forEach((doc) => {  
                let data = doc.data(); 
                data.idf = doc.id;
                this.estudiantes.push(data);            
            });
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
        const asig = {name: cursos, nota1: 0, nota2: 0, nota3: 0, notaf: 0 };
        const data = this.estudiantes.find((es)=>{
            if (es.idf == id) {
                return {id:es.id, curso: es.curso, name:es.name, asignaturas: es.asignaturas };
            }else{
                console.log(`${es.idf} == ${id}`);
            }
        });
        data.asignaturas.push(asig);
        let res = await db.collection("estudiantes").doc(id).update(data);
    }

    async removeAsignaturas(idf, name){
        let data = this.estudiantes.find((es)=>{
            if (es.idf == idf) {
                return {id:es.id, curso: es.curso, name:es.name, asignaturas: es.asignaturas };
            }else{
                console.log(`${es.idf} == ${id}`);
            }
        });

        data.asignaturas = data.asignaturas.filter(a=> a.name !== name);
        await db.collection("estudiantes").doc(idf).update(data);
    }

    searchEstudiantes(ide){
        let data = this.estudiantes.find(es=>es.id == ide);
        return data;
    }
}