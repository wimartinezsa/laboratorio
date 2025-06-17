
listarEmpresas();


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





var Frm_empresa = new bootstrap.Modal(document.getElementById('Frm_empresa'), {
    keyboard: false
});



function listarEmpresas(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch('/empresa', {
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

        //Mensaje.fire({icon: 'success',title:"Se Listaron todas las empresas"})
        data.empresas.forEach(element => {
        accionBTN =` <a class="btn btn-primary" href="javascript:editarEmpresa(${element.id_empresa})" title='Editar Empresa'><i class='fas fa-edit'></i></a>`;

    
        let dato = {
        id: element.id_empresa,
        codigo : element.codigo,
        nit :element.nit,
        nombre :element.nombre,
        tipo :element.tipo,
        municipio :element.municipio.nombre,
        departamento :element.municipio.departamento.nombre,
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
               columns: [   {"data": "id"},
                           {"data": "codigo"},
                           {"data": "nit"},
                           {"data": "nombre"},
                           {"data": "tipo"},
                           {"data": "municipio"},
                           {"data": "departamento"},
                            
                           {"data": "Accion"}
                       ]
      
                        });
        }
        if(data.status==404){ Mensaje.fire({icon: 'warning',title: data.message})}
        if(data.status==500){ Mensaje.fire({icon: 'error',title: data.message})} 
        
    });
   
}




async function gestionarEmpresa(){
    await limpiarFormularioEmpresa();
   await listarMunicipios();
   
    document.getElementById('id_empresa').value=0;
    document.getElementById('btn_registrar').style.display = 'block';
    document.getElementById('btn_actualizar').style.display = 'none';

    await Frm_empresa.show();
   }





function listarMunicipios(){
  
    fetch(`/municipio`, {
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
               html+=`<option value='${element.id_municipio}'> ${element.nombre}</option>`;
               });   
               document.getElementById('municipio').innerHTML = html;  
           });
}





function registrarEmpresa(){

    let datos= new URLSearchParams();

    datos.append('codigo',document.getElementById('codigo').value);
    datos.append('nit',document.getElementById('nit').value);
    datos.append('nombre',document.getElementById('razon_social').value);
    datos.append('sigla',document.getElementById('sigla').value);
    datos.append('tipo',document.getElementById('tipo').value);
    datos.append('municipioId',document.getElementById('municipio').value);

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta


    fetch('/empresa',
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
        listarEmpresas();
        Frm_empresa.hide();
        }
 
        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}

    });

}

function limpiarFormularioEmpresa(){
  document.getElementById('codigo').value='';
  document.getElementById('nit').value='';
  document.getElementById('razon_social').value='';
  document.getElementById('sigla').value='';
  document.getElementById('tipo').value='';
  document.getElementById('municipio').value='';
}




async function editarEmpresa(id_empresa){
    await limpiarFormularioEmpresa();
    await listarMunicipios();
    document.getElementById('id_empresa').value=id_empresa;
    document.getElementById('btn_registrar').style.display = 'none';
    document.getElementById('btn_actualizar').style.display = 'block';
    await buscarEmpresaId(id_empresa);
    await Frm_empresa.show();
}


function buscarEmpresaId(id_empresa){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/empresa/${id_empresa}`,
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
 
     //data = Array.isArray(data) ? data : [data];
   
        document.getElementById('codigo').value= data.codigo;
        document.getElementById('nit').value=data.nit;
        document.getElementById('sigla').value=data.sigla;
        document.getElementById('razon_social').value=data.nombre;
        document.getElementById('tipo').value= data.tipo;
        document.getElementById('municipio').value=data.municipioId;


    });


}





function actualizarEmpresa(){

    let datos= new URLSearchParams();

    //datos.append('id_empresa',document.getElementById('id_empresa').value);

    let id_empresa= document.getElementById('id_empresa').value;

    datos.append('codigo',document.getElementById('codigo').value);
    datos.append('nit',document.getElementById('nit').value);
    datos.append('nombre',document.getElementById('razon_social').value);
    datos.append('sigla',document.getElementById('sigla').value);
    datos.append('tipo',document.getElementById('tipo').value);
    datos.append('municipioId',document.getElementById('municipio').value);
  
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch(`/empresa/${id_empresa}`,
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
        listarEmpresas();
        Frm_empresa.hide();
        }

        if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}

        if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
      

    });


}
 

