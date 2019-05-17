<template lang="html">
  <div class="ConditionSelector">
    <!-- <div class="ConditionSelector__select">
      <button class="ConditionSelector__button">
        Erectile Dysfunction
      </button>
      <ul class="ConditionSelector__list">
        <li class="ConditionSelector__list-item">Erectile Dysfunction</li>
      </ul>
    </div> -->
    <div @click="selectCondition()" class="ConditionSelector__select"><div class="select-icon"><span>ED</span></div><span>Erectile Dysfunction</span><span>
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
    </span></div>
    <router-link
      class="ConditionSelector__anchor"
      to="/assessment"
      exact>
      <span>Quick Consultation</span>
    </router-link>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  computed: {
    ...mapGetters('category', ['getCategories']),
    categories() {
      return this.getCategories.filter((op) => {
        return op.level === (this.$store.state.config.entities.category.categoriesDynamicPrefetchLevel ? this.$store.state.config.entities.category.categoriesDynamicPrefetchLevel :
          2) // display only the root level (level =1 => Default Category), categoriesDynamicPrefetchLevel = 2 by default
      })
    },
    visibleCategories() {
      return this.categories.filter(category => {
        return category.product_count > 0 || category.children_count > 0
      })
    }
  },
  methods: {
    selectCondition: function () {
      console.log(this.visibleCategories)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'theme/css/main.scss';
.ConditionSelector {
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    background: white;
    border-radius: 50px;
    padding: 10px 15px;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,.1);
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__anchor {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50px;
        background-color: #000C00;
        color: white;
        cursor: pointer;
        flex: 1;
        transition: all 0.2s ease-in-out;
        height: 50px;
        margin-left: 5px;
        &::after {
            display: none;
        }
        &:hover {
            background-color: #CC7685;
        }
    }
    &__select {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: row nowrap;
        justify-content: space-evenly;
        flex: 1;
        height: 50px;
        cursor: pointer;
        margin-right: 5px;
        .select-icon {
            color: #CC7685;
            border-radius: 50%;
            font-size: 10px;
            box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
            background: white;
            padding: 5px;
            margin-right: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        span:nth-child(2) {
            padding-top: 2.5px;
        }
        span:last-child {
            svg {
                height: 10px;
                width: auto;
                fill: #CC7685;
            }
        }
    }
}
</style>
