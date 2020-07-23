const { Console } = require('console');

fs = require('fs');

const Servicos = function(servicos) {
};

// Matriz que armazena os retângulos
var rectangles = [];
var area_rectangles = [];

// 3) Test if two rectangles intersect
Servicos.addrectangle = (rect, area, retorno) => {
  // serviço para adicionar os retângulos
  rect = rect.trim().split('&')[0];
  rect = rect.replace("(","").replace(")","");

  // Pega automaticamete a letra no queystring e guarda como nome do retângulo
  console.log("rect: "+rect);
  let key    = String(rect.split('=')[0]).toUpperCase();
  let values = rect.split('=')[1];
  let rectAux = [];

  area = area == "true";
  area ? rectAux = area_rectangles : rectAux = rectangles;
  let r = rectAux.indexOf(key);

  // Adiciona 
  if ( r == -1 ) {
    rectAux.push(key);
    rectAux.push(values.split(';')[0]);
    rectAux.push(values.split(';')[1]);
  } 
  // Altera
  else{
    rectAux[r+1] = values.split(';')[0];
    rectAux[r+2] = values.split(';')[1];
  }

  retorno(0);
};
Servicos.intersects = (rect, area, retorno) => {
  // Realiza o cálculo da interseção dos retângulos
  if (rect == undefined || rect.trim() == ""){
    retorno(false);
    return;
  }

  let rect1 = String(rect.split(',')[0]).toUpperCase();
  let rect2 = String(rect.split(',')[1]).toUpperCase();


  let rectAux = [];
  area = area == "true";
  area ? rectAux = area_rectangles.slice() : rectAux = rectangles.slice();

  console.log(rectAux);
  // Verifica se os retângulos foram adicionados
  let r1 = rectAux.indexOf(rect1);
  if ( r1 == -1 ) {
    retorno(`Retângulo ${rect1} não encontrado!`);
    return;
  }
  let r2 = rectAux.indexOf(rect2);
  if ( r2 == -1 ) {
    retorno(`Retângulo ${rect2} não encontrado!`);
    return;
  }

  // Pega os pontos do Retangulo 1
  let rect1P1 = rectAux[r1+1].split(',');
  let rect1P2 = rectAux[r1+2].split(',');

  // Pega os pontos do Retangulo 2
  let rect2P1 = rectAux[r2+1].split(',');
  let rect2P2 = rectAux[r2+2].split(',');

  // Arrays para armazenas a área de cada retângulo
  let rect1X = [];
  let rect1Y = [];
  let rect2X = [];
  let rect2Y = [];
  let yesIntersectsX = false;
  let yesIntersectsY = false;

  // Pontos X do retangulo 1
  for (i=Number(rect1P1[0]); i <= Number(rect1P2[0]); i++){
    rect1X.push(String(i));
  }
  // Pontos Y do retangulo 1
  for (i=Number(rect1P1[1]); i <= Number(rect1P2[1]); i++){
    rect1Y.push(String(i));
  }
  // Pontos X do retangulo 2
  for (i=Number(rect2P1[0]); i <= Number(rect2P2[0]); i++){
    rect2X.push(String(i));
  }
  // Pontos Y do retangulo 2
  for (i=Number(rect2P1[1]); i <= Number(rect2P2[1]); i++){
    rect2Y.push(String(i));
  }
  
  // Procura a interseção no eixo X
  for (i in rect1X){
    if ( rect2X.indexOf(rect1X[i]) > -1 ){
      yesIntersectsX = true;
      break;
    }
  }
  // Procura a interseção no eixo Y
  for (i in rect1Y){
    if ( rect2Y.indexOf(rect1Y[i]) > -1 ){
      yesIntersectsY = true;
      break;
    }
  }


  if ( yesIntersectsX && yesIntersectsY ) {

    console.log(area);
    if (area){
      console.log("area");
      // Realiza o cálculo da área Z
      let contAreaX = 0;
      for (i in rect1X){
        if ( rect2X.indexOf(rect1X[i]) > -1 ){
          contAreaX++;
        }
      }
      // Realiza o cálculo da área Y
      let contAreaY = 0;
      for (i in rect1Y){
        if ( rect2Y.indexOf(rect1Y[i]) > -1 ){
          contAreaY++;
        }
      }
      
      retorno(contAreaX * contAreaY);
    }
    else{
      console.log("interseção");
      retorno(true);
    }
  }
  else{
    retorno(false);
  }  
};


module.exports = Servicos; 