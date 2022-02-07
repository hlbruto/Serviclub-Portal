import Vue from 'vue'
import Vuex from 'vuex'
// import { stat } from 'fs'
// import axios from 'axios'
// import { stat } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  /* modules: {
    // Provincias
  },

  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
    })
  ], */

  state: {
    // urlAPI: 'http://10.9.15.111:3000/api/v1',
    urlAPI: 'http://localhost:3000/api/v1',
    // urlAPI: 'http://10.9.15.104:3000/api/v1',
    // urlAPI: 'http://172.28.114.2/api/v1',
    leftDrawerOpen: false,
    tab: 'servicios', // para los tabs del escritorio
    dialogo: {
      contactar: false,
      recomendar: false,
      formularioAcceso: false,
      formularioAccesoSISCAE: false,
      eligeMcpio: false,
      detallesPedido: false,
      cancelarPedido: false,
      validarEmail: false,
      calificarProducto: false,
      autenticarSiscae: false,
      verServicio: false,
      verProducto: false
    },

    habilitado: true, // si el usuario esta logueado, ya lleno su perfil y tiene acceso a todo el sistema

    emailAutenticar: '',
    passAutenticar: '',

    // Datos del servicio a solicitar
    problema: '',
    momento: '',

    credencial: {
      token: '',
      id_usuario: '',
      nombre: '',
      email: '',
      municipio: {
        // id: '',
        // nombre: ''
        id: '',
        nombre: '',
        provinciaId: '',
        provincia: {
          id: '',
          nombre: ''
        }
      },
      direccion: '',
      ci: '',
      telefono: ''
    },

    datosSISCAE: {
      usuario_encontrado: false,
      detalle: '',
      estado_credencial: '',
      nombre_completo: '',
      tipo_identificacion: '',
      numero_identificacion: '',
      email: 'asd',
      tipo_usuario: '',
      foto: '',
      genero: '',
      numero_cuenta: '',
      saldo_disponible: '',
      saldo_fecha_expiracion: '',
      bono_disponible: ''
    },

    noticiasInicio: [],

    instalacionPreferida: 'Escoge una instalación',
    instalacionDelPedido: {},

    // Para los select de provincia y municipio
    provincias: [],
    arrayNombresProv: [],

    municipios: [],
    arrayNombresMun: [],
    municipioId: '',

    instalaciones: [],

    // Listados de los servicios
    servicios: [],
    serviciosInicio1: [],
    serviciosInicio2: [],
    serviciosInicio3: [],
    serviciosInicio4: [],
    serviciosInicio5: [],
    serviciosInicio6: [],
    serviciosCasa: [],
    serviciosRed: [],
    serviciosJC: [],

    // Listados de los productos
    productos: [],
    productoInicio: [],
    productosCel: [],
    productosPC: [],
    productosWeb: [],

    unservicio: [],
    slideServicio: '', // comenzar el carrusel en este id de servicio
    slideProducto: '', // comenzar el carrusel en este id de producto
    unproducto: {
      activo: Boolean,
      calificacion: 0,
      cant_calificaciones: 0,
      cant_descargas: 0,
      descripcion: '',
      foto: '',
      id: '',
      nombre: '', 
      precio: '',
      suma_calificacion: 0,
      tipo: '',
      url: '',
      url_descarga: ''
    },

    // para el escritorio
    pedidos: [],
    pedidosProducto: {
      producto: {
        activo: true,
        calificacion: 4,
        cant_calificaciones: 7,
        cant_descargas: 9,
        descripcion: 'esta es una prueba',
        foto: 'logo.png',
        id: '1',
        nombre: 'si', 
        precio: '3.00',
        suma_calificacion: 4,
        tipo: 'celulares',
        url: '',
        url_descarga: ''
      }
    },
    nombreTrab: '',
    pedido: {
      estado: '',
      fecha_pedido: '',
      id: '',
      instalacion: {},
      instalacionId: '',
      municipioId: '',
      momento: '',
      problema: '',
      servicio: {},
      motivo_cancelado: '',
      servicioId: '',
      usuarioId: '',
      userId: '',
      user: {}
    },

    cant_comentarios: '',
    comentarios: []
  },

  getters: {},

  mutations: {},

  actions: {
    /* refrescarPedidos () {
      console.log('pedidos del user')
      const filter = {
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
        this.$store.state.pedidos = response.data
        this.$store.state.nombreTrab = ''
        console.log(response.data)
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    } */
  },

  plugins: [
    /* createPersistedState({
      key: 'token',
      paths: ['credencial']
    }) */
  ]
})
