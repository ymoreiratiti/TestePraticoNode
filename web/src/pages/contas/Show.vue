<template>
  <q-page>
    <q-form @submit="formSave">
      <q-card-actions align="right">
        <q-btn @click="formDelete" label="Excluir" color="negative" icon="delete" flat :disable="!form.id"/>
        <q-btn type="submit" label="Salvar" color="primary" icon="save" flat/>
      </q-card-actions>

      <q-card>
        <q-card-section>
          <q-input v-model="form.nome" label="Nome" required/>
          <q-input v-model="form.valor_original" label="Valor Original" type="number" step="0.01" required/>
          <q-input v-model="form.data_vencimento" label="Data Vencimento" type="date" required/>
          <q-input v-model="form.data_pagamento" label="Data Pagamento" type="date" required/>
        </q-card-section>

      </q-card>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { AxiosRequestConfig } from 'axios'

export default defineComponent({
  name: 'PageContasShow',
  data () {
    return {
      form: {
        id: 0,
        nome: '',
        valor_original: 0,
        data_vencimento: new Date().toISOString().slice(0, 10),
        data_pagamento: new Date().toISOString().slice(0, 10)
      }

    }
  },
  mounted () {
    this.formRefresh()
  },
  methods: {
    async formRefresh () {
      const id = Number(this.$route.params.id)
      if (!id) return undefined

      const { data } = await this.$axios.get(`/Contas/${Number(this.$route.params.id)}`)

      this.form = {
        id: Number(data.id),
        nome: data.nome,
        valor_original: data.valor_original,
        data_vencimento: data.data_vencimento,
        data_pagamento: data.data_vencimento
      }
    },
    async formSave () {
      const axiosRequestConfig:AxiosRequestConfig = {
        method: 'POST',
        url: '/Contas',
        data: JSON.parse(JSON.stringify(this.form))
      }
      if (axiosRequestConfig.data.id) {
        axiosRequestConfig.method = 'PATCH'
        axiosRequestConfig.url = `/Contas/${this.form.id.toString()}`
      }

      await this.$axios(axiosRequestConfig)
      this.$q.notify({ message: 'Salvo com sucesso!', color: 'positive' })
      this.$router.push('/Contas')
    },
    formDelete () {
      this.$q.dialog({
        title: 'Confirmar exclusão',
        message: 'Você tem certeza que deseja excluir este registro?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await this.$axios.delete(`/Contas/${this.form.id}`)
        this.$router.push('/Contas')
      })
    }
  }
})
</script>
