



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


function listarCuentasPorCobrar(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch('/cuentaPorCobrar', {
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
               columns: [
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
























