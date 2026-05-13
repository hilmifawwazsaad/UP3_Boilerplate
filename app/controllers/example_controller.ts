import type { HttpContext } from '@adonisjs/core/http'

export default class ExamplesController {
  async index({ inertia }: HttpContext) {
    return inertia.render('Example', {
      meta: {
        title: 'Home',
      },
    })
  }

  async testExample({ request, response }: HttpContext) {
    try {
      const data = request.all()
      // const file = request.file('file')

      return response.ok(data)
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
