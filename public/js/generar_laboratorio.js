

moment.defineLocale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    });






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

    const token = localStorage.getItem('token'); 
    const firma_bacteriologo = await firmaLaboratorioBacteriologo(token);

    const firmas = {
      bacteriologos: [],
      administrador: null
    };

    if (firma_bacteriologo && firma_bacteriologo.length > 0) {
      firma_bacteriologo.forEach(f => {
        if (f.rol === 'Bacteriologo' && firmas.bacteriologos.length < 2) {
          firmas.bacteriologos.push({
            nombre: f.nombre,
            cedula: f.identificacion,
            imagen: f.firma
          });
        }
        if (f.rol === 'Administrador' && !firmas.administrador) {
          firmas.administrador = {
            nombre: f.nombre,
            cedula: f.identificacion,
            imagen: f.firma
          };
        }
      });
    }

    // Aseguramos que siempre haya 2 bacteriólogos y 1 admin, aunque sea con datos vacíos
    while (firmas.bacteriologos.length < 2) {
      firmas.bacteriologos.push({ nombre: '', cedula: '', imagen: null });
    }
    if (!firmas.administrador) {
      firmas.administrador = { nombre: '', cedula: '', imagen: null };
    }
    
    console.log('✅ Firmas procesadas:', firmas);
  

   await fetch('/generarLaboratorio/' + id_autorizacion, {
  method: 'get',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
  .then(res => res.json())
  .then(data => {
    if (data) {
     // console.log(data);
      const doc = new jsPDF();

      const imgUrlLogo = `/img/logo.jpg`;
      const imgLogo = new Image();
      imgLogo.src = imgUrlLogo;

      const pageHeight = 290;
      const margin = 10;

      // === Función para dibujar logo en cada página ===
      const dibujarLogo = (doc) => {
        doc.addImage(imgLogo, 'JPEG', 2, 1, 30, 20); // esquina superior izquierda
      };

      // === Función para añadir nueva página con encabezado ===
      const nuevaPagina = (doc, element) => {
        doc.addPage();
        dibujarLogo(doc);
        return dibujarEncabezado(doc, element); // Dibuja el encabezado y devuelve la nueva posición 'y'
      };

      // Esperar a que el logo cargue antes de generar el contenido
      imgLogo.onload = () => {
        let y = 10;
      

        data.forEach(element => {
          // Dibuja logo y encabezado en la primera página
          dibujarLogo(doc);
          y = dibujarEncabezado(doc, element);

          const examenes = element.examen;
          let texto_area = '';

          for (const examen of examenes) {
            y += 5;

            if (y > pageHeight - margin) {
              y = nuevaPagina(doc, element);
            }

            const pageWidth = 210;
            const cupsText = examen.procedimiento.area.nombre.toUpperCase();

            if (cupsText !== texto_area) {
              texto_area = cupsText;
              const fontSize = 12;
              const textWidth = (doc.getStringUnitWidth(cupsText) * fontSize) / doc.internal.scaleFactor;
              const centeredX = (pageWidth - textWidth) / 2;

              doc.setFillColor(25, 60, 184);
              const rectHeight = 7;
              const rectY = y - 5;
              doc.rect(0, rectY, pageWidth, rectHeight, 'F');

              doc.setTextColor(255, 255, 255);
              doc.setFontSize(fontSize);
              doc.text(centeredX, y, cupsText);

              y += 7;
              doc.setTextColor(0, 0, 0);
              doc.setFontSize(9);
              doc.setFont("helvetica", "bold");
              doc.text(10, y, 'PARÁMETROS');
              doc.text(70, y, 'RESULTADOS');
              doc.text(110, y, 'UNIDADES');
              doc.text(135, y, 'VALOR DE REFERENCIA');
              doc.text(180, y, 'METODO');
              doc.setFont("helvetica", "normal");
              doc.setFontSize(8);
              y += 5;
            }

            const resultados = examen.resultado;
            let tipo_parametro = '';

            for (const resultado of resultados) {
              if (resultado.estado === 'Pendiente') continue;

              if (resultado.parametro.tipo_parametro.nombre.trim() !== tipo_parametro.trim()) {
                tipo_parametro= resultado.parametro.tipo_parametro.nombre.trim();
                y += 2;
                doc.setFont("helvetica", "bold");
                doc.text(10, y, `${resultado.parametro.tipo_parametro.nombre.toUpperCase()}`);
                doc.setFont("helvetica", "normal");
                y += 6;
              }

              doc.text(13, y, `${resultado.parametro.nombre}`);
              doc.text(70, y, `${resultado.resultado}`);
              doc.text(110, y, `${resultado.parametro.unidad}`);
              doc.text(180, y, `${examen.procedimiento.tecnica || ''}`);
              const valorReferenciaMaxWidth = 40;
              // Por estas líneas:
              const valorReferencia = `${resultado.parametro.valor_referencia}`;
              const valorReferenciaLines = doc.splitTextToSize(valorReferencia, valorReferenciaMaxWidth);
              doc.text(135, y, valorReferenciaLines);

              // Si el texto ocupa más de una línea, ajusta y para la siguiente fila:
              const lineCount = valorReferenciaLines.length;
              y += 4 * (lineCount > 1 ? lineCount : 1); 


             
              //y += 4;

              if (y > pageHeight - margin) {
                y = nuevaPagina(doc, element);
              }
            }// fin del for de resultados
           
           if (examen.observacion && examen.observacion.trim() !== '') {
                y += 5;
                doc.text(10, y, `Nota : ${examen.observacion}`);
              }
                          
            y += 2;

            if (y > pageHeight - margin) {
              y = nuevaPagina(doc, element);
            }
          }// fin del forde examenes

         
        });




        // === FIRMAS Y PIE DE PÁGINA ===
        const imgUrls = [
          firmas.bacteriologos[0]?.imagen ? `/img/firmas/${firmas.bacteriologos[0].imagen}` : null,
          firmas.bacteriologos[1]?.imagen ? `/img/firmas/${firmas.bacteriologos[1].imagen}` : null,
          firmas.administrador?.imagen ? `/img/firmas/${firmas.administrador.imagen}` : null,
        ];

        function cargarImagen(url) {
          return new Promise((resolve) => {
            if (!url) return resolve(null);
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = () => {
              console.warn(`❌ No se pudo cargar la imagen: ${url}`);
              resolve(null);
            };
            img.src = url;
          });
        }

        Promise.all(imgUrls.map(cargarImagen)).then(([img1, img2, img3]) => {
          const pageHeight = doc.internal.pageSize.height;
          const pageWidth = doc.internal.pageSize.width;
          const firmaW = 35;
          const firmaH = 14;
          const alturaFirmas = 60;
          let yActual = y + 30;

          if (yActual + alturaFirmas > pageHeight - 20) {
            yActual = nuevaPagina(doc, data[0]); // Usamos la nueva función y yActual ahora tiene la posición correcta después del encabezado.
          }

          doc.setFontSize(7);
          const lineStep = 3.5;

          const dibujarFirma = (img, data, x, y, areaText) => {
            if (img) doc.addImage(img, 'PNG', x, y, firmaW, firmaH);
            const yTexto = y + firmaH + 4;
            doc.text(x + 2, yTexto, `Validado por`);
            doc.text(x + 2, yTexto + lineStep, `${data.nombre || ''}`);
            doc.text(x + 2, yTexto + lineStep * 2, `C.C. ${data.cedula || ''}`);
            doc.text(x + 2, yTexto + lineStep * 3, `Bacteriólogo(a)`);
            if (areaText) {
              doc.text(x + 2, yTexto + lineStep * 4, areaText);
            }
          };

          // Firma Izquierda
          dibujarFirma(img1, firmas.bacteriologos[0], 25, yActual, `Área: Microscopía-Hematología-Microbiología`);

          // Firma Derecha
          dibujarFirma(img2, firmas.bacteriologos[1], 130, yActual, `Área: Química-Inmunología-Pruebas Especiales`);

          // Firma Central (Administrador)
          const xCentrada = (pageWidth - firmaW) / 2;
          const yAdmin = yActual + 25;
          if (img3) doc.addImage(img3, 'PNG', xCentrada, yAdmin, firmaW, firmaH);
          const yTextoAdmin = yAdmin + firmaH + 4;
          const linesAdmin = [
            `Verificado por`,
            `${firmas.administrador.nombre || ''}`,
            `C.C. ${firmas.administrador.cedula || ''}`,
            `Bacteriólogo(a)`
          ];
          for (let i = 0; i < linesAdmin.length; i++) {
            const line = linesAdmin[i];
            const tw = (doc.getStringUnitWidth(line) * doc.internal.getFontSize()) / doc.internal.scaleFactor;
            const xLine = (pageWidth - tw) / 2;
            doc.text(xLine, yTextoAdmin + i * lineStep, line);
          }

          // === PIE DE PÁGINA ===
          const footerText = `CALLE 5 N. 1 A 57 Aguablanca 8353365 - PITALITO - HUILA`;
          const textWidth = (doc.getStringUnitWidth(footerText) * doc.internal.getFontSize()) / doc.internal.scaleFactor;
          const centeredX = (pageWidth - textWidth) / 2;
          doc.text(centeredX, pageHeight - 15, footerText);

          doc.save(`${data[0].autorizacion}.pdf`);
        });
      };
    }
  });


    



    }
    




function dibujarEncabezado(doc, element, yInicial = 10) {
    let y = yInicial;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(35, y, 'LABORATORIO CLINICO ESPECIALIZADO DEL SUR IPS S.A.S.');
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    y += 5;
    doc.text(90, y, 'N.I.T. 901832735-3');

  doc.setFontSize(10);
  doc.setFontSize(12);
  doc.text(180, y + 2, element.autorizacion);
  // Línea horizontal de lado a lado después del encabezado
  doc.setDrawColor(60, 60, 60);
  doc.setLineWidth(0.5);
  doc.line(10, y + 7, 200, y + 7); // línea de lado a lado
  y += 12; // espaciado extra debajo de la línea

  doc.setFontSize(9);

  //primera fila del encabezado
  doc.text(10, y, 'Identificación :');
  doc.text(35, y, element.paciente.identificacion);
  doc.text(80, y, 'Email :');
  doc.text(95, y, element.paciente.email.slice(0, 23));
  doc.text(150, y, 'Fecha :');
  doc.text(170, y, moment(element.fecha).format('DD-MM-YYYY HH:mm:ss'));
  y += 5;
  //segunda fila del encabezado
  doc.text(10, y, 'Nombres :');
  doc.text(35, y, element.paciente.nombres.slice(0, 22));
  doc.text(80, y, 'Edad :');
  let edad = calcularEdad(element.paciente.fecha_nacimiento);
  doc.text(95, y, `${edad.años} Años, ${edad.meses} Meses`);
  doc.text(150, y, 'Empresa :');
  doc.text(170, y, element.contrato.empresa.nombre);
  y += 5;
  //tercera fila del encabezado
  doc.text(10, y, 'Telefono :');
  doc.text(35, y, element.paciente.telefono);
  doc.text(80, y, 'Sexo :');
  doc.text(95, y, element.paciente.sexo);
  doc.text(150, y, 'Contrato :');
  doc.text(170, y, element.contrato.nombre);
  y += 5;
  //cuarta fila del encabezado
  doc.text(10, y, 'Dirección :');
  doc.text(35, y, element.paciente.direccion.slice(0, 22));
  doc.text(80, y, 'Eps :');
  doc.text(95, y, element.paciente.eps.nombre);
  doc.text(150, y, 'Tipo :');
  doc.text(170, y, element.paciente.tipo_paciente.replace(/_/g, " "));
  // Línea horizontal de lado a lado después de 'Tipo'
  doc.setDrawColor(60, 60, 60);
  doc.setLineWidth(0.5);
  doc.line(10, y + 4, 200, y + 4);
  y += 10; // espaciado extra debajo de la línea
  return y;
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
