const login = ()=>{       
    const user = $("#inputUser").val();
    const pass = $("#inputPass").val();        
    if (user === "root" && pass === "1234") {
        console.log("ingreso");
        
        const user =  {name:"admin", type:0};
        sessionStorage.setItem("user", JSON.stringify(user));
        window.location ="index.html";
    }        
}

$("#Iniciar").click(login);
