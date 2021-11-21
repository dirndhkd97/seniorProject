<template>
  <div v-if="initAt">
    <article class="box-type01" style="width: 95vw;">
      <div class="tit-type1-box">
        <h1 class="tit-type1">커뮤니티 상세</h1>
        <div>
          <button class="small bt-blue"
                  v-if="mberInfo.mberInnb == communityInfo.registMberInnb"
                  @click="modifyCommunity_click()">
            <span>수정</span>
          </button>
          <button class="small bt-gray"
                  @click="removeCommunity_click()">
            <span>삭제</span>
          </button>
          <button class="small bt-white"
                  @click="goCommunityList_click()">
            <span>목록으로</span>
          </button>
        </div>
      </div>
      <table class="tb-row">
        <colgroup>
          <col style="width:157px;" />
          <col style="width:auto;" />
        </colgroup>
        <tbody>
        <tr>
          <th class="__left">중요/일반</th>
          <td>{{ communityInfo.imprtncAtNm }}</td>
        </tr>
        <tr>
          <th class="__left">등록자</th>
          <td>{{ communityInfo.registMberNm }}</td>
        </tr>
        <tr>
          <th class="__left">등록일시</th>
          <td class="last">{{ communityInfo.registDe }}</td>
        </tr>
        <tr>
          <th class="__left">수정일시</th>
          <td class="last">{{ communityInfo.updtDe }}</td>
        </tr>
        <tr>
          <th class="__left">제목</th>
          <td class="last">
            {{ communityInfo.sj }}
          </td>
        </tr>
        <tr>
          <th class="__left">내용</th>
          <td class="last">
            <div class="board-view-con"
                 v-html="communityInfo.cn"></div>
          </td>
        </tr>
        </tbody>
      </table>
    </article>
  </div>
</template>

<script>
export default {
  name: 'CommunityDetail',
  props: ['initSearchData'],
  data() {
    return {
      initAt: false,
      communityInfo: {},
    }
  },
  computed: {
    mberInfo () {
      return this.$store.state.login.mberInfo;
    },
  },
  methods: {
    async init() {
      this.$store.commit('loading/on');

      try {
        const result = await this.searchCommunityInfo_api();
        this.communityInfo     = result;

        if (!this.communityInfo) {
          this.$store.commit('toast/err','존재하지 않는 게시물 입니다.');
          this.goCommunityList_click()
        } else {
          this.initAt = true;
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
    removeCommunity_click () {
      this.$store.commit(
          'popup/open',
          {
            name: 'ConfirmPopup',
            params: {
              msgHtml: '해당 게시물을 삭제 하시겠습니까?',
              okFunc: this.removeCommunity
            }
          })
    },
    async removeCommunity () {
      this.$store.commit('loading/on');

      try {
        const cnt = await this.removeCommunity_api();

        this.$store.commit('loading/off');

        if (cnt == 0) this.$store.commit('toast/err','존재하지 않는 게시물 입니다.');
        else this.initSearchData();


        this.goCommunityList_click();
      } catch (e) {
        console.log(e);
        this.$store.commit('toast/err');
        this.$store.commit('loading/off');
      }
    },
    async removeCommunity_api () {
      const response =
          await this.axios.post(
              '/api/senior/community/removeCommunity',
              { communitySn : this.$route.params.communitySn }
          );

      return response.data;
    },
    modifyCommunity_click () {
      const path = '/AppCommunity/Write/modify/' + this.$route.params.communitySn;
      this.$router.push({path: path}).catch(()=>{});
    },
    goCommunityList_click () {
      this.$router.push({path: '/AppCommunity'}).catch(()=>{});
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>

</style>
