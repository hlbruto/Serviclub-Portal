<template>
   <q-page class="imagenFondo" style="background-image: url(img/1594922.jpeg);">     
    <div class="row justify-center">
      <div class="col-lg-8 col-md-6 col-sm-12">
        <q-card flat class="text-warning q-mb-md bg-transparent">
          <q-card-section class="row justify-center">
            <q-page-sticky position="top" :offset="[0, 18]" class="q-mt-md">
              <q-fab-action push external-label color="primary" icon="facebook" class="q-mr-sm cursor-pointer"></q-fab-action>
              <q-fab-action external-label color="cyan" icon="mdi-twitter" class="q-mr-sm cursor-pointer" />
              <q-fab-action external-label color="red" icon="mdi-instagram" class="q-mr-sm cursor-pointer" />
              <q-fab-action external-label color="cyan" icon="mdi-telegram" class="q-mr-sm cursor-pointer" />
            </q-page-sticky>
          </q-card-section>

          <q-card-section class="q-pa-xl column items-center justify-center textoGrande">
            <transition appear enter-active-class="animated slideInRight">
              <q-item-label class="q-mt-xl text-h3 text-bold">Hola, nos alegra verte por aquí...</q-item-label>
            </transition>
            <q-btn class="bg-primary text-white q-mt-xl" push outline rounded label="Registrarse" />
            <p class="q-mt-md white-with-blue-shadow" style="font-size: 26px; font-style: italic">
              Si es tu primera vez aquí, te ayudaremos<br>mientras te registras en nuestra plataforma</p>
          </q-card-section>          
        </q-card>
      </div>

      <div class="col-lg-3 col-md-4" v-if="$q.screen.gt.sm">
        <q-card bordered class="q-ml-lg q-mt-md tarjetas shadow-11" style="width:300px">            
          <q-card-section class="q-pa-md text-center">
            <q-item-label class="q-mb-xs row justify-center text-h5">
              SISCAE
            </q-item-label>

            <p class="text-center">Una Guía completa para que te informes y aprendas acerca del SISCAE,
            <br>cómo acceder y utilizarlo como plataforma de pago en nuestra Web.</p>
            <q-btn class="bg-white text-grey-8 q-mt-none q-mb-md" rounded label="Tutorial" />
          </q-card-section>
        </q-card>         
        <SeccionContactar />
      </div>

      <div class="col-12" v-if="$q.screen.lt.md">
        <q-card flat>            
          <q-card-section class="q-pa-md text-center">
              <q-item-label class="q-mt-md q-mb-xs row justify-center text-h5">
                SISCAE
              </q-item-label>

              <p class="text-center">Una Guía completa para que te informes y aprendas acerca del SISCAE,
              <br>cómo acceder y utilizarlo como plataforma de pago en nuestra Web.</p>
              <q-btn class="bg-white text-grey-8 q-mt-none q-mb-md" rounded label="Tutorial" />        
          </q-card-section>
        </q-card>  
      </div>
    </div>
    
    <SeccionServicios />

    <q-card flat class="bg-transparent white-with-blue-shadow" v-if="$q.screen.gt.sm">
      <q-card-section class="q-mt-xl">
        <q-item-label class="q-mb-xs text-center text-h3 text-bold">
          Crece, avanza, no dudes en informatizar...
        </q-item-label>
      </q-card-section>

      <q-card-section>
        <q-item-label class="text-center text-h4  text-bold">
          Contamos con un grupo de trabajo especializados <br>
          en diseño web y desarrollo de software dispuestos <br>
          a brindarte sus mejores criterios y experiencias.
        </q-item-label>
      </q-card-section>
    </q-card>

    <q-card flat class="bg-transparent white-with-blue-shadow" v-else>
      <q-card-section class="q-mt-xl">
        <q-item-label class="q-mb-xs text-center text-h5 text-bold">
          Crece, avanza, no dudes en informatizar...
        </q-item-label>
      </q-card-section>

      <q-card-section>
        <q-item-label class="text-center text-body2 text-bold">
          Contamos con un grupo de trabajo especializados <br>
          en diseño web y desarrollo de software dispuestos <br>
          a brindarte sus mejores criterios y experiencias.
        </q-item-label>
      </q-card-section>
    </q-card>
    
    <SeccionProductos />

    <q-card flat
      style="background: linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,1)"
      v-if="$q.screen.gt.sm"
    >
      <div class="row justify-center text-center">
        <q-card-section class="q-mt-lg col-5">
          <q-item-label class="text-black text-body text-bold">
            Quiénes somos?
          </q-item-label>

          <q-item-label class="q-ml-xl q-pa-lg text-subtitle1">
            <small><strong>E-mail: </strong>serviclub@jovenclub.cu</small><br>
            <small><strong>Horario de atención: </strong></small>
            <small>Lun - Sab (8.00am - 12.00am)</small>
          </q-item-label>
        </q-card-section>

        <q-separator inset vertical />

        <q-card-section class=" q-mt-lg col-5">
          <q-item-label class="text-black text-body text-bold">
            Enlaces de interés
          </q-item-label>

          <q-item-label class="q-ml-xl q-pa-lg text-subtitle1">
            <q-icon name="public" />
            <a style="text-decoration:none; color:black" href="http://www.jovenclub.cu">
              <small>Sitio web de Joven Club</small>
            </a><br>
            <q-icon name="public" />
            <a style="text-decoration:none; color:black" href="http://www.ecured.cu">
              <small>EcuRed</small>
            </a><br>
            <q-icon name="public" />
            <a style="text-decoration:none; color:black" href="http://www.mochila.cubava.cu">
              <small>Mochila</small>
            </a>
          </q-item-label>
        </q-card-section>
      </div>

    </q-card>

    <q-card flat
      style="background: linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,1)"
      v-else
    >
      <q-card-section class="text-center">
        <q-item-label class="text-black text-body text-bold">
          Quiénes somos?
        </q-item-label>

        <q-item-label class="q-ml-xl q-pa-lg text-subtitle1">
          <small><strong>E-mail: </strong>serviclub@jovenclub.cu</small><br>
          <small><strong>Horario de atención: </strong></small>
          <small>Lun - Sab (8.00am - 12.00am)</small>
        </q-item-label>
      </q-card-section>

      <q-separator inset />

      <q-card-section class="row justify-center">
        <SeccionContactar />
      </q-card-section>

      <q-separator inset />

      <q-card-section class="text-center">
        <q-item-label class="text-black text-body text-bold">
          Enlaces de interés
        </q-item-label>

        <q-item-label class="q-ml-xl q-pa-lg text-subtitle1">
          <q-icon name="public" />
          <a style="text-decoration:none; color:black" href="http://www.jovenclub.cu">
            <small>Sitio web de Joven Club</small>
          </a><br>
          <q-icon name="public" />
          <a style="text-decoration:none; color:black" href="http://www.ecured.cu">
            <small>EcuRed</small>
          </a><br>
          <q-icon name="public" />
          <a style="text-decoration:none; color:black" href="http://www.mochila.cubava.cu">
            <small>Mochila</small>
          </a>
        </q-item-label>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>

