<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center text-primary q-pa-md">
          <q-item-label>
            Datos del SISCAE
          </q-item-label>
        </div>

        <div class="text-caption q-pa-xs">
          <q-item-label>
            <p>! Para solicitar algunos de nuestros Servicios y Productos
              ud. debe disponer de saldo en el SISCAE!
            </p>
          </q-item-label>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-pa-xs grid-style-transition" v-if="$store.state.datosSISCAE.usuario_encontrado">
          <q-table
            grid
            :data="data"
            :columns="columns"
            row-key="name"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'DatosSISCAE',

  data: () => ({
    columns: [
      {
        name: 'email',
        label: 'Email para SISCAE',
        field: row => row.name
      },
      {
        name: 'usuario',
        label: 'Tipo de usuario',
        field: 'usuario'
      },
      {
        name: 'saldo',
        label: 'Saldo disponible',
        field: 'saldo'
      },
      {
        name: 'fechaExp',
        label: 'Fecha de expiración del saldo',
        field: 'fechaExp'
      },
      {
        name: 'bono',
        label: 'Bono disponible',
        field: 'bono'
      }
    ],
    data: [
      {
        name: 'as',
        usuario: 'as',
        saldo: 'asd',
        fechaExp: 'asd',
        bono: 'asd'
      }
    ]
  })
}
</script>

<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s
</style>
