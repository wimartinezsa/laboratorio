

moment.defineLocale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    })




function Facturar(id_factura){
    /* ============fecha formateada==================== */
    var fecha = new Date();
    var ano = fecha.getFullYear();
    var mes = fecha.getMonth()+1;
    var dia = fecha.getDate();
    if(mes < 10){mes="0"+mes}
    if(dia < 10){dia="0"+dia}
    var fechaFormat=dia+"/"+mes+"/"+ano;
    /* ===================================================== */
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado con la clave correcta

  
    fetch('/generarFactura/'+id_factura,{
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
        .then(data=>{
            if(data){
                var ident = data.autorizacion;
                /* factura sencilla */
                const doc = new jsPDF();
                doc.rect(1,6, 208, 120); // empty square
                /* ===contenido==== */ 
                doc.setFontSize(14);
                doc.text(35, 11,'LABORATORIO CLINICO ESPECIALIZADO MIRYAM CAMACHO ');
                doc.setFontSize(9);
                doc.text(90, 15,'N.I.T. 901832735-3');
                /* =====pasar a string====== */


                doc.setFontSize(10);
                doc.text(10,30,'Identificacion');
               
                doc.text(40,30,data.paciente.identificacion+'');
              
                

                doc.text(90,30,'Autorización');
              
                doc.text(120,30, data.autorizacion);

            
                doc.text(165,30,'Recibo: ' + data.id_factura);

                

               
                doc.text(10,36,'Nombres');
              
                doc.text(40,36, data.paciente.nombres.substring(0,28));

               
                doc.text(90,36,'Contrato');
              
                doc.text(120,36, data.contrato.nombre.substring(0,30));
              
            
                doc.text(165,36,moment(data.fecha).format('LL'));

                doc.text(10,42,'Telefono');
                doc.text(40,42, data.paciente.telefono);

            
                doc.text(90,42,'Tipo');
             
                doc.text(120,42, data.paciente.tipo_paciente.replace(/_/g, " ").substring(0, 22));
               
                doc.text(165,42,'Estado: ' + data.estado.replace(/_/g, " "));

              
                doc.text(10,47,'Dirección');
                doc.text(40,47, data.paciente.direccion.substring(0,30));
         
                doc.text(90,47,'Eps');
                doc.text(120,47, data.paciente.eps.nombre.replace(/_/g, " ").substring(0, 22));
               


                var x1 = 3;
                var x2 = 65;
                var x3 = 135;
                var x4 = 170;
                var x5 = 188;
                doc.line(1,50,209, 50); // horizontal line
                doc.text(x1,54, 'Codigo');
                doc.text(x2,54, 'Examen');
                doc.text(x3,54, 'Cantidad');
                doc.text(x4,54, 'valor');
                doc.text(x5,54, 'SubTotal');
                doc.line(1,55,209, 55); // horizontal line
                /* posicionamiento */
                var y=60;
                var total=0;
                doc.setFontSize(10);
             
                data.examen.forEach((examen, index) => {

                        if (examen.procedimiento.cups) {
                            doc.text((x1+2),y,""+examen.procedimiento.cups.codigo);
                            doc.text((x2-40),y,""+examen.procedimiento.cups.nombre); 
                        }


                        doc.text((x3+5),y,""+examen.cantidad); 
                        doc.text((x4-1),y,""+examen.precio); 
                        doc.text((x5),y,""+(Number(examen.cantidad)*Number(examen.precio))); 
                      
                        y=y+5;
                    });
                  

                  
              
                    doc.line(1,120,209, 120); // horizontal line
                    doc.setFontSize(12);
                    doc.text(174,125,'TOTAL : $'+ data.total);
               
                /* formato numero */

            /*  
                total = total.toLocaleString('es')
                doc.setFontSize(12);
                doc.text(162,134,'Total: ');
                doc.setFontSize(12);
                doc.text(175,134,'$ '+total);
*/
                
                doc.save("Factura.pdf");
            }
        });
} 