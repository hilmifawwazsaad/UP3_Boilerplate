import { group, middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { deleteNC, getRelativePath, uploadNC } from '#services/nextcloud'
import type { HttpContext } from '@adonisjs/core/http'

class NextcloudController {
  async upload({ request, response }: HttpContext) {
    try {
      const file = request.file('file')
      const destination = request.input('destination', 'Upload')
      if (!file) {
        return response.status(400).json({ error: 'No file uploaded' })
      }

      const result = await uploadNC(file, destination)

      return response.json(result)
    } catch (error) {
      console.error('Error uploading file to Nextcloud:', error)
      return response.status(500).json({ error: 'Failed to upload file to Nextcloud' })
    }
  }

  async remove({ request, response }: HttpContext) {
    try {
      const url = request.input('url')
      const filePath = getRelativePath(url)
      const result = await deleteNC(filePath)
      return response.json(result)
    } catch (error) {
      console.error('Error deleting file from Nextcloud:', error)
      return response.status(500).json({ error: 'Failed to delete file from Nextcloud' })
    }
  }
}

group(() => {
  router.post('/upload', [NextcloudController, 'upload'])
  router.post('/remove', [NextcloudController, 'remove'])
})
  .prefix('/r/nc/req')
  .use(middleware.auth())
