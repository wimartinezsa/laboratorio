

document.addEventListener("DOMContentLoaded", function () {
 
  
  listarExamenesPorArea();
 
  
  
});




moment.defineLocale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    })

const Mensaje = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });




var Frm_resultados = new bootstrap.Modal(document.getElementById('Frm_resultados'), {
  keyboard: false
});


function activarBotonLectura(){

  let maquina = document.getElementById('maquina').value;
  
  if(maquina==="Maquina Analizador Quimica"){
    document.getElementById('btn_Quimica').hidden =false;
    document.getElementById('btn_Hematologia').hidden =true;
  }else{
    document.getElementById('btn_Quimica').hidden =true;
    document.getElementById('btn_Hematologia').hidden =false;
  }


}

// se listan los laboratoriospor Area
function listarExamenesPorArea(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    
    fetch(`/listarExamenesPorArea`, {
        method:'get',
        headers: {
            'Authorization': `Bearer ${token}`, // Envía el token en el encabezado de autorización
            'Content-Type': 'application/x-www-form-urlencoded' // Especifica el tipo de contenido
        }
    })
    .then(response => {
      // Verificar si la respuesta es JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
          return response.json();
      } else {
          window.location.href = "/";
      }
  })
    .then(data => {

        let accionBTN='';
        let arrayDatos=[];
        let estadoBTN='';


      

        if(data.status==403){window.location.href = "/";}
        if(data.status==200){
          //for que recorrelos examenes
        data.examenes.forEach(element => {

        accionBTN =``;
        accionBTN =`<a class="badge badge-pill badge-warning" style="font-size: 0.8rem;" 
           href="javascript:gestionarResultados(${element.id_examen},'${element.factura.paciente.nombres}','${element.observacion}','${element.procedimiento.resultado_laboratorio}')" title='Editar Resultados de Análisis'>${element.estado.replace(/_/g," ")}
           </a>`;
          
 
        
   
     // let resultados = element.resultado;
     let tabla='';
   //  console.log(element.procedimiento);
   // si el laboratorio se desea generar automatico
     if(element.procedimiento.resultado_laboratorio==='Automatico'){

       tabla=`<table style="border-collapse: collapse; width: 100%;">
                <thead>
                    <tr>
                     <th scope="col">METODO</th>
                      <th scope="col">PARAMETRO</th>
                      <th scope="col">RESULTADO</th>
                      <th scope="col">ESTADO</th>
                    </tr>
                </thead>
                <tbody>
                  `;
      resultados = element.resultado;
      
        
        resultados.forEach(item=>{

         // console.log(item);
          
          if (item.parametro.estado === 'Activo') {
              let btn_parametro='';
              let estado_parametro='';
          
                if(item.estado==='Pendiente'){
                  btn_parametro=`<a class="btn btn-warning" 
                  href="javascript:cambiarEstadoResultado(${item.id_resultado},'${item.estado}')" 
                  title='Finalizar Resultado'> <i class='fas fa-thumbs-down'></i></a>`;
                }

                
                if(item.estado==='Finalizado'){
                  btn_parametro=`<a class="btn btn-success" href="javascript:cambiarEstadoResultado(${item.id_resultado},'${item.estado}')" title='Resultado Pendiente'> <i class='fas fa-thumbs-up'></i></a>`;
                
                }
                

                /*
                if(item.parametro.metodo==='Automatico'){
                  estado_parametro=`<span class="badge badge-pill badge-danger" style="font-size: 0.8rem;">${item.id_resultado}</span>`;
                }
                else{
                  estado_parametro=`<span class="badge badge-pill badge-secondary" style="font-size: 0.8rem;">${item.id_resultado}</span>`
                }
                */
              
                tabla+=`
                  <tr>
                  <td>${item.parametro.metodo}</td>
                    <td>${item.parametro.nombre}</td>
                    <td>${item.resultado}</td>
                    <td>${btn_parametro}</td>
                  </tr>`;        

              }


      });
     tabla+='</tbody></table>'
    }// fin del if del reulstado_procedimiento

else{
  tabla=`<a href="laboratorios/${element.resultado_pdf}">Descargar Resultado</a> `;
}
     

        let dato = {
        examen:element.id_examen,
       
        identificacion : element.factura.paciente.identificacion,
        nombres :element.factura.paciente.nombres.toUpperCase(),
        cups :element.procedimiento.cups.nombre,
        resultado :tabla,
        observacion:element.observacion,
        autoriazacion:`<span class="badge badge-pill badge-success" style="font-size: 0.8rem;">${  element.factura.autorizacion}</span>`,
        area :element.procedimiento.area.nombre.toUpperCase(),
        estado :accionBTN ,
                        }
                        arrayDatos.push(dato)
                        });
   
              var table = $('#tabla_examenes_confirmados').DataTable({
               "bInfo" : false,
               searching: true,
               paging: true,
               autoWidth: true,
               destroy: true,
               responsive: false,
               scrollX: false, 
               data: arrayDatos,
               columns: [
                           {"data": "examen"},                         
                           {"data": "identificacion"},
                           {"data": "nombres"},
                           {"data": "cups"},
                           {"data": "observacion"},
                           {"data": "autoriazacion"},  
                           {"data": "resultado"},
                           {"data": "area"},
                           {"data": "estado"}    
                       ]
                        });


                        table.on('search.dt', function() {
                          var searchValue = table.search(); // Obtiene el valor actual del campo de búsqueda
                         document.getElementById('busqueda').value=searchValue;
                      });
                     

                     table.search(document.getElementById('busqueda').value).draw();
        }
        if(data.status==404){ Mensaje.fire({icon: 'warning',title: data.message})}
        if(data.status==500){ Mensaje.fire({icon: 'error',title: data.message})} 
        
    });


   
}



