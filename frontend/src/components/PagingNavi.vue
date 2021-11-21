<template>
  <div class="pagenavi">
    <div class="pagenavi-con">
      <a class="first"
         href="javascript:;"
         @click="moveFirstPage()">처음</a>
      <a class="previouspostslink"
         href="javascript:;"
         @click="movePage(pagingInfo.curPageNum-1)">이전</a>
      <template v-for="i in getEndPageNum()">
        <template v-if="i >= getStartPageNum()">
          <a class="smaller page" href="javascript:;"
             v-if="i != pagingInfo.curPageNum"
             v-bind:key="'pageNum' + i"
             @click="clickPage(i)">{{i}}</a>
          <span class="current"
                v-if="i == pagingInfo.curPageNum"
                v-bind:key="'pageNum' + i">{{i}}</span>
        </template>
      </template>
      <a class="nextpostslink"
         href="javascript:;"
         @click="movePage(pagingInfo.curPageNum+1)">다음</a>
      <a class="last"
         href="javascript:;"
         @click="moveLastPage()">마지막</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagingNavi',
  props: ['pagingInfo'],
  computed: {
    pagingNaviInfo () {
      return this.pagingInfo;
    }
  },
  methods: {
    getStartPageNum (){
      const pageGrpInt = this.getPageGrpNum();

      let pageGrp = pageGrpInt;
      if(this.pagingInfo.curPageNum % this.pagingInfo.pageCnt == 0)
        pageGrp = pageGrpInt-1;

      const startPageNum = (pageGrp * this.pagingInfo.pageCnt) + 1;

      return startPageNum;
    },
    getEndPageNum (){
      const pageGrpInt = this.getPageGrpNum();

      let pageGrp = pageGrpInt + 1;
      if(this.pagingInfo.curPageNum % this.pagingInfo.pageCnt == 0)
        pageGrp = pageGrpInt;

      let endPageNum = this.getLastPageNum();

      if((pageGrp * this.pagingInfo.pageCnt) < this.getLastPageNum())
        endPageNum = pageGrp * this.pagingInfo.pageCnt;
      return endPageNum;
    },
    getLastPageNum (){
      const lastPageInt = Math.floor(this.pagingInfo.totCnt / this.pagingInfo.pageListCnt);

      let lastPageNum = lastPageInt+1;
      if(this.pagingInfo.totCnt % this.pagingInfo.pageListCnt == 0) lastPageNum = lastPageInt;

      return lastPageNum;
    },
    getPageGrpNum (){
      const pageGrp = Math.floor(this.pagingInfo.curPageNum / this.pagingInfo.pageCnt);
      return pageGrp;
    },
    moveFirstPage () {
      if (this.pagingInfo.curPageNum != 1) {
        this.movePage(1);
      } else {
        this.$store.commit('toast/warn','첫번째 페이지입니다.');
      }
    },
    moveLastPage () {
      const lastPageNum = this.getLastPageNum();
      if (this.pagingInfo.curPageNum != lastPageNum) {
        this.movePage(lastPageNum);
      } else {
        this.$store.commit('toast/warn','마지막 페이지입니다.');
      }
    },
    movePage (selPage){
      if(selPage < 1){
        this.$store.commit('toast/warn','첫번째 페이지입니다.');
        return false;
      }else if(selPage > this.getLastPageNum()){
        this.$store.commit('toast/warn','마지막 페이지입니다.');
        return false;
      }else{
        this.clickPage(selPage)
      }
    },
    clickPage (curPageNum){
      this.pagingNaviInfo.curPageNum = curPageNum;
      this.$emit('pagingInfo', this.listPagingInfo);
      if(typeof this.pagingInfo.callBackFunc != 'undefined'&&
          this.pagingInfo.callBackFunc != null){
        this.pagingInfo.callBackFunc();
      }
    }
  },
  mounted () {}
}
</script>

<style scoped>

</style>
