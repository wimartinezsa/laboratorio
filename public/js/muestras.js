


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



var table1;
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
      


        if(data.status==403){window.location.href = "/";}
        if(data.status==200){
          //for que recorrelos examenes
        data.examenes.forEach(element => {

           // console.log(element);

          if (element.estado==='En_Toma_de_Muestra'){
           accionBTN =`<a class="badge badge-pill badge-danger" style="font-size: 0.8rem;" 
           href="javascript:gestionarMuestras(${element.id_examen},'${element.observacion}')" title='Finalizar Análisis'>Confirmar Toma de Muestra  </a>`;
         

          }
 
        
       

        let dato = {
        examen:element.id_examen,
        identificacion : element.factura.paciente.identificacion,
        nombres :element.factura.paciente.nombres.toUpperCase(),
        cups :element.procedimiento.cups.nombre,
        contrato:element.factura.contrato.nombre,
        observacion:element.observacion,
        autoriazacion:`<span class="badge badge-pill badge-success" style="font-size: 0.8rem;">${element.factura.autorizacion}</span>`,  
        area :element.procedimiento.area.nombre.toUpperCase(),
        sede:element.factura.sedeId===1? 'Principal':'Isnos',
        estado :accionBTN ,
                        }
                        arrayDatos.push(dato)
                        });
   
               table1 = $('#tabla_examenes_toma_muestra').DataTable({
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
                           {"data": "sede"},
                           {"data": "estado"},
                              { 
                            "data": null, 
                            "render": function(data, type, row) {
                                    return '<input type="checkbox" class="checkbox-examen">';                                  
                            },
                            "orderable": false // Evita que la columna del checkbox sea ordenable
                        }   
                       ]
                        });


                        table1.on('search.dt', function() {
                          var searchValue = table1.search(); // Obtiene el valor actual del campo de búsqueda
                        // document.getElementById('busqueda').value=searchValue;
                      });
                     

                   //  table.search(document.getElementById('busqueda').value).draw();
        }
        if(data.status==404){ Mensaje.fire({icon: 'warning',title: data.message})}
        if(data.status==500){ Mensaje.fire({icon: 'error',title: data.message})} 
        
    });


   
}



function obtenerExamenesSeleccionados() {
    var seleccionados = [];
    let fecha_muestra = document.getElementById('fecha_muestra').value;
    let observacion = document.getElementById('observacion').value;
    
    $('#tabla_examenes_toma_muestra tbody .checkbox-examen:checked').each(function() {
        var row = table1.row($(this).closest('tr')).data();
        // Agregar fecha_muestra y observacion al objeto
        row.fecha_muestra = fecha_muestra;
        row.observacion = observacion;
        seleccionados.push(row);
    });
    return seleccionados;
}





function gestionarMuestras(id_prestacion,observacion){
    document.getElementById('id_prestacion').value=id_prestacion;
    document.getElementById('observacion').value=observacion;
    
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 16);
    document.getElementById("fecha_muestra").value = formattedDateTime;
    Frm_muestras.show();



}

/*
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
*/

function confirmarTomaMuestra(){

   
    let muestras = obtenerExamenesSeleccionados();
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    
        fetch(`/confirmarTomaMuestra/${id_prestacion}`,
            {
               method:'put',
               body: JSON.stringify(muestras),
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
























