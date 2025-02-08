



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



listarContratosActivos();



async function buscarExamenesDelPerodo(){

   await listarCuentasPendientePago();
   await listarCuentasCobradas();
   await listarCuentasPagadas();
}



function listarContratosActivos(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    document.getElementById('contratos').innerHTML = '';  
    fetch(`/listarContratosActivos`, {
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
            
             
              let html=`<option value='0'>Seleccione una opción</option>`;
               data.forEach(element => {
               html+=`<option value='${element.id_contrato}'>${element.empresa} => ${element.nombre} </option>`;
               });   
               document.getElementById('contratos').innerHTML = html;  
              
           });
}






var table1;
function listarCuentasPendientePago(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    let id_contrato= document.getElementById('contratos').value;
    let fecha_inicio= document.getElementById('fecha_inicio').value;
    let fecha_fin= document.getElementById('fecha_fin').value;

 
    fetch(`/listarCuentasPendientePago/${id_contrato}/${fecha_inicio}/${fecha_fin}`, {
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
        accionBTN =` <a class="btn btn-primary" href="javascript:editarEmpresa(${element.id_examen})" title='Editar Empresa'><i class='fas fa-edit'></i></a>`;

            //moment(element.fecha).format('DD-MM-YYYY HH:mm:ss')

        let edad= calcularEdad(element.factura.paciente.fecha_nacimiento);
        let dato = {
        id : element.id_examen,
        identificacion : element.factura.paciente.identificacion,
        nombre : element.factura.paciente.nombres,
        fecha_nacimiento : moment(element.factura.paciente.fecha_nacimiento).format('DD-MM-YYYY'),
        edad :`${edad.años} Años, ${edad.meses} Meses`,
        telefono : element.factura.paciente.telefono,
        identificacion : element.factura.paciente.identificacion,
        examen : element.procedimiento.cups.nombre,
        contrato : element.factura.contrato.nombre,
        precio : element.procedimiento.acuerdo[0].precio,
        autorizacion : element.factura.autorizacion,
        fecha :moment(element.factura.fecha).format('DD-MM-YYYY'),
        estado: element.estado_pago,
        Accion :accionBTN
                        }
                        arrayDatos.push(dato)
                        });
   
             table1 = $('#tabla_cuenta_pendiente').DataTable({
               "bInfo" : false,
               searching: true,
               paging: true,
               autoWidth: false,
               destroy: true,
               responsive: true,
               data: arrayDatos,
               columns: [
                           {"data": "id"},
                           {"data": "identificacion"},
                           {"data": "nombre"},
                           {"data": "fecha_nacimiento"},
                           {"data": "edad"},
                           {"data": "telefono"},
                           {"data": "examen"},
                           {"data": "fecha"},
                           {"data": "contrato"},
                           {"data": "precio"},
                           {"data": "autorizacion"}, 
                           {"data": "estado"}, 
                           { 
                            "data": null, 
                            "render": function(data, type, row) {
                                if(data.estado==='Pendiente_Pago'){
                                    return '<input type="checkbox" class="checkbox-pendiente">';
                                }else return '';
                                
                            },
                            "orderable": false // Evita que la columna del checkbox sea ordenable
                        }
                       ]
                       
                        });

      

    });
   
}


$('#btn_seleccionar_pendientes').on('click', function() {
    var checkboxes = $('.checkbox-pendiente');
    if (checkboxes.filter(':checked').length === checkboxes.length) {
        checkboxes.prop('checked', false);
        $(this).text('Seleccionar Todos');
    } else {
        checkboxes.prop('checked', true);
        $(this).text('Deseleccionar Todos');
    } 
});





function obtenerSeleccionadosPendiente() {
    var seleccionados = [];
    
    $('#tabla_cuenta_pendiente tbody .checkbox-pendiente:checked').each(function() {
        var row = table1.row($(this).closest('tr')).data();
        seleccionados.push(row);
    });
    return seleccionados;
}




