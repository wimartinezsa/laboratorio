

listarContratos();



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







var Frm_contrato = new bootstrap.Modal(document.getElementById('Frm_contrato'), {
    keyboard: false
});


var Frm_acuerdos = new bootstrap.Modal(document.getElementById('Frm_acuerdos'), {
    keyboard: false
});





$(function () {
    //Initialize Select2 Elements
    $('.select2').select2()

    //Initialize Select2 Elements
    $('.select2bs4').select2({
      theme: 'bootstrap4'
    })

});


function listarContratos(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch('/contrato', {
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
    accionBTN =` <a class="btn btn-primary" href="javascript:editarContrato(${element.id_contrato})" title='Editar Contrato'><i class="nav-icon fas fa-edit"></i></a>
    <a class="btn btn-success" href="javascript:gesitonarAcuerdos(${element.id_contrato},'${element.nombre}')" title='Agregar Acuerdos'><i class="nav-icon fas fa-file-alt"></i></a>`;
    estadoBTN =  element.estado=='Activo' ? 
    ` <a class="btn btn-success" href="javascript:activarContrato(${element.id_contrato},'Inactivo')" title='Desactivar Acuerdo'><i class="nav-icon fas fa-times-circle"></i></a>`
  :
  `<a class="btn btn-danger" href="javascript:activarContrato(${element.id_contrato},'Activo')" title='Activar Acuerdo'><i class="nav-icon fas fa-check-circle"></i></a>`;
    
    let dato = {
        id_contrato : element.id_contrato,
        nombre :element.nombre,
        fecha_inicio :moment(element.fecha_inicio).format('LL'),
        fecha_fin :moment(element.fecha_fin).format('LL'),
        empresa :element.empresa,
        municipio :element.municipio,
        estado : estadoBTN,
                                            
       Accion :accionBTN
   }
       arrayDatos.push(dato)
       });
   
           var table = $('#tabla_contratos').DataTable({
               "bInfo" : false,
               searching: true,
               paging: true,
               autoWidth: false,
               destroy: true,
               responsive: true,
               data: arrayDatos,
               columns: [
                           {"data": "id_contrato"},
                           {"data": "nombre"},
                           {"data": "empresa"},
                           {"data": "fecha_inicio"},
                           {"data": "fecha_fin"},
                           {"data": "municipio"},
                           {"data": "estado"},
                           {"data": "Accion"}
                       ]
      
                                   });
    });
   
}







async function gestionarContratos(){
  
    await  limpiarFormularioContrato();
    await listarEmpresas();
    document.getElementById('id_contrato').value=0;
    document.getElementById('btn_registrar').style.display = 'block';
    document.getElementById('btn_actualizar').style.display = 'none';

   await Frm_contrato.show();
   }


async function gesitonarAcuerdos(id_contrato,nom_comtrato){
  // await  listarServicios();
  await listarProcedimientos();

    document.getElementById('id_contrato2').value=id_contrato;
    document.getElementById('btn_registrar').style.display = 'block';
    document.getElementById('btn_actualizar').style.display = 'none';

    document.getElementById('btn_registrar_acuerdo').style.display = 'block';
    document.getElementById('btn_actualizar_acuerdo').style.display = 'none';
    

    await listarAcuerdos(id_contrato);

    document.getElementById('Frm_acuerdos_title').innerHTML=`Tarifa del contrato - ${nom_comtrato}` ;
   await Frm_acuerdos.show();
   }




function listarEmpresas(){
  
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
            
              let html=`<option value='0'>Seleccione una Empresa</option>`;
               data.empresas.forEach(element => {
               html+=`<option value='${element.id_empresa}'> ${element.nombre}</option>`;
               });   
               document.getElementById('empresas').innerHTML = html;  
           });
}



function registrarContrato(){

    let datos= new URLSearchParams();

    datos.append('nombre',document.getElementById('nombre_contrato').value);
    datos.append('empresaId',document.getElementById('empresas').value);
    datos.append('fecha_inicio',document.getElementById('fecha_inicio').value);
    datos.append('fecha_fin',document.getElementById('fecha_fin').value);
 
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta


    fetch('/contrato',
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
            listarContratos();
            Frm_contrato.hide();
        }
 
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

    
    });

}

