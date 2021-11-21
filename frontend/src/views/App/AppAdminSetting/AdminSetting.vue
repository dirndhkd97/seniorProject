<template>
  <div>
    <router-view v-if="initAt"
                 :searchBox="searchBox"
                 :searchParams="searchParams"
                 :paging-info="pagingInfo"
                 :init-paging-info="initPagingInfo"
                 :init-search-data="initSearchData"
                 :setPagingInfoCallbackFunc="setPagingInfoCallbackFunc"></router-view>
  </div>
</template>

<script>
export default {
  name: 'AppAdminSetting',
  computed: {
    curPath () {
      return this.$store.state.page.path.replace('/AppAdminSetting','');
    },
    showType () {
      let showType = 'list';

      const path = this.curPath;

      if(path.indexOf('Detail') > -1) showType = 'detail';
      else if(path.indexOf('Write') > -1) showType = 'write';

      return showType;
    }
  },
  data() {
    return {
      initAt: false,
      searchBox: {
        searchSe: '001',
        searchTxt: '',
        searchSeList: [
          {mlsfc: '001', mean: 'ID'},
          {mlsfc: '002', mean: '이름'},
        ],
      },
      searchParams: {
        searchSe: '001',
        searchTxt: '',
      },
      pagingInfo: {
        totCnt: 0, /* 총게시물 수*/
        pageListCnt: 10, /* 페이지당 게시물수 */
        pageCnt: 10, /* 페이지 표시 수 */
        curPageNum: 1,/* 현재페이지 */
        callBackFunc: null
      },
    }
  },
  methods: {
    init () {
      this.initAt = true;
    },
    initSearchData () {
      this.initSearchBox();
      this.initSearchParams();
      this.initPagingInfo();
    },
    initSearchBox () {
      const searchBox = this.searchBox;

      searchBox.searchSe = '001';
      searchBox.searchTxt = '';
    },
    initSearchParams () {
      const searchParams = this.searchParams;

      searchParams.searchSe = '001';
      searchParams.searchTxt = '';
    },
    initPagingInfo () {
      const pagingInfo = this.pagingInfo;

      pagingInfo.totCnt      = 0;
      pagingInfo.pageListCnt = 10;
      pagingInfo.pageCnt     = 10;
      pagingInfo.curPageNum  = 1;
    },
    setPagingInfoCallbackFunc (func) {
      this.pagingInfo.callBackFunc = func;
    },
  },
  mounted() {
    this.init();
  }
}
</script>