function confirmarRegistroCuentaCobro(){
    Swal.fire({
        title: 'Desea registrar los examenes en estado de cobro...',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            registrarCuentaCobro();
        } else if (result.isDenied) {
            Mensaje.fire({
                icon: 'warning',
                title: 'Operación Cancelada'
                });
        }                       
    })
        

}




function registrarCuentaCobro(){
    var cuenta = obtenerSeleccionadosPendiente();
    
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    
    
    fetch('/registrarCuentaCobro', {
        method:'put',
        body: JSON.stringify(cuenta),
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
            listarCuentasPendientePago();
            listarCuentasCobradas();
            listarCuentasPagadas();
          
            //listarContratosActivos();
            Mensaje.fire({icon: 'success',title: data.message});

    });


}




var table2;
function listarCuentasCobradas(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    let id_contrato= document.getElementById('contratos').value;
    let fecha_inicio= document.getElementById('fecha_inicio').value;
    let fecha_fin= document.getElementById('fecha_fin').value;

 
    fetch(`/listarCuentasCobradas/${id_contrato}/${fecha_inicio}/${fecha_fin}`, {
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
        accionBTN =` <a class="btn btn-primary" href="javascript:editarEmpresa(${element.id_examen})" title='Editar Empresa'><i class='fas fa-edit'></i></a>`;

            //moment(element.fecha).format('DD-MM-YYYY HH:mm:ss')

        let edad= calcularEdad(element.factura.paciente.fecha_nacimiento);
        let dato = {
        id : element.id_examen,
        identificacion : element.factura.paciente.identificacion,
        nombre : element.factura.paciente.nombres,
        fecha_nacimiento : moment(element.factura.paciente.fecha_nacimiento).format('DD-MM-YYYY'),
        edad :`${edad.años} Años, ${edad.meses} Meses`,
        telefono : element.factura.paciente.telefono,
        identificacion : element.factura.paciente.identificacion,
        examen : element.procedimiento.cups.nombre,
        contrato : element.factura.contrato.nombre,
        precio : element.procedimiento.acuerdo[0].precio,
        autorizacion : element.factura.autorizacion,
        fecha :moment(element.factura.fecha).format('DD-MM-YYYY'),
        estado: element.estado_pago,
        Accion :accionBTN
                        }
                        arrayDatos.push(dato)
                        });
   
             table2 = $('#tabla_cuenta_cobradas').DataTable({
                dom: 'Bfrtip', // Agrega botones en la interfaz
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fas fa-file-excel"></i> Exportar a Excel',
                        className: 'btn btn-info', // Clase CSS opcional
                        title: 'Reporte de Cuentas', // Título del archivo
                        exportOptions: {
                            columns: ':visible' // Exporta solo columnas visibles
                        }
                    }
                ],
               "bInfo" : false,
               searching: true,
               paging: true,
               autoWidth: false,
               destroy: true,
               responsive: true,
               data: arrayDatos,
               columns: [
                           {"data": "id"},
                           {"data": "identificacion"},
                           {"data": "nombre"},
                           {"data": "fecha_nacimiento"},
                           {"data": "edad"},
                           {"data": "telefono"},
                           {"data": "examen"},
                           {"data": "fecha"},
                           {"data": "contrato"},
                           {"data": "precio"},
                           {"data": "autorizacion"}, 
                           {"data": "estado"},
                           { 
                            "data": null, 
                            "render": function(data, type, row) {
                                if(data.estado==='Cobro'){
                                    return '<input type="checkbox" class="checkbox-pagado">';
                                }else return '';
                                
                            },
                            "orderable": false // Evita que la columna del checkbox sea ordenable
                        }
                       ]
                       
                        });

      

    });
   
}


function obtenerSeleccionadosPagados() {
    var seleccionados = [];
    
    $('#tabla_cuenta_cobradas tbody .checkbox-pagado:checked').each(function() {
        var row = table2.row($(this).closest('tr')).data();
        seleccionados.push(row);
    });
    return seleccionados;
}


