<template>
  <transition name="modal">
    <div class="modal-mask" :style="{'z-index':zIndex}">
      <div class="modal-wrapper">
        <div class="modal-container"
             ref="modalContainer"
             :style="containerStyle">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalPopupLayout',
  props: {
    setContainerStyle: Object,
    popupId: String,
  },
  computed: {
    containerStyle () {
      const style = {}
      if(this.setContainerStyle){
        if(this.setContainerStyle.width){
          style['width']     = this.setContainerStyle.width;
        }

        if(this.setContainerStyle.maxWidth){
          style['max-width'] = this.setContainerStyle.maxWidth;
        }
        style['position']  = 'absolute';
      }

      return style
    },
    popupIndex () {
      return this.$store.state.popup.list
          .findIndex( (info) => info.id == this.popupId )
    },
    zIndex () {
      return 990 + this.popupIndex;
    }
  },
  data () {
    return {}
  },
  methods: {
    init () {
      this.$nextTick( () => {
        const body = document.body;
        console.log(this.setContainerStyle);
        console.log(this.containerStyle);
        const modalContainer = this.$refs.modalContainer;
        const width  = body.clientWidth  - modalContainer.clientWidth;
        const height = body.clientHeight - modalContainer.clientHeight;
        const left = width/2;
        const top  = height/2;
        modalContainer.style.left = left + 'px';
        modalContainer.style.top = top + 'px';
      })
    },
  },
  mounted () {
    this.init();
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 1280px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
</style>
