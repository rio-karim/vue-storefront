<template lang="html">
  <div class="AssessmentProgress">
    <ul class="AssessmentProgress__list">
      <li v-for="node in nodeList" :key="node.id" :class="{ complete: node.answer && !node.active, active: node.active }" class="AssessmentProgress__list-item">
        <span v-if="node.answer && !node.active">✔</span>
        <span v-else>{{ (node.id+1) }}</span>
        <div class="subActive" :class="{ show : node.active && node.subActive }"> <span>!</span> </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'Progress',
  props: {
    nodeList: {
      type:Array,
      default: null
    }
  },
  updated: function () {
    console.log(this.nodeList)
  }
}
</script>

<style lang="scss" scoped>
@import 'theme/css/main.scss';
.AssessmentProgress{
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:0;
  ul{
    display:flex;
    flex-flow: row nowrap;
    list-style: none;
    padding:0;
    li{
      background: transparent;
      transition:all .2s ease-in-out;
      border-radius:50%;
      width:25px;
      height:25px;
      display:flex;
      align-items: center;
      justify-content: center;
      margin:0 15px;
      position:relative;
      z-index:2;
      &.active{
        color:white;
        background:#CC7685;
      }
      &.complete{
        color:white;
        background:$color-primary;
      }
      .subActive{
        position:absolute;
        background: rgb(204,118,133);
        background: linear-gradient(0deg, rgba(204,118,133,1) 0%, rgba(235,88,0,1) 100%);
        color:white;
        border-radius:50%;
        width:25px;
        height:25px;
        align-items: center;
        bottom:0;
        display:flex;
        justify-content: center;
        transition:all .4s ease-in-out;
        opacity:0;
        z-index:1;
        &.show{
          opacity:1;
          bottom:125%;
        }
      }
    }
  }
}
</style>
