

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
    let cedula_bacteriologo1='';
    let imagen_bacteriologo1='';

    let nombre_bacteriologo2='';
    let cedula_bacteriologo2='';
    let imagen_bacteriologo2='';

    let nombre_admin='';
    let cedula_admin='';
    let imagen_admin='';


    const token = localStorage.getItem('token'); 
    const firma_bacteriologo = await firmaLaboratorioBacteriologo(token);

    //console.log(firma_bacteriologo);


    if(firma_bacteriologo.length>0){
      
      
      if (firma_bacteriologo.length > 0) {
  for (let i = 0; i < firma_bacteriologo.length; i++) {
    const f = firma_bacteriologo[i];
    if (f.rol === 'Bacteriologo') {
      if (!nombre_bacteriologo1) {
        nombre_bacteriologo1 = f.nombre;
        cedula_bacteriologo1 = f.identificacion;
        imagen_bacteriologo1 = f.firma;
      } else {
        nombre_bacteriologo2 = f.nombre;
        cedula_bacteriologo2 = f.identificacion;
        imagen_bacteriologo2 = f.firma;
      }
    }
    if (f.rol === 'Administrador') {
      nombre_admin = f.nombre;
      cedula_admin = f.identificacion;
      imagen_admin = f.firma;
    }
  }

  console.log('✅ Bacteriólogo 1:', nombre_bacteriologo1);
  console.log('✅ Bacteriólogo 2:', nombre_bacteriologo2);
  console.log('✅ Administrador:', nombre_admin);
}









        
    }
  

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
              doc.addPage();
              dibujarLogo(doc); // dibuja logo en nueva página
              y = dibujarEncabezado(doc, element);
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
                doc.addPage();
                dibujarLogo(doc); // logo en nueva página
                y = dibujarEncabezado(doc, element);
              }
            }// fin del for de resultados
           
           if (examen.observacion && examen.observacion.trim() !== '') {
                y += 5;
                doc.text(10, y, `Nota : ${examen.observacion}`);
              }
                          
            y += 2;

            if (y > pageHeight - margin) {
              doc.addPage();
              dibujarLogo(doc); // logo en nueva página
              y = dibujarEncabezado(doc, element);
            }
          }// fin del forde examenes

         
        });




     // === FIRMAS Y PIE DE PÁGINA ===
const imgUrls = [
  `/img/firmas/${imagen_bacteriologo1}`,
  `/img/firmas/${imagen_bacteriologo2}`,
  `/img/firmas/${imagen_admin}`
];

const nombres = [nombre_bacteriologo1, nombre_bacteriologo2, nombre_admin];
const cedulas = [cedula_bacteriologo1, cedula_bacteriologo2, cedula_admin];
const roles = ["Bacteriólogo(a)", "Bacteriólogo(a)", "Administrador"];