//=====================================Modulo de cargar el archivo plano ======================
// se configura el formulario para cargar el archivo plano
const fileInput = document.getElementById("fileInput");
let fileContent = ""; // Almacenará el contenido del archivo

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    fileContent = e.target.result; // Guardar el contenido del archivo
    Mensaje.fire({icon: 'success',title:`Archivo cargado con éxito. Puede migrar los resultados.`});
  };
  reader.readAsText(file);
});




async function leerArchivoAnalisisCompletos(tipo_analisis) {
  if (!fileContent || fileContent.trim() === "") {
    if (tipo_analisis === "Quimica") {
      Mensaje.fire({ icon: 'warning', title: `Por favor cargar el archivo .txt de la maquina de Quimica` });
    }
    return;
  }

  const resultado_txt = [];

  if (tipo_analisis === "Quimica") {
    const rows = fileContent
      .trim()
      .split("\n")
      .filter(row => row.trim() !== "");

    for (const row of rows) {
      const parts = row.trim().split("\t"); // usar tabulaciones como separador

      if (parts.length >= 4 && !isNaN(Number(parts[0]))) {
        const muestra = parts[0];
        const parametro = parts[1]; // ejemplo: "CREATININE SER"
        const valor = parts[3];

        resultado_txt.push({ muestra, parametro, valor });
      } else {
        console.warn("Línea no válida o incompleta:", row);
      }
    }

 
    if (resultado_txt.length > 0) {
      await registrarResulatadosAutomaticos(resultado_txt); // <-- usa tu función aquí
    }
  }
}


/*
async function leerArchivoAnalisisCompletos(tipo_analisis){
  const rows = fileContent.trim().split("\n");
  let codMuestras;
  
  if(tipo_analisis==="Quimica"){
    
    if (!fileContent) {
      Mensaje.fire({icon: 'warning',title:`Por favor cargar el archivo .txt de la maquina de Quimica`});
      return;
    }
    const rows =await fileContent.split("\n").filter(row => row.trim() !== "");
    
    const resultado_txt = [];

    await rows.forEach(async (row) => {
      const cells = row.split(/\s+/); // Dividir por espacios
     if(!isNaN(Number(cells[0]))){
     
      resultado_txt.push(
        {"muestra": cells[0],"parametro":cells[1],"valor":cells[3]}
           
        );
        }
       //console.log(resultado_txt);
        registrarResulatadosAutomaticos(resultado_txt);
       
    })
   
  }// fin del if tipo_analisis

 

}

*/


//Función para leer el archivo plano de los resultados txt de la maquina Quimica
/*
async function leerResultadosAutorizacion(){

      if (!fileContent) {
        Mensaje.fire({icon: 'warning',title:`Por favor cargar el archivo .txt de la maquina de Quimica`});
        return;
      }
      const rows =await fileContent.split("\n").filter(row => row.trim() !== "");

      
     
      const resultado_txt = [];

      await rows.forEach(async (row) => {
        const cells = row.split(/\s+/); // Dividir por espacios
       if(!isNaN(Number(cells[0]))){
        console.log(cells[0]);
       
        resultado_txt.push(
          {"muestra": cells[0],"parametro":cells[1],"valor":cells[3]}
             
          );
          }
         
      })
      //console.log(resultado_txt);
     
    // await registrarResulatadosAutomaticos(resultado_txt);
      
}

*/







