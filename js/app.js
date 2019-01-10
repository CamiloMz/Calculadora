var calculadora = (function(){

  var punto = document.getElementById('punto').addEventListener('click',insertarPunto);
  var teclas = document.getElementsByClassName('tecla');
  var on = document.getElementById('on').addEventListener('click',borrardisplay);
  var signo = document.getElementById('sign').addEventListener('click',insertarSigno);
  var contTeclas = teclas.length;
  var resultado = 0;
  var memoria = 0;
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
    var txt = valor + this.id;
    var contTxt = txt.length;
    if(esResultado){
      if(this.id.length == 1){
        document.getElementById('display').innerHTML = this.id;
        esResultado = false;
      }
    }else{
      if(contTxt <= 8 && this.id.length == 1){
        if(valor == 0){
          if(valor == '0.'){
            document.getElementById('display').innerHTML = txt;
          }else{
            valor = document.getElementById('display').innerHTML = this.id;
          }
        }else if(valor != 0){
          valor = document.getElementById('display').innerHTML = txt;
        }
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
    var btnSuma = document.getElementById('mas').addEventListener('click',() => {operar('esSuma')});
    var btnResta = document.getElementById('menos').addEventListener('click',() => {operar('esResta')});
    var btnMultiplicacion = document.getElementById('por').addEventListener('click',() => {operar('esMultiplicacion')});
    var btnDivision = document.getElementById('dividido').addEventListener('click',() => {operar('esDivision')});
    var btnIgual = document.getElementById('igual').addEventListener('click',igual);

    function operar(esOperador){
      var valor = parseFloat(document.getElementById('display').innerHTML);
      if(resultado == 0){
        resultado = valor;
        document.getElementById('display').innerHTML = '';
      }else if(valor.toString() == "NaN"){
        resultado = resultado;
        document.getElementById('display').innerHTML = '';
      }else{
        if(esResultado){
          document.getElementById('display').innerHTML = '';
          esResultado = true;
        }else {
          if(operacion == 'esSuma' ){
            resultado = resultado + valor;
            esResultado = true;
          }else if(operacion == 'esResta' ){
            resultado = resultado - valor;
            esResultado = true;
          }else if(operacion == 'esMultiplicacion' ){
            resultado = resultado * valor;
            esResultado = true;
          }else if(operacion == 'esDivision' ){
            resultado = resultado / valor;
            esResultado = true;
          }else{
            resultado = resultado + valor
            esResultado = true;
          }
        }
        if (resultado.toString().length > 8){
          document.getElementById('display').innerHTML = resultado.toExponential(2);
        }else{
          document.getElementById('display').innerHTML = resultado;
        }
      }
      operacion = esOperador;
      memoria = 0;
    }

    function igual(){
      if (memoria > 0){
        if(esResultado){
          if(operacion == 'esSuma' ){
              resultado = resultado + memoria;
              operacion = 'esSuma';
          }else if(operacion == 'esResta' ){
              resultado = resultado - memoria;
              operacion = 'esResta';
          }else if(operacion == 'esMultiplicacion' ){
              resultado = resultado * memoria;
              operacion = 'esMultiplicacion';
          }else if(operacion == 'esDivision' ){
              resultado = resultado / memoria;
              operacion = 'esDivision';
          }
          if (resultado.toString().length > 8){
            document.getElementById('display').innerHTML = resultado.toExponential(2);
          }else{
            document.getElementById('display').innerHTML = resultado;
          }
        }
      }else{
        var valor = parseFloat(document.getElementById('display').innerHTML);

        if(operacion == 'esSuma' ){
            resultado = resultado + valor;
            operacion = 'esSuma';
        }else if(operacion == 'esResta' ){
            resultado = resultado - valor;
            operacion = 'esResta';
        }else if(operacion == 'esMultiplicacion' ){
            resultado = resultado * valor;
            operacion = 'esMultiplicacion';
        }else if(operacion == 'esDivision' ){
            resultado = resultado / valor;
            operacion = 'esDivision';
        }
        esResultado = true;
        if (resultado.toString().length > 8){
          document.getElementById('display').innerHTML = resultado.toExponential(2);
        }else{
          document.getElementById('display').innerHTML = resultado;
        }
        memoria = valor;
      }
      esResultado = true;
    }
  };

  eventTeclas();
  operacionesMatematicas();
  borrardisplay();
}());
