const { Console } = require('console');

fs = require('fs');

const Servicos = function(servicos) {
};

// Matriz que armazena os retângulos
var rectangles = [];

// 3) Test if two rectangles intersect
Servicos.addrectangle = (rect, retorno) => {
  // serviço para adicionar os retângulos
  rect = rect.trim();
  rect = rect.replace("(","").replace(")","");

  // Pega automaticamete a letra no queystring e guarda como nome do retângulo
  let key    = String(rect.split('=')[0]).toUpperCase();
  let values = rect.split('=')[1];
  let r = rectangles.indexOf(key);

  // Adiciona 
  if ( r == -1 ) {
    rectangles.push(key);
    rectangles.push(values.split(';')[0]);
    rectangles.push(values.split(';')[1]);
  } 
  // Altera
  else{
    rectangles[r+1] = values.split(';')[0];
    rectangles[r+2] = values.split(';')[1];
}

  retorno(0);
};
Servicos.intersects = (rect, retorno) => {
  // Realiza o cálculo da interseção dos retângulos
  if (rect == undefined || rect.trim() == ""){
    retorno(false);
    return;
  }

  let rect1 = String(rect.split(',')[0]).toUpperCase();
  let rect2 = String(rect.split(',')[1]).toUpperCase();

  // Verifica se os retângulos foram adicionados
  let r1 = rectangles.indexOf(rect1);
  if ( r1 == -1 ) {
    retorno(`Retângulo ${rect1} não encontrado!`);
    return;
  }
  let r2 = rectangles.indexOf(rect2);
  if ( r2 == -1 ) {
    retorno(`Retângulo ${rect2} não encontrado!`);
    return;
  }

  // Pega os pontos do Retangulo 1
  let rect1P1 = rectangles[r1+1].split(',');
  let rect1P2 = rectangles[r1+2].split(',');

  // Pega os pontos do Retangulo 2
  let rect2P1 = rectangles[r2+1].split(',');
  let rect2P2 = rectangles[r2+2].split(',');

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
    retorno(true);
  }
  else{
    retorno(false);
  }  
};


module.exports = Servicos; 