export default {
  components: {
    SeccionServicios: require('components/inicio/SeccionServ').default,
    SeccionProductos: require('components/inicio/SeccionProductos').default,
    SeccionContactar: require('components/inicio/SeccionContactar').default,
    //CarruselNoticias: require('components/CarruselNoticias').default
  },

  data: () => ({
    expanded: false,
    email: ''
  }),

  methods: {
    // devuelve el producto segun el id de la tarjeta en la q se dio click
    esteProducto (producto) {
      this.$store.state.unproducto = producto
      console.log(this.$store.state.unproducto)
      // this.$store.state.unproducto.cant_descargas = 3
      // this.$store.state.unproducto.descripcion = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor.'
      this.$router.push({
        path: '/producto/' + this.$store.state.unproducto.id
      })
    }
  }
}
</script>

<style lang="scss">
.textoGrande {
  text-shadow: 2px 2px 5px black;
  font-family: Serif;
}
.white-with-blue-shadow {
  text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue;
  color: white;
  font: 1.5em Bitstream Charter;
}

.imagen {
  max-height: 200px;
}

.tarjetas { 
  border-color: rgba(100, 154, 236, 0.575);
  border-width: 0.5pt;
  border-radius: 0.2cm;
}
.imagenFondo { 
  //height: 400px;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: beige;
}
</style>
