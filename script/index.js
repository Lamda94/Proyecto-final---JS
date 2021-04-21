//Efecto tggler del menu
$(document).ready(()=>{
    $(".navbar-toggler").click(function () {	 
        $('#navbarSupportedContent').toggle("slow");
    });
});