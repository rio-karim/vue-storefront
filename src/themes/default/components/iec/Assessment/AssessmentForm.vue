<template>
<div class="AssessmentForm">
  <div class="AssessmentForm-wrapper AssessmentForm-wrapper__action">
    <button @click="cycleQuestion('down')" class="action__button action__button-back" :disabled="!canBack" :class="{ disabled : !canBack }" type="button" name="button"><span>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="444.819px" height="444.819px" viewBox="0 0 444.819 444.819" style="enable-background:new 0 0 444.819 444.819;"
          xml:space="preserve">
          <g>
            <path
              d="M434.252,114.203l-21.409-21.416c-7.419-7.04-16.084-10.561-25.975-10.561c-10.095,0-18.657,3.521-25.7,10.561   L222.41,231.549L83.653,92.791c-7.042-7.04-15.606-10.561-25.697-10.561c-9.896,0-18.559,3.521-25.979,10.561l-21.128,21.416   C3.615,121.436,0,130.099,0,140.188c0,10.277,3.619,18.842,10.848,25.693l185.864,185.865c6.855,7.23,15.416,10.848,25.697,10.848   c10.088,0,18.75-3.617,25.977-10.848l185.865-185.865c7.043-7.044,10.567-15.608,10.567-25.693   C444.819,130.287,441.295,121.629,434.252,114.203z" />
          </g>
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </svg>
      </span><span>Previous question</span>
    </button>
    <router-link class="action__button action__button-exit" to="/" exact>
      <span>Exit</span>
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 212.982 212.982" style="enable-background:new 0 0 212.982 212.982;" xml:space="preserve">
          <g id="Close">
            <path style="fill-rule:evenodd;clip-rule:evenodd;"
              d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312   c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312   l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937   c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z" />
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
        </svg>
      </span>
    </router-link>
  </div>
  <div class="AssessmentForm-wrapper AssessmentForm-wrapper__question">
    <assessment-node v-for="node in nodeList" :key="node.id" :node="node" />
  </div>
  <div class="AssessmentForm-wrapper AssessmentForm-wrapper__progress">
    <assessment-progress :nodeList="nodeList" />
  </div>
</div>
</template>

<script>
import AssessmentNode from './AssessmentNode'
import AssessmentProgress from './AssessmentProgress'
export default {
  components: {
    AssessmentNode,
    AssessmentProgress
  },
  props: {
    nodeList: {
      type: Array,
      default: () => []
    },
    nodeActive: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      canBack: false,
    }
  },
  methods: {
    cycleSubQuestion: function(question, traverse) {
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
            this.$delete(this.nodeList[this.nodeActive], 'subActive')
            return false
          }
          this.$set(this.nodeList[this.nodeActive], 'subActive', true)
          self.$_.each(self.$el.querySelectorAll('.form-question.active .form-question-container'), (el) => {
            if (el.classList.contains('sub-active')) {
              el.classList.remove('sub-active')
            }
          })
          el.classList.add('sub-active')
          return true
        }
      }
      this.$delete(this.nodeList[this.nodeActive], 'subActive')
      return false
    },
    cycleQuestion: function(traverse) {
      let self = this
      let currentIndex = this.nodeActive
      // Go forward in the questions
      if (traverse === 'up' && currentIndex < (this.nodeList.length - 1)) {
        // If there are subquestions to go forward to, check the required answer has been given
        let cycling = self.cycleSubQuestion(this.nodeList[currentIndex], traverse)
        if (!cycling && self.isValid(this.nodeList[currentIndex])) {
          this.$delete(this.nodeList[currentIndex], 'active')
          this.$set(this.nodeList[currentIndex + 1], 'active', true)
          this.$root.$emit('updateAssessmentNodes', {
            id: currentIndex + 1,
            active: true
          })
        }
      } else if (traverse === 'down' && currentIndex > 0) {
        // Code here to check there are subquestions to back into
        let cycling = self.cycleSubQuestion(this.nodeList[currentIndex], traverse)
        if (!cycling) {
          this.$delete(this.nodeList[currentIndex], 'active')
          this.$set(this.nodeList[currentIndex - 1], 'active', true)
        }
        this.$root.$emit('updateAssessmentNodes', {
          id: currentIndex - 1,
          active: true
        })
      }
      this.canBack = !this.nodeList[0].active
      this.$store.dispatch('assessment/commitAssessment', this.nodeList)
    },
    getActive: function() {
      return this.nodeActive
    },
    isValid: function(question) {
      return question.isValid && question.answer
    },
    extendDeep: function(arr, data) {
      let jsonFind = JSON.stringify(this.findDeep(arr, data.id))
      let jsonReplace = JSON.stringify(this.$_.extend(this.findDeep(arr, data.id), data))
      return JSON.parse(JSON.stringify(arr).replace(jsonFind, jsonReplace))
    },
    findDeep: function(arr, id) {
      for (const obj of arr) {
        if (obj.id === id) {
          return obj
        }
        if (obj.subQuestions) {
          let result = this.findDeep(obj.subQuestions, id)
          if (result) {
            return result
          }
        }
      }
    }
  },
  beforeMount: function() {
    this.$root.$on('updateAssessmentForm', data => {
      let response = this.extendDeep(this.nodeList, {
        id: data.id,
        answer: data.answer,
        isValid: data.isValid && !!data.answer
      })
      this.$set(this.nodeList, data.nodeId, response[data.nodeId])
      if (data.isValid) {
        this.cycleQuestion('up')
      }
    })
  },
  mounted: function () {
    this.canBack = !this.nodeList[0].active
    this.$root.$emit('updateAssessmentNodes', {
      id: this.nodeActive,
      active: true
    })
  },
  beforeDestroy: function () {
    this.$root.$off('updateAssessmentForm')
  }
}
</script>