function limpiarFormularioContrato(){
  document.getElementById('nombre_contrato').value='';
  document.getElementById('empresas').value='';
  document.getElementById('fecha_inicio').value='';
  document.getElementById('fecha_fin').value='';

}



async function  editarContrato(id_contrato){
   await listarEmpresas();
    document.getElementById('id_contrato').value=id_contrato;
    
    document.getElementById('btn_registrar').style.display = 'none';
    document.getElementById('btn_actualizar').style.display = 'block';
    await buscarContratoId(id_contrato);
    await Frm_contrato.show();
}


function buscarContratoId(id_contrato){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    fetch(`/contrato/${id_contrato}`,
        {
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
    .then(data=>{
      

        let anio='';
        let mes='';
        let dia='';

        document.getElementById('nombre_contrato').value= data.nombre;
        document.getElementById('empresas').value=data.empresaId;

        const fecha_inicio = new Date(data.fecha_inicio);
         anio = fecha_inicio.getFullYear();
         mes = String(fecha_inicio.getMonth() + 1).padStart(2, '0'); 
         dia = String(fecha_inicio.getDate()).padStart(2, '0');

        document.getElementById('fecha_inicio').value=`${anio}-${mes}-${dia}`;

        const fecha_fin = new Date(data.fecha_fin);
        anio = fecha_fin.getFullYear();
        mes = String(fecha_fin.getMonth() + 1).padStart(2, '0'); 
        dia = String(fecha_fin.getDate()).padStart(2, '0');
        document.getElementById('fecha_fin').value=`${anio}-${mes}-${dia}`;
    });


}


function actualizarContrato(){

    let datos= new URLSearchParams();

    let id_contrato= document.getElementById('id_contrato').value;

    datos.append('nombre',document.getElementById('nombre_contrato').value);
    datos.append('empresaId',document.getElementById('empresas').value);
    datos.append('fecha_inicio',document.getElementById('fecha_inicio').value);
    datos.append('fecha_fin',document.getElementById('fecha_fin').value);
  
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
   
    fetch(`/contrato/${id_contrato}`,
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
            listarContratos();
            Frm_contrato.hide();
        }
 
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

    });


}
 


function activarContrato(id_acuerdo,estado){

    
    let datos= new URLSearchParams();
    datos.append('estado',estado);

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/contrato/${id_acuerdo}`,
        {
            method: 'delete',
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
            listarContratos(id_contrato);
        }

        if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}
 
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
       
    });

}



// -------- Modulo de Acuerdos ---------------

function listarAcuerdos(id_contrato){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/acuerdo/${id_contrato}`, {
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

    estadoBTN =  element.estado=='Activo' ? 
                ` <a class="btn btn-success" href="javascript:activarAcuerdo(${element.id_acuerdo},'Inactivo')" title='Desactivar Servicio'><i class="nav-icon fas fa-times-circle"></i></a>
                  <a class="btn btn-success" href="javascript:buscarAcuerdo(${element.id_acuerdo})" title='Actualizar Acuerdo'><i class="nav-icon fas fa-edit"></i></a>
               
                `
                :
                `<a class="btn btn-danger" href="javascript:activarAcuerdo(${element.id_acuerdo},'Activo')" title='Activar Servicio'><i class="nav-icon fas fa-check-circle"></i></a>`;




    let dato = {
        id_acuerdo : element.id_acuerdo,
        servicio :element.procedimiento.servicio.nombre,
        cups : element.procedimiento.cups.codigo,
        procedimiento : element.procedimiento.cups.nombre,
        empresa :element.contrato.empresa.nombre,
        precio :element.precio,
        empresa :element.contrato.empresa.nombre,
        estado :estadoBTN,
 
   }
       arrayDatos.push(dato)
       });
   
           var table = $('#tabla_acuerdos').DataTable({
               "bInfo" : false,
               searching: true,
               paging: true,
               autoWidth: false,
               width: '100%',
               destroy: true,
               responsive: false,
               data: arrayDatos,
               columns: [
                           {"data": "id_acuerdo"},
                           {"data": "servicio"},
                           {"data": "cups"},
                           {"data": "procedimiento"},
                           {"data": "precio"},  
                           {"data": "empresa"},  
                           {"data": "estado"}            
                         
                       ]

      
                                   });
    });
   
}

