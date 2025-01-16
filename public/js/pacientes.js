// se valida con token
listarPacientes();



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

  

var Frm_pacientes = new bootstrap.Modal(document.getElementById('Frm_pacientes'), {
    keyboard: false
});


// se valida con token
function listarPacientes(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta
    fetch('/paciente', {
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

        data = Array.isArray(data) ? data : [data];
    data.forEach(element => {
    accionBTN =` <a class="btn btn-primary" href="javascript:editarPaciente(${element.id_paciente})" title='Editar Paciente'><i class='fas fa-edit'></i></a>`;
    const nombres = `${element.nombres}`;   
    let dato = {
       tipo_identificacion :element.tipo_identificacion,
       identificacion :element.identificacion,
       nombres : element.nombres,
       email :element.email,
       telefono :element.telefono,
       tipo_paciente :element.tipo_paciente.replace(/_/g, " "),
       eps :element.eps.nombre,
       municipio :element.municipio.nombre,
       Accion :accionBTN
   }
       arrayDatos.push(dato)
       });
   
           var table = $('#tabla_pacientes').DataTable({
               "bInfo" : false,
               searching: true,
               paging: true,
               autoWidth: false,
               destroy: true,
               responsive: true,
               data: arrayDatos,
               columns: [
                           {"data": "identificacion"},
                           {"data": "tipo_identificacion"},
                           {"data": "nombres"},
                           {"data": "email"},
                           {"data": "telefono"},
                           {"data": "tipo_paciente"},
                           {"data": "eps"},
                           {"data": "municipio"},
                           {"data": "Accion"}
                       ]
      
                                   });
              Mensaje.fire({
                             icon: 'success',
                             title: "Se listaron los pacientes"
                          });
                                
    });
   
    
}




function gestionarPaciente(){

   
   
    document.getElementById('id_paciente').value=0;
    document.getElementById('btn_registrar').style.display = 'block';
    document.getElementById('btn_actualizar').style.display = 'none';
   limpiarFormularioPaciente();
   listarPaises();
   listarEps();
   Frm_pacientes.show();
   }





async function listarPaises(){
  
  await  fetch(`/pais`, {
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
             
              let html=`<option value='' disabled='true' selected='true'>Seleccione una Pais</option>`;
               data.forEach(element => {
               html+=`<option value='${element.id_pais}'> ${element.nombre}</option>`;
               });   
               document.getElementById('paises').innerHTML = html;  
               document.getElementById('pais_origen').innerHTML = html; 
           });
}


async function listarDepartamentos(id_pais){

    await fetch(`/departamento/${id_pais}`, {
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
             
              let html=`<option value='' disabled='true' selected='true'>Seleccione un Departamento</option>`;
               data.forEach(element => {
               html+=`<option value='${element.id_departamento}'> ${element.nombre}</option>`;
               });   
               document.getElementById('departamentos').innerHTML = html;  
           });

           
}


async function listarMunicipios(id_departamento){
    await  fetch(`/municipiosDepartamento/${id_departamento}`, {
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
             
              let html=`<option value='' disabled='true' selected='true'>Seleccione un Municipio</option>`;
               data.forEach(element => {
               html+=`<option value='${element.id_municipio}'> ${element.nombre}</option>`;
               });   
               document.getElementById('municipios').innerHTML = html;  
           });
}


async function listarEps(){
  
  await  fetch(`/eps`, {
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
             
              let html=`<option value='' disabled='true' selected='true'>Seleccione una opción</option>`;
               data.forEach(element => {
               html+=`<option value='${element.id_eps}'> ${element.nombre}</option>`;
               });   
               document.getElementById('eps').innerHTML = html;  
           });
}

// se valida con token
function registrarPaciente(){

    let datos= new URLSearchParams();

    datos.append('identificacion',document.getElementById('identificacion').value);
    datos.append('tipo_identificacion',document.getElementById('tipo_identificacion').value);
    datos.append('nombres',document.getElementById('nombres').value);
    datos.append('tipo_paciente',document.getElementById('tipo_paciente').value);
    datos.append('fecha_nacimiento',document.getElementById('fecha_nacimiento').value);
    datos.append('sexo',document.getElementById('sexo').value);
    datos.append('email',document.getElementById('email').value);
    datos.append('telefono',document.getElementById('telefono').value);
    datos.append('direccion',document.getElementById('direccion').value);
    datos.append('municipioId',document.getElementById('municipios').value);
    datos.append('paisId',document.getElementById('pais_origen').value);
    datos.append('epsId',document.getElementById('eps').value);
    datos.append('incapacidad',document.getElementById('incapacidad').value);
    datos.append('zona',document.getElementById('zona').value);

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta


    fetch('/paciente',
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
        listarPacientes();
        Frm_pacientes.hide();
       }

       if(data.status==500){Mensaje.fire({icon: 'warning',title: data.message});}
        
      

    });

}

