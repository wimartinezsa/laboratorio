

listarEmpresasActivas();
//listarTodasFacturasContrato();


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




var Frm_factura = new bootstrap.Modal(document.getElementById('Frm_factura'), {
    keyboard: false
});


var Frm_Prestacion = new bootstrap.Modal(document.getElementById('Frm_Prestacion'), {
    keyboard: false
});

var Frm_estado_prestacion = new bootstrap.Modal(document.getElementById('Frm_estado_prestacion'), {
    keyboard: false
});







function listarFacturasContrato(){
    let id_contrato= document.getElementById('contratos').value;
    document.getElementById('btn_gestion_paciente').style.display = 'block';

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
            accionBTN =`<a class="btn btn-primary" href="javascript:editarFactura(${element.id_factura})" title='Editar Factura'><i class="nav-icon fas fa-microscope"></i></a>
            <a class="btn btn-primary" href="javascript:gestionarAnulacionFactura(${element.id_factura})" title='Anular Factura'><i class="nav-icon fas fa-trash-alt"></i></a>`;
        }
      
        if(element.estado==="Factura_Emitida" || element.estado==="Pendiente_Pago"){
            accionBTN =`<a class="btn btn-primary" href="javascript:editarFactura(${element.id_factura})" title='Editar Factura'><i class="nav-icon fas fa-microscope"></i></a>
                        <a class="btn btn-primary" href="javascript:imprimirFactura(${element.id_factura})" title='Imprimir Factura'><i class="nav-icon fas fa-file-pdf"></i></a>
            `;
        }

        if(element.estado==="Anulado"){
            accionBTN =``;
        }
            

    
  
    let dato = {
        id_factura : element.id_factura,
        fecha :moment(element.fecha).format('LL'),
        identificacion :element.identificacion,
        nombre :element.nombres,
        contrato :element.contrato,
        autorizacion :element.autorizacion,
        total :element.total,
        estado : element.estado.replace(/_/g, " "),
                                            
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
                           {"data": "Accion"}
                       ]
      
                                   });
    

    });


   
}



function gestionarAnulacionFactura(id_factura){

    Swal.fire({
        title: 'Desea anular la factura..',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            anularFactura(id_factura);
        } else if (result.isDenied) {
            Mensaje.fire({
                icon: 'warning',
                title: 'Operación Cancelada'
                });
        }                       
    })
}


