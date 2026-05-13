import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import SatuanKerjaMod from './satuankerjamod.js'

export default class Jabatan extends BaseModel {
  public static table = 'dbo.Jabatan'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_jabatan: string

  @column()
  declare id_satker: number

  @column()
  declare parent: number

  @column()
  declare created_at: DateTime

  @column()
  declare updated_at: DateTime

  @column()
  declare kinerja: number

  @column()
  declare role: number

  @column()
  declare can_update: number

  @column()
  declare same_with: number

  @column()
  declare expired_at: DateTime

  @column()
  declare id_jabatan: number

  @column()
  declare id_jabatan_2024: number

  @column()
  declare id_satker_kinerja: number

  @belongsTo(() => SatuanKerjaMod, {
    foreignKey: 'id_satker', 
    localKey: 'satker_kode',
  })
  declare satker: BelongsTo<typeof SatuanKerjaMod>

  @hasMany(() => User, { foreignKey: 'idjabatan' })
  declare users: HasMany<typeof User>
}
