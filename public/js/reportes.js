

moment.defineLocale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    })



listarEmpresas();
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
      

        if(data.status==403){window.location.href = "/";}
        if(data.status==200){

        let html='';
        data.empresas.forEach(element => {

       html +=`<option value=${element.id_empresa}>${element.nombre}</option>`;
                        
                        });
   
         document.getElementById('empresas').innerHTML=html;
                       
        }
      
        
    });
   
}






function reporteUsuariosAtendidos(){

    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

    let fecha_inicio = document.getElementById('fecha_inicio').value;
    let fecha_fin = document.getElementById('fecha_fin').value;
    let empresa = document.getElementById('empresas').value;


    fetch(`/reporteUsuariosAtendidos/${fecha_inicio}/${fecha_fin}/${empresa}`, {
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
       fecha :moment.utc(element.fecha).format("YYYY-MM-DD"),
       autorizacion :element.autorizacion,
       precio :element.precio,
       contrato :element.contrato,
       empresa :element.empresa,
       sede: element.sede
        }
       arrayDatos.push(dato)
       });
       

   
           var table = $('#tabla_reporte_etendidos').DataTable({
            
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
                           {"data": "autorizacion"},
                           {"data": "sede"}
                          
                          
                          
                          
                       ]
      
                                   });

      
                                
    });
   
    
}





function reporteUsuariosAtendidosImprimir() {
    const token = localStorage.getItem('token');

    let fecha_inicio = document.getElementById('fecha_inicio').value;
    let fecha_fin = document.getElementById('fecha_fin').value;
    let empresa = document.getElementById('empresas').value;

    fetch(`/reporteUsuariosAtendidos/${fecha_inicio}/${fecha_fin}/${empresa}`, {
        method:'get',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(res => res.json())
    .then(data => {
        data = Array.isArray(data) ? data : [data];
        const doc = new jsPDF();

        const imgLogo = new Image();
        imgLogo.src = "/img/logo.jpg";

        imgLogo.onload = function () {
            // Dibuja logo al inicio
            doc.addImage(imgLogo, 'JPEG', 2, 1, 30, 20);

            // Encabezado y tabla
            let y = dibujarEncabezado(doc,data[0].empresa,data[0].contrato,data[0].nit,fecha_inicio,fecha_fin);

            var x1 = 3, x2 = 15, x3 = 65, x4 = 85, x5 = 100, x6 = 160, x7 = 175, x8 = 190;
            let aux_ident='', V_Subtotal=0, cant_exist=0, suma_total=0;

            data.forEach(element => {
                if (y > 270) {
                    doc.addPage();
                    doc.addImage(imgLogo, 'JPEG', 2, 1, 30, 20); // <-- redibuja logo en cada página
                    y = dibujarEncabezado(doc,data[0].empresa,data[0].contrato,data[0].nit,fecha_inicio,fecha_fin);
                }

                if(aux_ident != element.identificacion){
                    if(cant_exist == 0){ 
                        doc.setFontSize(9);
                        doc.text((x5), y, "SUBTOTAL : "); 
                        doc.text((x7), y, ""+V_Subtotal); 
                        doc.setFontSize(7);
                        V_Subtotal = 0;
                        y += 5;
                    }
                    doc.text((x1), y, ""+element.autorizacion);
                    doc.text((x2), y, ""+element.nombres); 
                    doc.text((x3), y, ""+element.identificacion); 
                    aux_ident = element.identificacion;
                    cant_exist++;
                }
                if(aux_ident === element.identificacion){
                    V_Subtotal += Number(element.precio);
                    cant_exist = 0;
                }

                doc.text((x4), y, ""+element.codigo); 
                doc.text((x5), y, ""+element.examen.substring(0,40)); 
                doc.text((x6), y, ""+element.cantidad); 
                doc.text((x7), y, ""+element.precio); 
                doc.text((x8), y, ""+element.sede); 

                suma_total += Number(element.precio);
                y += 5;
            });

            doc.text((x6), y, "TOTAL EMPRESA :" + suma_total);

            doc.save("Reporte.pdf");
        };
    });
}



function dibujarEncabezado(doc,empresa,contrato,nit,f1,f2) {
    doc.setFontSize(14);
    doc.text(35, 11,'LABORATORIO CLINICO ESPECIALIZADO DEL SUR SAS');
    doc.setFontSize(7);
    doc.text(90, 15,'N.I.T. 901832735-3');

    // Logo
    const imgUrlLogo = "/img/logo.jpg"; 
    const imgLogo = new Image();
    imgLogo.src = imgUrlLogo;
    imgLogo.onload = function () {
        doc.addImage(imgLogo, 'JPEG', 2, 1, 30, 20);
    };

    var x1 = 3, x2 = 15, x3 = 65, x4 = 85, x5 = 100, x6 = 160, x7 = 175, x8 = 190;
    doc.setFontSize(10);
    doc.text((x1),30, "EPRESA :"+empresa); 
     doc.text((x1),35, "NIT :"+nit); 
    doc.text((x1),40, "CONTRATO :"+contrato); 
    doc.text((x1),45, "PERIODO : DESDE EL "+f1+" HASTA EL "+f2); 
    doc.setFontSize(7);
    doc.line(1,50,209,50); 
    doc.text(x1,54, 'No');
    doc.text(x2,54, 'Usuario');
    doc.text(x3,54, 'Identidad');
    doc.text(x4,54, 'Codigo');
    doc.text(x5,54, 'Nombre Servicio');
    doc.text(x6,54, 'Cantidad');
    doc.text(x7,54, 'Valor');
    doc.text(x8,54, 'Sede');
    doc.line(1,55,305,55); 

    return 60 ; // posición inicial para el contenido
}
