<template>
  <div class="form-question">
    <label class="form-question">{{ node.text }}</label>

    <div v-if="node.type === 'input'" type="text" name="" value="">
      <input v-model="answer" type="text" name="" value="">

    </div>
    <div v-else-if="node.type === 'choose'" class="" :key="option" v-for="option in node.options">
      <button :class="{ selected: answer === option }" :question="node.text" @click="answer = option; logTest()"> {{ option }}</button>
    </div>
    <div v-else-if="node.type === 'checkbox'" class="" :key="option" v-for="option in node.options">
      <input type="checkbox" @change="answer = option; logTest()" :name="option" :value="option"><span> {{ option }}</span>
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
  methods: {
    // vmodelChecked: function (event) {
    //   let checkbox = event.srcElement
    //   if (checkbox.checked) { this.answer.push(checkbox.value) } else {
    //     this.answer = this.answer.filter(val => val !== checkbox.value)
    //   }
    //   console.log(this.answer)
    // },
    // vmodelChoose: function (event) {
    //   let button = event.srcElement
    //   let value = button.getAttribute('question-value')
    //   button.parentNode.parentNode.querySelectorAll(`button[question='${this.node.text}']`).forEach((btn) => {
    //     if (btn.classList.contains('selected')) { btn.classList.remove('selected') }
    //   })
    //   button.classList.add('selected')
    //   console.log(this.answer)
    // },
    logTest: function () {
      console.log(this.answer)
    }
  },
  data: function () {
    return {
      answer: ''
    }
  },
  beforeMount: function () {
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