function anularFactura(id_factura){
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/anularFactura/${id_factura}`,
        {
            method: 'put',
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
        if(data.status==200){Mensaje.fire({icon: 'success',title: data.message});
            listarFacturasContrato();
        }
        if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}

        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

    });

}

function listarTodasFacturasContrato(){
  
    document.getElementById('btn_gestion_paciente').style.display = 'none';
    fetch(`/factura`, {
        method:'get'
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
    accionBTN =` `;
    
  
    let dato = {
        id_factura : element.id_factura,
        fecha :element.fecha,
        identificacion :element.identificacion,
        nombre :element.primer_nombre,
        contrato :element.contrato,
        empresa :element.empresa,
        total :0,
        estado : element.estado,
                                            
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
                           {"data": "empresa"},
                           {"data": "total"},
                           {"data": "estado"},
                           {"data": "Accion"}
                       ]   
                                   });
    });


   
}



function gestionarPaciente(){
  

   // document.getElementById('id_contrato').value=0;
   // document.getElementById('btn_registrar').style.display = 'block';
   // document.getElementById('btn_actualizar').style.display = 'none';
   limpiarFormularioPaciente();
   
   Frm_factura.show();
   }


function buscarPacienteId(){
    let ident = document.getElementById('identificacion').value;
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    document.getElementById("tabla_busqueda").innerHTML="";
    fetch(`/pacienteIdent/${ident}`, {
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

        
       //data = Array.isArray(data) ? data : [data];
        
        document.getElementById("id_paciente").value=data.id_paciente;
       
        let tabla=`
            <table class="table" style="width: 100%;">
                <thead>
                  <th colspan="4" class="text-center">DATOS DEL PACIENTE</th>
                </thead>
               
        `;

        let edad = calcularEdad (data.fecha_nacimiento);
        tabla +=`<tr><td style="width: 15%;"><b>NOMBRES:</b></td>
                    <td style="width: 35%;">${data.nombres}</td>
                    <td style="width: 15%;"><b>EDAD:</b></td>
                <td style="width: 35%;">${edad.años} Años ${edad.meses} Meses </td></tr> `
        tabla +=`<tr><td style="width: 15%;"><b>TELEFONO:</b></td style="width: 25%;">
        <td>${data.telefono}</td style="width: 25%;"><td><b>EMAIL:</b></td>
        <td style="width: 25%;">${data.email}</td></tr>`;

        tabla +=`<tr><td style="width: 15%;"><b>MUNICIPIO:</b></td >
        <td style="width: 20%;">${data.municipio.nombre}</td>
        <td style="width: 30%;"><b>TIPO DE PACIENTE:</b></td>
        <td style="width: 35%;">${data.tipo_paciente.replace(/_/g, " ")}</td></tr>`;

        tabla +=`<tr><td style="width: 15%;"><b>EPS:</b></td>
        <td style="width: 35%;">${data.eps.nombre}</td>
        <td style="width: 15%;"><b>PAIS ORIGEN:</b></td>
        <td style="width: 35%;">${data.municipio.departamento.pais.nombre}</td></tr>`;
        tabla +=` <tbody>
                </tbody>
            </table>
            <hr>
      <div class="row"> 
        <div class="col-6">
          <label for="message-text" class="col-form-label">Via de Ingreso:</label>
          <select id="via_ingreso"  class="form-control"> 
          <option value="" disabled="true" selected="true">Seleccione una opción</option>
            <option value="DEMANDA_ESPONTANEA">DEMANDA ESPONTANEA</option>
            <option value="DERIVADO_DE_CONSULTA_EXTERNA">DERIVADO DE CONSULTA EXTERNA</option>
            <option value="DERIVADO_DE_URGENCIAS">DERIVADO DE URGENCIAS</option>
            <option value="DERIVADO_DE_HOSPITALZACION">DERIVADO DE HOSPITALZACION</option>
            <option value="DERIVADO_DE_SALA_DE_CIRUGIA">DERIVADO DE SALA DE CIRUGIA</option>
            <option value="DERIVADO_DE_SALA_DE_PARTOS">DERIVADO DE SALA DE PARTOS</option>
            <option value="RECIEN_NACIDO_EN_LA_INSTITUCION">RECIEN NACIDO EN LA INSTITUCION</option>
            <option value="RECIEN_NACIDO_EN_OTRA_INSTITUCION">RECIEN NACIDO EN OTRA INSTITUCION</option>
            <option value="DERIVADO_O_REFERIDO_DE_HOSPITALIZACION_DOMICILIARIA">DERIVADO O REFERIDO DE HOSPITALIZACION DOMICILIARIA</option>
            <option value="DERIVADO_DE_ATENCION_DOMICILIARIA">DERIVADO DE ATENCION DOMICILIARIA</option>
            <option value="DERIVADO_DE_TELEMEDICINA">DERIVADO DE TELEMEDICINA</option>
            <option value="DERIVADO_DE_JORNADA_DE_SALUD">DERIVADO DE JORNADA DE SALUD</option>
            <option value="REFERIDO_DE_OTRA_INSTITUCION">REFERIDO DE OTRA INSTITUCION</option>
            <option value="CONTRAREFERIDO_DE_OTRA_INSTITUCION">CONTRAREFERIDO DE OTRA INSTITUCION</option>
          </select>
        </div>
        <div class="col-6">
          <label for="message-text" class="col-form-label"># Autorización:</label>
          <input type="text" class="form-control" id='autorizacion'
                  style="border: 1px solid rgb(208, 205, 205)"
                  placeholder="Digite la autorización"> 
        </div>
        
      </div>
            `;
        document.getElementById("tabla_busqueda").innerHTML=tabla;
       
    });

}


function listarEmpresasActivas(){
    document.getElementById('btn_gestion_paciente').style.display = 'none';

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/empresaActivas`, {
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
       let html=`<option value='0' selected='true' disabled='true'>Seleccione una Empresa</option>`;
      // console.log(data);
       data.empresas.forEach(element => {
        html +=`<option value=${element.id_empresa}>${element.nombre}</option>`;
       });
       document.getElementById('empresas').innerHTML=html;
    });


}