function registrarFormularioAutomaticos(resultados){
  const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

  fetch('registrarFormularioAutomaticos', {
      method:'put',
      body: JSON.stringify(resultados),
      headers: {
          'Authorization': `Bearer ${token}`, // Envía el token en el encabezado de autorización
          'Content-Type': 'application/json' // Especifica el tipo de contenido
      }
  })
  .then(response => {
    // Verificar si la respuesta es JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    } else {
       // window.location.href = "/";
    }
  })
  .then(data => {

  // console.log(data);

       if(data.status==403){window.location.href = "/";}
       
        if(data.status===200){
          Frm_resultados.hide();
          Mensaje.fire({icon: 'success',title: data.message}
          );
      
      
        listarExamenesPorArea();
        }

       if(data.status==500){Mensaje.fire({icon: 'warning',title: data.message});}
  });

 
}



// registra los resultados de lso parametros del archivo plano

function registrarResulatadosAutomaticos(resultados){
  const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

  //console.log(resultados);

  fetch('registrarResulatadosAutomaticos', {
      method:'put',
      body: JSON.stringify(resultados),
      headers: {
          'Authorization': `Bearer ${token}`, // Envía el token en el encabezado de autorización
          'Content-Type': 'application/json' // Especifica el tipo de contenido
      }
  })
  .then(response => {
    // Verificar si la respuesta es JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    } else {
        window.location.href = "/";
    }
  })
  .then(data => {

   //console.log(data);

       if(data.status==403){window.location.href = "/";}
       
        if(data.status===200){
          Frm_resultados.hide();
          Mensaje.fire({icon: 'success',title: data.message}
          );
      
      
        listarExamenesPorArea();
       
       
        }

       if(data.status==500){Mensaje.fire({icon: 'warning',title: data.message});}
       
  
  });

 


}



//=====================================Fin del Modulo de cargar el archivo plano ======================



//=====================================Modulo de digitar los resultados de forma dinamica===============
async function gestionarResultados(id_examen,nombre,observacion,tipo_resultado){

  document.getElementById('id_resultado_examen').value=id_examen;
  document.getElementById('titulo-Frm_resultados').innerHTML='Resultados de : '+nombre;

  //document.querySelector("textarea[id='observacion']").value =observacion ;
  
  document.getElementById('subir-archivo').style.display  = 'none';
  document.getElementById('dinamico').style.display  = 'none';

 if(tipo_resultado==='Automatico'){
  document.getElementById('subir-archivo').style.display  = 'none';
  document.getElementById('dinamico').style.display  = 'block';
  await crearFormularioDinamico(id_examen);
  
 }

 if(tipo_resultado==='Manual'){
 
 document.getElementById('subir-archivo').style.display  = 'block';
 document.getElementById('dinamico').style.display  = 'none';
 }
 
 
  

 await Frm_resultados.show();
}

function subirResultadoLaboratorio() {
  let id_examen= document.getElementById('id_resultado_examen').value;

    let datos= new FormData(); 
    let FileN = document.getElementById('foto');
    datos.append('img', FileN.files[0]);

   
    fetch(`/registrarResultadoLaboratorio/${id_examen}`,
        {
            method: 'put',
            body:datos
        })
        .then(response => {
            // Verificar si la respuesta es JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                window.location.href = "/";
            }
          })
    .then(data=>{
        if(data.status==403){window.location.href = "/";}
        
        if(data.status==200){Mensaje.fire({icon: 'success',title: data.message});
            listarExamenesPorArea();
        }
 
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
    });
}




async function crearFormularioDinamico(id_examen){

  const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

  
 await fetch(`/listarParametrosExamen/${id_examen}`, {
    method:'get',
    headers: {
      'Authorization': `Bearer ${token}`, // Envía el token en el encabezado de autorización
      'Content-Type': 'application/json' // Especifica el tipo de contenido
  }   
})
.then(response => {
  // Verificar si la respuesta es JSON
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
      return response.json();
  } else {
      window.location.href = "/";
  }
})
.then(data => {
   if(data.status===200){
    pintarFormulario(data.resultados);
   }
      
      });

}



