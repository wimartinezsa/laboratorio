

listarServiciosActivos();

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




var Frm_procedimiento = new bootstrap.Modal(document.getElementById('Frm_procedimiento'), {
    keyboard: false
});


var Frm_parametros = new bootstrap.Modal(document.getElementById('Frm_parametros'), {
    keyboard: false
});


var Frm_tipo_resultado = new bootstrap.Modal(document.getElementById('Frm_tipo_resultado'), {
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




function listarProcedimientosServicioId(id_servicio){
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
       // console.log(data);
        if(data.stus==403){window.location.href = "/";}

            let accionBTN='';
            let arrayDatos=[];
           // data = Array.isArray(data) ? data : [data];
            data.procedimientos.forEach(element => {

                
            accionBTN =` <a class="btn btn-primary" href="javascript:editarProcedimiento(${element.id_procedimiento})" title='Editar Examen'><i class='fas fa-edit'></i></a>
                                <a class="btn btn-primary" href="javascript:getionarParametros(${element.id_procedimiento})" title='Nuevo Parametro'><i class='fas fa-bong'></i></a>
                    `; 
               
                    
            
            estadoBTN =  element.estado=='Activo' ? 
                ` <a class="btn btn-success" href="javascript:activarProcediemiento(${element.id_procedimiento},'Inactivo')" title='Desactivar Acuerdo'><i class="nav-icon fas fa-times-circle"></i></a>`
              :
              `<a class="btn btn-danger" href="javascript:activarProcediemiento(${element.id_procedimiento},'Activo')" title='Activar Acuerdo'><i class="nav-icon fas fa-check-circle"></i></a>`;


              



        let dato = {
                    id_procedimiento : element.id_procedimiento,
                    servicio :element.servicio.nombre,
                    codigo :element.cups.codigo,
                    nombre :element.cups.nombre,
                    tecnica :element.tecnica,
                    finalidad :element.finalidad.nombre,
                    area :element.area.nombre,
                    precio :element.precio,
                    estado :estadoBTN,
                    Accion :accionBTN
        }
       arrayDatos.push(dato)
       });
   
           var table = $('#tabla_procedimientos').DataTable({
               "bInfo" : false,
               searching: true,
               paging: true,
               autoWidth: false,
               destroy: true,
               responsive: true,
               data: arrayDatos,
               columns: [
                           {"data": "id_procedimiento"},
                           {"data": "servicio"},
                           {"data": "codigo"},
                           {"data": "nombre"},
                           {"data": "tecnica"},
                           {"data": "finalidad"},
                           {"data": "area"},
                           {"data": "precio"},  
                           {"data": "estado"},        
                           {"data": "Accion"}
                       ]
      
                                   });
     
    

    });




}




function listarServiciosActivos(){

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
             
              let html=`<option value='0' selected="true" disabled="true">Seleccione un Servicio</option>`;
               data.servicios.forEach(element => {
               html+=`<option value='${element.id_servicio}'> ${element.nombre}</option>`;
               });   
               document.getElementById('Servicios').innerHTML = html;  
           });
}


async function gestionaProcedimiento(){
    await limpiarFormularioprocedimiento();
    await listarCups();
    await listarAreas();
    await listarFinalidad();
    document.getElementById('id_procedimiento').value=0;
    document.getElementById('btn_registrar').style.display = 'block';
    document.getElementById('btn_actualizar').style.display = 'none';
    

    await Frm_procedimiento.show();
   }


function activarProcediemiento(id_procedimiento,estado){
 

    let datos= new URLSearchParams();
    datos.append('estado',estado);

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    
   
        fetch(`/procedimiento/${id_procedimiento}`,
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
        
            if(data.status==403){window.location.href = "/";}
            
            if(data.status==200){Mensaje.fire({icon: 'success',title: data.message});
            let id_servicio= document.getElementById("Servicios").value;
            listarProcedimientosServicioId(id_servicio);
            }

            if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}
    
            if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

        });
    

}


