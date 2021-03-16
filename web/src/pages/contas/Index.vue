<template>
  <q-page class="padding">

    <q-table
      title="Contas"
      dense
      :data="contas"
      :columns="columns"
      :pagination.sync="pagination"
      row-key="id"
    >
     <template v-slot:top>
       <q-space />
       <q-btn to="/Contas/0" flat label="Nova conta" icon="add" color="primary"/>
     </template>

     <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <q-btn :to="`/Contas/${props.value.toString()}`" flat icon="edit" color="primary"/>
        </q-td>
      </template>

    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { formatToBRL, formatToNumber } from 'brazilian-values'

export default defineComponent({
  name: 'PageContasIndex',
  data () {
    return {
      contas: [],
      columns: [
        { name: 'nome', label: 'Nome', field: 'nome' },
        { name: 'valor_original', label: 'Valor Original', field: 'valor_original', format: formatToBRL },
        { name: 'valor_corrigido', label: 'Valor Corrigido', field: 'valor_corrigido', format: formatToBRL },
        { name: 'dias_atrasado', label: 'Quantidade de dias atrasado', field: 'dias_atrasado', format: formatToNumber },
        { name: 'data_pagamento', label: 'Data de pagamento', field: 'data_pagamento', format: (val:string) => val.split('-').reverse().join('/') },
        { name: 'id', label: '', field: 'id' }
      ],
      pagination: {
        sortBy: 'id',
        rowsPerPage: null,
        descending: false
      }
    }
  },
  mounted () {
    this.contasRefresh()
  },
  methods: {
    async contasRefresh () {
      const { data } = await this.$axios.get('/Contas')
      this.contas = data
    }
  }
})
</script>
