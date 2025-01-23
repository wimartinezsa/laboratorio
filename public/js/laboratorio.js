

listarExamenesListos();



moment.defineLocale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    })


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






var Frm_muestras = new bootstrap.Modal(document.getElementById('Frm_muestras'), {
    keyboard: false
});







function listarExamenesListos(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    fetch('/listarExamenesListos', {
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

        data.examenes.forEach(element => {
        accionBTN =` <a class="btn btn-primary" href="javascript:imprimirResultados(${element.autorizacion})" title='Descargar Resultados'><i class='fas fa-cloud-download-alt' style='font-size:20px'></i></a>
        <a class="btn btn-success" href="javascript:gestionarEntregaExamen(${element.id_examen})" title='Confirmar Entrega de Examen'><i class='fas fa-thumbs-up' style='font-size:20px'></i></a>
        `;

        let dato = {
        codigo : element.id_examen,
        identificacion : element.identificacion,
        nombres :element.nombres,
        fecha :moment(element.fecha).format('LL') ,
        autorizacion :element.autorizacion,
        contrato :element.contrato,
        cups :element.cups,
        observacion :element.observacion,
        estado : element.estado.replace(/_/g, " "),

       
        Accion :accionBTN
                        }
                        arrayDatos.push(dato)
                        });
   
                        var table = $('#tabla_examenes').DataTable({
               "bInfo" : false,
               searching: true,
               paging: true,
               autoWidth: false,
               destroy: true,
               responsive: true,
               data: arrayDatos,
               columns: [
                           {"data": "codigo"},
                           {"data": "identificacion"},
                           {"data": "nombres"},
                           {"data": "fecha"},
                           {"data": "autorizacion"},
                           {"data": "contrato"},
                           {"data": "cups"},
                           {"data": "observacion"},  
                           {"data": "estado"},                     
                           {"data": "Accion"}
                       ]
      
                        });
        }
        if(data.status==404){ Mensaje.fire({icon: 'warning',title: data.message})}
        if(data.status==500){ Mensaje.fire({icon: 'error',title: data.message})} 
        
    });
   
}


function buscarExamenes(){


let dato =document.getElementById("dato").value;
if(dato==='') return alert('Digite la identificación  o la autorización a buscar');
const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

fetch(`/buscarExamenesListos/${dato}`, {
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

    data.examenes.forEach(element => {
    accionBTN =` <a class="btn btn-primary" href="javascript:imprimirResultados(${element.autorizacion})" title='Imprimir Resultados'><i class='fas fa-file-prescription'></i></a>
    <a class="btn btn-success" href="javascript:gestionarEntregaExamen(${element.id_examen})" title='Confirmar Entrega de Examen'>Entregado</a>
    `;

    let dato = {
    codigo : element.id_examen,
    identificacion : element.identificacion,
    nombres :element.nombres,
    fecha :moment(element.fecha).format('LL') ,
    autorizacion :element.autorizacion,
    contrato :element.contrato,
    cups :element.cups,
    observacion :element.observacion,
    estado : element.estado.replace(/_/g, " "),

   
    Accion :accionBTN
                    }
                    arrayDatos.push(dato)
                    });

                    var table = $('#tabla_examenes').DataTable({
           "bInfo" : false,
           searching: true,
           paging: true,
           autoWidth: false,
           destroy: true,
           responsive: true,
           data: arrayDatos,
           columns: [
                       {"data": "codigo"},
                       {"data": "identificacion"},
                       {"data": "nombres"},
                       {"data": "fecha"},
                       {"data": "autorizacion"},
                       {"data": "contrato"},
                       {"data": "cups"},
                       {"data": "observacion"},  
                       {"data": "estado"},                     
                       {"data": "Accion"}
                   ]
  
                    });
    }
    if(data.status==404){ Mensaje.fire({icon: 'warning',title: data.message})}
    if(data.status==500){ Mensaje.fire({icon: 'error',title: data.message})} 
    
});


















}



function entregarExamen(autorizacion){
    alert(autorizacion);
}

function imprimirResultados(id_examen){
   // alert(id_examen);
   Laboratorio(id_examen);
}



function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    const dia = hoy.getDate() - nacimiento.getDate();

    // Si el mes o día es negativo, significa que aún no ha cumplido años, así que restamos uno
    if (mes < 0 || (mes === 0 && dia < 0)) {
        edad--;
    }

    // Cálculo de los meses fraccionarios
    const mesesTranscurridos = (mes + 12) % 12 + (dia >= 0 ? dia / 30 : (dia + 30) / 30);
    const edadConDecimales = edad + mesesTranscurridos / 12;

    return edadConDecimales.toFixed(1); // Redondeamos a 2 decimales
}










function gestionarEntregaExamen(id_examen){
    Swal.fire({
        title: 'Se confirma entrega del examen al usuario',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            confirmarEntregaExamen(id_examen);
        } else if (result.isDenied) {
            Mensaje.fire({
                icon: 'warning',
                title: 'No se realizaron cambios en el estado'
                });
        }                       
    })

}


function confirmarEntregaExamen(id_examen){
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

        fetch(`/confirmarEntregaExamen/${id_examen}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`, // Envía el token en el encabezado de autorización
                    'Content-Type': 'application/x-www-form-urlencoded' // Especifica el tipo de contenido
                }
            })
        .then(resp =>resp.json())
        .then(data=>{
            if(data.status==403){window.location.href = "/";}
        
            if(data.status==200){Mensaje.fire({icon: 'success',title: data.message});
                listarExamenesListos(); 
            }
    
            if(data.status==404){Mensaje.fire({icon: 'warning',title: data.message});}
    
            if(data.status==500){Mensaje.fire({icon: 'error',title: data.message});}
          
        });

}

























