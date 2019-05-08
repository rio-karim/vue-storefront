<template>
  <div class="form-question">
    <label class="form-question">{{ node.text }}</label>
    <div v-if="node.type === 'input'" type="text" name="" value="">
      <input v-model="answer" type="text" name="" value="">
    </div>
    <div v-else-if="node.type === 'choose'" class="" :key="option" v-for="option in node.options">
      <button :class="{ selected: answer === option }" :question="node.text" @click="answer = option"> {{ option }}</button>
    </div>
    <div v-else-if="node.type === 'checkbox'" class="" :key="option" v-for="option in node.options">
      <input type="checkbox" v-model="answer" :name="option" :value="option"><span> {{ option }}</span>
    </div>
    <div class="form" v-if="node.subQuestions && node.subQuestions.length">
      <node v-for="question in node.subQuestions" v-if="question.parentOption === answer" :key="question.id" :parent-node="question.parentId" :node="question"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Node',
  props: {
    node: {
      default: null,
      type: Object
    },
    parentNode: {
      default: 0,
      type: Number
    }
  },
  data: function () {
    return {
      answer: this.node.type === 'checkbox' ? [] : ''
    }
  },
  updated: function () {
    this.$root.$emit('updateAssessment', { id: this.node.id, answer: this.answer })
  }

}
</script>
<style lang='scss'>
@import 'theme/css/main.scss';
  .form{
    &-question{
      border-top:solid $color-primary 2px;
      padding:20px 0;
      button{
        padding:10px;
        &.selected{
          background:$color-primary;
          color:white;
        }
      }
    }
  }
</style>
