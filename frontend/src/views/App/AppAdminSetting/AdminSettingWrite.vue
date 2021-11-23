<template>
  <div v-if="initAt">
    <article class="box-type01" style="width: 95vw;">
      <div class="tit-type1-box">
        <h1 class="tit-type1">회원 등록</h1>
        <div>
          <button class="small bt-blue"
                  v-if="mode == 'regist'"
                  @click="registMber_click()">
            <span>등록</span>
          </button>
          <button class="small bt-blue"
                  v-if="mode == 'modify'"
                  @click="modifyMber_click()">
            <span>수정</span>
          </button>
          <button class="small bt-white"
                  @click="goMberList_click()">
            <span>취소</span>
          </button>
        </div>
      </div>
      <table class="tb-row">
        <colgroup>
          <col style="width:157px;" />
          <col style="width:auto;" />
          <col style="width:157px;" />
          <col style="width:auto;" />
        </colgroup>
        <tr>
          <th class="__left">아이디</th>
          <td class="last" colspan="3">
            <input type="text"  placeholder="아이디"
                   maxlength="20"
                   style="width: 90%"
                   @keyup.space="text_change('id')"
                   @keydown.delete="idDplctChk_change"
                   @keypress="idDplctChk_change"
                   v-model="mberInfo.id"/>
            <button class="small bt-gray mgt3"
                    v-if="mode == 'regist' && !mberInfo.idDplctChkAt"
                    @click="idDplctChk_click()">중복확인</button>
          </td>
        </tr>
        <tr v-if="mode == 'regist'">
          <th class="__left">비밀번호</th>
          <td class="last" colspan="3">
            <input type="password"  placeholder="비밀번호"
                   maxlength="20"
                   style="width: 90%"
                   @keyup.space="text_change('password')"
                   v-model="mberInfo.password"/>
          </td>
        </tr>
        <tr>
          <th class="__left">회원명</th>
          <td class="last" colspan="3">
            <input type="text"  placeholder="회원명"
                   maxlength="20"
                   style="width: 90%"
                   v-model="mberInfo.mberNm"/>
          </td>
        </tr>
        <tr>
          <th class="__left">연락처</th>
          <td class="last" colspan="3">
            <select v-model="mberInfo.cttpc1"
                    style="width: 100px">
              <option v-for="(phon, index) in cellphoneNumList"
                      :key="'phon_'+index"
                      :value="phon">{{ phon }}</option>
            </select>
            -
            <input type="text" class="mgt3"
                   maxlength="4" ref="cttpc2"
                   style="width: 100px"
                   v-model="mberInfo.cttpc2"/>
            -
            <input type="text" class="mgt3"
                   maxlength="4" ref="cttpc3"
                   style="width: 100px"
                   v-model="mberInfo.cttpc3"/>
          </td>
        </tr>
        <tr>
          <th class="__left">이메일</th>
          <td class="last" colspan="3">
            <input  type="text" placeholder="이메일"
                    class="__left"
                    style="width:100px;"
                    title="이메일" maxlength="60"
                    v-model="mberInfo.email1"/>
            @
            <input type="text" style="width: 90%"
                   maxlength="50"  ref="email2"
                   v-if="mberInfo.email2 == ''"
                   v-model="mberInfo.email3"/>
            <select style="width: 90%"
                    v-model="mberInfo.email2"
                    @change="email_change()">
              <option v-for="(email, index) in emailList"
                      :key="'email_'+index"
                      :value="email">{{ email ? email : '--직접입력--' }}</option>
            </select>
          </td>
        </tr>
      </table>
    </article>
  </div>
</template>

<script>

