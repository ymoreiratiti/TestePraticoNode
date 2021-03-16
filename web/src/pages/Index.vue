<template>
  <q-page>
  <q-table
      title="Contas"
      :data="contas"
      :columns="columns"
      :pagination.sync="pagination"
      row-key="id"
    >

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
  name: 'PageIndex',
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
      console.log('data', data)
      this.contas = data
    }
  }
})
</script>
