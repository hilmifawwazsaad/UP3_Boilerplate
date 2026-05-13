import type { HttpContext } from '@adonisjs/core/http'

import fs from 'node:fs'
import path from 'node:path'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import TipTapHelper from '#services/tiptap'

class TipTapUploaderController {
  async storeImage({ request, response }: HttpContext) {
    const image = request.file('image', {
      size: '10mb',
      extnames: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif'],
    })

    if (!image) {
      return response.unprocessableEntity({
        message: 'File gambar tidak ditemukan dalam request.',
      })
    }

    if (!image.isValid) {
      return response.unprocessableEntity({
        message: 'File tidak valid.',
        errors: image.errors,
      })
    }

    TipTapHelper.ensureDirs()

    const ext = image.extname ?? 'jpg'
    const filename = `${Date.now()}_${Math.floor(Math.random() * 1000)}.${ext}`
    const tmpDir = app.publicPath('tmp')

    try {
      await image.move(tmpDir, { name: filename, overwrite: false })
    } catch (err) {
      return response.internalServerError({
        message: 'Gagal menyimpan file ke server.',
        error: err?.message,
      })
    }

    const url = `/tmp/${filename}`

    return response.created({ url, filename })
  }

  async destroyImage({ params, response }: HttpContext) {
    const filename = params.filename

    if (!filename) {
      return response.badRequest({ message: 'Nama file tidak boleh kosong.' })
    }

    const safe = path.basename(filename)
    const filePath = path.join(app.publicPath('tmp'), safe)

    if (!fs.existsSync(filePath)) {
      return response.notFound({ message: 'File tidak ditemukan di folder tmp.' })
    }

    try {
      fs.unlinkSync(filePath)
      return response.ok({ message: 'Gambar berhasil dihapus.' })
    } catch (err) {
      return response.internalServerError({
        message: 'Gagal menghapus file.',
        error: err?.message,
      })
    }
  }
}

router.post('/webdav/resources/tiptap/images', [TipTapUploaderController, 'storeImage'])
router.delete('/webdav/resources/tiptap/images/:filename', [
  TipTapUploaderController,
  'destroyImage',
])
