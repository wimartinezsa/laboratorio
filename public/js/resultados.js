

document.addEventListener("DOMContentLoaded", function () {
  let rol = localStorage.getItem('rol'); 
  let area = localStorage.getItem('area'); 
  
  listarExamenesPorArea(rol,area);
  
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




// se listan los laboratoriospor Area
function listarExamenesPorArea(rol,area){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    
    fetch(`/listarExamenesPorArea/${rol}/${area}`, {
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

            
          if (element.estado==='En_Proceso_de_Analisis'){
           accionBTN =`<a class="badge badge-pill badge-danger" style="font-size: 0.8rem;" 
           href="javascript:gestionarResultados(${element.id_examen},'${element.factura.paciente.nombres}','${element.observacion}')" title='Finalizar Análisis'>${element.estado.replace(/_/g," ")}
           </a>`;

          }
 
        
   
     // let resultados = element.resultado;

      let tabla=`<table style="border-collapse: collapse; width: 100%;">
                <thead>
                    <tr>
                    <th scope="col">CODIGO</th>
                     <th scope="col">METODO</th>
                      <th scope="col">PARAMETRO</th>
                      <th scope="col">RESULTADO</th>
                      <th scope="col">ESTADO</th>
                    </tr>
                </thead>
                <tbody>
                  `;
        let resultados = element.resultado;
        
        resultados.forEach(item=>{
          

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
          
          if(item.parametro.metodo==='Automatico'){
            estado_parametro=`<span class="badge badge-pill badge-danger" style="font-size: 0.8rem;">${item.id_resultado}</span>`;
          }
          else{
             estado_parametro=`<span class="badge badge-pill badge-secondary" style="font-size: 0.8rem;">${item.id_resultado}</span>`
          }
         
          tabla+=`
            <tr>
             <td>${estado_parametro}</td>
             <td>${item.parametro.metodo}</td>
              <td>${item.parametro.nombre}</td>
              <td>${item.resultado}</td>
              <td>${btn_parametro}</td>
            </tr>`;        
      });
     tabla+='</tbody></table>'
      //console.log(element);

     

        let dato = {
        examen:element.id_examen,
        autoriazacion:element.factura.autorizacion,
        identificacion : element.factura.paciente.identificacion,
        nombres :element.factura.paciente.nombres.toUpperCase(),
        cups :element.procedimiento.cups.nombre,
        resultado :tabla,
        observacion:element.observacion,
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
                           {"data": "autoriazacion"},
                           {"data": "identificacion"},
                           {"data": "nombres"},
                           {"data": "cups"},
                           {"data": "observacion"},  
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






//Función para leer el archivo plano
async function leerResultados(){

      if (!fileContent) {
        Mensaje.fire({icon: 'warning',title:`Por favor cargar el archivo plano`});
        return;
      }
      const rows =await fileContent.split("\n").filter(row => row.trim() !== "");
     
      const resultado_txt = [];

      await rows.forEach(async (row) => {
        const cells = row.split(/\s+/); // Dividir por espacios
       if(!isNaN(Number(cells[0]))){
        resultado_txt.push({
              codigo: cells[0],
              resultado: cells[3]
          });
          }
          /*
          else{
           Mensaje.fire({icon: 'success',title:`El codigo ${cells[0]} no es numérico`});
          }
           */
      })
     
      await registrarResulatadosAutomaticos(resultado_txt);
      
}





// registra los resultados de lso parametros del archivo plano
function registrarResulatadosAutomaticos(resultados){
  const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

  
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

   // console.log(data);

       if(data.status==403){window.location.href = "/";}
       
        if(data.status===200){
          Mensaje.fire({icon: 'success',title: data.message}

          );
        let rol = localStorage.getItem('rol'); 
        let area = localStorage.getItem('area'); 
        document.getElementById('btn_finalizar').style.display = 'block';
        document.getElementById('observacion').style.display = 'block';
        listarExamenesPorArea(rol,area);
       
       
        }

       if(data.status==500){Mensaje.fire({icon: 'warning',title: data.message});}
       
  
  });

 


}



//=====================================Fin del Modulo de cargar el archivo plano ======================



//=====================================Modulo de digitar los resultados de forma dinamica===============
async function gestionarResultados(id_examen,nombre,observacion){


  document.getElementById('id_resultado_examen').value=id_examen;
  document.getElementById('titulo-Frm_resultados').innerHTML='Resultados de : '+nombre;

  //document.querySelector("textarea[id='observacion']").value =observacion ;
  
  document.getElementById('btn_finalizar').style.display = 'none';
  document.getElementById('btn_registrar').style.display = 'block';
  document.getElementById('observacion').style.display = 'none';

  await crearFormularioDinamico(id_examen);
  

 await Frm_resultados.show();
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

  contenedorFormulario.style.maxHeight = "400px"; // Ajusta la altura según sea necesario
  contenedorFormulario.style.overflowY = "auto"; // Habilita la barra de desplazamiento vertical


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
    
   // console.log(resultado_json);
   
   await registrarResulatadosAutomaticos(resultado_json);
   document.getElementById('btn_registrar').style.display = 'none';
   
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
        let rol = localStorage.getItem('rol'); 
        let area = localStorage.getItem('area'); 
        listarExamenesPorArea(rol,area);
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
        let rol = localStorage.getItem('rol'); 
        let area = localStorage.getItem('area'); 
        listarExamenesPorArea(rol,area);
        }

       if(data.status==500){Mensaje.fire({icon: 'warning',title: data.message});}
       
  });

}
