function listarCups(){
  
    fetch(`/cups`, {
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
             
              let html=`<option value='0'>Seleccione una opción</option>`;
               data.forEach(element => {
               html+=`<option value='${element.id_cups}'> ${element.nombre}</option>`;
               });   
               document.getElementById('cups').innerHTML = html;  
           });
}


function listarAreas(){
  
    fetch(`/area`, {
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
             
              let html=`<option value='0'>Seleccione una opción</option>`;
               data.areas.forEach(element => {
               html+=`<option value='${element.id_area}'> ${element.nombre}</option>`;
               });   
               document.getElementById('areas').innerHTML = html;  
           });
}






function registrarProcedimiento(){

    let datos= new URLSearchParams();

    datos.append('finalidadId',document.getElementById('finalidad').value);
    datos.append('cupsId',document.getElementById('cups').value);
    datos.append('servicioId',document.getElementById('Servicios').value);
    datos.append('areaId',document.getElementById('areas').value);
    datos.append('tecnica',document.getElementById('tecnica').value);
    datos.append('precio',document.getElementById('precio').value);
    
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch('/procedimiento',
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
        let id_servicio = document.getElementById('Servicios').value;
        listarProcedimientosServicioId(id_servicio);
        Frm_procedimiento.hide();
        }
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
    
    });

}





function limpiarFormularioprocedimiento(){
  document.getElementById('id_procedimiento').value='';
  document.getElementById('finalidad').value='';
  document.getElementById('tecnica').value='';
  document.getElementById('cups').value='';

}



async function editarProcedimiento(id_procedimiento){
    await listarFinalidad();
    await listarCups();
    await listarAreas();
    document.getElementById('id_procedimiento').value=id_procedimiento;
    await buscarProcedimientoId(id_procedimiento);
    document.getElementById('btn_registrar').style.display = 'none';
    document.getElementById('btn_actualizar').style.display = 'block';
    
    Frm_procedimiento.show();
}





function buscarProcedimientoId(id_procedimiento){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/procedimiento/${id_procedimiento}`,
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
      
        document.getElementById('finalidad').value=data.finalidad.id_finalidad;
        document.getElementById('cups').value=data.cupsId;
        document.getElementById('areas').value=data.areaId;
        document.getElementById('tecnica').value=data.tecnica;
        document.getElementById('precio').value=data.precio;
    });


}





function actualizarProcedimiento(){

    let datos= new URLSearchParams();
    let id_procedimiento= document.getElementById('id_procedimiento').value;

    datos.append('finalidadId',document.getElementById('finalidad').value);
    datos.append('cupsId',document.getElementById('cups').value);
    datos.append('servicioId',document.getElementById('Servicios').value);
    datos.append('areaId',document.getElementById('areas').value);
    datos.append('tecnica',document.getElementById('tecnica').value);
    datos.append('precio',document.getElementById('precio').value);

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/procedimiento/${id_procedimiento}`,
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
        if(data.status==200){
            Mensaje.fire({icon: 'success',title: data.message});
            let id_servicio= document.getElementById('Servicios').value
            listarProcedimientosServicioId(id_servicio);
            Frm_procedimiento.hide();
        }
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}


    });


}
 

// Modluo de parametros de los preocedimientos

async function getionarParametros(id_procedimiento){
  
   await limpiarFormularioParametro();
    document.getElementById('procedimiento').value=id_procedimiento;
    document.getElementById('parametro').value='';

    await listarTipoParametro();

   await listarParametroId(id_procedimiento)
   await Frm_parametros.show();

}



function registrarParametro(){
    let datos= new URLSearchParams();
    datos.append('parametro',document.getElementById('parametro').value.toUpperCase());
    datos.append('id_procedimiento', document.getElementById('procedimiento').value);
    datos.append('valor_referencia',document.getElementById('valor_referencia').value);
    datos.append('unidad',document.getElementById('unidad').value);
    datos.append('metodo',document.getElementById('metodo').value);
    datos.append('tipo_parametro',document.getElementById('tipo_parametro').value);
    


    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch('/parametro',
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
            let id_procedimiento= document.getElementById('procedimiento').value;
            limpiarFormularioParametro();
            listarParametroId(id_procedimiento);
        }
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
    });
}


