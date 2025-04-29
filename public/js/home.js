cantidadPacientes();
cantidadEmpresas();
cantidadContratos();
examenesTomaMuestra();
examenesProcesoAnalisis();
examenesResultadosListos();
examenesResultadosEntregados();
cantidadExamenesPorDiaEmpresa();
cantidadPacientesPorDia();

function cantidadPacientes(){
    fetch('/cantidadPacientes',
        {
            method: 'get'
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
         document.getElementById('cant_pacientes').innerHTML=`${data[0].cantidad}`;
    });
}



function cantidadPacientesPorDia(){
    fetch('/cantidadPacientesPorDiaEmpresa',
        {
            method: 'get'
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

        const lista = document.getElementById('pacientesPorDia');
        lista.innerHTML = '';
        
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre.toLowerCase()} : ${item.cantidad}`;
            lista.appendChild(li);
        });


       
    });
}





function cantidadExamenesPorDiaEmpresa(){
    fetch('/cantidadExamenesPorDiaEmpresa',
        {
            method: 'get'
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

        const lista = document.getElementById('examenesPorDia');
        lista.innerHTML = '';
        
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre.toLowerCase()} : ${item.cantidad}`;
            lista.appendChild(li);
        });


       
    });
}






function cantidadEmpresas(){
    fetch('/cantidadEmpresas',
        {
            method: 'get'
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
         document.getElementById('cantidadEmpresas').innerHTML=`${data[0].cantidad}`;
    });
}


function cantidadContratos(){
    fetch('/cantidadContratos',
        {
            method: 'get'
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
         document.getElementById('cantidadContratos').innerHTML=`${data[0].cantidad}`;
    });
}



function examenesTomaMuestra(){
    fetch('/examenesTomaMuestra',
        {
            method: 'get'
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
         document.getElementById('examenesTomaMuestra').innerHTML=`${data[0].cantidad}`;
    });
}


function examenesProcesoAnalisis(){
    fetch('/examenesProcesoAnalisis',
        {
            method: 'get'
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
         document.getElementById('examenesProcesoAnalisis').innerHTML=`${data[0].cantidad}`;
    });
}


function examenesResultadosListos(){
    fetch('/examenesResultadosListos',
        {
            method: 'get'
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
         document.getElementById('examenesResultadosListos').innerHTML=`${data[0].cantidad}`;
    });
}


function examenesResultadosEntregados(){
    fetch('/examenesResultadosEntregados',
        {
            method: 'get'
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
         document.getElementById('examenesResultadosEntregados').innerHTML=`${data[0].cantidad}`;
    });
}
