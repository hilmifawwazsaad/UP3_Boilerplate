import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Jabatan from './jabatan.js'
import PegawaiIts from './pegawai_its.js'

export default class User extends BaseModel {
  public static table = 'dbo.users'

  @column({ isPrimary: true })
  declare id: number

  // @column({ serializeAs: null })
  // declare password: string

  @column()
  declare nama: string

  @column()
  declare idjabatan: number

  @column()
  declare ssoid: string

  @column()
  declare nip: string

  @column()
  declare hp: string
  
  @column()
  declare active: boolean

  @belongsTo(() => Jabatan, { foreignKey: 'idjabatan' })
  declare jabatan: BelongsTo<typeof Jabatan>

  @belongsTo(() => PegawaiIts, { foreignKey: 'sso_id' })
  declare pegawai_its: BelongsTo<typeof PegawaiIts>
}
