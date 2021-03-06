//-------------------------------------------------------- Clase estudiantes ----------------------------------------------------------------------------------
//--> getEstudiantes: Consulta la db de estudiantes en firebase y organiza los datos para retornarlos.
//--> saveEstudiantes: Recibe los datos del nuevo estudiante y reliza el registro del nuevo estudiante en db de firebase
//--> deleteEstudiantes: recibe el identificador de un registro en firebase y lo elimina del la db.
//--> saveAsignatura: toma los datos de la asignatura que se le va agregar al estudiante y edita el registro del estudiante agregandole la nueva asignatura.
//--> removeAsignaturas: toma el id del estudiante, los datos de la asignatura y edita el registro del estudiante removiendo la asignatura seleccionada.
//--> searchEstudiantes: mediante el id del estudiante devuelve el registro del estudiante que busca.


class estudiantes{
    constructor(){
    }

    async getEstudiantes(){     
        this.estudiantes = [];    
        const querySnapshot = await db.collection("estudiantes").get();
        querySnapshot.forEach((doc) => {   
            let data = doc.data(); 
            data.idf = doc.id;
            this.estudiantes.push(data);               
        });
        this.estudiantes.sort((p,n)=>{ return (p.id - n.id)});
        console.log(this.estudiantes);
        return this.estudiantes;
    }

    async saveEstudiantes(name, curso){
        try {
            const id = this.estudiantes.length;
            let data = {id, name, curso, asignaturas:[]};
            await db.collection("estudiantes").add(data);
            return "Estudiante registrado correctamente";
        } catch (e) {
            console.error("Error agregando el documento: ", e);
        }    
    }

    async deleteEstudiantes(id){
        try {
            await db.collection("estudiantes").doc(id).delete();
            return "Documento eliminado correctamente";
        } catch (e) {
            console.log(e);
        }
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
        await db.collection("estudiantes").doc(id).update(data);
        return "Asignatura a??adida correctamente";
    }

    async updateAsignatura(ida, dat){
        
        const data = this.estudiantes.find((es)=>{
            if (es.idf == ida) {
                return es;
            }else{
                console.log(`${es.idf} == ${ida}`);
            }
        });
        delete data.idf; 
        data.asignaturas.push(dat);       
        await db.collection("estudiantes").doc(ida).update(data);
        return "Notas modificadas correctamente";
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
        return "Asignatura removida correctamente";
    }

    searchEstudiantes(ide){
        let data = this.estudiantes.find(es=>es.idf == ide);
        return data;
    }
}