<style lang='scss' scoped>
@import 'theme/css/main.scss';
.AssessmentForm {
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    display: flex;
    flex-flow: column nowrap;
    &-wrapper {
        flex: 1;
        width: 100%;
        position: relative;
        &__action {
            max-height: 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .action__button {
                display: flex;
                z-index: 2;
                align-items: center;
                justify-content: center;
                border-radius: 50px;
                background: $color-primary;
                border: none;
                cursor: pointer;
                color: white;
                font-size: 14px;
                height: 35px;
                max-height: 35px;
                padding: 0 7px;
                margin: 0 30px;
                &::after {
                    display: none;
                }
                &-back {
                    width: 185px;
                    &:hover {
                        span:first-child {
                            margin-left: -10px;
                        }
                        span:last-child {
                            opacity: 1;
                        }
                    }
                    span:first-child {
                        background: white;
                        border-radius: 50%;
                        display: flex;
                        transition: margin-left 0.1s ease-in-out;
                        align-items: center;
                        justify-content: center;
                        padding: 10px;
                        box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
                        svg {
                            height: 15px;
                            width: auto;
                            fill: #CC7685;
                            transform: rotate(90deg);
                        }
                    }
                    span:last-child {
                        transition: opacity 0.1s ease-in-out;
                        margin: 0 10px;
                        opacity: 0.6;
                        flex: 1;
                        text-align: center;
                    }
                    &[disabled] {
                        opacity: 0;
                    }
                }
                &-exit {
                    width: 100px;
                    &:hover {
                        span:first-child {
                            opacity: 1;
                        }
                        span:last-child {
                            margin-right: -10px;
                        }
                    }
                    span:last-child {
                        background: white;
                        transition: margin-right 0.1s ease-in-out;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 10px;
                        box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
                        svg {
                            height: 15px;
                            width: auto;
                            fill: #CC7685;
                            transform: rotate(90deg);
                        }
                    }
                    span:first-child {
                        transition: opacity 0.1s ease-in-out;
                        margin: 0 10px;
                        opacity: 0.6;
                        flex: 1;
                        text-align: center;
                    }
                }
            }
        }
        &__question {}
        &__progress {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            max-height: 100px;
        }
    }
}
</style>
