<template>
  <div v-if="initAt">
    <article class="box-type01">
      <div class="tit-type1-box">
        <h1 class="tit-type1">회원 검색</h1>
        <div>
        </div>
      </div>
      <table class="tb-row">
        <colgroup>
          <col style="width:15%;" />
          <col style="width:auto;" />
        </colgroup>
        <tbody>
        <tr>
          <th class="__left">검색구분</th>
          <td class="last">
            <select class="mgr5" style="width:150px;"
                    v-model="searchBoxList.searchSe">
              <option v-for="(info,index) in searchBox.searchSeList"
                      :key="'searchSe' + index"
                      :value="info.mlsfc">
                {{ info.mean }}
              </option>
            </select>
            <input type="text"
                   class="txt"
                   style="width:150px;"
                   v-model="searchBoxList.searchTxt"
                   @keyup.enter="searchMberList_click"/>
            <button class="middle bt-blue f-right"
                    @click="searchMberList_click()">
              <span>검색</span>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="btn-wrap mgt20 center">

      </div>
    </article>
    <article class="box-type01">
      <div class="tit-type1-box">
        <h1 class="tit-type1">게시판 목록</h1>
        <div>
          <button class="small bt-blue"
                  @click="registMber_click()">
            <span>관리자 등록</span>
          </button>
        </div>
      </div>
      <div style="overflow-x: auto;">
        <table class="tb-col">
          <colgroup>
            <col style="width: 50px;">
            <col style="width: 120px;">
            <col style="width: 120px;">
            <col style="width: 120px;">
            <col style="width: 200px;">
            <col style="width: 120px;">
            <col style="width: 120px;">
          </colgroup>
          <thead>
          <tr>
            <th>관리자번호</th>
            <th>ID</th>
            <th>이름</th>
            <th>연락처</th>
            <th>이메일</th>
            <th>등록일자</th>
            <th class="last">비고</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(info,index) in mberList"
              :key="'mber' + index">
            <td>{{ info.mberInnb }}</td>
            <td class="__left">{{ info.id }}</td>
            <td>{{ info.mberNm }}</td>
            <td>{{ info.cttpc }}</td>
            <td>{{ info.email }}</td>
            <td>{{ info.joinDt }}</td>
            <td class="last">
              <button class="small bt-gray"
                      v-if="mberInfo.mberInnb == info.mberInnb"
                      @click="modifyMber_click(info.mberInnb)">수정</button>
              <button class="small bt-white"
                      v-if="mberInfo.mberInnb == info.mberInnb"
                      @click="removeMber_click(info.mberInnb)">탈퇴</button>
            </td>
          </tr>
          <tr v-show="mberList.length == 0">
            <td class="last" colspan="7">조회 된 회원 목록이 없습니다.</td>
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
  name: 'AdminSettingList',
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
      mberList: []
    }
  },
  computed: {
    searchBoxList () {
      return this.searchBox;
    },
    listPagingInfo () {
      return this.pagingInfo;
    },
    mberInfo () {
      return this.$store.state.login.mberInfo;
    },
  },
  methods: {
    async init () {
      this.$store.commit('loading/on');

      try {
        this.setPagingInfoCallbackFunc(this.movePage_click);
        await this.searchMberList_api();

        this.initAt = true;
      } catch (e) {
        console.log(e);
        this.$store.commit('toast/err');
      } finally {
        this.$store.commit('loading/off');
      }
    },
    async searchMberList_click () {
      this.$store.commit('loading/on');

      const searchParams = this.searchParams;
      const searchBox    = this.searchBox;

      searchParams.imprtncAt    = searchBox.imprtncAt;
      searchParams.delAt        = searchBox.delAt;
      searchParams.searchSe     = searchBox.searchSe;
      searchParams.searchTxt    = searchBox.searchTxt;

      this.initPagingInfo();

      try {
        await this.searchMberList_api();

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
        await this.searchMberList_api();
      } catch (e) {
        console.log(e);
        this.$store.commit('toast/err');
      } finally {
        this.$store.commit('loading/off');
      }
    },
    async searchMberList_api () {
      const curPageNum = this.listPagingInfo.curPageNum;
      const pageListCnt = this.listPagingInfo.pageListCnt;

      const response =
          await this.axios.post(
              '/api/senior/admin/searchMberList',
              {
                searchParams: this.searchParams,
                pagingInfo : {
                  curPageNum  : curPageNum,
                  startCnt : ((curPageNum-1) * pageListCnt),
                  pageListCnt : pageListCnt
                },
              },
          );

      const result = response.data;

      this.mberList = result.mberList;
      this.listPagingInfo.totCnt = result.totCnt;
      this.$emit('pagingInfo', this.listPagingInfo);
    },
    registMber_click () {
      const path = '/AdminSetting/Write/regist';
      this.$router.push({path: path}).catch(()=>{});
    },
    removeMber_click (mberInnb) {
      this.$store.commit(
          'popup/open',
          {
            name: 'ConfirmPopup',
            params: {
              msgHtml: '관리자 멤버에서 탈퇴하시겠습니까?',
              okFunc: this.removeMber,
              okParams: mberInnb
            }
          })
    },
    async removeMber (mberInnb) {
      this.$store.commit('loading/on');

      try {
        const cnt = await this.removeMber_api(mberInnb);

        if (cnt == 0) this.$store.commit('toast/err','존재하지 않는 멤버 입니다.');
        else {
          this.$store.state.page.layoutSe = '';
          this.$store.dispatch('login/logout');
          this.$router.replace({path: '/'}).catch(()=>{});
          this.$store.commit('toast/suc','탈퇴완료 되었습니다.');
        }
      } catch (e) {
        console.log(e);
        this.$store.commit('toast/err');
      } finally {
        this.$store.commit('loading/off');
      }
    },
    async removeMber_api (mberInnb) {
      const response =
          await this.axios.post(
              '/api/senior/admin/removeMber',
              { mberInnb : mberInnb }
          );

      return response.data;
    },
    modifyMber_click (mberInnb) {
      const path = '/AdminSetting/Write/modify/' + mberInnb;
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