function cargarImagen(url, nombre) {
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

Promise.all([
  cargarImagen(imgUrls[0], "Bacteriólogo 1"),
  cargarImagen(imgUrls[1], "Bacteriólogo 2"),
  cargarImagen(imgUrls[2], "Administrador")
]).then(([img1, img2, img3]) => {
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  // tamaño original: 50x20 -> reducir 30%
  const firmaWidth = 50;
  const firmaHeight = 20;
  const scale = 0.7; // reducción del 30%
  const firmaW = Math.round(firmaWidth * scale);
  const firmaH = Math.round(firmaHeight * scale);

  // 🔹 Altura total que ocuparán las firmas (ajustada)
  const alturaFirmas = Math.round(80 * scale);

  // 🔹 Determinar posición actual del cursor (hasta dónde se imprimió)
  let yActual = y + 30; // "y" es la última posición usada en el contenido

  // 🔹 Si no hay suficiente espacio, crear nueva página
  if (yActual + alturaFirmas > pageHeight - 20) {
    doc.addPage();
    yActual = 30; // reinicia margen superior
  }

  // === FIRMAS ===
  // Reducir la fuente de los textos de firma un 20% y mantener posición relativa
  const originalFirmaFont = 9;
  const fontScale = 0.8; // reducir texto 20%
  const firmaFontSize = Math.max(6, Math.round(originalFirmaFont * fontScale));
  doc.setFontSize(firmaFontSize);

  // Firma izquierda (movida ligeramente hacia abajo para quedar más cerca del texto)
  const imgOffsetDown = Math.round(8 * scale); // cuánto bajar la imagen
  if (img1) doc.addImage(img1, 'PNG', 25, yActual + imgOffsetDown, firmaW, firmaH);
  // colocar el texto inmediatamente debajo de la imagen (ajustado para la nueva posición)
  let yTexto = yActual + imgOffsetDown + firmaH + 4;
  // Espaciado entre líneas basado en la reducción de fuente para conservar proporciones
  const originalLineStep = 4; // antes se usaban incrementos de 4
  const lineStep = Math.max(3, Math.round(originalLineStep * fontScale));

  doc.text(30, yTexto, `Validado por`);
  doc.text(30, yTexto + lineStep, `${nombres[0] || ''}`);
  doc.text(30, yTexto + lineStep * 2, `C.C. ${cedulas[0] || ''}`);
  doc.text(30, yTexto + lineStep * 3, `${roles[0]}`);
  doc.text(30, yTexto + lineStep * 4, `Área: Microscopía-Hematología-Microbiología`);

  // Firma derecha (movida ligeramente hacia abajo para quedar más cerca del texto)
  if (img2) doc.addImage(img2, 'PNG', 130, yActual + imgOffsetDown, firmaW, firmaH);
  doc.text(133, yTexto, `Validado por`);
  doc.text(133, yTexto + lineStep, `${nombres[1] || ''}`);
  doc.text(133, yTexto + lineStep * 2, `C.C. ${cedulas[1] || ''}`);
  doc.text(133, yTexto + lineStep * 3, `${roles[1]}`);
  doc.text(133, yTexto + lineStep * 4, `Área: Química-Inmunología-Pruebas Especiales`);

  // Firma central (Administrador) — bajar posición y centrar texto
  const xCentrada = (pageWidth - firmaW) / 2;
  // bajar imagen central más para evitar superposición con el texto
  const extraDownAdmin = Math.round(20 * scale);
  // colocar la imagen al menos dos renglones por debajo del bloque de texto "Validado por"
  // el bloque izquierdo/derecho ocupa hasta yTexto + lineStep * 4, así que posicionamos img3 debajo
  // subir img3 tres renglones (intento), pero garantizar que no se solape con el bloque de firmas
  const desiredUpLines = 3;
  const candidateImg3Y = yTexto + lineStep * 6 + extraDownAdmin - (1 * lineStep) - (desiredUpLines * lineStep);
  // mínimo: una línea por debajo del bloque de firmas (que llega hasta yTexto + lineStep*4)
  const minImg3Y = yTexto + lineStep * 5;
  const img3Y = Math.max(candidateImg3Y, minImg3Y);
  if (img3) doc.addImage(img3, 'PNG', xCentrada, img3Y, firmaW, firmaH);
  // colocar el texto justo debajo de la imagen y centrar cada línea
  // colocar el texto justo debajo de la imagen (subido un renglón en conjunto)
  const textStartY = img3Y + firmaH + 6 - lineStep;
  const linesAdmin = [
    `Verificado por`,
    `${nombres[2] || ''}`,
    `C.C. ${cedulas[2] || ''}`,
    `Bacteriólogo(a)`
  ];
  for (let i = 0; i < linesAdmin.length; i++) {
    const line = linesAdmin[i];
    const tw = (doc.getStringUnitWidth(line) * doc.internal.getFontSize()) / doc.internal.scaleFactor;
    const xLine = (pageWidth - tw) / 2;
    doc.text(xLine, textStartY + i * lineStep, line);
  }

  // === PIE DE PÁGINA ===
  const footerText = `CALLE 5 N. 1 A 57 Aguablanca 8353365 - PITALITO - HUILA`;
  const textWidth = (doc.getStringUnitWidth(footerText) * doc.internal.getFontSize()) / doc.internal.scaleFactor;
  const centeredX = (pageWidth - textWidth) / 2;
  doc.text(centeredX, pageHeight - 15, footerText);

  // 🔹 Guardar el PDF
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
    doc.line(178, y + 3, 190, y + 3); // horizontal line
    y += 10;

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
    y += 5;
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





