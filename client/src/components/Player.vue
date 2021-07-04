<template>
  <v-card
    max-width="250"
    max-height="250"
    width="250"
    height="250"
    elevation="9"
    class="ma-1"
  >
    <h3 :class="['text-center', activeTurn]">{{owner.getName()}}</h3>
    <div class="main-info" v-if="owner">
      <div class="status">
        <div class="main-status-container health" :style="healthStyle">
          <span class="main-status">
            <v-icon>mdi-hospital</v-icon>
            {{owner.getHealthPoint()}} / {{owner.getMaxHealthPoint()}}
          </span>
        </div>
        <div class="main-status-container food" :style="foodStyle">
          <span class="main-status">
            <v-icon>mdi-food-apple</v-icon>
            {{owner.getFoodPoint()}} / {{owner.getMaxFoodPoint()}}
          </span>
        </div>
      </div>

      <div class="stats">
        <span>
          <v-icon>mdi-sword</v-icon>
          {{owner.getAttack()}}
        </span>
        <span>
          <v-icon>mdi-shield-outline</v-icon>
          {{owner.getDefence()}}
        </span>
      </div>
    </div>
    <div class="image">
      <v-img
      contain
      max-width="170"
      max-height="170"
      :src="castleImage"></v-img>
    </div>
  </v-card>
</template>

<script>
import { interpolation } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'Player',

  props: {
    owner: Object
  },

  data: () => ({
    castleImage: require('@/assets/castle.png'),
    healthFoodWidth: 100
  }),

  computed: {
    ...mapGetters(['currentPlayerMove', 'gameId']),
    healthStyle () {
      const ownerHP = this.owner.getHealthPoint()
      const maxHP = this.owner.getMaxHealthPoint()
      return `width: ${interpolation(this.healthFoodWidth, maxHP, ownerHP)}px`
    },
    foodStyle () {
      const ownerFood = this.owner.getFoodPoint()
      const maxFood = this.owner.getMaxFoodPoint()
      return `width: ${interpolation(this.healthFoodWidth, maxFood, ownerFood)}px`
    },
    activeTurn () {
      if (Object.is(this.owner, this.currentPlayerMove)) {
        return 'color: blue'
      }
      return 'color: grey lighten-2'
    }
  }
}
</script>

<style scoped>
.main-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-status-container {
  width: 100px;
  max-width: 100px;
  height: 20px;
  margin-left: 3px;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 14px;
}

.main-status {
  position: absolute;
}

.health {
  background-color: red;
}

.health::after {
  content: '';
  position: absolute;
  width: 100px;
  height: 20px;
  background-color: rgba(255, 148, 148, 0.2);
  border: 1px solid black;
}

.food {
  margin-top: 3px;
  background-color: green;
}

.food::after {
  content: '';
  position: absolute;
  width: 100px;
  height: 20px;
  background-color: rgba(151, 252, 159, 0.2);
  border: 1px solid black;
}

.stats {
  margin-right: 3px;
  display: flex;
  flex-direction: column;
}

.image {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
