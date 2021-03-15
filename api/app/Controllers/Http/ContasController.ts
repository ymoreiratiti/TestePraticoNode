import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Conta from 'App/Models/Conta'

const contasSchema = schema.create({
  nome: schema.string(),
  valor_original: schema.number(),
  data_vencimento: schema.date(),
  data_pagamento: schema.date(),
})

export default class ContasController {
  public async index () {
    return Conta.all()
  }

  public async create () {
    console.log('TODO', 'create')
  }

  public async store ({ request }: HttpContextContract) {
    const validatedData = await request.validate({
      schema: contasSchema,
    })

    return Conta.create(validatedData)
  }

  public async show ({ params }: HttpContextContract) {
    return Conta.findOrFail(params.id)
  }

  public async edit () {
    console.log('TODO', 'edit')
  }

  public async update ({ params, request }: HttpContextContract) {
    const validatedData = await request.validate({
      schema: contasSchema,
    })

    const conta = await Conta.findOrFail(params.id)
    conta.nome = validatedData.nome
    conta.valorOriginal = validatedData.valor_original
    conta.dataVencimento = validatedData.data_vencimento
    conta.dataPagamento = validatedData.data_pagamento
    return conta.save()
  }

  public async destroy ({ params }: HttpContextContract) {
    const conta = await Conta.findOrFail(params.id)
    await conta.delete()
    return 'OK'
  }
}
