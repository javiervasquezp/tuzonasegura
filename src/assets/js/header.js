$(document).ready(function(){

    // Acordeon menu movil
  //  $("#menu-movil").accordionjs();


  

});

function imprimir(printThis){
  let divToPrint = document.getElementById('htmlonp').outerHTML;
  var win = window.open();
  //win.document.body.appendChild(document.getElementsByClassName("style"));
    win.document.open();
    
    //win.document.write('<'+'html'+'><'+'body'+'>');
    win.document.write(divToPrint);
    //win.document.write('<'+'/body'+'><'+'/html'+'>');
    //win.document.close();
    win.print();
    //win.close();
}