function listarFinalidad(){
    fetch(`/finalidad`, {
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
               html+=`<option value='${element.id_finalidad}'> ${element.nombre}</option>`;
               });   
               document.getElementById('finalidad').innerHTML = html;  
           });
}



function listarTipoParametro(){
    fetch(`/listarTipoParametro`, {
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
             
              let html=``;
               data.forEach(element => {
               html+=`<option value='${element.id_tipo_parametro}'> ${element.nombre}</option>`;
               });   
               document.getElementById('tipo_parametro').innerHTML = html;  
           });
}






function listarParametroId(id_procedimiento){
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/parametro/${id_procedimiento}`, {
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
        
        if(data.stus==403){window.location.href = "/";}

        let html='';
           
        data.parametros.forEach(element => {

         
            

            
            let tipo_respuesta= element.tipo_resultado;
           let lista_tipos='';
            tipo_respuesta.forEach(tipo =>{

                lista_tipos +=`${tipo.nombre}
                <a  href="javascript:eliminarTipoResultado(${tipo.id_tipo_resultado})" title='Elimina Tipo de Resultado'><i class='fas fa-trash'></i></a>
                <br>`;
            })
        html+=`<tr><td>${element.id_parametro}</td>`;
        html+=`<td>${element.nombre}</td>`;
        html+=`<td>${element.unidad}</td>`;
        html+=`<td>${element.valor_referencia}</td>`;
        html+=`<td>${element.metodo}</td>`;
        html+=`<td>${element.tipo_parametro.nombre}</td>`;
        html+=`<td>${lista_tipos}</td>`;

        if(element.metodo==='Manual'){

            html+=`<td>
            <a class="btn btn-primary" href="javascript:eliminarParametro(${element.id_parametro})" title='Eliminar Parametro'><i class='fas fa-archive'></i></a>
                    <a class="btn btn-primary" href="javascript:gestionarTipoResultado(${element.id_parametro})" title='Agregar Tipo de Resultado'><i class='fas fa-hand-holding-medical'></i></a>
            </td>`;
        }else{
            html+=`<td>
            <a class="btn btn-primary" href="javascript:eliminarParametro(${element.id_parametro})" title='Eliminar Parametro'><i class='fas fa-archive'></i></a>
                   
            </td>`;

        }

      
        html+=`</tr>`;

       });

   document.getElementById('tabla_parametros').innerHTML=html;
         
     
    

    });




}




function eliminarParametro(id_prametro){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/parametro/${id_prametro}`,
        {
            method: 'delete',
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
        if(data.status==200){
            Mensaje.fire({icon: 'success',title: data.message});
           let id_procedimiento= document.getElementById('procedimiento').value;
            listarParametroId(id_procedimiento);
        }
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
    });


}


function limpiarFormularioParametro(){

    document.getElementById('parametro').value='';
    document.getElementById('valor_referencia').value='';
    document.getElementById('unidad').value='';
    document.getElementById('metodo').value='';

}

function gestionarTipoResultado(id_parametro){
    document.getElementById('tipo_resultado').value='';
    document.getElementById('id_parametro').value=id_parametro;
    Frm_tipo_resultado.show();
}


function registrarTipoResultado(){

    let datos= new URLSearchParams();
    datos.append('id_parametro',   document.getElementById('id_parametro').value);
    datos.append('tipo_resultado',   document.getElementById('tipo_resultado').value);
   
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch('/tipo_resultado',
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
        let id_procedimiento= document.getElementById('procedimiento').value;
        listarParametroId(id_procedimiento);
        Frm_tipo_resultado.hide();
        }
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
    
    });








   
}


function eliminarTipoResultado(id_tipo_resultado){
   
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/tipo_resultado/${id_tipo_resultado}`,
        {
            method: 'delete',
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
        let id_procedimiento= document.getElementById('procedimiento').value;
        listarParametroId(id_procedimiento);
        Frm_tipo_resultado.hide();
        }
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
    
    });





}