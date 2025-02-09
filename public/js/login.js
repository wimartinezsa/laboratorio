



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





document.getElementById('frmValidar').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita la recarga de la página

  let datos = new URLSearchParams();
  datos.append('login', document.getElementById('login').value);
  datos.append('password', document.getElementById('password').value);

  // Enviar los datos con fetch
  fetch('/login', {
      method: 'POST',
      body: datos,
  })
      .then(response => {
          // Verificar si la respuesta es JSON
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
              return response.json();
          } else {
            window.location.href = "/login";
          }
      })
      .then(data => {
          // Reiniciar el almacenamiento local
          console.log(data);
          localStorage.setItem('token', '');
          localStorage.setItem('nombre', '');
          localStorage.setItem('rol', '');
          localStorage.setItem('id', '');
         

          if (data.status != 200) {
              Mensaje.fire({ icon: 'warning', title: data.message });
          } else {
              localStorage.setItem('token', data.token);
              localStorage.setItem('nombre', data.user.nombre);
              localStorage.setItem('rol', data.user.rol);
              localStorage.setItem('id', data.user.id);
            
              

            if(data.user.rol==='Invitado')  {window.location.href = "/laboratorio_invitado";}
            else {window.location.href = "/home";}
             
              Mensaje.fire({ icon: 'success', title: data.message });
          }
      })
      .catch(error => {
          console.error('Error:', error);
          // Si hay un error, redirigir al login o mostrar un mensaje
          window.location.href = "/login";
      });
});
