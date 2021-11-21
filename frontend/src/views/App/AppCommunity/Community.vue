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
  name: 'Community',
  computed: {
    curPath () {
      return this.$store.state.page.path.replace('/AppCommunity','');
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
        imprtncAt: '',
        delAt: 'N',
        searchSe: '001',
        searchTxt: '',
        registDelAtCodeList: [
          {mlsfc: '', mean: '전체'},
          {mlsfc: 'Y', mean: '삭제'},
          {mlsfc: 'N', mean: '등록'},
        ],
        searchSeList: [
          {mlsfc: '001', mean: '제목'},
          {mlsfc: '002', mean: '내용'},
          {mlsfc: '003', mean: '제목 + 내용'},
        ],
        imprtncAtList: [
          {mlsfc: '', mean: '전체'},
          {mlsfc: 'N', mean: '일반'},
          {mlsfc: 'Y', mean: '중요'},
        ],
      },
      searchParams: {
        imprtncAt: '',
        delAt: 'N',
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

      searchBox.imprtncAt = '';
      searchBox.delAt = 'N';
      searchBox.searchSe = '001';
      searchBox.searchTxt = '';
    },
    initSearchParams () {
      const searchParams = this.searchParams;

      searchParams.imprtncAt = '';
      searchParams.delAt = 'N';
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
