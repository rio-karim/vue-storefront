<template lang="html">
  <div class="container">
    <div class="form" action="" method="post">
      <div class="form-question" :key="question.id" v-for="(question, index) in payload">
        {{ question.text }}
        <div v-if="question.type === 'input'" type="text" name="" value="">
          <input v-model="response[index].answer" type="text" name="" value="">

        </div>
        <div v-else-if="question.type === 'choose'" class="" :key="text" v-for="text in question.options">
          <button :class="{ selected : response[index] && response[index].answer === text}" @click="response[index].answer = text"> {{ text }}</button>
        </div>
        <div v-else-if="question.type === 'checkbox'" class="" :key="text" v-for="text in question.options">
          <input type="checkbox" @change="vmodelChecked($event, index)" :name="text" :value="text"><span> {{ text }}</span>
        </div>

        <div v-if="response[index] && response[index].answer && question.subQuestions" :key="subQuestion.id" v-for="(subQuestion, subIndex) in question.subQuestions">
          <div class="form-question" v-if="response[index].answer === subQuestion.parentOption">
            {{ subQuestion.text }}
            <div v-if="subQuestion.type === 'choose'" class="" :key="subText" v-for="subText in subQuestion.options">
              <button :class="{ selected : response[index].subQuestions[subIndex].answer && response[index].subQuestions[subIndex].answer === subText }" @click="response[index].subQuestions[subIndex].answer = subText"> {{ subText }}</button>
            </div>
          </div>
        </div>

      </div>
      <div class="form-question form-submit">
        <button @click="submit()" type="button" name="button">SUBMIT</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  methods: {
    vmodelChecked: function (event, index) {
      let checkbox = event.srcElement
      if (checkbox.checked) { this.response[index].answer.push(checkbox.value) } else {
        this.response[index].answer = this.response[index].answer.filter(val => val !== checkbox.value)
      }
    },
    submit: function () {
      console.log('SEND TO API: ', this.response)
    }
  },
  components: {
  },
  data: function () {
    return {
      payload: [
        {
          id: 0,
          text: 'Height (in centimetres):',
          type: 'input'
        },
        {
          id: 1,
          text: 'Weight (in kilograms):',
          type: 'input'
        },
        {
          id: 2,
          text: 'Have you had your blood pressure checked in the last 6 months?',
          type: 'choose',
          options: [
            'Yes',
            'No'
          ]
        },
        {
          id: 3,
          text: 'Is your blood pressure:',
          type: 'choose',
          options: [
            'Normal: Between 90/60 - 140/90',
            'Low: Below 90/60',
            'High - Above 140/90'
          ],
          subQuestions: [{
            parentId: 2,
            parentOption: 'High - Above 140/90',
            id: 9,
            text: 'Is your blood pressure currently being controlled with medication?',
            type: 'choose',
            options: [
              'Yes',
              'No'
            ]
          }]
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
      testCheckbox: []
    }
  },
  beforeMount: function () {
    this.payload.forEach((question, index) => {
      this.response.push(Object.assign({
        answer: question.type === 'checkbox' ? [] : ''
      }, question))
      if (question.subQuestions) {
        this.response[index].subQuestions = []
        question.subQuestions.forEach((subQuestion, subIndex) => {
          this.response[index].subQuestions.push(
            Object.assign({
              answer: subQuestion.type === 'checkbox' ? [] : ''
            }, subQuestion)
          )
          console.log(this.response[index].subQuestions)
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'theme/css/main.scss';
.container{
  padding:30px;
  display:flex;
  align-items:center;
  justify-content:center;
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
}
</style>