export default {
  name: 'AdminSettingWrite',
  props: ['initSearchData','searchParams','searchBox'],
  data () {
    return {
      initAt: false,
      mode :'',
      mberInfo: {
        mberInnb : '',
        id       : '',
        idDplctChkAt : false,
        mberNm   : '',
        password : '',
        cttpc    : '',
        cttpc1   : '010',
        cttpc2   : '',
        cttpc3   : '',
        email    : '',
        email1   : '',
        email2   : '선택',
        email3   : '',
      },
      cellphoneNumList: [
        '010','011','016','017','019'
      ],
      emailList: [
        '선택', 'naver.com', 'hanmail.net', 'hotmail.com',
        'nate.com', 'yahoo.co.kr', 'empas.com', 'dreamwiz.com',
        'freechal.com', 'lycos.co.kr', 'korea.com', 'gmail.com',
        'hanmir.com', 'paran.com', '',
      ],
    }
  },
  computed: {
    cttpc () {
      return this.mberInfo.cttpc1+'-'+this.mberInfo.cttpc2+'-'+this.mberInfo.cttpc3
    },
    email () {
      let email = this.mberInfo.email1+'@'
      if(this.mberInfo.email2 == '') email+=this.mberInfo.email3;
      else email+=this.mberInfo.email2;
      return email.replaceAll(' ', '');
    },
  },
  methods: {
    async init () {
      this.mode = this.$route.params.mode;
      this.$store.commit('loading/on');

      try {
        if(this.$route.params.mberInnb)
          await this.searchMberInfo_api();

        this.initAt = true;
      } catch (e) {
        console.log(e);
        this.$store.commit('toast/err');
      } finally {
        this.$store.commit('loading/off');
      }
    },
    async searchMberInfo_api () {
      const response =
          await this.axios.post(
              '/api/senior/admin/searchMberInfo',
              {
                mberInnb:this.$route.params.mberInnb,
              },
          );
      const mberInfo = response.data;
      this.mberInfo.mberInnb = mberInfo.mberInnb;
      this.mberInfo.id = mberInfo.id;
      this.mberInfo.mberNm = mberInfo.mberNm;
      let cttpc = mberInfo.cttpc.split('-');
      this.mberInfo.cttpc1 = cttpc[0];
      this.mberInfo.cttpc2 = cttpc[1];
      this.mberInfo.cttpc3 = cttpc[2];
      let email = mberInfo.email.split('@');
      this.mberInfo.email1 = email[0];
      this.mberInfo.email3 = email[1];
      this.mberInfo.email2 = '';
    },
    text_change(info){
      this.$store.commit('toast/warn', '공백 입력은 불가합니다.');
      if(info == 'id') this.mberInfo.id = this.mberInfo.id.replace(/ /gi,'');
      else if(info == 'password') this.mberInfo.password = this.mberInfo.password.replace(/ /gi,'');
    },
    idDplctChk_change () {
      if(!this.mberInfo.idDplctChkAt) return false;
      else this.mberInfo.idDplctChkAt = false;
    },
    async idDplctChk_click () {
      if(this.mberInfo.idDplctChkAt) return false;
      this.mberInfo.id = this.mberInfo.id.replaceAll(' ','');
      if(this.mberInfo.id == '') {
        this.$store.commit('toast/warn', '아이디를 입력해주세요.');
        return false;
      }

      this.$store.commit('loading/on');
      try {
        const cnt = await this.idDplctChk_api();
        if(Number(cnt) > 0){
          this.$store.commit('toast/warn','이미 가입된 아이디입니다.');
        }else{
          this.$store.commit('toast/suc', '사용가능한 아이디입니다.');
          this.mberInfo.idDplctChkAt = true;
        }
      } catch (e) {
        console.log(e);
        this.$store.commit('toast/err');
      } finally {
        this.$store.commit('loading/off');
      }
    },
    async idDplctChk_api () {
      const response =
          await this.axios.post(
              '/api/senior/admin/mberDplctChk',
              { id: this.mberInfo.id },
          );

      return response.data;
    },
    modifyValid () {
      this.mberInfo.id = this.mberInfo.id.replaceAll(' ','');
      if(this.mberInfo.id == ''){
        this.$store.commit('toast/warn','회원 명을 입력 해주세요.');
        return false;
      }

      this.mberInfo.mberNm = this.mberInfo.mberNm.replaceAll(' ','');
      if(this.mberInfo.mberNm == ''){
        this.$store.commit('toast/warn','회원 명을 입력 해주세요.');
        return false;
      }

      this.mberInfo.cttpc = this.cttpc;
      if(this.mberInfo.cttpc.length < 12){
        this.$store.commit('toast/warn','정확한 전화번호를 입력 해주세요.');
        return false;
      }

      this.mberInfo.email = this.email;

      if(this.mberInfo.email == ''){
        this.$store.commit('toast/warn','이메일을 입력해주세요.');
        return false;
      }

      const emailValid = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
      if(!emailValid.test(this.mberInfo.email)){
        this.$store.commit('toast/warn','올바른 이메일형식을 입력 해주세요.');
        return false;
      }

      return true;
    },
    async modifyMber_click () {
      this.$store.commit('loading/on');

      try {
        const cnt = await this.modifyMber_api();

        if(cnt > 0){
          this.$store.commit('toast/suc','정보를 수정하였습니다.');
          this.goMberList_click();
        } else {
          this.$store.commit('toast/err');
        }
      } catch (e) {
        console.log(e);
        this.$store.commit('toast/err');
      } finally {
        this.$store.commit('loading/off');
      }
    },
    async modifyMber_api () {
      const response =
          await this.axios.post(
              '/api/senior/admin/modifyMber',
              { mberInfo : this.mberInfo });

      return response.data;
    },
    async registMber_click () {
      if(!this.registValid()) return false;
      this.$store.commit('loading/on');

      try {
        const cnt = await this.registMber_api();

        if(cnt > 0){
          this.$store.commit('toast/suc','회원을 등록하였습니다.');
          this.initSearchData();
          this.goMberList_click();
        } else {
          this.$store.commit('toast/err');
        }
      } catch (e) {
        console.log(e);
        this.$store.commit('toast/err');
      } finally {
        this.$store.commit('loading/off');
      }
    },
    async registMber_api () {
      this.$store.commit('loading/on');
      const response =
          await this.axios.post('/api/senior/admin/registMber',
              { mberInfo : this.mberInfo });

      return response.data;
    },
    registValid () {
      if(!this.mberInfo.idDplctChkAt){
        this.$store.commit('toast/warn','id를 중복확인을 해주세요.');
        return false;
      }

      if(this.mberInfo.password == ''){
        this.$store.commit('toast/warn','password를 입력 해주세요.');
        return false;
      }

      if(this.mberInfo.mberNm == ''){
        this.$store.commit('toast/warn','회원 명을 입력 해주세요.');
        return false;
      }

      this.mberInfo.cttpc = this.cttpc;
      if(this.mberInfo.cttpc.length < 12){
        this.$store.commit('toast/warn','정확한 전화번호를 입력 해주세요.');
        return false;
      }

      this.mberInfo.email = this.email;

      if(this.mberInfo.email == ''){
        this.$store.commit('toast/warn','이메일을 입력해주세요.');
        return false;
      }

      const emailValid = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
      if(!emailValid.test(this.mberInfo.email)){
        this.$store.commit('toast/warn','올바른 이메일형식을 입력 해주세요.');
        return false;
      }

      return true;
    },
    goMberList_click () {
      this.$router.push({path: '/AppAdminSetting'}).catch(()=>{});
    },
    email_change () {
      if(this.mberInfo.email3.trim() != '') this.mberInfo.email3 = '';
    },
  },
  mounted() {
    this.init();
  }
}
</script>
