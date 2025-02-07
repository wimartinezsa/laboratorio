
listarUsuarios();


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





var Frm_usuario = new bootstrap.Modal(document.getElementById('Frm_usuario'), {
    keyboard: false
});

var Frm_firma = new bootstrap.Modal(document.getElementById('Frm_firma'), {
    keyboard: false
});



function listarUsuarios(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch('/usuario', {
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

        //console.log(data);
        let accionBTN='';
        let firmaBTN='';
        let arrayDatos=[];
        let imagen='';
        let estadoBTN='';

        if(data.status==403){window.location.href = "/";}
        if(data.status==200){

        //Mensaje.fire({icon: 'success',title:"Se Listaron todas las empresas"})
        data.usuarios.forEach(element => {
        accionBTN =` <a class="btn btn-primary" href="javascript:editarUsuario(${element.id_usuario})" title='Editar Usuario'><i class='fas fa-edit'></i></a>`;
        
        
        if(element.rol==='Bacteriologo' || element.rol==='Auxiliar' ){
            firmaBTN=` <a class="btn btn-primary" href="javascript:gestionarFirma(${element.id_usuario})" title='Cargar Firma'><i class='fas fa-id-card'></i></a>`
            
            
            if(element.firma===null){
                imagen= "";
            }else{
                
                imagen= `<img src="/img/firmas/${element.firma}" style="width: 80px; height: 60px;">`;
            }
        
        }else{
            firmaBTN='';
            imagen= "";
        }
        
       
        estadoBTN =  element.estado=='Activo' ? 
                ` <a class="btn btn-success" href="javascript:activarUsuario(${element.id_usuario},'Inactivo')" title='Desactivar Acuerdo'><i class="nav-icon fas fa-times-circle"></i></a>`
              :
              `<a class="btn btn-danger" href="javascript:activarUsuario(${element.id_usuario},'Activo')" title='Activar Acuerdo'><i class="nav-icon fas fa-check-circle"></i></a>`;
       let lista_areas='<ul>'
           
       element.vinculacion.forEach(item => {
       
            lista_areas +=`
                           ${item.area.nombre} <a  href="javascript:eliminarViculacion(${item.id_vinculacion})" title='Activar Acuerdo'><i  class='fas fa-trash-alt' style='font-size:12px'></i></a><br>
                        `
       });
       lista_areas +=`</ul>`;


        let dato = {
        identificacion : element.identificacion,
        nombre :element.nombre,
        cargo :element.cargo,
        rol :element.rol,
        firma: imagen,
        autoriza: element.autoriza,
        email :element.email,
        area :lista_areas,
        estado:estadoBTN,
        Accion :accionBTN + firmaBTN,
                        }
        arrayDatos.push(dato)
                        });
       //console.log(arrayDatos);
                        var table = $('#tabla_usuario').DataTable({
               "bInfo" : false,
               searching: true,
               paging: true,
               autoWidth: false,
               destroy: true,
               responsive: true,
               data: arrayDatos,
               columns: [
                           {"data": "identificacion"},
                           {"data": "nombre"},
                           {"data": "email"},
                           {"data": "area"},
                           {"data": "cargo"},
                           {"data": "rol"},
                           {"data": "firma"},
                           {"data": "autoriza"},
                           {"data": "estado"},
                           {"data": "Accion"}
                       ]
      
                        });
        }
        if(data.status==404){ Mensaje.fire({icon: 'warning',title: data.message})}
        if(data.status==500){ Mensaje.fire({icon: 'error',title: data.message})} 
        
    });
   
}


function listarViculacionUsuario(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    let id_usuario= document.getElementById('id_usuario').value;
    
    fetch(`/vinculacion/${id_usuario}`, {
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
               //window.location.href = "/";
            }
      })
    .then(data => {

        
                let html='';

                data.forEach(element => {
                    html+=`<tr>`;
                    html+=`<td>${element.id_vinculacion}</td>`;
                    html+=`<td>${element.area.nombre}</td>`;
                    html+=`<td><a class="btn btn-danger" href="javascript:eliminarViculacion(${element.id_vinculacion})" title='Eliminar Vinculación'>Eliminar</a></td>`;
                    html+=`</tr>`;
                });
               
            document.getElementById('tabla_vinculacion').innerHTML=html;
    })
}


function eliminarViculacion(id_vinculacion){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    
        fetch(`/vinculacion/${id_vinculacion}`,
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
        
            if(data.status==200){
                Mensaje.fire({icon: 'success',title: data.message});
                listarUsuarios();
                Frm_usuario.hide();
            }

            if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}
    
            if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

        });
}


