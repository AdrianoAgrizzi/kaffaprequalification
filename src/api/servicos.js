const { Console } = require('console');
const fs = require('fs');


const Servicos = function(servicos) {
};


// *********************************************************
// 3) Test if two rectangles intersect
// 4) Compute area of intersection between two rectangles
// *********************************************************
// Matriz que armazena os retângulos
var rectangles = [];
var area_rectangles = [];
// serviço para adicionar os retângulos
Servicos.addrectangle = (rect, area, retorno) => {
  // Pega a query string
  rect = rect.trim().split('&')[0];
  rect = rect.replace("(","").replace(")","");

  // Pega automaticamete a letra no queystring e guarda como nome do retângulo
  console.log("rect: "+rect);
  let key    = String(rect.split('=')[0]).toUpperCase();
  let values = rect.split('=')[1];
  let rectAux = [];

  // Verifica se é Área ou Interseção
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
// Realiza o cálculo da interseção dos retângulos
Servicos.intersects = (rect, area, retorno) => {
  if (rect == undefined || rect.trim() == ""){
    retorno(false);
    return;
  }

  // Pega o nome dos retângulos
  let rect1 = String(rect.split(',')[0]).toUpperCase();
  let rect2 = String(rect.split(',')[1]).toUpperCase();

  // Verifica se é Área ou Interseção
  let rectAux = [];
  area = area == "true";
  area ? rectAux = area_rectangles.slice() : rectAux = rectangles.slice();

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
    // Se entrou existe interseção

    // Verifica se é área
    if (area){
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
      // Interseção Sim
      retorno(true);
    }
  }
  else{
    // Interseção Não
    retorno(false);
  }  
};

// *********************************************************
// 5) Simple Todo List
// *********************************************************
var filetodolist = "src/data/todolist.txt";

Servicos.todolist = (retorno) => {
  // Array da lista a fazer
  let arrayTodo = [];

  // Verifica se o arquivo existe  
  fs.stat(filetodolist, (err, stats) => {
    if (err) throw err;

    // Carrega o arquivo e adiciona o a fazer
    fs.readFile(filetodolist, (err, data) => {
      if (err) throw err;

      arrayTodo = data.toString().split("\n"); 
      //console.log(arrayTodo);
      retorno(arrayTodo);
    });         
  });

}
Servicos.todolistadd = (todo, retorno) => {
  // Array da lista a fazer
  let arrayTodo = [];
  // adiciona na array e grava no aruivo
  function add(){
    let id = 0;
    if ( arrayTodo.length > 1 ){
      id = Number(arrayTodo[arrayTodo.length-1].split(';')[0])+1;
    }    
    arrayTodo.push(id+";"+todo);

    fs.writeFile(filetodolist, arrayTodo.toString(),()=>{});
    retorno(0);
  }

  // Verifica se o arquivo existe  
  fs.stat(filetodolist, (err, stats) => {
    if (err) {
      add();
    }
    else{
      // Carrega o arquivo e adiciona o a fazer
      fs.readFile(filetodolist, (err, data) => {
        if (err) throw err;

        arrayTodo = data.toString().split(","); 
        add();
      });  
    }   
  });
}
Servicos.todolistremove = (id, retorno) => {
  // Array da lista a fazer
  let arrayTodo = [];
  // Verifica se o arquivo existe  
  fs.stat(filetodolist, (err, stats) => {
    if (err) {
      retorno(0);
    }
    else{
      // Carrega o arquivo e adiciona o a fazer
      fs.readFile(filetodolist, (err, data) => {
        if (err) throw err;

        // Localiza a tarefa pelo id
        arrayTodo = data.toString().split(",");
        let task = -1;
        for (i in arrayTodo){
          if (arrayTodo[i].split(';')[0] == id){
            task = i;
            break;
          }
        }
        
        // Remove
        if (task > -1) arrayTodo.splice(task,1);

        fs.writeFile(filetodolist, arrayTodo.toString(),()=>{});
        retorno(0);
      });  
    }   
  });  
}



// *********************************************************
// 7) Rest Server - World Clock
// *********************************************************
Servicos.restServer = (retorno) => {
  let currentDateTime = new Date();

  retorno({currentDateTime});
}

module.exports = Servicos; 