function listarContratos(){
  let id_empresa= document.getElementById('empresas').value;
  document.getElementById('btn_gestion_paciente').style.display = 'none';

  const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

  fetch(`/contratosActivos/${id_empresa}`, {
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
   
        let html = `<option value='0' selected='true' disabled='true'>Seleccione un Contrato</option>`;
        data.forEach(element => {
            html += `<option value="${element.id_contrato}">${element.nombre}</option>`;
        });
        document.getElementById('contratos').innerHTML = html;
   
})
.catch(error => console.error("Error en la solicitud fetch:", error));




}



function emitirFactura(){
 
    let id_factura=document.getElementById('id_factura').value;
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/emitirFactura/${id_factura}`,
        {
            method: 'put',
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
            Frm_Prestacion.hide();
        }
        if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}

        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

    });
    

}



function registrarFactura(){
    let datos= new URLSearchParams();
   // alert(document.getElementById('via_ingreso').value)
    datos.append('id_contrato',document.getElementById('contratos').value);
    datos.append('pacienteId',document.getElementById('id_paciente').value);
    datos.append('via_ingreso',document.getElementById('via_ingreso').value);
    datos.append('autorizacion',document.getElementById('autorizacion').value);
    
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch('/factura',
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



function limpiarFormularioPaciente(){
    /*
    document.getElementById('id_paciente').value='';
    document.getElementById('nombre').value=''; 
    document.getElementById('edad').value=''; 
    document.getElementById('telefono').value=''; 
    document.getElementById('email').value=''; 
    document.getElementById('municipio').value=''; 
    document.getElementById('tipo').value=''; 
    document.getElementById('eps').value=''; 
    */
  }



function editarFactura(id_factura){
    document.getElementById('id_factura').value=id_factura;
    listarExamenesFactura(id_factura);
    listarServiciosContrato();
    buscarFactura(id_factura);
    Frm_Prestacion.show();
}




function buscarFactura(id_factura){

   
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/buscarFactura/${id_factura}`, {
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

        let tabla=`
            <table class="table" style="width: 100%;">
                <thead>
                  <th colspan="4" class="text-center">DATOS DEL PACIENTE</th>
                </thead>
               
        `;

        let edad = calcularEdad (data[0].paciente.fecha_nacimiento);
        tabla +=`<tr><td style="width: 15%;"><b>NOMBRES:</b></td>
                    <td style="width: 35%;">${data[0].paciente.nombres}</td>
                    <td style="width: 15%;"><b>EDAD:</b></td>
                <td style="width: 35%;">${edad.años} Años, ${edad.meses} Meses </td></tr> `;


              
        tabla +=`<tr><td style="width: 15%;"><b>TELEFONO:</b></td style="width: 25%;">
        <td>${data[0].paciente.telefono}</td style="width: 25%;"><td><b>EMAIL:</b></td>
        <td style="width: 25%;">${data[0].paciente.email}</td></tr>`;
  
        tabla +=`<tr><td style="width: 15%;"><b>MUNICIPIO:</b></td >
        <td style="width: 20%;">${data[0].paciente.municipio.nombre}</td>
        <td style="width: 30%;"><b>TIPO DE PACIENTE:</b></td>
        <td style="width: 35%;">${data[0].paciente.tipo_paciente.replace(/_/g, " ")}</td></tr>`;

        tabla +=`<tr><td style="width: 15%;"><b>EPS:</b></td>
        <td style="width: 35%;">${data[0].paciente.eps.nombre}</td>
       </tr>`;

        
        tabla +=` <tbody>
                </tbody>
            </table>
            <hr>
      <div class="row"> 
        <div class="col-6">
          <label for="message-text" class="col-form-label">Via de Ingreso:</label>
          <select id="via_ingreso2"  class="form-control"> 
          <option value="" disabled="true" selected="true">Seleccione una opción</option>
            <option value="DEMANDA_ESPONTANEA">DEMANDA ESPONTANEA</option>
            <option value="DERIVADO_DE_CONSULTA_EXTERNA">DERIVADO DE CONSULTA EXTERNA</option>
            <option value="DERIVADO_DE_URGENCIAS">DERIVADO DE URGENCIAS</option>
            <option value="DERIVADO_DE_HOSPITALZACION">DERIVADO DE HOSPITALZACION</option>
            <option value="DERIVADO_DE_SALA_DE_CIRUGIA">DERIVADO DE SALA DE CIRUGIA</option>
            <option value="DERIVADO_DE_SALA_DE_PARTOS">DERIVADO DE SALA DE PARTOS</option>
            <option value="RECIEN_NACIDO_EN_LA_INSTITUCION">RECIEN NACIDO EN LA INSTITUCION</option>
            <option value="RECIEN_NACIDO_EN_OTRA_INSTITUCION">RECIEN NACIDO EN OTRA INSTITUCION</option>
            <option value="DERIVADO_O_REFERIDO_DE_HOSPITALIZACION_DOMICILIARIA">DERIVADO O REFERIDO DE HOSPITALIZACION DOMICILIARIA</option>
            <option value="DERIVADO_DE_ATENCION_DOMICILIARIA">DERIVADO DE ATENCION DOMICILIARIA</option>
            <option value="DERIVADO_DE_TELEMEDICINA">DERIVADO DE TELEMEDICINA</option>
            <option value="DERIVADO_DE_JORNADA_DE_SALUD">DERIVADO DE JORNADA DE SALUD</option>
            <option value="REFERIDO_DE_OTRA_INSTITUCION">REFERIDO DE OTRA INSTITUCION</option>
            <option value="CONTRAREFERIDO_DE_OTRA_INSTITUCION">CONTRAREFERIDO DE OTRA INSTITUCION</option>
          </select>
        </div>
        <div class="col-6">
          <label for="message-text" class="col-form-label"># Autorización:</label>
          <input type="text" class="form-control" id='autorizacion2'
                  style="border: 1px solid rgb(208, 205, 205)"
                  placeholder="Digite la autorización"> 
        </div>

         <div class="col-12 text-start mt-3">
              <button type="button" id="btn_actualizaFactura" class="btn btn-success" onclick="actualizarFactura()">Actualizar</button>
         </div>

      </div>
     

            `;
        document.getElementById("tabla_factura").innerHTML=tabla;
       
    });




}



