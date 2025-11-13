



listarPacientes();




var Frm_factura = new bootstrap.Modal(document.getElementById('Frm_factura'), {
    keyboard: false
});


var Frm_estado_examen = new bootstrap.Modal(document.getElementById('Frm_estado_examen'), {
    keyboard: false
});



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



  moment.defineLocale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    })







function autoCompletadoPacientes(){
    const selectElement = document.getElementById('pacientes');
    const choices = new Choices(selectElement, {
      searchEnabled: true,
      placeholderValue: 'Escribe el nombre del pacientera buscar...',
      shouldSort: false
    });
}


function autoCompletadoContrato(){
    const selectElement = document.getElementById('contratos');
    const choices = new Choices(selectElement, {
      searchEnabled: true,
      placeholderValue: 'Escribe el nombre del contrato a buscar...',
      shouldSort: false
    });
}


 
function autoCompletadoProcedimientos(){
    const selectElement = document.getElementById('procedimiento_acordados');
    const choices = new Choices(selectElement, {
      searchEnabled: true,
      placeholderValue: 'Escribe para buscar...',
      shouldSort: false
    });
}





function listarPacientes(){
  document.getElementById('btn_gestion_factura').style.display = 'none';

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/paciente`, {
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
       let html=``;
      // console.log(data);
       data.forEach(element => {
        html +=`<option value=${element.id_paciente}>${element.nombres} - ${element.identificacion}</option>`;
       });
       document.getElementById('pacientes').innerHTML=html;
       autoCompletadoPacientes();
    });


}

function listarContratos(){
 
  const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

  fetch(`/contratosActivos`, {
    method: 'get',
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
    // Verifica si 'data' es un arreglo antes de usar forEach
   
        let html = ``;
        data.forEach(element => {
            html += `<option value="${element.id_contrato}">${element.nombre}</option>`;
        });
        
        document.getElementById('contratos').innerHTML = html;
        autoCompletadoContrato();
   
})
.catch(error => console.error("Error en la solicitud fetch:", error));




}


function listarFacturasContrato(){

    let id_contrato= document.getElementById('contratos').value;
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/facturaContrato/${id_contrato}`, {
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
       
       
      
        


    data.forEach(element => {

        if(element.estado==="Pendiente_Emision"){
            accionBTN =`<a class="btn btn-primary" href="javascript:buscarFactura(${element.id_factura})" title='Editar Factura'><i class="nav-icon fas fa-microscope"></i></a>
            <a class="btn btn-primary" href="javascript:gestionarAnulacionFactura(${element.id_factura})" title='Anular Factura'><i class="nav-icon fas fa-trash-alt"></i></a>`;
        }
      
        if(element.estado==="Factura_Emitida" || element.estado==="Pendiente_Pago" || element.estado==="Pagado"){
            accionBTN =`<a class="btn btn-primary" href="javascript:buscarFactura(${element.id_factura})" title='Editar Factura'><i class="nav-icon fas fa-microscope"></i></a>
                        <a class="btn btn-primary" href="javascript:imprimirFactura(${element.id_factura})" title='Imprimir Factura'><i class="nav-icon fas fa-file-pdf"></i></a>
            `;
        }

        if(element.estado==="Anulado"){
            accionBTN =``;
        }
            

    
  
    let dato = {
        id_factura : element.id_factura,
        fecha :moment.utc(element.fecha).format("YYYY-MM-DD"),
        identificacion :element.identificacion,
        nombre :element.nombres,
        contrato :element.contrato,
        autorizacion :element.autorizacion,
        total :element.total,
        estado : element.estado.replace(/_/g, " "),   
        sede: element.sede,                                
        Accion :accionBTN
   }
       arrayDatos.push(dato)
       });
        
    let table = $('#tabla_facturas').DataTable({
               "bInfo" : false,
               searching: true,
               paging: true,
               autoWidth: false,
               destroy: true,
               responsive: true,
               data: arrayDatos,
               columns: [
                           {"data": "id_factura"},
                           {"data": "fecha"},
                           {"data": "identificacion"},
                           {"data": "nombre"},
                           {"data": "contrato"},
                           {"data": "autorizacion"},
                           {"data": "total"},
                           {"data": "estado"},
                           {"data": "sede"},
                           {"data": "Accion"}
                       ]
      
                                   });
    

    });


   
}

