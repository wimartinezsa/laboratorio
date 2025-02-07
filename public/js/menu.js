const nombre = localStorage.getItem('nombre'); 
const rol = localStorage.getItem('rol'); 
const area = localStorage.getItem('area'); 
document.getElementById('user').innerHTML= `
<p style="margin: 0.5px 0; color:white";>Usuario: ${nombre}</p>
<p style="margin: 0.5px 0;color:white";>Área : ${area}</p>
<p style="margin: 0.5px 0;color:white";>Rol : ${rol}</p>
`;

 






if(rol==='Administrador'){
    document.getElementById("menu").innerHTML=`
    
      <li class="nav-item">
            <a href="/home" class="nav-link">
              <i class="nav-icon fas fa-home"></i>
              <p>
                Inicio
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="/pacientes" class="nav-link">
              <i class="nav-icon fas fa-user"></i>
              <p>
                Pacientes
              </p>
            </a>
          </li>



          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                Examenes
                <i class="fas fa-angle-left right"></i>
               
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="/facturas" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Facturar</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="/muestras" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Muestras</p>
                </a>
              </li>

              <li class="nav-item">
                <a href="/analisis" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Analisis</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="/resultados" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Resultados</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="/laboratorios" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Imprimir Resultados</p>
                </a>
              </li>
             
            </ul>
          </li>



          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa fa-book"></i>
              <p>
                Contratos
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
             
              <li class="nav-item">
                <a href="/contratos" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Tarifas Acordadas</p>
                </a>
              </li>
              <li class="nav-item">
                 <a href="/empresas" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Empresas</p>
                </a>
              </li>
             
            </ul>



          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-file"></i>
              <p>
                Servicios
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="/servicios" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Servicios</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="/Examenes" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Procedimientos</p>
                </a>
              </li>
              
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-edit"></i>
              <p>
                Cuentas
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">

            <li class="nav-item">
                <a href="/cuenta_cobro" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Cuentas de cobro</p>
                </a>
              </li>

              <li class="nav-item">
                <a href="pages/forms/general.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>General Rips</p>
                </a>
              </li>
             
              
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-table"></i>
              <p>
                Reportes
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              
              <li class="nav-item">
                <a href="pages/tables/jsgrid.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Usuarios Atendidos</p>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a href="/usuarios" class="nav-link">
              <i class="nav-icon fas fa-user"></i>
              <p>
                Usuarios
              </p>
            </a>
          </li>

          
		  <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-chart-pie"></i>
              <p>
                Estadisticas
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="pages/tables/simple.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Simple Tables</p>
                </a>
              </li>
            </ul>
          </li>
		
     
    `;
}


if(rol==='Facturacion'){
    document.getElementById("menu").innerHTML=`
    
      <li class="nav-item">
            <a href="/home" class="nav-link">
              <i class="nav-icon fas fa-home"></i>
              <p>
                Inicio
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="/pacientes" class="nav-link">
              <i class="nav-icon fas fa-user"></i>
              <p>
                Pacientes
              </p>
            </a>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                Examenes
                <i class="fas fa-angle-left right"></i>
               
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="/facturas" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Facturar</p>
                </a>
              </li>
            
              <li class="nav-item">
                <a href="/laboratorios" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Imprimir Resultados</p>
                </a>
              </li>
             
            </ul>
          </li>
          
          
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-edit"></i>
              <p>
                Cuentas de Cobro
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="pages/forms/general.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>General Rips</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/forms/general.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Cuentas Cobradas</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/forms/general.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Cuentas por Cobrar</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-table"></i>
              <p>
                Reportes
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              
              <li class="nav-item">
                <a href="pages/tables/jsgrid.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Usuario Atendidos</p>
                </a>
              </li>
            </ul>
          </li>

		  <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-chart-pie"></i>
              <p>
                Estadisticas
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="pages/tables/simple.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Simple Tables</p>
                </a>
              </li>
            </ul>
          </li>
		
     
    `;
}


if(rol==='Auxiliar'){
    document.getElementById("menu").innerHTML=`
    
      <li class="nav-item">
            <a href="/home" class="nav-link">
              <i class="nav-icon fas fa-home"></i>
              <p>
                Inicio
              </p>
            </a>
    </li>
            
   <li class="nav-item">
            <a href="/pacientes" class="nav-link">
              <i class="nav-icon fas fa-user"></i>
              <p>
                Pacientes
              </p>
            </a>
</li>


<li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                Examenes
                <i class="fas fa-angle-left right"></i>
               
              </p>
            </a>
            <ul class="nav nav-treeview">
             
              <li class="nav-item">
                <a href="/muestras" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Muestras</p>
                </a>
              </li>

              <li class="nav-item">
                <a href="/analisis" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Analisis</p>
                </a>
              </li>

              <li class="nav-item">
                <a href="/resultados" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Resultados</p>
                </a>
              </li>

              <li class="nav-item">
                <a href="/laboratorios" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Imprimir Resultados</p>
                </a>
              </li>
            </ul>
          </li>
     
    `;
}


if(rol==='Bacteriologo'){
  document.getElementById("menu").innerHTML=`
  
    <li class="nav-item">
          <a href="/home" class="nav-link">
            <i class="nav-icon fas fa-home"></i>
            <p>
              Inicio
            </p>
          </a>
  </li>
          
 <li class="nav-item">
          <a href="/pacientes" class="nav-link">
            <i class="nav-icon fas fa-user"></i>
            <p>
              Pacientes
            </p>
          </a>
</li>


<li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-copy"></i>
            <p>
              Examenes
              <i class="fas fa-angle-left right"></i>
             
            </p>
          </a>
          <ul class="nav nav-treeview">
           
            <li class="nav-item">
              <a href="/muestras" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Muestras</p>
              </a>
            </li>

            <li class="nav-item">
              <a href="/analisis" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Analisis</p>
              </a>
            </li>

            <li class="nav-item">
              <a href="/resultados" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Resultados</p>
              </a>
            </li>

            <li class="nav-item">
              <a href="/laboratorios" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Imprimir Resultados</p>
              </a>
            </li>
          </ul>
        </li>
   
  `;
}

function cerrrar_sesion(){
  
  const id = localStorage.getItem('id'); // Asegúrate de que el token esté almacenado con la clave correcta

  // Enviar los datos con fetch
  fetch(`/cerrrar_sesion/${id}`, {
    method: 'get',
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
    
        if (data.status != 200) {
            Mensaje.fire({ icon: 'warning', title: data.message });
        } 

    })
    .catch(error => {
        console.error('Error:', error);
    });





}