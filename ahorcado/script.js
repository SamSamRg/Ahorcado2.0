//Array de palabras (series) 
var palabra = [
    'Simpsons',
    'Flash',
    'Daredevil',
    'Dark',
    'Hannibal',
    'Sherlock',
    'Bridgerton',
    'Euphoria',
    'Friends',
    'Legion',
    'Westworld',
    'House',
    'chernobyl',
    'Fringe'

];

//Realizamos la asignacion aleatoria de una palabra
var aleatorio=[Math.floor(Math.random()*palabra.length)];
var palabra=palabra[aleatorio];

//variables a utilizar para dibujar el muñeco 
var hombre, l;


//Declaración de la clase Ahorcado
var Ahorcado = function (con)
{
    //this.contexto es el context de dibujo del canvas, que llega por parametro desde la variable con
    this.contexto = con;
    this.maximo = 5;
    this.intentos = 0;
    this.vivo = true;
    this.aciertos = 0;

    //funcion para dibujar el muñeco con canva
    this.dibujar();
}

Ahorcado.prototype.dibujar = function ()
{
    var dibujo = this.contexto;

    //Dibujando el poste o base del ahorcado
    dibujo.beginPath();
    dibujo.moveTo(150,100);
    dibujo.lineTo(150,50);
    dibujo.lineTo(400,50);
    dibujo.lineTo(400,350);
    dibujo.lineWidth = 15;
    dibujo.strokeStyle = "black";
    dibujo.stroke();
    dibujo.closePath();

    if(this.intentos > 0)
    {
        // intentos = 1 --> dibujara la cabeza
        dibujo.beginPath();
        dibujo.arc(150, 140, 40, 0, Math.PI * 2, false);
        dibujo.strokeStyle = "red";
        dibujo.lineWidth = 5;
        dibujo.stroke();
        dibujo.closePath();

        if(this.intentos > 1)
        {
            // intentos = 2 --> dibujara el torso
            dibujo.beginPath();
            dibujo.moveTo(150,180);
            dibujo.lineTo(150,250);
            dibujo.strokeStyle = "red";
            dibujo.lineWidth = 5;
            dibujo.stroke();
            dibujo.closePath();

            if(this.intentos > 2)
            {
                // intentos = 3 --> dibujara los brazos
                dibujo.beginPath();
                dibujo.moveTo(120,220);
                dibujo.lineTo(150,180);
                dibujo.lineTo(180,220);
                dibujo.strokeStyle = "red";
                dibujo.lineWidth = 5;
                dibujo.stroke();
                dibujo.closePath();

                if(this.intentos > 3)
                {
                    // intentos = 4 --> dibujara las piernas
                    dibujo.beginPath();
                    dibujo.moveTo(120,290);
                    dibujo.lineTo(150,250);
                    dibujo.lineTo(180,290);
                    dibujo.strokeStyle = "red";
                    dibujo.lineWidth = 5;
                    dibujo.stroke();
                    dibujo.closePath();

                    if(this.intentos > 4)
                    {
                        // intentos = 5 --> dibujara ojos con tachecitos
                        dibujo.beginPath();
                        //Ojo izquierdo
                        dibujo.moveTo(125,120);
                        dibujo.lineTo(145,145);
                        dibujo.moveTo(145,120);
                        dibujo.lineTo(125,145);

                        //Ojo derecho
                        dibujo.moveTo(155,120);
                        dibujo.lineTo(175,145);
                        dibujo.moveTo(175,120);
                        dibujo.lineTo(155,145);

                        dibujo.strokeStyle = "blue";
                        dibujo.lineWidth = 5;
                        dibujo.stroke();
                        dibujo.closePath();
                    }
                }
            }

        }

    }
}

Ahorcado.prototype.trazar = function ()
{
    console.log('trazar');
    this.intentos++;
    if(this.intentos >= this.maximo)
    {
        this.vivo = false;
        alert("¡Asesinoooo xd!");
    }
    this.dibujar();
}


function iniciar() 
{
    l = document.getElementById("letra");
    var b = document.getElementById("boton");
    var canvas = document.getElementById("c");
    canvas.width = 500;
    canvas.height = 400;
    var contexto = canvas.getContext("2d");
    hombre = new Ahorcado(contexto);

    //Convierte a mayúsculas las palabras (texto)
    palabra = palabra.toUpperCase();

    //Declaro un array con n espacios de acuerdo al largo de la palabra
    espacio = new Array(palabra.length);

    //Agregamos una función que se dispare al dar click al botón
    b.addEventListener("click", agregarLetra);


    mostrarPista(espacio);
    //mostrarPista(palabra, espacio);
    alert("Hola, bienvenido al juego del ahorcado"+"\nCuando adivines la palabra, recarga la pagina para volver a jugar")
}

function agregarLetra()
{
    var letra = l.value;
    l.value = "";
    mostrarPalabra(palabra, hombre, letra);
}

function mostrarPalabra(palabra, ahorcado, letra)
{
    var encontrado = false;
    var p;
    var con = 0;
    letra = letra.toUpperCase();
    for (p in palabra)
    {
        if (letra == palabra[p])
        {
            espacio[p] = letra;
            encontrado = true;
            ahorcado.aciertos += 1;
        }
    }
    mostrarPista(espacio);

    // Si encontré la palabra
    if(!encontrado)
    {
        ahorcado.trazar();
    }
    if(ahorcado.aciertos === palabra.length){

        alert("Eres un buenazo")
    }
        // Si encontré la palabra

    if(!ahorcado.vivo)
    {
        alert("Perdiste\nRecarga para jugar de nuevo"+"\nLa palabra correcta era: "+palabra)
    }
}

function mostrarPista(espacio)
{
    var pista = document.getElementById("pista");
    var texto = "";
    var i;
    var largo = espacio.length;

    for(i = 0; i<largo; i++)
    {
        if(espacio[i] != undefined)
        {
            texto = texto + espacio[i] + " ";
        }
        else{texto += "_ ";}
    }
    pista.innerText = texto;
}