function limpiarFormularioPaciente(){
    document.getElementById('identificacion').value='';
    document.getElementById('tipo_identificacion').value='';
    document.getElementById('nombres').value='';
    document.getElementById('tipo_paciente').value='';
    document.getElementById('fecha_nacimiento').value='';
    document.getElementById('sexo').value='';
    document.getElementById('email').value='';
    document.getElementById('telefono').value='';
    document.getElementById('direccion').value='';
    document.getElementById('municipios').value='';
    document.getElementById('eps').value='';
}



function editarPaciente(id_paciente){
    document.getElementById('id_paciente').value=id_paciente;
    buscarPacienteId(id_paciente);
    document.getElementById('btn_registrar').style.display = 'none';
    document.getElementById('btn_actualizar').style.display = 'block';
   
   // listarMunicipios();
    //listarEps();
    Frm_pacientes.show();

}




// se valida con token
async function buscarPacienteId(id_paciente) {
    try {
        const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta


        const response = await fetch(`/paciente/${id_paciente}`, {
            method: 'get',
            
            headers: {
                        'Authorization': `Bearer ${token}`, // Envía el token en el encabezado de autorización
                        'Content-Type': 'application/x-www-form-urlencoded' // Especifica el tipo de contenido
                    }
        });
        
        const data = await  response.json();
        
     
        if(JSON.stringify(data).length>0){

        document.getElementById('identificacion').value = data.identificacion;
        document.getElementById('tipo_identificacion').value = data.tipo_identificacion;
        document.getElementById('nombres').value = data.nombres;
        document.getElementById('tipo_paciente').value = data.tipo_paciente;
        const fechaNacimiento = new Date(data.fecha_nacimiento);
        const anio = fechaNacimiento.getFullYear();
        const mes = String(fechaNacimiento.getMonth() + 1).padStart(2, '0');
        const dia = String(fechaNacimiento.getDate()).padStart(2, '0');
        document.getElementById('fecha_nacimiento').value = `${anio}-${mes}-${dia}`;
        document.getElementById('sexo').value = data.sexo;
        document.getElementById('email').value = data.email;
        document.getElementById('telefono').value = data.telefono;
        document.getElementById('direccion').value = data.direccion;
        // Llama a listarPaises y selecciona el país del paciente
        await listarPaises();
        document.getElementById('paises').value = data.municipio.departamento.paisId;
        // Llama a listarDepartamentos y selecciona el departamento del paciente
        await listarDepartamentos(data.municipio.departamento.paisId);
        document.getElementById('departamentos').value = data.municipio.departamentoId;
        // Llama a listarMunicipios y selecciona el municipio del paciente
        await listarMunicipios(data.municipio.departamentoId);
        document.getElementById('municipios').value = data.municipio.id_municipio;
        // Asigna el valor de la EPS
        document.getElementById('eps').value = data.epsId;
        document.getElementById('pais_origen').value = data.paisId;
        document.getElementById('tipo_paciente').value = data.tipo_paciente;
        await listarEps();
        document.getElementById('eps').value = data.epsId;
        document.getElementById('incapacidad').value = data.incapacidad;
        document.getElementById('zona').value = data.zona;
        
        Mensaje.fire({
            icon: 'success',
            title: "Se encontraron datos del paciente"
         });

         
    }else{
        Mensaje.fire({
            icon: 'warning',
            title: "No se encontraron datos del paciente"
         });

    }


    } catch (error) {
        console.error('Error al buscar el paciente:', error);
    }
}



// se valida con token
function actualizarPaciente(){

    let datos= new URLSearchParams();
    let id_paciente= document.getElementById('id_paciente').value;
    datos.append('identificacion',document.getElementById('identificacion').value);
    datos.append('tipo_identificacion',document.getElementById('tipo_identificacion').value);
    datos.append('nombres',document.getElementById('nombres').value);
    datos.append('tipo_paciente',document.getElementById('tipo_paciente').value);
    datos.append('fecha_nacimiento',document.getElementById('fecha_nacimiento').value);
    datos.append('sexo',document.getElementById('sexo').value);
    datos.append('email',document.getElementById('email').value);
    datos.append('telefono',document.getElementById('telefono').value);
    datos.append('direccion',document.getElementById('direccion').value);
    datos.append('municipioId',document.getElementById('municipios').value);
    datos.append('paisId',document.getElementById('pais_origen').value);
    datos.append('epsId',document.getElementById('eps').value);
    datos.append('incapacidad',document.getElementById('incapacidad').value);
    datos.append('zona',document.getElementById('zona').value);

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/paciente/${id_paciente}`,
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


        if(data.status==403){window.location.href = "/login";}
        
       if(data.status==200){
        Mensaje.fire({icon: 'success',title: data.message});
        listarPacientes();
        Frm_pacientes.hide();
       }

       if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}

       if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
      
    });
}
 

