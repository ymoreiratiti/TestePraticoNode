import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import _ from 'lodash'
import Multa from './Multa'

export default class Conta extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public valorOriginal: number

  @column()
  public valorCorrigido: number

  @column.date()
  public dataVencimento: DateTime

  @column.date()
  public dataPagamento: DateTime

  @column()
  public diasAtrasado: number = 0

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async calculaMulta(conta: Conta) {
    conta.valorCorrigido = conta.valorOriginal

    conta.diasAtrasado = conta.dataPagamento.diff(conta.dataVencimento, 'days').days
    if (conta.diasAtrasado < 0) conta.diasAtrasado = 0
    if (!conta.diasAtrasado) return undefined

    const multaRegra: Multa = await Multa.query()
      .select(['dias_atraso', 'multa', 'juros_dia'])
      .where('dias_atraso', '<=', conta.diasAtrasado)
      .orderBy('dias_atraso', 'desc')
      .limit(1)
      .then((multas: any) => {
        return {
          diasAtraso: Number(multas[0].toJSON().dias_atraso),
          multa: Number(multas[0].toJSON().multa),
          jurosDia: Number(multas[0].toJSON().juros_dia),
        } as Multa
      })

    const valorMulta = conta.valorOriginal * (multaRegra.multa / 100)
    const valorMora = conta.valorOriginal * (multaRegra.jurosDia / 100) * conta.diasAtrasado

    conta.valorCorrigido = conta.valorOriginal + valorMulta + valorMora
  }
}
