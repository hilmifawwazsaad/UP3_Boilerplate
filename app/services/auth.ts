import PegawaiITS from '#models/pegawai_its'
import { HttpContext } from '@adonisjs/core/http'

function selectFirstLogin(user: PegawaiITS) {
  if (user.users.length == 1) {
    return user.users[0].idjabatan
  } else {
    const user_ = user.users.find((u) => u.idjabatan != 570)
    if (user_) {
      return user_.idjabatan
    } else {
      return user.users[0].idjabatan
    }
  }
}

function updateAuthConfig(session: any, newValue: { current: number; mode: string }) {
  const auth_config = session.get('auth_config')
  const new_auth_config = { ...auth_config, ...newValue }
  session.put('auth_config', new_auth_config)
}

async function getUser() {
  try {
    const { auth, session } = HttpContext.getOrFail()

    const user_ = auth.user
    if (!user_) throw new Error()

    const current = session.get('auth_config')?.current

    const userLoad = await PegawaiITS.query()
      .preload('users', (qb) => {
        qb.where('idjabatan', current)
        qb.preload('jabatan', (qb) => {
          qb.preload('satker', (qb) => {
            qb.select('satker_kode', 'nama_satker')
          })
        })
      })
      .where('sso_id', user_.sso_id)
      .first()

    const data = userLoad?.toJSON()

    const user = data?.users?.[0] || {}
    const jabatan = user.jabatan || {}
    const satker = jabatan.satker || {}

    return {
      ssoId: data?.ssoId,
      id_user: user.id,
      nama: data?.nama,
      nip: user.nip,
      namaJabatan: data?.namaJabatan,
      hp: user.hp,
      idjabatan: user.idjabatan,
      idjabatan2024: jabatan.idJabatan2024,
      nama_jabatan: jabatan.namaJabatan,
      kinerja: jabatan.kinerja,
      satker_kode: satker.satkerKode,
      id_satker_kinerja: jabatan.idSatkerKinerja,
      nama_satker: satker.namaSatker,
    }
  } catch (error) {
    return null
  }
}

export default getUser

export { selectFirstLogin, updateAuthConfig }