function listarProcedimientos(){
    
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/procedimientoActivoServicioId`, {
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
              let html=`<option value='0'>Seleccione una opción</option>`;
               data.procedimientos.forEach(element => {
               html+=`<option value=${element.id_procedimiento}> ${element.cups.nombre} => $${element.precio}</option>`;
               });   
               document.getElementById('procedimientos').innerHTML = html;  
           });

}

/*
function listarServicios(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    
    fetch(`/servicioActivos`, {
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
             
              let html=`<option value='0'>Seleccione una opción</option>`;
               data.servicios.forEach(element => {
               html+=`<option value='${element.id_servicio}'> ${element.nombre}</option>`;
               });   
               document.getElementById('servicios').innerHTML = html;  
           });
}
*/

function activarAcuerdo(id_acuerdo,estado){

    let id_contrato = document.getElementById("id_contrato").value;
    let datos= new URLSearchParams();
    datos.append('estado',estado);

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/acuerdo/${id_acuerdo}`,
        {
            method: 'delete',
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
           
        listarAcuerdos(id_contrato);
        }

        if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}
 
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

       
    });

}



function agregarAcuerdo(){
    let id_contrato=document.getElementById('id_contrato2').value;
    let datos= new URLSearchParams();
    datos.append('contratoId',id_contrato);
    datos.append('procedimientoId',document.getElementById('procedimientos').value);
    datos.append('precio',document.getElementById('precio').value);

 
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    
    fetch('/acuerdo',
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
           listarAcuerdos(id_contrato);
            Frm_contrato.hide();
        }

        if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}
 
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
       
    
    });

    

}

 function buscarAcuerdo(id_acuerdo){
   
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/busar_acuerdo/${id_acuerdo}`, {
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
    .then(async data => {

        document.getElementById('id_acuerdo').value= await data[0].id_acuerdo;
        document.getElementById('procedimientos').value= data[0].procedimiento.id_procedimiento;
        document.getElementById('precio').value= data[0].precio;
        document.getElementById('btn_registrar_acuerdo').style.display = 'none';
        document.getElementById('btn_actualizar_acuerdo').style.display = 'block';

    });
        

}

function actualizarAcuerdo(){


    let datos= new URLSearchParams();

    let id_contrato= document.getElementById('id_contrato').value;

    datos.append('id_acuerdo',document.getElementById('id_acuerdo').value);
    datos.append('procedimiento',document.getElementById('procedimientos').value);
    datos.append('precio',document.getElementById('precio').value);
    
  
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
   
    fetch(`/acuerdo/${document.getElementById('id_acuerdo').value}`,
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
        
        listarAcuerdos(document.getElementById('id_contrato2').value);
        document.getElementById('id_acuerdo').value='';
        document.getElementById('procedimientos').value='';
        document.getElementById('precio').value='';
        document.getElementById('btn_registrar_acuerdo').style.display = 'block';
        document.getElementById('btn_actualizar_acuerdo').style.display = 'none';
        }
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

    });

}



function confirmaRegistrarTodosExamenes(){

    
    Swal.fire({
        title: 'Desea registrar todos los examenes al contrato',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            registrarTodosExamenesContrato();
        } else if (result.isDenied) {
            Mensaje.fire({
                icon: 'warning',
                title: 'Operación cancelada'
                });
        }                       
    });


}

function registrarTodosExamenesContrato(){

    alert('registrar todos los examenes');

    let id_contrato=document.getElementById('id_contrato2').value;
    let datos= new URLSearchParams();

    datos.append('contratoId',id_contrato);
    
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    
    fetch('/registrarTodosExamenesContrato',
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
            listarAcuerdos(document.getElementById('id_contrato2').value);
            Mensaje.fire({
                icon: 'success',
                title: data.message
                });
        }

        if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}
 
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
       
    
    });






}