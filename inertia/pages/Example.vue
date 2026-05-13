<template>
  <Container>

  </Container>
</template>
<script>
import { useAuth } from '~/composables';
import Container from '~/components/container/Container.vue';

export default {
  components: {
    Container,
  },
  props: {
    meta: Object
  },
  data() {
    return {
      auth: useAuth({ current: true }),
    }
  },
  methods: {
  }
}
</script>