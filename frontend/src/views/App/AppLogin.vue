<template>
  <div class="loginWrapper">
    <div class="loginWrap login">
      <h1>
        <img alt="rose" src="../../assets/img/trfLight.png">
      </h1>
      <div class="loginbox mgt50">
        <ul>
          <li class="__id">
            <input type="text"
                   placeholder="아이디"
                   ref="id"
                   maxlength="50"
                   @keyup.space="idSpace_keyup()"
                   v-model="id">
          </li>
          <li class="__pw mgt10">
            <input type="password"
                   placeholder="비밀번호"
                   ref="password"
                   v-model="password">
          </li>
          <li class="btn_list mgt10">
            <a href="javascript:;"
               class="login_btn"
               @click="login_click">로그인</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLogin',
  computed: {
    selMenuInfo () {
      return this.$store.getters['appMenu/getSelMenuInfo']
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
      this.$store.state.page.layoutSe = 'app';

      await this.$store.dispatch('appMenu/initMenu');


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
