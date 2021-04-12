class Plataforma{
    constructor(){
    }

    saveMaestro(name, titulo){        
        let ma = JSON.parse(localStorage.getItem("maestros"));
        let id = ma.length;
        let data = {id: id, name: name, titulo: titulo};
        $.post("data/maestros.json", data,
            function (data, Status) {
                if (Status="success") {
                    return {status:200}
                }else{
                    return {ststus:500}
                }
            },
            "json"
        );
    }

    async getMaestro(){ 
        let data;
        data = await $.getJSON("data/maestros.json");  
        console.log(data);
        return data;        
    }

    searchMaestro(idm){
        let ma = this.getMaestro();
        if (ma == null || ma.length == 0) { }else{
            return ma.find(m=>m.id==idm);
        }
    }

    saveEstudiante(name, curso){        
        let es = JSON.parse(localStorage.getItem("estudiantes"));
        let id = es.length;
        let data = {id: id, name: name, curso: curso, asignaturas:[]};
        es.push(data);
        
        localStorage.setItem("estudiantes", JSON.stringify(es));
    }

    getEstudiantes(){
        let es = JSON.parse(localStorage.getItem("estudiantes"));
        return es;
    }

    saveAsignatura(name, maestro){        
        let as = JSON.parse(localStorage.getItem("asignaturas"));
        let id = as.length;
        let data = {id: id, name: name, maestro: maestro};
        as.push(data);
        
        localStorage.setItem("asignaturas", JSON.stringify(as));
    }

    saveAsingEst(id,ida){
        let asi = JSON.parse(localStorage.getItem("asignaturas"));
        let est = JSON.parse(localStorage.getItem("estudiantes"));
        console.log("estudiantes:"+localStorage.getItem("estudiantes"));
        console.log("asignaturas:"+localStorage.getItem("asignaturas"));
        let n = asi.find(a=>a.id==ida);
        let nuevo = est.map(e => {
                        if(e.id == id){
                            e.asignaturas.push({id:ida, name:n.name, nota1:0, nota2:0, nota3:0, notaf:0});
                            console.log("e:"+JSON.stringify(e));
                            
                            return e;
                        }else{
                            console.log(`id:${e.id} == ide: ${id}`);                            
                            return e;
                        }
                    });
        localStorage.setItem("estudiantes", JSON.stringify(nuevo));
    }

    getAsignaturas(){
        let asi = JSON.parse(localStorage.getItem("asignaturas"));
        return asi;
    }

    searchEstudiantes(ide){
        console.log("ide:"+ide);
        let est = JSON.parse(localStorage.getItem("estudiantes"));
        let data = est.find(es=>es.id == ide);
        console.log("data:"+JSON.stringify(data));
        return data;
    }
}

//Creamos objeto de la clase colegio
const obj = new Plataforma();

//instanciamos elementos a utlizar dentro del DOM
const contenido = $("#contenido");
const maestros = $("#maestros");
const estudiantes = $("#estudiantes");
const asignaturas = $("#asignaturas");

