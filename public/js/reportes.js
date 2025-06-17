

moment.defineLocale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    })




function reporteUsuariosAtendidos(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    let fecha_inicio = document.getElementById('fecha_inicio').value;
    let fecha_fin = document.getElementById('fecha_fin').value;
    fetch(`/reporteUsuariosAtendidos/${fecha_inicio}/${fecha_fin}`, {
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
          //  window.location.href = "/";
        }
    })
    .then(data => {

        //console.log(data);

   
        let arrayDatos=[];
   
    data = Array.isArray(data) ? data : [data];
   
 // console.log(data);
       data.forEach(element => {
      
    let dato = {
       identificacion :element.identificacion,
       nombres : element.nombres,
       examen :element.examen,
       fecha :moment(element.fecha).format('DD/MM/YYYY'),
       autorizacion :element.autorizacion,
       precio :element.precio,
       contrato :element.contrato,
       empresa :element.empresa
        }
       arrayDatos.push(dato)
       });
       

   
           var table = $('#tabla_reporte_etendidos').DataTable({
             dom: 'Bfrtip', // Agrega botones en la interfaz
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fas fa-file-excel"></i> Exportar a Excel',
                        className: 'btn btn-info', // Clase CSS opcional
                        title: 'Reporte de Clientes Atendidos '+fecha_inicio + ' Al '+fecha_fin, // Título del archivo
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
                           {"data": "identificacion"},
                           {"data": "nombres"},
                           {"data": "examen"},
                           {"data": "fecha"},
                            {"data": "empresa"},
                            {"data": "contrato"},
                            {"data": "precio"},
                           {"data": "autorizacion"}
                          
                          
                          
                          
                       ]
      
                                   });

      
                                
    });
   
    
}