async function seleccionarContrato(){
    await listarFacturasContrato();
    await listarProcedimientoContratados();
    
    
    document.getElementById('btn_gestion_factura').style.display = 'block';

}



async function generarFactura(){
   
    let id_contrato= document.getElementById('contratos').value;
    let id_paciente= document.getElementById('pacientes').value;
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
     
    

   await  fetch('/generarFactura/'+id_contrato+'/'+id_paciente, {
        
            method: 'GET',
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
    .then(async data=>{
      
       // console.log(data);
        if(data.status==403){window.location.href = "/";}
        
        if(data.status==200){
                    document.getElementById('id_factura').value = data.factura.id_factura? data.factura.id_factura : '';
                    document.getElementById('autorizacion').value = data.factura.autorizacion ? data.factura.autorizacion : '';
                    document.getElementById('identificacion').value = data.factura.paciente.identificacion? data.factura.paciente.identificacion : '';
                    document.getElementById('nombres').value = data.factura.paciente.nombres ;
                    
                   
                  await listarExamenesFactura(data.factura.id_factura);
     
                    await Frm_factura.show();
                    //Mensaje.fire({icon: 'warning',title: data.message});
        }
        if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}

        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

    });



    
}




function listarProcedimientoContratados(){

    let id_contrato= document.getElementById('contratos').value;

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/procedimientosContratados/${id_contrato}`, {
      method: 'get',
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
          let html = ``;
          data.forEach(element => {
              html += `<option value="${element.id_procedimiento}">${element.nombre} <${element.precio}></option>`;
          });
          document.getElementById('procedimiento_acordados').innerHTML = html;  

          autoCompletadoProcedimientos();



  })
  .catch(error => console.error("Error en la solicitud fetch:", error));
  
  }



 async function agregarExamenFactura(){

    
    const id_factura= document.getElementById('id_factura').value;
    await listarExamenesFactura(id_factura);
    const cod_autorizacion= document.getElementById('autorizacion').value;
    
    const procedimiento_acordado = document.getElementById("procedimiento_acordados").value;
    const precio = document.getElementById("precio").value;

    
    let datos= new URLSearchParams();
    datos.append('id_procedimiento',procedimiento_acordado);
    datos.append('id_factura',id_factura);
    datos.append('cod_autorizacion',cod_autorizacion);
    datos.append('precio',precio)
    
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    await fetch('/examen',
        {
            method: 'POST',
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
    .then(async data=>{
      
        if(data.status==403){window.location.href = "/";}
        
        if(data.status==200){
            Mensaje.fire({icon: 'success',title: data.message});

            
        await listarExamenesFactura(id_factura);
        await listarFacturasContrato();
        }
        if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}

        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
    
    });

 }



  function obtenerPrecio(){
    
       const select = document.getElementById('procedimiento_acordados');
       const textoSeleccionado = select.options[select.selectedIndex].text;
       precio = textoSeleccionado.match(/<(\d+)>/);
       document.getElementById('precio').value=precio[1];

    }




function listarExamenesFactura(id_factura) {
  const token = localStorage.getItem('token'); 

  fetch(`/examenFactura/${id_factura}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      window.location.href = "/";
    }
  })
  .then(data => {
   

  let html=``;

    // Construir los datos
        data.forEach(element => {
            html += `<tr>`;
            html += `<td>${element.id_examen}</td>`;
            html += `<td>${element.procedimiento}</td>`;
            html += `<td>${element.cantidad}</td>`;
            html += `<td>${element.precio}</td>`;
            html += `<td>${element.contrato}</td>`;
            html += `<td>${element.estado.replace(/_/g, ' ')}</td>`;
            html += `<td>
                                <a class="btn btn-danger" href="javascript:eliminarExamenFactura(${element.id_examen})" title="Eliminar Examen">
                                    <i class="nav-icon fas fa-trash"></i>
                                </a>
                                <a class="btn btn-success" href="javascript:gestionarEstadoExamenFactura(${element.id_examen})" title="Cambiar Estado Examen">
                                    <i class="nav-icon fas fa-vial"></i>
                                </a>
                            </td>`;
            html += `</tr>`;
        });

        // Insertar filas en el tbody
        document.getElementById("tabla_examenes_factura").innerHTML = html;


  })
  .catch(error => console.error("Error al listar exámenes:", error));
}





  function eliminarExamenFactura(id_examen){
    let id_factura= document.getElementById('id_factura').value;

       const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
                fetch(`/examenFactura/${id_examen}`,
                    {
                        method: 'DELETE',
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
                        //Mensaje.fire({icon: 'success',title: data.message});
                        listarExamenesFactura(id_factura);
                        listarFacturasContrato();
                    }
            
                    if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}
            
                    if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

                });

    
    }



