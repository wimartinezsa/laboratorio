
listarServicios();


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




var Frm_servicio = new bootstrap.Modal(document.getElementById('Frm_servicio'), {
    keyboard: false
});

var Frm_procedimientos = new bootstrap.Modal(document.getElementById('Frm_procedimientos'), {
    keyboard: false
});



function listarServicios(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch('/servicio', {
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
        //data = Array.isArray(data.servicios) ? data : [data];
    data.servicios.forEach(element => {
    accionBTN =` <a class="btn btn-primary" href="javascript:editarServicio(${element.id_servicio})" title='Editar Servicio'><i class="nav-icon fas fa-pen"></i></a>
    <a class="btn btn-success" href="javascript:getionarPocedimientos(${element.id_servicio},'${element.nombre}')" title='Ver Procedimientos'><i class="nav-icon fas fa-microscope"></i></a>`;

    estadoBTN =  element.estado=='Activo' ? 
        ` <a class="btn btn-success" href="javascript:cambiarEstadoProcediemiento(${element.id_servicio},'Inactivo')" title='Desactivar Servicio'><i class="nav-icon fas fa-times-circle"></i></a>`
    :
        `<a class="btn btn-danger" href="javascript:cambiarEstadoProcediemiento(${element.id_servicio},'Activo')" title='Activar Servicio'><i class="nav-icon fas fa-check-circle"></i></a>`;

    let dato = {
        id_servicio : element.id_servicio,
        prestador :element.prestador.razon_social,
        servicio :element.nombre,
        tipo_servicio :element.tipo_servicio.nombre,
        grupo_servicio :element.grupo_servicio.replace(/_/g, " "),
        modalidad_atencion :element.modalidad_atencion.replace(/_/g, " "),
        precio :element.precio,
        estado: estadoBTN,
        Accion :accionBTN
   }
       arrayDatos.push(dato)
       });
   
           var table = $('#tabla_empresa').DataTable({
               "bInfo" : false,
               searching: true,
               paging: true,
               autoWidth: false,
               destroy: true,
               responsive: true,
               data: arrayDatos,
               columns: [
                           {"data": "id_servicio"},
                           {"data": "prestador"},
                           {"data": "servicio"},
                           {"data": "tipo_servicio"},
                           {"data": "grupo_servicio"},
                           {"data": "modalidad_atencion"},
                           {"data": "precio"},
                           {"data": "estado"},
                            
                           {"data": "Accion"}
                       ]
      

                                   });
        } 

        if(data.status==404){ Mensaje.fire({icon: 'warning',title: data.message})}
        if(data.status==500){ Mensaje.fire({icon: 'error',title: data.message})} 
        
    });  
}





function cambiarEstadoProcediemiento(id_servicio,estado){
 

    let datos= new URLSearchParams();
    datos.append('estado',estado);

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    fetch(`/servicio/${id_servicio}`,
        {
            method: 'DELETE',
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
      
        if(data.status==404){window.location.href = "/";}
        
        if(data.status==200){Mensaje.fire({icon: 'success',title: data.message});
        listarServicios(id_servicio);
        }

        if(data.status==205){Mensaje.fire({icon: 'warning',title: data.message});}
 
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

    });
}


function gestionarServicio(){
    listarTipoServicio();
    document.getElementById('id_servicio').value=0;
    document.getElementById('btn_registrar').style.display = 'block';
    document.getElementById('btn_actualizar').style.display = 'none';
    limpiarFormularioServicio();
    
    Frm_servicio.show();
   }




function listarTipoServicio(){
  
  
    fetch(`/tipo_servicio`, {
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
             
              let html=`<option value='0' selected="true" disabled="true">Seleccione una opción</option>`;
               data.forEach(element => {
               html+=`<option value='${element.id_tipo_servicio}'> ${element.nombre}</option>`;
               });   
               document.getElementById('tipo_servicio').innerHTML = html;  
           });
}

function registrarServcio(){

    let datos= new URLSearchParams();

    datos.append('nombre',document.getElementById('nombre_servicio').value);
    datos.append('tipo_servicioId',document.getElementById('tipo_servicio').value);
    datos.append('grupo',document.getElementById('grupo').value);
    datos.append('modalidad',document.getElementById('modalidad').value);
    datos.append('precio',document.getElementById('precio').value);

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta


    fetch('/servicio',
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
        if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}

        if(data.status==200){Mensaje.fire({icon: 'success',title: data.message});
        listarServicios();
        Frm_servicio.hide();
        }
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
    });


}

function limpiarFormularioServicio(){
    
  document.getElementById('nombre_servicio').value='';
  document.getElementById('tipo_servicio').value='';
  document.getElementById('precio').value='';


}

async function editarServicio(id_servicio){
    await listarTipoServicio();
    await buscarServicioId(id_servicio);
    document.getElementById('id_servicio').value=id_servicio;
    document.getElementById('btn_registrar').style.display = 'none';
    document.getElementById('btn_actualizar').style.display = 'block';
    
    await Frm_servicio.show();
}

function buscarServicioId(id_servicio){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta


    fetch(`/servicio/${id_servicio}`,
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
        //console.log(data);
        document.getElementById('id_servicio').value= data.id_servicio;
        document.getElementById('nombre_servicio').value=data.nombre;
        document.getElementById('tipo_servicio').value=data.tipo_servicioId;
        document.getElementById('modalidad').value=data.modalidad_atencion;
        document.getElementById('grupo').value=data.grupo_servicio;
        document.getElementById('precio').value=data.precio;

    });


}


function actualizarServicio(){

    let datos= new URLSearchParams();

   
    let id_servicio=document.getElementById('id_servicio').value;
    datos.append('nombre',document.getElementById('nombre_servicio').value);
    datos.append('tipo_servicioId',document.getElementById('tipo_servicio').value);
    datos.append('grupo',document.getElementById('grupo').value);
    datos.append('modalidad',document.getElementById('modalidad').value);
    datos.append('precio',document.getElementById('precio').value);

  
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta


    fetch(`/servicio/${id_servicio}`,
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
        if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}

        if(data.status==200){Mensaje.fire({icon: 'success',title: data.message});
        listarServicios();
        Frm_servicio.hide();
        }
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
 

    });


}
 

function getionarPocedimientos(id_servicio,servicio){
    document.getElementById('titulo_frm_examen').innerHTML='Examenes del servicio - ' +servicio;
    listarProcedimientoServicioId(id_servicio);
    Frm_procedimientos.show();

}

function listarProcedimientoServicioId(id_servicio){
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    fetch(`/procedimientoServicioId/${id_servicio}`, {
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

        data.procedimientos.forEach(element => {
          
            html+=`<tr>`;
            html+=`<td>${element.id_procedimiento}</td>`;
            html+=`<td>${element.servicio.nombre}</td>`;
            html+=`<td>${element.cups.codigo}</td>`;
            html+=`<td>${element.cups.nombre}</td>`;
            html+=`<td>${element.estado}</td>`;
            html+=`</tr>`;
    });  
    
        document.getElementById('tabla_procedimientos').innerHTML = html;  
        Frm_procedimientos.show();
    });

}

