
document.addEventListener("DOMContentLoaded", function () {
    let rol = localStorage.getItem('rol'); 
    let area = localStorage.getItem('area'); 
    
    listarMuestrasArea(rol,area);
    
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


var Frm_muestras = new bootstrap.Modal(document.getElementById('Frm_muestras'), {
    keyboard: false
});



function listarMuestrasArea(rol,area){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    

   
    fetch(`/listarMuestrasArea`, {
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

          accionBTN =`<a class="badge badge-success badge-warning" style="font-size: 0.8rem;" href="javascript:iniciarProcesoAnalisis(${element.id_examen})" title='Iniciar Proceso de Análisis'>${element.estado.replace(/_/g," ")}</a>`;
        
   
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
            btn_parametro=`<a class="btn btn-warning" href="javascript:digitarResultado(${item.id_resultado},'${item.resultado}','${item.parametro.valor_referencia}')" title='Digitar Resultados'>Pendiente</a>`;
          }
          if(item.estado==='Finalizado'){
            btn_parametro=`<a class="btn btn-success" href="javascript:digitarResultado(${item.id_resultado},'${item.resultado}','${item.parametro.valor_referencia}')" title='Digitar Resultados'>Finalizado</a>`;
           
          }
          
          if(item.parametro.metodo==='Automatico'){
            estado_parametro=`<span class="badge badge-pill badge-danger" style="font-size: 0.8rem;">${item.id_resultado}</span>`;
          }
          else{
            estado_parametro=`<span class="badge badge-pill badge-secondary" style="font-size: 0.8rem;">${item.id_resultado}</span>`;
          }
         
          tabla+=`
            <tr>
             <td>${estado_parametro}</td>
             <td>${item.parametro.metodo}</td>
              <td>${item.parametro.nombre}</td>
              <td>${item.resultado}</td>
              <td>${item.estado}</td>
            </tr>`; 

          
      
     
              
            
      });
     tabla+='</tbody></table>'
      //console.log(element);

     

        let dato = {
        examen:element.id_examen,
        autoriazacion:element.factura.autorizacion,
        identificacion : element.factura.paciente.identificacion,
        nombres :element.factura.paciente.nombres,
        cups :element.procedimiento.cups.nombre,
        resultado :tabla,
        observacion:element.observacion,
        area :element.procedimiento.area.nombre,
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
        }
        if(data.status==404){ Mensaje.fire({icon: 'warning',title: data.message})}
        if(data.status==500){ Mensaje.fire({icon: 'error',title: data.message})} 
        
    });

   
}











function gestionarConfirmarMuestraRecibida(id_examen,observacion){

    document.getElementById('id_examen').value=id_examen;
    document.getElementById('observacion').value=observacion;
 
    Frm_muestras.show();

}


function ConfirmarMuestraRecibida(){
    Swal.fire({
        title: 'Se confirma el recibido de la muestra',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            registrarConfirmarMuestraRecibida();
        } else if (result.isDenied) {
            Mensaje.fire({
                icon: 'warning',
                title: 'No se realizaron cambios en el estado'
                });
        }                       
    })

}

//para que el administrador asigne profesional al examen
function registrarConfirmarMuestraRecibida(){

    let id_examen= document.getElementById('id_examen').value;
  
    let datos= new URLSearchParams();
    datos.append('observacion',document.getElementById('observacion').value);
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

        fetch(`/registrarConfirmarMuestraRecibida/${id_examen}`,
            {
                method: 'PUT',
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
        .then(data=>{
            if(data.status==403){window.location.href = "/";}
        
            if(data.status==200){
                Mensaje.fire({icon: 'success',title: data.message});
                let rol = localStorage.getItem('rol'); 
                let area = localStorage.getItem('area'); 
                listarMuestrasArea(rol,area);
               Frm_muestras.hide();

             
            }
    
            if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}
    
            if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
          
        });

}


// se confirma que se inicia el proceso de analisis
function iniciarProcesoAnalisis(id_prestacion){
    Swal.fire({
        title: 'Se Inicia el Proceso de Análisis',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
           confirmarInicioProcesoAnalisis(id_prestacion);
        } else if (result.isDenied) {
            Mensaje.fire({
                icon: 'warning',
                title: 'Operación Cancelada'
                });
        }                       
    })

}

// se ejecuta la confirmación del inicio del proceso de analisis
function confirmarInicioProcesoAnalisis(id_prestacion){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

        fetch(`/inicioProcesoAnalisis/${id_prestacion}`,
            {
                method: 'PUT',
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
        .then(data=>{
            if(data.status==403){window.location.href = "/";}
        
            if(data.status==200){Mensaje.fire({icon: 'success',title: data.message});
        
                let rol = localStorage.getItem('rol'); 
                let area = localStorage.getItem('area'); 
                listarMuestrasArea(rol,area);
               
               
           
           
            }
    
            if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}
    
            if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
          
        });

 
}
