function gestionarEstadoExamenFactura(id_prestacion){
    
    document.getElementById('id_prestacion').value=id_prestacion
   const now = new Date();
   const formattedDateTime = now.toISOString().slice(0, 16);
   document.getElementById("fecha_muestra").value = formattedDateTime;

    
    Frm_estado_examen.show();

}





function  cambiarEstadoExamen(){
    let id_prestacion= document.getElementById('id_prestacion').value;
    let id_factura= document.getElementById('id_factura').value;
    
    let datos= new URLSearchParams();
    datos.append('fecha',document.getElementById('fecha_muestra').value);
    datos.append('observacion',document.getElementById('observacion').value);
    datos.append('estado_muestra',document.getElementById('estado_muestra').value);
    
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

        fetch(`/cambiarEstadoExamen/${id_prestacion}`,
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
                listarExamenesFactura(id_factura);
                Frm_estado_examen.hide();
            }
    
            if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}
    
            if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
          
        });





}



function emitirFactura(){
 
    let id_factura=document.getElementById('id_factura').value;
    let autorizacion= document.getElementById('autorizacion').value;
    
    let datos= new URLSearchParams();
    datos.append('autorizacion',document.getElementById('autorizacion').value);
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/emitirFactura/${id_factura}`,
        {
            method: 'put',
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
            listarFacturasContrato();
            Frm_factura.hide();
        }
        if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}

        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

    });
    

}


async function buscarFactura(id_factura){


    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/buscarFactura/${id_factura}`, {
      method: 'get',
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
  .then(async data => {
        
       console.log(data);
        if(data.status==403){window.location.href = "/";}
        
        if(data.status==200){
            
                    document.getElementById('id_factura').value = data.factura.id_factura? data.factura.id_factura : '';
                    document.getElementById('autorizacion').value = data.factura.autorizacion ? data.factura.autorizacion : '';
                    document.getElementById('identificacion').value = data.factura.paciente.identificacion? data.factura.paciente.identificacion : '';
                    document.getElementById('nombres').value = data.factura.paciente.nombres ;
                    
                   
                 // await listarExamenesFactura(data.factura.id_factura);
     
                   // await Frm_factura.show();
                    //Mensaje.fire({icon: 'warning',title: data.message});
        }
        if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}

        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}


  })
  .catch(error => console.error("Error en la solicitud fetch:", error));






    await listarExamenesFactura(id_factura)
    await Frm_factura.show();
}


function imprimirFactura(id_factura){
    Facturar(id_factura);
}


  
 
  



  














function calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
    
        let edadAnios = hoy.getFullYear() - nacimiento.getFullYear();
        let meses = hoy.getMonth() - nacimiento.getMonth();
        let dias = hoy.getDate() - nacimiento.getDate();
    
        // Ajustar los años y meses si el mes actual es anterior al mes de nacimiento
        if (meses < 0 || (meses === 0 && dias < 0)) {
            edadAnios--;
            meses += 12; // Ajustar el cálculo de meses
        }
    
        // Ajustar días si es necesario
        if (dias < 0) {
            const diasDelMesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
            dias += diasDelMesAnterior;
            meses--;
        }
    
        // Asegurar que los meses sean positivos
        if (meses < 0) {
            meses += 12;
        }
    
        return {
            años: edadAnios,
            meses: meses
        };
    }














