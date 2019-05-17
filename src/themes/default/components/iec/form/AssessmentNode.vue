<template>
<div :class="{ 'active': isActive, 'complete': node.id < currentActive, 'form-question-container': node.parentId && node.parentOption, 'form-question': !node.parentId && !node.parentOption }">
  <div v-if="!node.parentId && !node.parentOption" class="form-question-container sub-active">
    <div class="form-question-container__wrapper">
      <label class="question-label">{{ node.text }}</label>
      <ul class="question-list" v-if="node.textList && node.textList.length">
        <li :key="listItem" v-for="listItem in node.textList">{{ listItem }}</li>
      </ul>
      <div v-if="node.type === 'input'" class="question-input" :class="{ invalid:  requireInput && answer }" type="text" name="" value="">
        <input v-model="answer" @keyup="validateAnswer(answer).then((valid)=>{ isValid = valid; requireInput = !valid || !answer })" type="text" name="" value="">
      </div>
      <div v-else-if="node.type === 'choose'" class="question-choose">
        <button :key="option" v-for="option in node.options" :class="{ 'selected': answer === option }" :question="node.text" @click="answer = option; submitAnswer()"> {{ option }}</button>
      </div>
      <div v-else-if="node.type === 'checkbox'" class="question-checkbox" :key="option" v-for="option in node.options">
        <input type="checkbox" v-model="answer" :name="option" :value="option"><span> {{ option }}</span>
      </div>
      <div v-if="node.type === 'checkbox' || node.type === 'input'" class="question-submit">
        <button :disabled=" !isValid || !answer" :class="{ disabled:  !isValid || !answer }" type="button" name="button" @click="submitAnswer()">Submit</button>
      </div>
    </div>
  </div>
  <div v-else class="form-question-container__wrapper">
    <label class="question-label">{{ node.text }}</label>
    <div v-if="node.type === 'input'" class="question-input" type="text" name="" value="">
      <input v-model="answer" type="text" name="" value="">
    </div>
    <div v-else-if="node.type === 'choose'" class="question-choose">
      <button :key="option" v-for="option in node.options" :class="{ 'selected': answer === option }" :question="node.text" @click="answer = option; submitAnswer()"> {{ option }}</button>
    </div>
    <div v-else-if="node.type === 'checkbox'" class="question-checkbox" :key="option" v-for="option in node.options">
      <input type="checkbox" v-model="answer" :name="option" :value="option"><span> {{ option }}</span>
    </div>
    <div v-if="node.type === 'checkbox' || node.type === 'input'" class="question-submit">
      <button type="button" name="button" @click="submitAnswer()">Submit</button>
    </div>
  </div>
  <node v-for="question in node.subQuestions" v-if="node.subQuestions && node.subQuestions.length && question.parentOption === answer" :key="question.id" :parent-node="question.parentId" :node="question" />
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
      answer: this.node.type === 'checkbox' ? [] : '',
      isActive: false,
      isValid: true,
      requireInput: false,
      currentActive: 0
    }
  },
  methods: {
    validateAnswer: function (answer) {
      return new Promise((resolve, reject) => {
        if (this.node.type === 'input') {
          resolve(this.testNumber(answer))
        } else if (this.node.type === 'checkbox' && answer.length) {
          resolve(true)
        } else if (this.node.type === 'choose' && answer) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    },
    submitAnswer: function () {
      this.validateAnswer(this.answer).then((valid) => {
        this.$root.$emit('updateAssessmentForm', {
          id: this.node.id,
          answer: this.answer,
          isValid: valid
        })
      })
    },
    testNumber: function (input) {
      return /^[0-9]*$/.test(input)
    }
  },
  beforeMount: function () {
    this.$root.$on('updateAssessmentNodes', data => {
      this.currentActive = data.id
      this.isActive = this.node.id === data.id
    })
  },
  mounted: function () {
    let nestedQuestion = this.$el.parentNode.querySelector('.form-question-container__wrapper').nextElementSibling
    if (nestedQuestion) {
      nestedQuestion.parentNode.parentNode.appendChild(nestedQuestion)
    }
  },
  updated: function () {

  }
}
</script>
<style lang='scss' scoped>
@import 'theme/css/main.scss';
.form-question {
    position: absolute;
    right: -110%;
    width: 100%;
    top: 0;
    bottom: 0;
    padding: 20px 0;
    align-items: center;
    justify-content: center;
    background: white;
    display: none;
    flex-flow: column nowrap;
    display: flex;
    transition:right .4s ease-in-out;
    &.active {
      right:0;
    }
    &.complete {
      right:110%;
    }
    &-container {
        flex: 1;
        width: 100%;
        display: none;
        align-items: center;
        justify-content: center;
        &__wrapper {
            width: 100%;
            max-width: 400px;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            label {
                font-size: 26px;
                margin-bottom: 30px;
                text-align: center;
            }
            .question-list{
              margin-bottom:30px;
              li{
                margin-bottom:15px;
              }
            }
            .question-input {
                width: 100%;
                border-radius: 50px;
                overflow: hidden;
                display: flex;
                align-items: center;
                border: solid 1px $color-primary;
                justify-content: center;
                box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);

                &.invalid{
                  border-color: #CC7685;
                }
                input {
                    width: 100%;
                    border: none;
                    padding: 0 20px;
                    text-align: center;
                    font-size: 18px;
                    &:focus {
                        outline: none;
                    }
                }
            }
            .question-submit {
                margin-top: 30px;
                button {
                    text-align: center;
                    font-size: 18px;
                    border-radius: 50px;
                    border: solid $color-primary 1px;
                    background: $color-primary;
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 15px 20px;
                    transition: all 0.2s ease-in-out;
                    box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
                    min-width: 160px;
                    &:hover {
                        border-color: #CC7685;
                        background: #CC7685;
                    }
                    &[disabled]{
                      filter:grayscale(100);
                      opacity:.6;
                    }
                }
            }
            .question-choose {
                width: 100%;
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                justify-content: space-evenly;
                button {
                    text-align: center;
                    font-size: 18px;
                    background: none;
                    border-radius: 50px;
                    border: solid $color-primary 1px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 15px 20px;
                    margin: 5px;
                    transition: all 0.2s ease-in-out;
                    box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
                    min-width: 160px;
                    &.selected {
                        background: $color-primary;
                        color: white;
                    }
                    &:hover {
                        border-color: #CC7685;
                        background-color: #CC7685;
                        color: white;
                    }
                }
            }
        }
        &.sub-active {
            display: flex;
        }
    }
}
</style>
