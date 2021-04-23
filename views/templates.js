//------------- Funcion templateTable ----------------------------------
//Esta funcion construye una tabla con los datos que le envian
//-> head: los titulos de cada columna
//-> data: un objeto con los datos que se van a pintar en la tabla
//-> claves: las claves para acceder alos datos del onjeto
//-> titulo: titulo que llevará la tabla
//-> edit: si se agrega o no un boton editar (true, false)
//-> ver: si se agrega o no un boton ver (true, false)
//-> eli: si se agrega o no un boton aliminar (true, false)
//-> idf: identificador del documento en firebase en caso de que no este incluido en el objeto de datos.

const templateTable = (head, data, claves, titulo, edit, ver, eli, idf)=>{
    let datatable = "", thead="", tbody="", i =0;
    for (const d of head) {
        thead += `<th>${d}</th>`; 
        i++;
    } 
    if (edit) {
        thead += `<th>Editar</th>`;
        i++; 
    }
    if (ver) {
        thead += `<th>Ver</th>`; 
        i++;
    }
    if (eli) {
        thead += `<th>Eliminar</th>`; 
        i++;
    }   
    if (data.length == 0) { 
        tbody = `<td class="text-center" colspan="${i}">No hay registros de ${titulo}s</td>`;            
    }else{
        for (const d of data) {
            tbody += `<tr>`;
            if(idf===""){
                idf = d.idf;
            }
            for (let j = 0; j < claves.length; j++) {
                const indicador = claves[j];
                tbody += `<td>${d[indicador]}</td>`;                
            }
            if (edit) {
                tbody += `<td><button type="button" class="boton btn btn-success" data-idf="${idf}" data-name=${d.name}>Editar</button></td>`; 
            }
            if (ver) {
                tbody += `<td><button type="button" class="boton btn btn-success" data-id="${d.id}" data-idf="${idf}">Ver</button></td>`;
            }
            if (eli) {
                if (d.id == undefined) {
                    tbody += `<td><input type ="button" class="btnDelete btn btn-danger" data-idf="${idf}" data-id="${d.name}" value="Eliminar"></td>`;   
                }else{
                    tbody += `<td><input type ="button" class="btnDelete btn btn-danger" data-idf="${idf}" data-id="${d.id}" value="Eliminar"></td>`;   
                }
            }
            tbody += `</tr>`;
            if(idf===d.idf){
                idf = "";
            }
        }
    }

    datatable = `<h2 class="mb-4 text-center">${titulo}s</h2>
                <button type="button" class="btn btn-primary mb-4" id="Nuevo" data-idf="${idf}">Nuevo ${titulo}</button>
                <table class="table table-striped table-borderless">
                    <thead class="table-dark">
                        <tr>
                            ${thead}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            ${tbody}
                        </tr>
                    </tbody>
                    <tfoot class="table-dark">
                        <tr>
                            ${thead}
                        </tr>
                    </tfoot>
                </table>`; 

    return datatable;
};

const menu = ()=>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    let data;
    if (user.type == 0) {
        data = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                            <div class="container-fluid">
                            <a class="navbar-brand" href="index.html">Platform School</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#" id="maestros">Maestros</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#" id="estudiantes">Estudiantes</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#" id="asignaturas">Asignaturas</a>
                                </li>       
                                </ul>
                                <span class="navbar-text me-3">${user.name}</span>
                                <button class="btn btn-outline-success me-3" type="submit" id="cerrar">Cerrar Sesion</button>
                            </div>
                            </div>
                        </nav>`;   
    }else{
        data = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div class="container-fluid">
                    <a class="navbar-brand" href="index.html">Platform School</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#" id="maestros">Maestros</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#" id="estudiantes">Estudiantes</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#" id="asignaturas">Asignaturas</a>
                        </li>       
                        </ul>
                        <span class="navbar-text me-3">Hola Mundo</span>
                        <button class="btn btn-outline-success me-3" type="submit">Cerrar Sesion</button>
                    </div>
                    </div>
                </nav>`;
    }
    return data;
}