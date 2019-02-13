$(document).ready(function () {

    //Declaracion de Variables
    var elemento_contra;
    var elemento;
    var aleatorio;
    var ganador;
    var vidas = 0;
    var vidasJ1 = 0;
    var vidasJ2 = 0;
    //--------------------------------//
    //Recogida de parametros
    vidas = parseInt(prompt("Introduce el numero de vidas"));

    vidasJ1 = vidas;
    vidasJ2 = vidas;
    //--------------------------------//
    //Eventos en las Imagenes//
    $("img").mouseover(function () {
        $(this).addClass("giro");
    });

    $("img").mouseout(function () {
        $(this).removeClass("giro");
    });

    $("img").mouseup(function () { 
        $(this).removeClass("ejeY");

        var textGanador = $("#ganador");
        textGanador.animate({
            fontSize: '20px'
        }, 1000);

    });

    $("img").mousedown(function () {
        $(this).addClass("ejeY");

        var textGanador = $("#ganador");
        textGanador.animate({
            fontSize: '30px'
        }, 1000);

        $('#' + elemento_contra + '').removeAttr("style");
    });
    //------------------------------------//
    //Pintamos las imagenes de la maquina
    $("#piedra").html('<img src="img/piedra.jpg">');
    $("#papel").html('<img src="img/papel.jpg">');
    $("#tijera").html('<img src="img/tijera.jpg">');
    //------------------------------------//
    //Cuando hacemos click en una imagen llama a la funcion
    $('img').click(function () {

        aleatorio = Math.floor(Math.random() * 3);

        //Generamos aleatoriamente el valor del elemento de la maquina cada vez que se llama a la funcion       
        switch (aleatorio) {
            case 0:
                elemento_contra = "piedra";
                break;
            case 1:
                elemento_contra = "papel";
                break;
            case 2:
                elemento_contra = "tijera";
                break;
        }
        //------------------------------------//
        //Recogemos el valor del atributo alt de la imagen del usuario sobre la que pinchamos
        elemento = $(this).attr('alt');
        //------------------------------------//
        //Muestra un efecto de rotacion sobre la imagen jugada por la maquina
        $('#' + elemento_contra + '').css({
            'transform': 'rotate(' + 360 + 'deg)',
            'transform-style': 'preserve-3d',
            'transition-duration': '1s'
        });
        //------------------------------------//
        $("#juagadaJ1").html('<img src="img/' + elemento + '.jpg">');
        $("#vs").html("VS");
        $("#juagadaJ2").html('<img src="img/' + elemento_contra + '.jpg">');

        //Condiciones para ganar, se decrementa de 1 en 1 la vida del perdedor
        if (elemento == elemento_contra)
            ganador = "EMPATE";

        else if ((elemento == "piedra" && elemento_contra == "tijera") || (elemento == "papel" && elemento_contra == "piedra") || (elemento == "tijera" && elemento_contra == "papel")) {
            ganador = "Usuario Gana";
            vidasJ2--;
        } else {
            ganador = "PC Gana";
            vidasJ1--;
        }
        //------------------------------------//
        $('.usuario').html(vidasJ1);
        $('.ordenador').html(vidasJ2);

        $('#ganador').html("<br><br>" + ganador);
        
        //Comprobamos si las vidas de alguno de los dos jugadores llega a 0, detenemos el evento click y mousedown para evitar que se siga ejecutando la funcion
        if ((vidasJ1 == 0) || (vidasJ2 == 0))
        {
            $('img').off("click");
            $('img').off("mousedown");
            $("#final").html("FIN JUEGO");
            
            $("#reload").html("Volver a Jugar");
            $('#reload').click(function() {
                location.reload();
            });
        }
        //------------------------------------//
    });
});
