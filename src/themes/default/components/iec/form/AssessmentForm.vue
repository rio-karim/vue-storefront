<template>
  <div class="AssessmentForm">
    <button @click="cycleQuestion('down')" class="AssessmentForm__button AssessmentForm__button-back" :class="{ valid : canBack }" type="button" name="button"><span>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="444.819px" height="444.819px" viewBox="0 0 444.819 444.819" style="enable-background:new 0 0 444.819 444.819;" xml:space="preserve">
        <g>
          <path d="M434.252,114.203l-21.409-21.416c-7.419-7.04-16.084-10.561-25.975-10.561c-10.095,0-18.657,3.521-25.7,10.561   L222.41,231.549L83.653,92.791c-7.042-7.04-15.606-10.561-25.697-10.561c-9.896,0-18.559,3.521-25.979,10.561l-21.128,21.416   C3.615,121.436,0,130.099,0,140.188c0,10.277,3.619,18.842,10.848,25.693l185.864,185.865c6.855,7.23,15.416,10.848,25.697,10.848   c10.088,0,18.75-3.617,25.977-10.848l185.865-185.865c7.043-7.044,10.567-15.608,10.567-25.693   C444.819,130.287,441.295,121.629,434.252,114.203z"/>
        </g>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
        <g/>
      </svg>
    </span><span>Previous question</span>
    </button>
    <router-link
      class="AssessmentForm__button AssessmentForm__button-back AssessmentForm__button-exit"
      :class="{ valid : !canBack }"
      to="/"
      exact>
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="444.819px" height="444.819px" viewBox="0 0 444.819 444.819" style="enable-background:new 0 0 444.819 444.819;" xml:space="preserve">
          <g>
            <path d="M434.252,114.203l-21.409-21.416c-7.419-7.04-16.084-10.561-25.975-10.561c-10.095,0-18.657,3.521-25.7,10.561   L222.41,231.549L83.653,92.791c-7.042-7.04-15.606-10.561-25.697-10.561c-9.896,0-18.559,3.521-25.979,10.561l-21.128,21.416   C3.615,121.436,0,130.099,0,140.188c0,10.277,3.619,18.842,10.848,25.693l185.864,185.865c6.855,7.23,15.416,10.848,25.697,10.848   c10.088,0,18.75-3.617,25.977-10.848l185.865-185.865c7.043-7.044,10.567-15.608,10.567-25.693   C444.819,130.287,441.295,121.629,434.252,114.203z"/>
          </g>
          <g/>
          <g/>
          <g/>
          <g/>
          <g/>
          <g/>
          <g/>
          <g/>
          <g/>
          <g/>
          <g/>
          <g/>
          <g/>
          <g/>
          <g/>
        </svg>
      </span><span>Exit</span>
    </router-link>
    <assessment-node v-for="node in payload" :key="node.id" :node="node"/>
    <button @click="cycleQuestion('up')" class="AssessmentForm__button AssessmentForm__button-submit" :class="{ valid : canSubmit }" type="button" name="button"><span>Submit</span></button>
  </div>
</template>

<script>
import AssessmentNode from './AssessmentNode'

