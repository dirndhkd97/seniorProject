<template>
  <section id="lnb" v-if="initAt">
    <h1>
      <img alt="light" src="../../assets/img/trfLight.png" style="width: 100%"/>
    </h1>
    <ul style="padding-top: 180px">
      <li v-for="(info) in level1MenuList"
          :key="info.code + 'menu'"
          :class="getLevel1MenuClass(info)">
        <a class="article-title"
           href="javascript:;"
           @click="openMenu(info)">{{ info.nm }}</a>
        <ul class="depth-content"
            style="display:block;"
            v-if="info.menuList.length > 0"
            v-show="info.code == openMenuCode">
          <li v-for="(level2Info) in info.menuList"
              :key="'menu' + level2Info.code"
              @click="selMenu(level2Info)">
            <a href="javascript:;"
               :class="getLevel2MenuClass(level2Info)">{{ level2Info.nm }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Lnb',
  computed: {
    selMenuCode () {
      return this.$store.state.menu.selMenuCode
    },
    selMenuInfo () {
      return this.$store.getters['menu/getSelMenuInfo']
    },
    menuList () {
      return this.$store.state.menu.menuList
    },
  },
  data() {
    return {
      initAt: false,
      openMenuCode: '',
      level1MenuList: [],
    }
  },
  methods: {
    init() {
      this.setMenu();

      this.initAt = true;
    },
    openMenu(info) {
      if(this.openMenuCode != info.code)this.openMenuCode = info.code;
      if(info.pageAt) this.selMenu(info);
    },
    selMenu(info) {
      this.$store.commit('menu/selMenu', info.code);
      this.$router.push({path: info.path}).catch(()=>{});
    },
    setMenu () {
      let menuList = this.menuList

      let level2MenuList =
          menuList.filter(
              (info) => {
                return info.level == 2;
              })

      let level1MenuList =
          menuList.filter((info) => info.level == 1)

      level1MenuList.forEach(
          (info) => {
            if(!info.pageAt){
              info.menuList =
                  level2MenuList.filter((level2Info) => level2Info.upperCode == info.code)
            }
          })

      this.level1MenuList = level1MenuList;
    },
    getLevel1MenuClass (info) {
      let setClass = '';

      if(info.code == this.openMenuCode){ setClass = 'current'; }
      if( info.code == this.selMenuInfo.code||
          info.code == this.selMenuInfo.upperCode){
        setClass += ' select';
      }
      if(!info.menuList.length){ setClass += ' none'; }

      return setClass;
    },
    getLevel2MenuClass (info) {
      let setClass = '';

      if(info.upperCode == this.selMenuInfo.upperCode
          && info.code == this.selMenuInfo.code ) setClass = 'pc02';

      return setClass;
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>
.pc02 { color: #3b86ff }
</style>