async function pintarFormulario(data) {
  // Seleccionar el contenedor donde se generará el formulario
  //console.log(data);
  const contenedorFormulario = document.getElementById("formulario-dinamico");

  contenedorFormulario.style.maxHeight = "none";
  contenedorFormulario.style.height = "auto";


  contenedorFormulario.innerHTML = ""; // Limpia el contenido del formulario
  
  data.forEach((item, index) => {
    // Crear un contenedor para cada campo


    const div = document.createElement("div");
    div.style.marginBottom = "10px";

    // Crear una etiqueta para el parámetro
    const label = document.createElement("label");
    label.textContent = `${item.parametro.nombre}: `;
    label.setAttribute("for", `parametro-${index}`);
    div.appendChild(label);

    if(item.parametro.metodo==='Automatico'){
    // Crear un campo de entrada
    const input = document.createElement("input");
    input.type = "text";
    input.value = ""; // Inicialmente vacío
    input.id = `parametro-${item.id_resultado}`; // Asignar un id único al input
    input.placeholder = 'Digite ' + item.parametro.nombre;
    input.name = item.id_resultado; // Asignar el nombre del parámetro
    input.value = item.resultado;

    input.classList.add("form-control", "mb-3");
    div.appendChild(input);

  }

  if(item.parametro.metodo==='Manual'){
 // si tiene tipos de resultado se crea un select
 
    if(item.parametro.tipo_resultado.length > 0){
        // Crear un campo de entrada
        const select = document.createElement("select");
        select.id = `parametro-${item.id_resultado}`; // Asignar un id único al select
        select.name = item.id_resultado; // Asignar el nombre del parámetro
        select.classList.add("form-control", "mb-3");
        // Opciones de ejemplo (puedes cambiar esto dinámicamente)
        
        item.parametro.tipo_resultado.forEach(opcion => {
          const option = document.createElement("option");
          option.value = opcion.nombre;
          option.textContent = opcion.nombre;
          select.appendChild(option);
      });
      select.value=item.resultado;
          div.appendChild(select);
    }else{

        // Crear un campo de entrada
    const input = document.createElement("input");
    input.type = "text";
    input.value = ""; // Inicialmente vacío
    input.id = `parametro-${item.id_resultado}`; // Asignar un id único al input
    input.placeholder = 'Digite ' + item.parametro.nombre;
    input.name = item.id_resultado; // Asignar el nombre del parámetro
    input.value = item.resultado;
    input.classList.add("form-control", "mb-3");
    div.appendChild(input);
    }


      

  }

    // Agregar el div al formulario
    contenedorFormulario.appendChild(div);
   
   
    
    
  });

  // Limpia y asegura un solo listener en el botón
  const btnRegistrar = document.getElementById("btn_registrar");
  const nuevoListener =async () => {
    let resultado_json = [];
    
    data.forEach((item, index) => {
      const campo_resultado = document.getElementById(`parametro-${item.id_resultado}`).value;
      resultado_json.push({ codigo: item.id_resultado, resultado: campo_resultado});
    });
    //  {"muestra": cells[0],"parametro":cells[1],"valor":cells[3]}
    
   console.log(resultado_json);
   
   await registrarFormularioAutomaticos(resultado_json);
  
   
  };

  // Remover cualquier listener anterior
  btnRegistrar.replaceWith(btnRegistrar.cloneNode(true)); // Clona el botón para resetear listeners
  document.getElementById("btn_registrar").addEventListener("click", nuevoListener);

}






function confirmarFinalizarResultado(){
  Swal.fire({
      title: 'Desea finalizar el proceso de resultado',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
  }).then((result) => {
      if (result.isConfirmed) {
      let id_examen=  document.getElementById('id_resultado_examen').value;
      finzalizarResultados(id_examen);
      } else if (result.isDenied) {
          Mensaje.fire({
              icon: 'warning',
              title: 'Operación Cancelada'
              });
      }                       
  })

}



function finzalizarResultados(id_examen){
  const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

  let datos= new URLSearchParams();
  datos.append('observacion',document.getElementById('observacion').value);
  
  fetch(`finzalizarResultados/${id_examen}`, {
      method:'put',
      body:datos,
      headers: {
        'Authorization': `Bearer ${token}`, // Envía el token en el encabezado de autorización
        'Content-Type': 'application/x-www-form-urlencoded' // Especifica el tipo de contenido
   
      }
  })
  .then(response => {
    // Verificar si la respuesta es JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    } else {
       window.location.href = "/";
    }
  })
  .then(data => {

       if(data.status==403){window.location.href = "/";}
       
        if(data.status==200){Mensaje.fire({icon: 'success',title: data.message});

        listarExamenesPorArea();
        Frm_resultados.hide();
        }

       if(data.status==500){Mensaje.fire({icon: 'warning',title: data.message});}
       
  });

}



function cambiarEstadoResultado(id_resultado,estado){
  const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

  
  fetch(`cambiarEstadoResultado/${id_resultado}/${estado}`, {
      method:'put',
      headers: {
          'Authorization': `Bearer ${token}`, // Envía el token en el encabezado de autorización
          'Content-Type': 'application/json' // Especifica el tipo de contenido
      }
  })
  .then(response => {
    // Verificar si la respuesta es JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    } else {
        window.location.href = "/";
    }
  })
  .then(data => {

       if(data.status==403){window.location.href = "/";}
       
        if(data.status==200){Mensaje.fire({icon: 'success',title: data.message});
      
        listarExamenesPorArea();
        }

       if(data.status==500){Mensaje.fire({icon: 'warning',title: data.message});}
       
  });

}
