export default {
  components: {
    AssessmentNode
  },
  data: function () {
    return {
      payload: [
        {
          id: 0,
          text: 'Height (in centimetres):',
          type: 'input',
          active: true
        },

        {
          id: 1,
          text: 'Is your blood pressure:',
          type: 'choose',
          options: [
            'Normal: Between 90/60 - 140/90',
            'Low: Below 90/60',
            'High - Above 140/90'
          ],
          subQuestions: [{
            parentId: 1,
            parentOption: 'High - Above 140/90',
            id: 9,
            text: 'Level 2 Test',
            type: 'choose',
            options: [
              'Yes',
              'No'
            ],
            subQuestions: [{
              parentId: 9,
              parentOption: 'Yes',
              id: 21,
              text: 'Level 3 Test',
              type: 'choose',
              options: [
                'Yes',
                'No'
              ],
              subQuestions: [{
                parentId: 21,
                parentOption: 'Yes',
                id: 37,
                text: 'Level 4 Test',
                type: 'choose',
                options: [
                  'Yes',
                  'No'
                ]
              }]
            }]
          }]
        },
        {
          id: 2,
          text: 'Weight (in kilograms):',
          type: 'input'
        },
        {
          id: 3,
          text: 'Have you had your blood pressure checked in the last 6 months?',
          type: 'choose',
          options: [
            'Yes',
            'No'
          ]
        },
        {
          id: 4,
          text: 'Do you know your exact blood pressure?',
          type: 'input'
        },
        {
          id: 5,
          text: 'Tick the appropriate boxes to show whether you have, or have ever been diagnosed with, any of the following.',
          type: 'checkbox',
          options: [
            'Diabetes',
            'High blood pressure',
            'Thyroid problem',
            'Stroke'
          ]
        }
      ],
      response: [],
      canSubmit: false,
      canBack: false
    }
  },
  methods: {
    cycleSubQuestion: function (question, traverse) {
      let self = this
      if (question.subQuestions) {
        let findSubquestion = self.$_.filter(question.subQuestions, (subQuestion) => {
          return subQuestion.parentOption === question.answer
        })
        if (findSubquestion.length) {
          // Clear sub-active status from hard-coded origin question
          let currentSub = self.$el.querySelector('.form-question.active .form-question-container.sub-active')
          let el = traverse === 'down' ? currentSub.previousElementSibling : currentSub.nextElementSibling
          if (!el) {
            console.log('Next master question')
            return false
          }
          self.$_.each(self.$el.querySelectorAll('.form-question.active .form-question-container'), (el) => {
            if (el.classList.contains('sub-active')) {
              el.classList.remove('sub-active')
            }
          })
          el.classList.add('sub-active')
          return true
        }
      }
      console.log('Next master question')
      return false
    },
    isValid: function (question) {
      return question.isValid && question.answer
    },
    cycleQuestion: function (traverse) {
      let self = this
      let currentIndex = self.getActive()
      // Go forward in the questions
      if (traverse === 'up' && currentIndex < (this.payload.length - 1)) {
        // If there are subquestions to go forward to, check the required answer has been given
        let cycling = self.cycleSubQuestion(this.payload[currentIndex], traverse)
        if (!cycling && self.isValid(this.payload[currentIndex])) {
          delete this.payload[currentIndex].active
          this.$root.$emit('activeAssessment', {
            id: currentIndex + 1,
            active: true
          })
          this.payload[currentIndex + 1].active = true
        }
        this.canSubmit = false
      } else if (traverse === 'down' && currentIndex > 0) {
        // Code here to check there are subquestions to back into
        let cycling = self.cycleSubQuestion(this.payload[currentIndex], traverse)
        if (!cycling) {
          delete this.payload[currentIndex].active
          this.$root.$emit('activeAssessment', {
            id: currentIndex - 1,
            active: true
          })
          this.payload[currentIndex - 1].active = true
        }
      }
      this.canSubmit = true
      this.canBack = !this.payload[0].active
    },
    getActive: function () {
      return this.$_.findIndex(this.payload, (checkIndex) => checkIndex.active)
    },
    extendDeep: function (arr, data) {
      let jsonFind = JSON.stringify(this.findDeep(arr, data.id))
      let jsonReplace = JSON.stringify(this.$_.extend(this.findDeep(arr, data.id), data))
      return JSON.parse(JSON.stringify(arr).replace(jsonFind, jsonReplace))
    },
    findDeep: function (arr, id) {
      for (const obj of arr) {
        if (obj.id === id) { return obj }
        if (obj.subQuestions) {
          let result = this.findDeep(obj.subQuestions, id)
          if (result) { return result }
        }
      }
    },
    submitOrder: function () {
      console.log('%c Sending Response: ', 'color: #75cbbc;', this.response)
    }
  },
  beforeMount: function () {
    this.payload[0].active = true
    this.canBack = !this.payload[0].active
    this.$root.$on('updateAssessment', data => {
      console.log('%c Node Recieved: ', 'color: #75cbbc;', data)
      this.response = this.extendDeep(this.payload, { id: data.id, answer: data.answer, isValid: data.isValid })
      this.canSubmit = data.isValid
    })
  },
  mounted: function () {
    this.$root.$emit('activeAssessment', { id: this.getActive(), active: true })
  }
}
</script>

<style lang='scss' scoped>
@import 'theme/css/main.scss';
.AssessmentForm{
  align-items: center;
  justify-content:center;
  position:absolute;
  right:0;
  left:-100%;
  bottom:0;
  top:0;

  &__button{
    position:fixed;
    top:75px;
    display:flex;
    z-index:3000;
    align-items: center;
    justify-content: center;
    border-radius:50px;
    background:$color-primary;
    border:none;
    cursor:pointer;
    color:white;
    font-size:14px;
    padding:0 7px;
    &::after{
      display:none;
    }
    &-back{
      left:40px;
      min-width:70px;
      &:hover{
        span:last-child{
          opacity:1;
        }
      }
      span:first-child{
        background:white;
        border-radius:50%;
        display:flex;
        align-items: center;
        justify-content: center;
        padding:10px;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
        svg{
          height:15px;
          width:auto;
          fill: #CC7685;
          transform: rotate(90deg);
        }
      }
      span:last-child{
        transition:opacity .2s ease-in-out;
        margin:0 10px;
        opacity:.4;
        flex:1;
      }
    }
    &-exit{
      span:last-child{
        opacity:1;
      }
    }
    &-submit{
      right:40px;
      span:first-child{
        padding:10px;
      }
    }
    &:not(.valid){
      display:none;
    }
  }
}
</style>
