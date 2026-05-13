import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class PegawaiITS extends BaseModel {
  public static table = '[its-dw].kepegawaian.pegawai_its'

  @column({ isPrimary: true })
  declare sso_id: string

  @column({ columnName: 'nama_versi_kepegawaian' })
  declare nama: string

  @column({ columnName: 'nama_jabatan_umum' })
  declare nama_jabatan: string

  @column({ columnName: 'nip_kepegawaian_baru' })
  declare nip_kepegawaian: string

  @hasMany(() => User, {
    foreignKey: 'ssoid',
    localKey: 'sso_id',
  })
  declare users: HasMany<typeof User>
}
