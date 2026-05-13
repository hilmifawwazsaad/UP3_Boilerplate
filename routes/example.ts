import { controllers } from '#generated/controllers'
import { group, middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

group(() => {
  router.get('/', [controllers.Example, 'index']).as('example')

  router.get('/test', [controllers.Example, 'testExample']).as('test')
  router.post('/test', [controllers.Example, 'testExample']).as('test-post')
  router.put('/test/:id', [controllers.Example, 'testExample']).as('test-put')
  router.delete('/test/:id', [controllers.Example, 'testExample']).as('test-delete')
}).use(middleware.auth())
