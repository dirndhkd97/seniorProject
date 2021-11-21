<template>
  <div v-if="initAt">
    <article class="box-type01"
             style="width: 95vw">
      <div class="tit-type1-box">
        <h1 class="tit-type1">커뮤니티 검색</h1>
        <div>
        </div>
      </div>
      <table class="tb-row">
        <colgroup>
          <col style="width:10%;" />
          <col style="width:15%;" />
          <col style="width:10%;" />
          <col style="width:15%;" />
        </colgroup>
        <tbody>
        <tr>
          <th class="__left">중요</th>
          <td>
            <select style="width:90%;"
                    v-model="searchBoxList.imprtncAt">
              <option v-for="(info, index) in searchBox.imprtncAtList"
                      :value="info.mlsfc"
                      :key="'imprtncAt'+index">{{info.mean}}</option>
            </select>
          </td>
          <th class="__left">등록/삭제</th>
          <td>
            <select style="width:90%;"
                    v-model="searchBoxList.delAt">
              <option v-for="(info, index) in searchBox.registDelAtCodeList"
                      :value="info.mlsfc"
                      :key="'info_'+index">{{info.mean}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <th class="__left">검색구분</th>
          <td class="last" colspan="3">
            <select class="mgr5" style="width:100px;"
                    v-model="searchBoxList.searchSe">
              <option v-for="(info,index) in searchBox.searchSeList"
                      :key="'searchSe' + index"
                      :value="info.mlsfc">
                {{ info.mean }}
              </option>
            </select>
            <input type="text"
                   class="txt"
                   style="width:110px;"
                   v-model="searchBoxList.searchTxt"
                   @keyup.enter="searchCommunityList_click"/>
            <button class="middle bt-blue mgt3 f-right"
                    @click="searchCommunityList_click()">
              <span>검색</span>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </article>
    <article class="box-type01"
             style="width: 95vw">
      <div class="tit-type1-box">
        <h1 class="tit-type1">커뮤니티 목록</h1>
        <div>
          <button class="small bt-blue"
                  @click="registCommunity_click()">
            <span>커뮤니티 등록</span>
          </button>
        </div>
      </div>
      <div style="overflow-x: auto;">
        <table class="tb-col">
          <colgroup>
            <col style="width: 80px;">
            <col style="width: auto;">
            <col style="width: 80px;">
          </colgroup>
          <thead>
          <tr>
            <th>커뮤니티번호</th>
            <th>제목</th>
            <th class="last">등록자명</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(info,index) in communityList"
              :key="'community' + index">
            <td>{{ info.communitySn }}</td>
            <td class="__left"
                style="cursor: pointer"
                @click="showCommunityDetail_click(info)">{{ info.sj }}</td>
            <td class="last">{{ info.registMberNm }}</td>
          </tr>
          <tr v-show="communityList.length == 0">
            <td class="last" colspan="7">조회 된 커뮤니티 목록이 없습니다.</td>
          </tr>
          </tbody>
        </table>
        <paging-navi :paging-info="pagingInfo"
                     v-if="pagingInfo.totCnt > pagingInfo.pageListCnt"></paging-navi>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'CommunityList',
  props: [
    'searchBox',
    'searchParams',
    'pagingInfo',
    'initPagingInfo',
    'setPagingInfoCallbackFunc'
  ],
  data() {
    return {
      initAt: false,
      communityList: []
    }
  },
  computed: {
    searchBoxList () {
      return this.searchBox;
    },
    listPagingInfo () {
      return this.pagingInfo;
    },
  },
  methods: {
    async init () {
      this.$store.commit('loading/on');

      try {
        this.setPagingInfoCallbackFunc(this.movePage_click);
        await this.searchCommunityList_api();

        this.initAt = true;
      } catch (e) {
        console.log(e);
        this.$store.commit('toast/err');
      } finally {
        this.$store.commit('loading/off');
      }
    },
    async searchCommunityList_click () {
      this.$store.commit('loading/on');

      const searchParams = this.searchParams;
      const searchBox    = this.searchBox;

      searchParams.imprtncAt    = searchBox.imprtncAt;
      searchParams.delAt        = searchBox.delAt;
      searchParams.searchSe     = searchBox.searchSe;
      searchParams.searchTxt    = searchBox.searchTxt;

      this.initPagingInfo();

      try {
        await this.searchCommunityList_api();

      } catch (e) {
        console.log(e);
        this.$store.commit('toast/err');
      } finally {
        this.$store.commit('loading/off');
      }
    },
    async movePage_click () {
      this.$store.commit('loading/on');

      try {
        await this.searchCommunityList_api();
      } catch (e) {
        console.log(e);
        this.$store.commit('toast/err');
      } finally {
        this.$store.commit('loading/off');
      }
    },
    async searchCommunityList_api () {
      const curPageNum = this.listPagingInfo.curPageNum;
      const pageListCnt = this.listPagingInfo.pageListCnt;

      const response =
          await this.axios.post(
              '/api/senior/community/searchCommunityList',
              {
                searchParams: this.searchParams,
                pagingInfo : {
                  curPageNum : curPageNum,
                  startCnt : ((curPageNum-1) * pageListCnt),
                  pageListCnt : pageListCnt
                },
              },
          );

      const result = response.data;

      this.communityList = result.communityList;
      this.listPagingInfo.totCnt = result.totCnt;
      this.$emit('pagingInfo', this.listPagingInfo);
    },
    showCommunityDetail_click (info) {
      this.$router.push({path: '/AppCommunity/Detail/' + info.communitySn}).catch(()=>{});
    },
    registCommunity_click () {
      const path = '/AppCommunity/Write/regist';
      this.$router.push({path: path}).catch(()=>{});
    },
  },
  mounted () {
    this.init();
  }
}
</script>

<style scoped>
</style>
