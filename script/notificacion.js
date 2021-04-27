const notificacion = (msj, func, type)=>{
    const not  = `<div class="alert alert-${type}" role="alert">
                       ${msj}.
                </div>`;
    notificaion.fadeIn("slow",()=>{
        notificaion.html(not)
    });
    func();
    setTimeout(()=>{
        notificaion.fadeOut("slow", ()=>{
            notificaion.html("");
        })
    }, 5000);
}