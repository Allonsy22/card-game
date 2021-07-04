<template>
  <v-card
    :max-width="isMobile ? 60 : 100"
    :width="isMobile ? 60 : 100"
    :height="isMobile ? 90 : 150"
    elevation="9"
    class="ma-1 card-container"
    :disabled="disabled"
  >
    <div class="info-container" :style="infoContainerStyle">
      <div class="main-info">
        <span class="food" :style="foodStyle">
          <v-icon color="red" size="14">mdi-food-apple</v-icon>
          {{feeding}}
        </span>
        <v-icon :color="color" class="mt-4" v-if="!isMobile">{{icon}}</v-icon>
        <h4 class="name">{{ name }}</h4>
      </div>

      <div class="description" v-if="showDescription">
        {{description}}
      </div>

      <div class="description" v-else>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              class="mt-2"
            >
              mdi-information-outline
            </v-icon>
          </template>
          <span>{{description}}</span>
        </v-tooltip>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    name: String,
    type: String,
    description: String,
    feeding: Number,
    disabled: Boolean
  },
  data: () => ({
    types: {
      attack: { icon: 'mdi-sword', color: 'red' },
      buff: { icon: 'mdi-bottle-tonic-plus', color: 'green' },
      debuff: { icon: 'mdi-bottle-tonic-skull', color: 'purple' }
    }
  }),
  computed: {
    icon () {
      return this.types[this.type].icon
    },
    color () {
      return this.types[this.type].color
    },
    isMobile () {
      return this.$vuetify.breakpoint.xs
    },
    showDescription () {
      const length = this.description.length
      if (!this.isMobile && length < 100) {
        return true
      }
      return false
    },
    infoContainerStyle () {
      if (this.isMobile) {
        return `border: 2px solid ${this.color}`
      }
      return null
    },
    foodStyle () {
      if (this.isMobile) {
        return 'position: relative'
      }
      return null
    }
  }
}
</script>

<style scoped>
.card-container {
  cursor: pointer;
  transition: all .5s;
}

.card-container:hover {
  transform: scale(1.1);
}

.info-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.name {
  margin: 3px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
}

.main-info {
  position: relative;
  width: 100%;
  height: 40%;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.description {
  margin: 15px 5px 5px 5px;
  font-size: 9px;
  text-align: justify;
}

.food {
  position: absolute;
  top: 0;
  right: 0;
  margin: 3px;
  font-size: 10px;
}

</style>
