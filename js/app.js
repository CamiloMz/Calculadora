var calculadora = (function(){

  var punto = document.getElementById('punto').addEventListener('click',insertarPunto);
  var teclas = document.getElementsByClassName('tecla');
  var on = document.getElementById('on').addEventListener('click',borrardisplay);
  var valor= document.getElementById('display').innerHTML;
  var signo = document.getElementById('sign').addEventListener('click',insertarSigno);
  var contTeclas = teclas.length;
  var resultado = 0;
  var esResultado = false;

  //asignar escuchador de eventos a las teclas
  function eventTeclas(){
    for(var i = 0; i < contTeclas; i++){
      teclas[i].addEventListener('mousedown',accionesTeclas);
      teclas[i].addEventListener('mouseup', restaurar);
    };
  }

  function accionesTeclas(){
    //Reducir el tamaño de las teclas al presionarse
    for(var i = 0; i < contTeclas; i++){
      this.style.padding = '2px';
    };
    //Mostrar números en pantalla
    var txt = valor+ this.id;
    var contTxt = txt.length;
    if(esResultado){
      valor = '';
      document.getElementById('display').innerHTML = '';
      esResultado = false;
    }
    if(contTxt <= 8 && this.id.length == 1){
      if(valor == 0){
          valor = document.getElementById('display').innerHTML = this.id;
      }else if(valor != 0){
        valor = document.getElementById('display').innerHTML = valor+ this.id;
      }
    }
    return true;
  }

  //Restaurar el tamaño de las teclas despu8es de presionarse
  function restaurar(){
      this.style.padding = '0px';
  };

  //Borrar display al presionar la tecla ON/C
  function borrardisplay(){
    valor = 0;
    resultado = 0;
    esResultado = false;
    document.getElementById('display').innerHTML = valor;
  };


  function insertarPunto(){
    var cont = valor.length;
      if(valor.indexOf('.') == -1  && cont < 8){
        console.log(cont);
        document.getElementById('display').innerHTML = (valor + '.');
      };
  };

  function insertarSigno(){
    var cont = valor.length;
    if(valor.indexOf('-') == -1 && cont < 8){
      document.getElementById('display').innerHTML = ('-' + valor );
    }else{
      valor = valor.substring(1);
      document.getElementById('display').innerHTML = valor;
    }
  };


  function operacionesMatematicas(){
    var btnSuma = document.getElementById('mas');
    var btnResta = document.getElementById('menos');
    var btnMultiplicacion = document.getElementById('por');
    var btnDivision = document.getElementById('dividido');
    btnSuma.addEventListener('click',suma);
    btnResta.addEventListener('click',resta);
    btnMultiplicacion.addEventListener('click',multiplicacion);
    btnDivision.addEventListener('click',division);

    function suma(){
      var valor = parseInt(document.getElementById('display').innerHTML);
      if(resultado == 0){
        resultado = valor;
        document.getElementById('display').innerHTML = '';
      }else{
        resultado = resultado + valor;
        document.getElementById('display').innerHTML = resultado;
        esResultado = true;
      }
    };

    function resta(){
      var valor = parseInt(document.getElementById('display').innerHTML);
      if(resultado == 0){
        resultado = valor;
        document.getElementById('display').innerHTML = '';
      }else{
        resultado = resultado - valor;
        document.getElementById('display').innerHTML = resultado;
        esResultado = true;
      }
      if(valor == null){
        document.getElementById('display').innerHTML = resultado;
      }
    };

    function multiplicacion(){
      var valor = parseInt(document.getElementById('display').innerHTML);
      if(resultado == 0){
        resultado = valor;
        document.getElementById('display').innerHTML = '';
      }else{
        resultado = resultado * valor;
        document.getElementById('display').innerHTML = resultado;
        esResultado = true;
      }
    };

    function division(){
      var valor = parseInt(document.getElementById('display').innerHTML);
      if(resultado == 0){
        resultado = valor;
        document.getElementById('display').innerHTML = '';
      }else{
        resultado = resultado / valor;
        document.getElementById('display').innerHTML = resultado;
        esResultado = true;
      }
    };
  }



  eventTeclas();
  operacionesMatematicas();
  agregarSigno();
  borrardisplay();
}());
