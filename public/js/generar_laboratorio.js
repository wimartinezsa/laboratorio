

moment.defineLocale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    })






    async function firmaLaboratorioBacteriologo(token) {
        try {
           // Asegúrate de que el token esté almacenado con la clave correcta
            const response = await fetch('/firmaLaboratorioBacteriologo', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
    
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }
    
            const data = await response.json();
            return data; // Retorna la data correctamente
        } catch (error) {
            console.error("Error al obtener la firma:", error);
            return null; // En caso de error, retorna null o maneja según necesites
        }
    }





    let  Laboratorio= async(id_autorizacion)=>{
        /* ============fecha formateada==================== */
        var fecha = new Date();
        var ano = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;
        var dia = fecha.getDate();
        if (mes < 10) { mes = "0" + mes }
        if (dia < 10) { dia = "0" + dia }
        var fechaFormat = dia + "/" + mes + "/" + ano;
        /* ===================================================== */
    let nombre_bacteriologo1='';
    let cedula_bacteriologo1='';
    let imagen_bacteriologo1='';

    let nombre_bacteriologo2='';
    let cedula_bacteriologo2='';
    let imagen_bacteriologo2='';


    const token = localStorage.getItem('token'); 
    const firma_bacteriologo = await firmaLaboratorioBacteriologo(token);

    if(firma_bacteriologo.length>0){
        for( i=0;i<firma_bacteriologo.length;i++){
            if(i===0){
                nombre_bacteriologo1=firma_bacteriologo[0].nombre;
                cedula_bacteriologo1=firma_bacteriologo[0].identificacion;
                imagen_bacteriologo1=firma_bacteriologo[0].firma;

            }
            if(i===1){
                nombre_bacteriologo2=firma_bacteriologo[1].nombre;
                cedula_bacteriologo2=firma_bacteriologo[1].identificacion;
                imagen_bacteriologo2=firma_bacteriologo[1].firma;

            }
           
        }
        firma_bacteriologo.forEach(element=>{
            
        })
    }
  

   

    await  fetch('/generarLaboratorio/' + id_autorizacion, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`, // Envía el token en el encabezado de autorización
                'Content-Type': 'application/x-www-form-urlencoded' // Especifica el tipo de contenido
            }
        })
            .then(res => res.json())
            .then(data => {

                
                if (data) {

                   
                    const doc = new jsPDF();
                    

                    let y = 10; // Posición inicial vertical
                    const pageHeight = 290; // Altura de la página (A4)
                    const margin = 10; // Margen adicional para evitar desbordamientos
                    
    
                    data.forEach( element=> {
                        // Información básica

                       

                        doc.setFontSize(14);
                        doc.text(35, y, 'LABORATORIO CLINICO ESPECIALIZADO DEL SUR IPS S.A.S.');
                        doc.setFontSize(9);
                        y += 5;
                        doc.text(90, y, 'N.I.T. 901832735-3');


                        doc.setFontSize(10);
                       // doc.text(10, y, `Autorización: ${element.autorizacion}`);
                       doc.setFontSize(12);
                        doc.text(180,y+2, element.autorizacion);
                        doc.line(178,y+3,190, y+3); // horizontal line
                        y += 10;

                        doc.setFontSize(9);
                      
    
                        if (y > pageHeight - margin) { // Verificar si es necesario agregar una nueva página
                            doc.addPage();
                            y = 10; // Reiniciar la posición vertical
                        }
    
                         //primara fila del encabezado
                        doc.text(10,y,'Identificación :');
                        doc.text(35,y,element.paciente.identificacion);
                        doc.text(80,y,'Email :');
                        doc.text(95,y,element.paciente.email.slice(0, 23));
                        doc.text(150,y,'Fecha :');
                        doc.text(170,y,moment(element.fecha).format('DD-MM-YYYY HH:mm:ss'));
                        y += 5;
                        //segundo fila del encabezado
                        doc.text(10,y,'Nombres :');    
                        doc.text(35,y, element.paciente.nombres.slice(0,22));

                        doc.text(80,y,'Edad :');    
                        let edad= calcularEdad(element.paciente.fecha_nacimiento);
                        
                        doc.text(95,y,`${edad.años} Años, ${edad.meses} Meses` );

                        doc.text(150,y,'Empresa :');
                        doc.text(170,y, element.contrato.empresa.nombre);

                        y += 5;
                        //tercera fila del encabezado
                        doc.text(10,y,'Telefono :');
                        doc.text(35,y, element.paciente.telefono);

                        doc.text(80,y,'Sexo :');
                        doc.text(95,y,element.paciente.sexo);

                        doc.text(150,y,'Contrato :');
                        doc.text(170,y,element.contrato.nombre );
                        y += 5;
                        //cuarta fila del encabezado
                        doc.text(10,y,'Dirección :');
                        doc.text(35,y, element.paciente.direccion.slice(0, 22));
         
                        doc.text(80,y,'Eps :');
                        doc.text(95,y,element.paciente.eps.nombre);

                        doc.text(150,y,'Tipo :');
                        //data.paciente.tipo_paciente.replace(/_/g, " ").substring(0, 22)
                        doc.text(170,y,element.paciente.tipo_paciente.replace(/_/g, " ") );

                        y += 5;
                        // Revisión de salto de página
                        if (y > pageHeight - margin) {
                            doc.addPage();
                            y = 10;
                        }
    
                        const examenes = element.examen;
                        let texto_area='';
                        for (const examen of examenes) {
                            // Título del examen
                           
                            y += 5;

                            
                            if (y > pageHeight - margin) {
                                doc.addPage();
                                y = 35;
                            }
                          
                                // Centrar el texto del CUPS en la página
                                const pageWidth = 210; // Ancho típico para A4 en mm
                                
                                const cupsText = examen.procedimiento.area.nombre.toUpperCase();

                                if (cupsText != texto_area){
                                    texto_area= examen.procedimiento.area.nombre.toUpperCase();
                                

                               // const cupsText = examen.procedimiento.cups.nombre.toUpperCase();
                                const fontSize = 12; // Tamaño de fuente para el título del CUPS
                                const textWidth = (doc.getStringUnitWidth(cupsText) * fontSize) / doc.internal.scaleFactor;
                                const centeredX = (pageWidth - textWidth) / 2;

                                // Configurar color de relleno (gris claro)
                                doc.setFillColor(51, 184, 255); // RGB para gris claro
                                const rectHeight = 7; // Altura del rectángulo
                                const rectX = 0; // Inicia en el borde izquierdo de la hoja
                                const rectY = y - 5; // Posición Y del rectángulo

                                // Dibujar el rectángulo con ancho completo de la hoja
                                doc.rect(rectX, rectY, pageWidth, rectHeight, 'F'); // 'F' para relleno

                                // Imprimir el texto centrado dentro del rectángulo
                                doc.setFontSize(fontSize); // Establecer el tamaño de la fuente
                                doc.text(centeredX, y, cupsText);
                            }
                            
                                // Línea horizontal debajo del nombre del CUPS

                               y += 7;
                               
                               doc.text(10, y, `${examen.procedimiento.cups.nombre.toUpperCase()}`);
                               y += 2;
                                doc.line(10, y, 200, y); // Línea horizontal completa del documento
                                y += 5;
                            
                                doc.setFontSize(9);
                                doc.text(10, y, 'PARÁMETROS');
                                doc.text(70, y, 'RESULTADOS');
                                doc.text(110, y, 'UNIDADES');
                                doc.text(135, y, 'VALOR DE REFERENCIA');
                                doc.setFontSize(8); // Tamaño de fuente estándar

                                y += 2;
                                doc.line(10, y, 200, y); // Línea horizontal completa del documento
                                y += 5;
                                const resultados = examen.resultado; 
                                
                            if (y > pageHeight - margin) {
                                doc.addPage();
                                y = 35;
                            }
    
                            // Resultados
                            doc.setFontSize(8);
                            
                            let tipo_parametro='';
                            for (const resultado of examen.resultado) {

                                if(resultado.estado==='Pendiente') continue;
                               
                                 const valorReferencia = `${resultado.parametro.valor_referencia}`;
                                //const maxWidth = 50; // Ancho máximo para la columna "VALOR DE REFERENCIA"

                                // Usamos una expresión regular para dividir el texto en partes cada vez que encontremos una letra mayúscula
                                const valorReferenciaParts = valorReferencia.split(/;/); // La expresión regular divide justo antes de la mayúscula
                                
                                const valorReferenciaLines = valorReferenciaParts.map(part => {
                                    return doc.splitTextToSize(part.trim(), 60); // Trim para eliminar espacios adicionales
                                });
                                

                                 // Aplanar el array de líneas (ya que splitTextToSize devuelve un array para cada parte)
                                const formattedValorReferencia = valorReferenciaLines.flat().join('\n'); // Unir todo con salto de línea

                                //console.log(valorReferenciaLines.length)
                                
                                
                                //&& resultado.parametro.tipo_parametro.id_parametro!='1'
                                if( (resultado.parametro.tipo_parametro.nombre.trim() !== tipo_parametro.trim())  ){
                                    y += 2;
                                    doc.setFont("helvetica", "bold"); // Establece la fuente en negrita
                                    doc.text(10, y, `${resultado.parametro.tipo_parametro.nombre.toUpperCase()}`); // Columna 1
                                    doc.setFont("helvetica", "normal");
                                    tipo_parametro=resultado.parametro.tipo_parametro.nombre;
                                    y += 6;
                                }

                               

                                doc.text(13, y, `${resultado.parametro.nombre.toLocaleLowerCase().replace(/\b\w/g, letra => letra.toLocaleUpperCase())}`); // Columna 1
                                doc.text(70, y, `${resultado.resultado}`);     // Columna 2
                                doc.text(110, y, `${resultado.parametro.unidad}`);                       // Columna 3 (Placeholder)
                                doc.text(135, y, `${formattedValorReferencia}`);                       // Columna 4 (Placeholder)
                                    // Dibujar línea horizontal después de la fila

                               
                                y += 4;
                                

                                if (y > pageHeight - margin) {
                                    doc.addPage();
                                    y = 35;
                                }
                              
                               
                               
                            }
                        
                            doc.line(10, y, 200, y); // Línea horizontal completa del documento
                            y+=3; 
                            doc.text(10, y, `Metodo : ${examen.procedimiento.tecnica ===null ? '':examen.procedimiento.tecnica}`);  
                            y+=3; 
                           // doc.text(10, y, `Fecha/Hora Resultado : ${moment(examen.fecha_resultado).format('LLLL') }`);  
                           // y+=3; 
                           
                            doc.text(10, y, `Validó : ${examen.profesional}`);  
                            y+=5; 
                           
                            doc.text(10, y, `NOTA : * ${examen.observacion}`);  
                            y+=2; 

                            if (y > pageHeight - margin) {
                                doc.addPage();
                                y = 35;
                            }
                           
                        }

                       
                      

                    });


                    y += 45;
                    doc.setFontSize(10);
                    // Obtén las dimensiones de la página
                    const pageWidth = doc.internal.pageSize.width;
                    // Línea horizontal centrada
                    
                  
                    // Función para calcular la posición X centrada
                    function getCenteredX(text) {
                        const textWidth =
                            (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
                            doc.internal.scaleFactor;
                        return (pageWidth - textWidth) / 2;
                    }

                    if (y > pageHeight - margin) {
                        doc.addPage();
                        y = 35;
                    }

                    // Firma del primer bacteriologo
                    let text = `${nombre_bacteriologo1}`;
                    doc.text(30, y, text);
                    y += 3;
                    
                    text = `C.C. ${cedula_bacteriologo1}`;
                    doc.text(30, y, text);
                    y += 3;
                    
                    text = `Bacteriólogo(a) UCMC`;
                    doc.text(30, y, text);
                    y -= 6;

                     // Firma del segundo bacteriologo
                    text = `${nombre_bacteriologo2}`;
                     doc.text(135, y, text);
                     y += 3;
                     
                     text = `C.C. ${cedula_bacteriologo2}`;
                     doc.text(135, y, text);
                     y += 3;
                     
                     text = `Bacteriólogo(a) UCMC`;
                     doc.text(135, y, text);

                        
                    // Se definen las URLs de las imágenes
                    const imgUrlFirma1 = `/img/firmas/${imagen_bacteriologo1}`;
                    const imgUrlFirma2 = `/img/firmas/${imagen_bacteriologo2}`;
                    const imgUrlLogo = `/img/logo.jpg`; // Asegúrate de que esta URL sea válida

                    // Crear las instancias de imágenes
                    const imgFirma1 = new Image();
                    const imgFirma2 = new Image();
                    const imgLogo = new Image();

                    // Función que espera a que ambas imágenes se carguen
                    const cargarImagenes = () => {
                        let imagenesCargadas = 0;

                        const verificarCarga = () => {
                            imagenesCargadas++;
                            if (imagenesCargadas === 2) {
                                // Una vez que ambas imágenes están cargadas, agrégalas al PDF
                               doc.addImage(imgFirma1, 'JPEG', 30, y - 30, 40, 20); // Ajusta las posiciones y tamaños según necesites
                             doc.addImage(imgFirma2, 'JPEG', 135, y - 30, 40, 20); // Ajusta las posiciones y tamaños según necesites
                                
                                doc.addImage(imgLogo, 'JPEG',2,1,30, 20);      // Ejemplo de otra posición
                                // Guardar o continuar trabajando con el PDF
                                doc.save(`${data[0].autorizacion}.pdf`);
                            }
                        };
                        // Asignar eventos onload a ambas imágenes
                        imgFirma1.onload = verificarCarga;
                        imgFirma2.onload = verificarCarga;
                        imgLogo.onload = verificarCarga;

                        // Establecer las URLs para iniciar la carga
                        imgFirma1.src = imgUrlFirma1;
                        imgFirma2.src = imgUrlFirma2;
                        imgLogo.src = imgUrlLogo;
                    };

                    // pie de pagina
                    
                    text = `CALLE 5 N. 1 A 57 Aguablanca 8353365 - PITALITO - HUILA`;
                    doc.text(getCenteredX(text),290, text);
                    cargarImagenes();
                   
                }// fin del if
            });
    }
    


  
    function calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
    
        let edadAnios = hoy.getFullYear() - nacimiento.getFullYear();
        let meses = hoy.getMonth() - nacimiento.getMonth();
        let dias = hoy.getDate() - nacimiento.getDate();
    
        // Ajustar los años y meses si el mes actual es anterior al mes de nacimiento
        if (meses < 0 || (meses === 0 && dias < 0)) {
            edadAnios--;
            meses += 12; // Ajustar el cálculo de meses
        }
    
        // Ajustar días si es necesario
        if (dias < 0) {
            const diasDelMesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
            dias += diasDelMesAnterior;
            meses--;
        }
    
        // Asegurar que los meses sean positivos
        if (meses < 0) {
            meses += 12;
        }
    
        return {
            años: edadAnios,
            meses: meses
        };
    }





