<template>
  <div v-if="initAt">
    <article class="box-type01" style="width: 925px;">
      <div class="tit-type1-box">
        <h1 class="tit-type1">
          <template v-if="mode == 'regist'">커뮤니티 등록</template>
          <template v-if="mode == 'modify'">커뮤니티 수정</template>
        </h1>
        <div>
          <template v-if="mode == 'regist'">
            <button class="small bt-blue"
                    @click="registCommunity_click()">
              <span>등록</span>
            </button>
            <button class="small bt-white"
                    @click="goCommunityList()">
              <span>취소</span>
            </button>
          </template>
          <template v-if="mode == 'modify'">
            <button class="small bt-blue"
                    @click="modifyCommunity_click()">
              <span>수정</span>
            </button>
            <button class="small bt-white"
                    @click="goCommunityDetail()">
              <span>취소</span>
            </button>
          </template>
        </div>
      </div>
      <table class="tb-row">
        <colgroup>
          <col style="width:157px;" />
          <col style="width:auto;" />
          <col style="width:157px;" />
          <col style="width:auto;" />
        </colgroup>
        <tbody>
        <template v-if="mode == 'regist'">
          <th class="__left">중요/일반</th>
          <td class="last" colspan="3">
            <select class="" style="width:150px;"
                    v-model="communityInfo.imprtncAt">
              <option v-for="(info, index) in imprtncAtList"
                      :value="info.mlsfc"
                      :key="'imprtncAt'+index">{{info.mean}}</option>
            </select>
          </td>
        </template>
        <template v-if="mode == 'modify'">
          <tr>
            <th class="__left">중요/일반</th>
            <td class="last" colspan="3">
              <select class="" style="width:150px;"
                      v-model="communityInfo.imprtncAt">
                <option v-for="(info, index) in imprtncAtList"
                        :value="info.mlsfc"
                        :key="'imprtncAt'+index">{{info.mean}}</option>
              </select>
            </td>
          </tr>
          <tr>
            <th class="__left">등록자</th>
            <td>{{ communityInfo.registMberNm }}</td>
            <th class="__left">등록일시</th>
            <td class="last">{{ communityInfo.registDe }}</td>
          </tr>
        </template>
        <tr>
          <th class="__left">제목</th>
          <td class="last" colspan="3">
            <textarea type="text"
                      maxlength="300"
                      class="autosize"
                      style="width: 100%; height: 60px; resize: none;padding: 12px 15px;"
                      v-model="communityInfo.sj">
            </textarea>
          </td>
        </tr>
        <tr>
          <th class="__left">내용</th>
          <td class="last" colspan="3">
            <textarea type="text"
                      maxlength="2000"
                      class="autosize"
                      style="width: 100%; height: 100px; resize: none;padding: 12px 15px;"
                      v-model="communityInfo.cn">
            </textarea>
          </td>
        </tr>
        </tbody>
      </table>
    </article>
  </div>
</template>

<script>
export default {
  name: 'CommunityWrite',
  props: ['initSearchData','searchParams','searchBox'],
  data () {
    return {
      initAt: false,
      imprtncAtList: [],
      mode: '',
      communityInfo: {
        imprtncAt: 'N',
        delAt: 'N',
        sj: '',
        cn: '',
      },
    }
  },
  computed: {
    mberInfo () {
      return this.$store.state.login.mberInfo;
    },
  },
  methods: {
    async init () {
      this.imprtncAtList = JSON.parse(JSON.stringify(this.searchBox.imprtncAtList));
      this.imprtncAtList.splice(0,1);

      this.mode = this.$route.params.mode;

      if (this.mode == 'modify') await this.searchCommunityInfo();

      this.initAt = true;
    },
    async searchCommunityInfo () {
      this.$store.commit('loading/on');

      try {
        const result = await this.searchCommunityInfo_api();
        this.communityInfo = result;

        if (!this.communityInfo) {
          this.$store.commit('toast/err','존재하지 않는 게시물 입니다.');
          this.goCommunityList_click()
        }

      } catch (e) {
        console.log(e);
        this.$store.commit('toast/err');
      } finally {
        this.$store.commit('loading/off');
      }
    },
    async searchCommunityInfo_api () {
      const response =
          await this.axios.post(
              '/api/senior/community/searchCommunityInfo',
              {
                communitySn:this.$route.params.communitySn,
              },
          );

      return response.data;
    },
    modifyCommunity_click () {
      this.communityInfo.mberInnb = this.mberInfo.mberInnb;

      if(this.valid()) return false;

      this.$store.commit(
          'popup/open',
          {
            name: 'ConfirmPopup',
            params: {
              msgHtml: '게시물을 수정 하시겠습니까?',
              okFunc: this.modifyCommunity
            }
          })
    },
    async modifyCommunity () {
      this.$store.commit('loading/on');

      try {
        const cnt = await this.modifyCommunity_api();

        if(cnt > 0){
          this.$store.commit('toast/suc','게시물을 수정하였습니다.');
          this.goCommunityDetail();
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
    async modifyCommunity_api () {
      const response =
          await this.axios.post(
              '/api/senior/community/modifyCommunity',
              { communityInfo : this.communityInfo });

      return response.data;
    },
    registCommunity_click () {
      this.communityInfo.mberInnb = this.mberInfo.mberInnb;

      if(this.valid()) return false;

      this.$store.commit(
          'popup/open',
          {
            name: 'ConfirmPopup',
            params: {
              msgHtml: '게시물을 등록 하시겠습니까?',
              okFunc: this.registCommunity
            }
          })
    },
    async registCommunity () {
      this.$store.commit('loading/on');

      try {
        const result = await this.registCommunity_api();
        const cnt = result;
        if(cnt > 0){
          this.$store.commit('toast/suc','게시물을 등록하였습니다.');
          this.initSearchData();
          this.goCommunityList();
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
    async registCommunity_api () {
      this.$store.commit('loading/on');
      const response =
          await this.axios.post('/api/senior/community/registCommunity',
              { communityInfo : this.communityInfo });

      return response.data;
    },
    valid () {
      let validAt = false;

      let message = '';

      if (this.communityInfo.sj.replace(/(\s*)/g, '').length == 0) {
        message = '제목을 입력해 주세요.';
        validAt = true;
      }
      if (this.communityInfo.cn.trim().length == 0 && !validAt) {
        message = '내용을 입력해 주세요.';
        validAt = true;
      }

      if (validAt)
        this.$store.commit('toast/warn',message);

      return validAt
    },
    goCommunityList () {
      this.$router.push({path: '/Community'}).catch(()=>{});
    },
    goCommunityDetail () {
      const path = '/Community/Detail/' + this.$route.params.communitySn;
      this.$router.push({path: path}).catch(()=>{});
    }
  },
  mounted() {
    this.init();
  }
}
</script>
