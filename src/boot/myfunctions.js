// import something here
import Vue from 'vue'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files

  // something to do
  
  /* Vue.prototype.$manejarError = function (error, mensaje) {
    const mensajito = error.response.data.error.message
    // 'No se logró completar la operación solicitada, por favor inténtelo nuevamente.'
    if (mensaje) {
      mensajito = mensaje
    }
    if (mensajito === 'Error verifying token:jwt expired') {
      // Se vencio el tiempo de la session
      this.$store.commit('app/session', '')
      this.$q.sessionStorage.remove('sessionRevis')
      this.$q.notify({
        type: 'info',
        message: 'Se sesión ha expirado, por favor acceda nuevamante con sus credenciales.'
      })
      this.$router.push('/portada')
      console.clear()
    } else {
      this.$q.notify({
        type: 'negative',
        message: mensajito
      })
    }
    this.$q.loading.hide()
    console.error(error)
  } */

  Vue.prototype.$mensajeSatisfactorio = function () {
    this.$q.notify({
      color: 'positive',
      position: 'bottom',
      message: 'Su solicitud ha sido enviada, muy pronto contactaremos con usted.',
      icon: 'mdi-check-circle'
    })
  }

  Vue.prototype.$manejarError = function (mensaje) {
    this.$q.notify({
      color: 'negative',
      position: 'bottom',
      message: mensaje,
      icon: 'mdi-alert-circle'
    })
    this.$q.loading.hide()
  }

  Vue.prototype.$solicitarServicio = async function () {
    var datos = {
      problema : this.$store.state.problema,
      momento : this.$store.state.momento,
      servicioId : this.$store.state.unservicio.id,
      instalacionId : this.$store.state.instalacionDelPedido.id,
      municipioId : this.$store.state.instalacionDelPedido.municipioId,
      provinciaId : this.$store.state.instalacionDelPedido.provinciaId,
      usuarioId : this.$store.state.credencial.id_usuario,
      estado : 'pendiente'
    }
    var datosUser = {
      instalacionId: datos.instalacionId
    }
    this.$axios.post(this.$store.state.urlAPI + '/pedidos', datos).then(response => {
      this.$axios.patch(this.$store.state.urlAPI + '/usuarios/' + this.$store.state.credencial.id_usuario, datosUser).then(response => {
      }).catch(error => {
        console.log(error)
        // mensaje de error
      });
      this.$refrescarPedidos()
    }).catch(error => {
      console.log(error)
      // mensaje de error
    });
    
    // satisfactorio
  }

  Vue.prototype.$refrescarPedidos = async function () {
    const filter = {
      where: {
        estado : { neq :'cancelado' },
        and: [
          {
            usuarioId: { eq: this.$store.state.credencial.id_usuario}
          }
        ]
      },
      include: [
        {
          relation: 'servicio',
        },
        {
          relation: 'instalacion',
        }
      ],
    };
    const myfilter = encodeURIComponent(JSON.stringify(filter));
    this.$axios.get(this.$store.state.urlAPI + '/pedidos?filter=' + myfilter).then(response => {
      console.log(response.data)
      this.$store.state.pedidos = response.data
      this.$store.state.nombreTrab = ''
      this.$router.push('/escritorio')
      this.loading = false
    }).catch(error => {
      console.log(error)
    })
  }

  Vue.prototype.$refrescarServicios = async function () {
    // obtener el listado de servicios en general
    if (this.$store.state.servicios.length === 0) {
      const filter = {
        where: {
          activo : { eq : true }
        }
      }
      const myfilter = encodeURIComponent(JSON.stringify(filter));
      this.$axios.get(this.$store.state.urlAPI + '/servicios?filter=' + myfilter).then(response => {
        this.$store.state.servicios = response.data
        console.log(response.data)
        this.$clasificarServicios()
      }).catch(error => {
        console.log(error)
      })
    }
  }

  Vue.prototype.$clasificarServicios = async function () {
    console.log('entra al metodo')
    for (let index = 0; index < this.$store.state.servicios.length; index++) {
      if (this.$store.state.servicios[index].casa === 1) {
        this.$store.state.serviciosCasa.push(this.$store.state.servicios[index])
      } if (this.$store.state.servicios[index].red === 1) {
        this.$store.state.serviciosRed.push(this.$store.state.servicios[index])
      } if (this.$store.state.servicios[index].jc === 1) {
        this.$store.state.serviciosJC.push(this.$store.state.servicios[index])
      }
    }
    console.log(this.$store.state.serviciosCasa)
    console.log(this.$store.state.serviciosRed)
    console.log(this.$store.state.serviciosJC)
  }

  Vue.prototype.$refrescarProductos = async function () {
    if (this.$store.state.productos.length === 0) {
      const filter = {
        where: {
          activo : { eq : true }
        }
      }
      const myfilter = encodeURIComponent(JSON.stringify(filter));
      this.$axios.get(this.$store.state.urlAPI + '/productos?filter=' + myfilter).then(response => {
        this.$store.state.productos = response.data
        console.log(response.data)
        this.$clasificarProductos()
      }).catch(error => {
        console.log(error)
      })
    }
  }

  Vue.prototype.$clasificarProductos = async function () {
    console.log('entra al metodo')
    for (let index = 0; index < this.$store.state.productos.length; index++) {
      if (this.$store.state.productos[index].tipo === 'celulares') {
        this.$store.state.productosCel.push(this.$store.state.productos[index])
      } if (this.$store.state.productos[index].tipo === 'computadoras') {
        this.$store.state.productosPC.push(this.$store.state.productos[index])
      } if (this.$store.state.productos[index].tipo === 'web') {
        this.$store.state.productosWeb.push(this.$store.state.productos[index])
      }
    }
    console.log(this.$store.state.productosCel)
    console.log(this.$store.state.productosPC)
    console.log('en la web')
    console.log(this.$store.state.productosWeb)
  }

  Vue.prototype.$refrescarComentarios = async function () {
    console.log('entra amy funtions')
    this.$store.state.comentarios = []
    this.$store.state.cant_comentarios = 0
    const filter = {
      where: {
        or: [
          { calificacion: {neq : 0} },
          { aprobado : { eq : true } }
        ],
        and: [
          {
            productoId: { eq: this.$store.state.unproducto.id }
          }
        ]
      },
      include: [
        {
          relation: 'usuario',
        }
      ]
    };
    const myfilter = encodeURIComponent(JSON.stringify(filter));
    this.$axios.get(this.$store.state.urlAPI + '/comentarios?filter=' + myfilter).then(response => {
      this.$store.state.comentarios = response.data
      this.$store.state.cant_comentarios = this.$store.state.comentarios.length
      console.log(this.$store.state.comentarios)
    }).catch(error => {
      console.log(error)
    })
  }

