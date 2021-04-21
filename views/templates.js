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