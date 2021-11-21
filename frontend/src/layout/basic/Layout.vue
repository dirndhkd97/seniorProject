<template>
  <div id="wrap">
    <top-header></top-header>
    <lnb></lnb>
    <container></container>
  </div>
</template>

<script>
import TopHeader from '@/layout/basic/TopHeader'
import Lnb from '@/layout/basic/Lnb'
import Container from '@/layout/basic/Container'

export default {
  name: 'Layout',
  components: {
    TopHeader,
    Lnb,
    Container
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