$('#btn_seleccionar_pagos').on('click', function() {
    var checkboxes = $('.checkbox-pagado');
    if (checkboxes.filter(':checked').length === checkboxes.length) {
        checkboxes.prop('checked', false);
        $(this).text('Seleccionar Todos');
    } else {
        checkboxes.prop('checked', true);
        $(this).text('Deseleccionar Todos');
    } 
});


function confirmarRegistroCuentaPago(){

    Swal.fire({
        title: 'Desea registrar los examenes en estado pagado...',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            registrarCuentaPagada();
        } else if (result.isDenied) {
            Mensaje.fire({
                icon: 'warning',
                title: 'Operación Cancelada'
                });
        }                       
    })

}



function registrarCuentaPagada(){
    var cuenta = obtenerSeleccionadosPagados();
    
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    
    
    fetch('/registrarCuentaPagada', {
        method:'put',
        body: JSON.stringify(cuenta),
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
            listarCuentasPendientePago();
            listarCuentasCobradas();
            listarCuentasPagadas();
          
            //listarContratosActivos();
            Mensaje.fire({icon: 'success',title: data.message});

    });


}









var table3;
function listarCuentasPagadas(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    let id_contrato= document.getElementById('contratos').value;
    let fecha_inicio= document.getElementById('fecha_inicio').value;
    let fecha_fin= document.getElementById('fecha_fin').value;

 
    fetch(`/listarCuentasPagadas/${id_contrato}/${fecha_inicio}/${fecha_fin}`, {
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
        accionBTN =` <a class="btn btn-primary" href="javascript:editarEmpresa(${element.id_examen})" title='Editar Empresa'><i class='fas fa-edit'></i></a>`;

            //moment(element.fecha).format('DD-MM-YYYY HH:mm:ss')

        let edad= calcularEdad(element.factura.paciente.fecha_nacimiento);
        let dato = {
        id : element.id_examen,
        identificacion : element.factura.paciente.identificacion,
        nombre : element.factura.paciente.nombres,
        fecha_nacimiento : moment(element.factura.paciente.fecha_nacimiento).format('DD-MM-YYYY'),
        edad :`${edad.años} Años, ${edad.meses} Meses`,
        telefono : element.factura.paciente.telefono,
        identificacion : element.factura.paciente.identificacion,
        examen : element.procedimiento.cups.nombre,
        contrato : element.factura.contrato.nombre,
        precio : element.procedimiento.acuerdo[0].precio,
        autorizacion : element.factura.autorizacion,
        fecha :moment(element.factura.fecha).format('DD-MM-YYYY'),
        estado: element.estado_pago,
        Accion :accionBTN
                        }
                        arrayDatos.push(dato)
                        });
   
              table3 = $('#tabla_cuenta_pagadas').DataTable({
                dom: 'Bfrtip', // Agrega botones en la interfaz
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fas fa-file-excel"></i> Exportar a Excel',
                        className: 'btn btn-info mt-2', // Clase CSS opcional
                        title: 'Reporte de Cuentas', // Título del archivo
                        exportOptions: {
                            columns: ':visible' // Exporta solo columnas visibles
                        }
                    }
                ],
               "bInfo" : false,
               searching: true,
               paging: true,
               autoWidth: false,
               destroy: true,
               responsive: true,
               data: arrayDatos,
               columns: [
                           {"data": "id"},
                           {"data": "identificacion"},
                           {"data": "nombre"},
                           {"data": "fecha_nacimiento"},
                           {"data": "edad"},
                           {"data": "telefono"},
                           {"data": "examen"},
                           {"data": "fecha"},
                           {"data": "contrato"},
                           {"data": "precio"},
                           {"data": "autorizacion"}, 
                           {"data": "estado"}
                       ]
                       
                        });

      

    });
   
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



















