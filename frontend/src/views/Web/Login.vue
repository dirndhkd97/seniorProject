<template>
  <main class="index"
        style="margin-top: 100px"
        v-if="initAt">
    <article>
      <header>
        <h1>
          <img alt="rose" src="../../assets/img/trfLight.png" style="width: 400px">
        </h1>
        <h1>
          <span>스마트 신호등</span>
        </h1>
      </header>
      <div class="common-login">
        <form>
          <input type="text"
                 placeholder="아이디"
                 ref="id"
                 maxlength="50"
                 style="width:100%;"
                 @keyup.space="idSpace_keyup()"
                 v-model="id" />
          <input type="password"
                 placeholder="비밀번호"
                 style="width:100%;"
                 v-model="password"
                 @keyup.enter="login_click()"/>
        </form>
      </div>
      <div class="btn-wrap mgt20">
        <button class="big bt-blue wp100"
                @click="login_click()"><span>로그인</span></button>
      </div>
    </article>
  </main>
</template>

<script>
export default {
  name: 'Login',
  computed: {
    selMenuInfo () {
      return this.$store.getters['menu/getSelMenuInfo']
    },
  },
  data () {
    return {
      initAt: false,
      id: '',
      password: '',
    }
  },
  methods: {
    idSpace_keyup () {
      this.$store.commit('toast/warn', '띄어쓰기는 입력되지 않습니다.');
      this.id = this.id.replace(/ /gi,'');
    },
    async login_click () {
      if(this.valid()) return false;

      this.$store.commit('loading/on');

      try {
        const result = await this.login_api();

        if (result.code == '000') {
          this.$store.dispatch('login/login',result);
          await this.successLogin();
        } else if (result.code == '901') {
          this.$store.commit('toast/warn', '등록되지 않은 아이디 이거나, 잘못된 비밀번호입니다.');
        } else {
          this.$store.commit('toast/err', '통신오류.');
        }
      } catch (e) {
        console.log(e);
        this.$store.commit('toast/err', '통신오류.');
      } finally {
        this.$store.commit('loading/off');
      }
    },
    valid () {
      let validAt = false;
      let message = '';

      if(!this.id||!this.id.trim()){
        message = '아이디를 입력해주세요.';
        validAt = true;
      }

      if(!this.password&&!validAt){
        message = '비밀번호를 입력해주세요.';
        validAt = true;
      }
      if(validAt) this.$toast.error(message);

      return validAt;
    },
    async login_api () {
      const response =
          await this.axios.post(
              '/api/senior/login',
              {
                id: this.id,
                password: this.password
              }
          )
      return response.data;
    },
    async successLogin () {
      this.$store.state.page.layoutSe = 'basic';

      await this.$store.dispatch('menu/initMenu')


      this.$router.replace({path: this.selMenuInfo.path}).catch(()=>{});
    }
  },
  mounted() {
    this.initAt = true;
  }
}
</script>
<style>
</style>
