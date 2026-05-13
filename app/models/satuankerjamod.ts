import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class SatuanKerjaMod extends BaseModel {
  public static table = 'dbo.SatuanKerjaMod'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_satker: string

  @column()
  declare satker_kode: string

  @column()
  declare parentsatker: number
}
