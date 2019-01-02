var calculadora = (function(){

  var punto = document.getElementById('punto').addEventListener('click',insertarPunto);
  var teclas = document.getElementsByClassName('tecla');
  var on = document.getElementById('on').addEventListener('click',borrardisplay);
  var signo = document.getElementById('sign').addEventListener('click',insertarSigno);
  var contTeclas = teclas.length;
  var resultado = 0;
  var esResultado = false;
  var operacion = '';

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
    var valor= document.getElementById('display').innerHTML;
    var txt = valor+ this.id;
    var contTxt = txt.length;
    if(esResultado){
      valor = '';
      document.getElementById('display').innerHTML = '';
      esResultado = false;
    }
    if(contTxt <= 8 && this.id.length == 1){
      if(valor == 0){
        if(valor == '0.'){
          document.getElementById('display').innerHTML = (valor + this.id);
        }else{
          valor = document.getElementById('display').innerHTML = this.id;
        }
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
    var valor= document.getElementById('display').innerHTML;
    valor = 0;
    resultado = 0;
    esResultado = false;
    document.getElementById('display').innerHTML = valor;
  };

  //Insertar el punto decimal en la cifra
  function insertarPunto(){
    var valor= document.getElementById('display').innerHTML;
    var cont = valor.length;
      if(valor.indexOf('.') == -1  && cont < 8){
        document.getElementById('display').innerHTML = (valor + '.');
      }
  };

  function insertarSigno(){
    var valor= document.getElementById('display').innerHTML;
    var cont = valor.length;
    if(valor.indexOf('-') == -1 && cont <= 8){
      if(valor == 0){
        document.getElementById('display').innerHTML = valor;
      }else{
      document.getElementById('display').innerHTML = ('-' + valor );
      }
    }else{
      valor = valor.substring(1);
      document.getElementById('display').innerHTML = valor;
    }
  };


  function operacionesMatematicas(){
    var btnSuma = document.getElementById('mas').addEventListener('click',suma);
    var btnResta = document.getElementById('menos').addEventListener('click',resta);
    var btnMultiplicacion = document.getElementById('por').addEventListener('click',multiplicacion);
    var btnDivision = document.getElementById('dividido').addEventListener('click',division);
    var btnIgual = document.getElementById('igual').addEventListener('click',igual);

    function suma(){
      var valor = parseInt(document.getElementById('display').innerHTML);
      if(resultado == 0 || esResultado != true){
        resultado = valor;
        document.getElementById('display').innerHTML = '';
        operacion = 'esSuma';
      }else{
        resultado = resultado + valor;
        document.getElementById('display').innerHTML = resultado;
        esResultado = true;
        operacion = 'esSuma';
        return resultado
      }
    };

    function resta(){
      var valor = parseInt(document.getElementById('display').innerHTML);
      if(resultado == 0){
        resultado = valor;
        document.getElementById('display').innerHTML = '';
        operacion = 'esResta';
      }else{
        resultado = resultado - valor;
        document.getElementById('display').innerHTML = resultado;
        operacion = 'esResta';
        esResultado = true;
      }
    };

    function multiplicacion(){
      var valor = parseInt(document.getElementById('display').innerHTML);
      if(resultado == 0){
        resultado = valor;
        document.getElementById('display').innerHTML = '';
        operacion = 'esMultiplicacion';
      }else{
        resultado = resultado * valor;
        document.getElementById('display').innerHTML = resultado;
        esResultado = true;
        operacion = 'esMultiplicacion';
      }
    };

    function division(){
      var valor = parseInt(document.getElementById('display').innerHTML);
      if(resultado == 0){
        resultado = valor;
        document.getElementById('display').innerHTML = '';
        operacion = 'esDivision';
      }else{
        resultado = resultado / valor;
        document.getElementById('display').innerHTML = resultado;
        esResultado = true;
        operacion = 'esDivision';
      }
    };

    function igual(){
      var valor = parseInt(document.getElementById('display').innerHTML);
      if(operacion == 'esSuma' ){
        if(esResultado){
          document.getElementById('display').innerHTML = resultado;
          esResultado = true;
        }else{
          resultado = resultado + valor;
          document.getElementById('display').innerHTML = resultado;
          esResultado = true;
          operacion = '';
        }
      }else if(operacion == 'esResta' ){
        if(esResultado){
          document.getElementById('display').innerHTML = resultado;
          esResultado = true;
        }else{
          resultado = resultado - valor;
          document.getElementById('display').innerHTML = resultado;
          esResultado = true;
          operacion = '';
        }
      }else if(operacion == 'esMultiplicacion' ){
        if(esResultado){
          document.getElementById('display').innerHTML = resultado;
          esResultado = true;
        }else{
          resultado = resultado * valor;
          document.getElementById('display').innerHTML = resultado;
          esResultado = true;
          operacion = '';
        }
      }else if(operacion == 'esDivision' ){
        if(esResultado){
          document.getElementById('display').innerHTML = resultado;
          esResultado = true;
        }else{
          resultado = resultado / valor;
          document.getElementById('display').innerHTML = resultado;
          esResultado = true;
          operacion = '';
        }
      }else if(operacion == ''){
        document.getElementById('display').innerHTML = resultado;
        esResultado = true;
      }
    };
  }

  eventTeclas();
  operacionesMatematicas();
  borrardisplay();
}());
