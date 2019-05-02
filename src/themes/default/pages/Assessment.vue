<template lang="html">
  <div class="container">
    <div class="form" action="" method="post">
      <div class="form-question" :key="question.id" v-for="(question, index) in payload">
        {{ question.text }}
        <div v-if="question.type === 'input'" type="text" name="" value="">
          <input v-model="response[index].answer" type="text" name="" value="">
        </div>
        <div v-else-if="question.type === 'choose'" class="" :key="text" v-for="text in question.options">
          <button :class="{ selected : response[index] && response[index].answer === text}" @click="response[index].answer = text; question.selected = text;"> {{ text }}</button>
        </div>
        <div v-else-if="question.type === 'checkbox'" class="" :key="text" v-for="text in question.options">
          <input type="checkbox" @change="vmodelChecked($event, index)" :name="text" :value="text"><span> {{ text }}</span>
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
      console.log(this.response)
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
            'Stroke',
            'Angina',
            'Heart attack or other cardiovascular problems',
            'Liver disease',
            'Kidney disease',
            'Blood clotting problems',
            'Stomach or intestinal ulcer',
            'Dementia',
            'Mental illness',
            'Depression',
            'Injury of the brain',
            'Alcohol or drug problem',
            'Hereditary degenrative retinal disorder',
            'Anterior ischaemic optic neuropathy',
            'An abnormal heartbeat',
            'An abnormal penis',
            'Sickle cell disease, myeloma or leukaemia',
            'None of the above'
          ]
        },
        {
          id: 6,
          text: 'Are you allergic to any foods or drugs?',
          type: 'input'
        }
      ],
      response: [],
      testCheckbox: []
    }
  },
  beforeMount: function () {
    this.payload.forEach((question, index) => {
      this.response.push({
        answer: question.type === 'checkbox' ? [] : ''
      })
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
