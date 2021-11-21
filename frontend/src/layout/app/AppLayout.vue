<template>
  <div id="wrap">
    <top-header></top-header>
    <container></container>
  </div>
</template>

<script>
import TopHeader from '@/layout/app/TopHeader'
import Container from '@/layout/app/Container'

export default {
  name: 'Layout',
  components: {
    TopHeader,
    Container,
  },
  data() {
    return {}
  },
  methods: {
    init() {
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>
</style>
