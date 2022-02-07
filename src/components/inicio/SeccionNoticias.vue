<template>
  <div v-if="!$store.state.noticiasInicio.length">
    <div class="q-pa-lg q-mt-lg row justify-center">
      <div class="text-h5 text-bold">
        De nuestras Redes Sociales
        <q-img class="q-ml-xl" src="icons/hb.png" width="40%" />
      </div>
    </div>

    <div class="row justify-center" v-if="$q.screen.lt.sm">
        <q-card flat class="col-11 q-mb-md my-card">
          <q-img class="row" src="images/productos/pc03.jpg" height="40%" />

          <q-card-section class="row justify-around">
            <small class="col-3" style="font-size: 10px">
              Junio 03.2021
            </small>

            <small class="col-5"  style="font-size: 10px">
              Por <strong>Julio A. Reyes</strong>
            </small>

            <small class="col-3"  style="font-size: 10px">
              12 Comentarios
            </small>
          </q-card-section>

          <q-card-section>
            <b>Lorem Ipsum is simply dummy text of the printing</b>
            <br>
              It is a long established fact that a reader will be distracted
              by the readable content of a page when looking at its layout.
              The point of using Lorem Ipsum is that it has a more letters.
          </q-card-section>
        </q-card>

        <q-card flat class="col-11 q-mb-md my-card">
          <q-img class="row" src="images/productos/pc03.jpg" height="40%" />

          <q-card-section class="row justify-around">
            <small class="col-3" style="font-size: 10px">
              Junio 03.2021
            </small>

            <small class="col-5"  style="font-size: 10px">
              Por <strong>Julio A. Reyes</strong>
            </small>

            <small class="col-3"  style="font-size: 10px">
              12 Comentarios
            </small>
          </q-card-section>

          <q-card-section>
            <b>Lorem Ipsum is simply dummy text of the printing</b>
            <br>
              It is a long established fact that a reader will be distracted
              by the readable content of a page when looking at its layout.
              The point of using Lorem Ipsum is that it has a more letters.
          </q-card-section>
        </q-card>
    </div>

    <div class="row justify-center" v-else>
      <q-card flat class="col-3 q-mb-md q-mr-lg my-card">
        <q-img class="row" src="images/productos/pc03.jpg" height="50%" />

        <q-card-section class="row justify-around">
          <small class="col-3" style="font-size: 10px">
            Junio 03.2021
          </small>

          <small class="col-5"  style="font-size: 10px">
            Por <strong>Julio A. Reyes</strong>
          </small>

          <small class="col-3"  style="font-size: 10px">
            12 Comentarios
          </small>
        </q-card-section>

        <q-card-section>
          <b>Lorem Ipsum is simply dummy text of the printing</b>
          <br>
          <small>
            It is a long established fact that a reader will be distracted
            by the readable content of a page when looking at its layout.
            The point of using Lorem Ipsum is that it has a more letters.
          </small>
        </q-card-section>
      </q-card>

      <q-card flat class="col-3 q-mb-md q-ml-lg my-card">
        <q-img class="row" src="images/productos/pc03.jpg" height="50%" />

        <q-card-section class="row justify-around">
          <small class="col-3" style="font-size: 10px">
            Junio 03.2021
          </small>

          <small class="col-5"  style="font-size: 10px">
            Por <strong>Julio A. Reyes</strong>
          </small>

          <small class="col-3"  style="font-size: 10px">
            12 Comentarios
          </small>
        </q-card-section>

        <q-card-section>
          <b>Lorem Ipsum is simply dummy text of the printing</b>
          <br>
          <small>
            It is a long established fact that a reader will be distracted
            by the readable content of a page when looking at its layout.
            The point of using Lorem Ipsum is that it has a more letters.
          </small>
        </q-card-section>
      </q-card>
    </div>

    <div class="row justify-center">
      <q-btn class="bg-blue-10 q-mb-xl q-mt-lg text-white row justify-center" unelevated label="Ver Todo" />
    </div>
  </div>
</template>

<script>
export default {
  created () {},

  methods: {}
}
</script>

<style lang="scss">

.my-card {
  max-height: 400px;
  position: relative;
}

</style>