function actualizarFactura(){
    let datos= new URLSearchParams();
    let id_factura=document.getElementById('id_factura').value;
    datos.append('via_ingreso',document.getElementById('via_ingreso2').value);
    datos.append('autorizacion',document.getElementById('autorizacion2').value);
    
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/actualizarFactura/${id_factura}`,
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
            listarFacturasContrato();
        }
        if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}

        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

    });


}








function listarServiciosContrato(){
    let id_contrato= document.getElementById('contratos').value;

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/servicioContrato/${id_contrato}`, {
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
          let html = `<option value='0' selected='true' disabled='true'>Seleccione un Servicio Contratado</option>`;
          data.forEach(element => {
              html += `<option value="${element.id_servicio}">${element.servicio}</option>`;
          });
          document.getElementById('servicios').innerHTML = html;  
  })
  .catch(error => console.error("Error en la solicitud fetch:", error));
  
  
  
  
  }


function listarProcedimientoContratados(){
    let servicios= document.getElementById('servicios').value;
    let id_contrato= document.getElementById('contratos').value;

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/procedimientosContratados/${servicios}/${id_contrato}`, {
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
          let html = `<option value='0' selected='true' disabled='true'>Seleccione un procedimiento</option>`;
          data.forEach(element => {
              html += `<option value="${element.id_procedimiento}">${element.nombre} <${element.precio}></option>`;
          });
          document.getElementById('procedimiento_acordados').innerHTML = html;  
  })
  .catch(error => console.error("Error en la solicitud fetch:", error));
  
  }



 function agregarExamenFactura(){

    
    let id_factura= document.getElementById('id_factura').value;
    const procedimiento_acordado = document.getElementById("procedimiento_acordados");
    let id_procedimiento=procedimiento_acordado.value;
    
    const textoSeleccionado = procedimiento_acordado.options[procedimiento_acordado.selectedIndex].text;
 // se obitiene el precio del texto selccionado en el select

    const valor = textoSeleccionado.match(/<(\d+)>/)?.[1];

    let datos= new URLSearchParams();
    datos.append('id_procedimiento',id_procedimiento);
    datos.append('id_factura',id_factura);
    datos.append('precio',valor)
    
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch('/examen',
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
    .then(data=>{
      
        if(data.status==403){window.location.href = "/";}
        
        if(data.status==200){Mensaje.fire({icon: 'success',title: data.message});
        listarExamenesFactura(id_factura);
        listarFacturasContrato();
        }
        if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}

        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
    
    });

 }
  
 
  

 function listarExamenesFactura(id_factura){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/examenFactura/${id_factura}`, {
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
          let html =``;
          data.forEach(element => {
            html += `<tr>`;

            html += `<td>${element.id_examen}</td>`;
            html += `<td>${element.servicio}</td>`;
            html += `<td>${element.cups}</td>`;
            html += `<td>${element.procedimiento}</td>`;
            html += `<td>${element.cantidad}</td>`;
            html += `<td>${element.precio}</td>`;
            html += `<td>${element.contrato}</td>`;
            html += `<td>${element.estado.replace(/_/g, " ")}</td>`;
            html += `<td> <a class="btn btn-danger" href="javascript:eliminarExamenFactura(${element.id_examen})" title='Eliminar Examen'><i class="nav-icon fas fa-trash"></i></a>`;
            html += `&nbsp<a class="btn btn-success" href="javascript:gestionarEstadoExamenFactura(${element.id_examen})" title='Cambiar Estado Examen'><i class="nav-icon fas fa-vial"></i></a></td>`;
            html += `</tr>`;
          });
         
          document.getElementById('tabla_examenes_factura').innerHTML = html;  

  })
  .catch(error => console.error("Error en la solicitud fetch:", error));
  
  }


  

function gestionarEstadoExamenFactura(id_prestacion){
    
    document.getElementById('id_prestacion').value=id_prestacion
   const now = new Date();
   const formattedDateTime = now.toISOString().slice(0, 16);
   document.getElementById("fecha_muestra").value = formattedDateTime;

    
    Frm_estado_prestacion.show();

}



function confirmarCambiarEstadoExamen(){

    Swal.fire({
        title: 'Se confirma cambiar el estado del Examen',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            cambiarEstadoExamen();
        } else if (result.isDenied) {
            Mensaje.fire({
                icon: 'warning',
                title: 'No se realizan cambios en el estado'
                });
        }                       
    })
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
                Frm_estado_prestacion.hide();

               
             
            }
    
            if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}
    
            if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
          
        });





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
        
            if(data.status==200){Mensaje.fire({icon: 'success',title: data.message});
                listarExamenesFactura(id_factura);
                listarFacturasContrato();
            }
    
            if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}
    
            if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
          
        });
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












