


document.addEventListener("DOMContentLoaded", function () {
  
    
    listarExamenesTomaMuestra();
    
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




// se listan los laboratoriospor Area
function listarExamenesTomaMuestra(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    
    fetch(`/listarExamenesTomaMuestra`, {
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
         // window.location.href = "/";
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

           // console.log(element.factura.contrato.nombre);

          if (element.estado==='En_Toma_de_Muestra'){
           accionBTN =`<a class="badge badge-pill badge-danger" style="font-size: 0.8rem;" 
           href="javascript:gestionarMuestras(${element.id_examen},'${element.observacion}')" title='Finalizar Análisis'>${element.estado.replace(/_/g," ")}
           </a>`;

          }
 
        
   
     // let resultados = element.resultado;
/*
      let tabla=`<table style="border-collapse: collapse; width: 100%;">
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
        let resultados = element.resultado;
        
        resultados.forEach(item=>{
          
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
               
              
                tabla+=`
                  <tr>
                
                  <td>${item.parametro.metodo}</td>
                    <td>${item.parametro.nombre}</td>
                    <td>${item.resultado}</td>
                    <td>${item.estado}</td>
                  </tr>`;    
                  
              

              }


      });
     tabla+='</tbody></table>'

     */



      //console.log(element);

     

        let dato = {
        examen:element.id_examen,
        identificacion : element.factura.paciente.identificacion,
        nombres :element.factura.paciente.nombres.toUpperCase(),
        cups :element.procedimiento.cups.nombre,
        contrato:element.factura.contrato.nombre,
        observacion:element.observacion,
        autoriazacion:`<span class="badge badge-pill badge-success" style="font-size: 0.8rem;">${element.factura.autorizacion}</span>`,  
        area :element.procedimiento.area.nombre.toUpperCase(),
        estado :accionBTN ,
                        }
                        arrayDatos.push(dato)
                        });
   
              var table = $('#tabla_examenes_toma_muestra').DataTable({
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
                           {"data": "contrato"},
                           {"data": "observacion"},
                           {"data": "autoriazacion"},  
                           {"data": "area"},
                           {"data": "estado"}    
                       ]
                        });


                        table.on('search.dt', function() {
                          var searchValue = table.search(); // Obtiene el valor actual del campo de búsqueda
                        // document.getElementById('busqueda').value=searchValue;
                      });
                     

                   //  table.search(document.getElementById('busqueda').value).draw();
        }
        if(data.status==404){ Mensaje.fire({icon: 'warning',title: data.message})}
        if(data.status==500){ Mensaje.fire({icon: 'error',title: data.message})} 
        
    });


   
}






/*
function listarExamenesConfirmadas(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch('/listarExamenesConfirmados', {
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

        if(data.status==403){window.location.href = "/";}
        if(data.status==200){

        data.examenes.forEach(element => {
        accionBTN =` <a class="btn btn-primary" href="javascript:gestionarMuestras(${element.id_examen},'${element.observacion}')" title='Regitrar Muestras'><i class='fas fa-vial'></i></a>`;
        let dato = {
        codigo : element.id_examen,
        identificacion : element.identificacion,
        nombres :element.nombres.toUpperCase(),
        autorizacion :element.autorizacion,
        cups :element.cups,
        observacion :element.observacion,
        estado :element.estado.replace(/_/g, " ").toUpperCase(),
        Accion :accionBTN
                        }
                        arrayDatos.push(dato)
                        });
   
                        var table = $('#tabla_prestaciones_confirmadas').DataTable({
               "bInfo" : false,
               searching: true,
               paging: true,
               autoWidth: false,
               destroy: true,
               responsive: true,
               data: arrayDatos,
               columns: [
                           {"data": "codigo"},
                           {"data": "identificacion"},
                           {"data": "nombres"},
                           {"data": "autorizacion"},
                           {"data": "cups"},
                           {"data": "observacion"},  
                           {"data": "estado"},                     
                           {"data": "Accion"}
                       ]
      
                        });
        }
        if(data.status==404){ Mensaje.fire({icon: 'warning',title: data.message})}
        if(data.status==500){ Mensaje.fire({icon: 'error',title: data.message})} 
        
    });
   
}
*/


function gestionarMuestras(id_prestacion,observacion){
    document.getElementById('id_prestacion').value=id_prestacion;
    document.getElementById('observacion').value=observacion;
    
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 16);
    document.getElementById("fecha_muestra").value = formattedDateTime;
    Frm_muestras.show();



}


function gestionarTomaMuestra(){
    Swal.fire({
        title: 'Se Realizó la Toma de Muestra, ¿desea que continue al area de resultados?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            confirmarTomaMuestra();
        } else if (result.isDenied) {
            noConfirmarTomaMuestra();
        }                       
    })

}


function confirmarTomaMuestra(){

    let id_prestacion= document.getElementById('id_prestacion').value;
  
    let datos= new URLSearchParams();
    datos.append('fecha',document.getElementById('fecha_muestra').value);
    datos.append('observacion',document.getElementById('observacion').value);
  
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

        fetch(`/confirmarTomaMuestra/${id_prestacion}`,
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
        
            if(data.status==200){Mensaje.fire({icon: 'success',title: data.message});
           
            listarExamenesTomaMuestra();
               Frm_muestras.hide();

               
             
            }
    
            if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}
    
            if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
          
        });

}


function noConfirmarTomaMuestra(){

    let id_prestacion= document.getElementById('id_prestacion').value;
  
    let datos= new URLSearchParams();
    datos.append('fecha',document.getElementById('fecha_muestra').value);
    datos.append('observacion',document.getElementById('observacion').value);
  
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

        fetch(`/noConfirmarTomaMuestra/${id_prestacion}`,
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
        
            if(data.status==200){Mensaje.fire({icon: 'success',title: data.message});
           
            listarExamenesTomaMuestra();
               Frm_muestras.hide();

               
             
            }
    
            if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}
    
            if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
          
        });

}
