function agregarVinculacionUsuario(){


    let datos= new URLSearchParams();

    datos.append('areaId',document.getElementById("areas").value);
    datos.append('usuarioId',document.getElementById('id_usuario').value);

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch('/vinculacion',
        {
            method: 'POST',
            body:datos,
            headers: {
                'Authorization': `Bearer ${token}`, // Envía el token en el encabezado de autorización
                'Content-Type': 'application/x-www-form-urlencoded' // Especifica el tipo de contenido
            }
        })
    .then(resp =>resp.json())
    .then(data=>{
      
        if(data.status==403){window.location.href = "/";}
        if(data.status==200){Mensaje.fire({icon: 'success',title: data.message});
        listarUsuarios();
        Frm_usuario.hide();
        }
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
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
             
              let html=`<option value='0' selected='true' disabled='true'>Seleccione un Área</option>`;
               data.areas.forEach(element => {
               html+=`<option value='${element.id_area}'> ${element.nombre}</option>`;
               });   
               document.getElementById('areas').innerHTML = html;  
           });
}






async function gestionarUsuario(){
    await limpiarFormularioUsuario();
    await listarAreas();
   
    document.getElementById('id_usuario').value=0;
    document.getElementById('btn_registrar').style.display = 'block';
    document.getElementById('btn_actualizar').style.display = 'none';

    await Frm_usuario.show();
   }



function registrarUsuario(){

    let datos= new URLSearchParams();

    datos.append('identificacion',document.getElementById('identificacion').value);
    datos.append('tipo_identificacion',document.getElementById('tipo_identificacion').value);
    datos.append('nombre',document.getElementById('nombres').value);
    datos.append('email',document.getElementById('email').value);
    datos.append('cargo',document.getElementById('cargo').value);
    datos.append('rol',document.getElementById('rol').value);
    datos.append('autoriza',document.getElementById('autoriza').value);
    
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch('/usuario',
        {
            method: 'POST',
            body:datos,
            headers: {
                'Authorization': `Bearer ${token}`, // Envía el token en el encabezado de autorización
                'Content-Type': 'application/x-www-form-urlencoded' // Especifica el tipo de contenido
            }
        })
    .then(resp =>resp.json())
    .then(data=>{
      
        if(data.status==403){window.location.href = "/";}
        
        if(data.status==200){Mensaje.fire({icon: 'success',title: data.message});
        listarUsuarios();
        Frm_usuario.hide();
        }
 
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

    });

}



function limpiarFormularioUsuario(){
  document.getElementById('identificacion').value='';
  document.getElementById('tipo_identificacion').value='';
  document.getElementById('nombres').value='';
  document.getElementById('email').value='';
  document.getElementById('cargo').value='';
  document.getElementById('rol').value='';
  document.getElementById('areas').value='';
}





async function editarUsuario(id_usuario){
    await limpiarFormularioUsuario();
    await listarAreas();
    await buscarUsaurioId(id_usuario);
    
    document.getElementById('id_usuario').value=id_usuario;
    document.getElementById('btn_registrar').style.display = 'none';
    document.getElementById('btn_actualizar').style.display = 'block';
    await listarViculacionUsuario();
    await Frm_usuario.show();
}


function buscarUsaurioId(id_usuario){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/usuario/${id_usuario}`,
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
  

        const nombreDeArea = data.vinculacion.map((area) => {
            if (area.length > 0) {
            return area.nombre;
            } else {
                
                return null;
            }
        });
   
        document.getElementById('identificacion').value= data.identificacion;
        document.getElementById('tipo_identificacion').value= data.tipo_identificacion;
        document.getElementById('nombres').value=data.nombre;
        document.getElementById('email').value=data.email;
        document.getElementById('cargo').value=data.cargo;
        document.getElementById('rol').value= data.rol;
        document.getElementById('areas').value= data.autoriza;
        document.getElementById('areas').value= nombreDeArea;
   
    });


}



function actualizarUsuario(){

    let datos= new URLSearchParams();

    let id_usuario= document.getElementById('id_usuario').value;
  

    datos.append('identificacion',document.getElementById('identificacion').value);
    datos.append('nombre',document.getElementById('nombres').value);
    datos.append('email',document.getElementById('email').value);
    datos.append('cargo',document.getElementById('cargo').value);
    datos.append('rol',document.getElementById('rol').value);
    datos.append('area',document.getElementById('areas').value);
    datos.append('autoriza',document.getElementById('autoriza').value);
    
    
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/usuario/${id_usuario}`,
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
        listarUsuarios();
        Frm_usuario.hide();
        }
 
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

    });

}



function gestionarFirma(id_usuario){
    document.getElementById('id_usuario_firma').value=id_usuario;
    Frm_firma.show();

}

function registrarFirma(){
    let id_usuario= document.getElementById('id_usuario_firma').value;

    let datos= new FormData(); 
    let FileN = document.getElementById('foto');
    datos.append('img', FileN.files[0]);

   
    fetch(`/registrarFirma/${id_usuario}`,
        {
            method: 'put',
            body:datos
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
            listarUsuarios();
            Frm_firma.hide();
        }
 
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
    });
    

}


function activarUsuario(id_usuario,estado){
 

    let datos= new URLSearchParams();
    datos.append('estado',estado);

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    
   
        fetch(`/usuario/${id_usuario}`,
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
                listarUsuarios();
            }

            if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}
    
            if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

        });
    

}
