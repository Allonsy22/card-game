<template>
  <v-dialog
    v-model="isMenuDialog"
    persistent
    width="300"
  >
    <v-form class="menu-container">
      <v-btn
        v-if="isGameTypeMenu || isOnlineTypeMenu"
        class="back-btn"
        color="transparent"
        depressed
        @click="goBack"
      >
        <v-img :src="backBtn" width="30"></v-img>
      </v-btn>

      <v-btn
        class="close-btn"
        color="transparent"
        depressed
        @click="closeMenuDialog"
      >
        <v-img :src="closeBtn" width="30"></v-img>
      </v-btn>
      <v-img :src="backgroundImage" class="image">
        <v-btn
          v-if="!isGameTypeMenu && !isOnlineTypeMenu"
          block
          color="transparent"
          class="mt-4"
          @click="selectGameType"
        >
          Local game
        </v-btn>

        <v-btn
          v-if="!isGameTypeMenu && !isOnlineTypeMenu"
          block
          color="transparent"
          class="mt-4"
          @click="selectOnlineType"
        >
          Online game
        </v-btn>
        <MenuGameType v-if="isGameTypeMenu"/>
        <MenuOnlineType v-else-if="isOnlineTypeMenu"/>
      </v-img>
    </v-form>
  </v-dialog>
</template>

<script>
import MenuGameType from './MenuGameType'
import MenuOnlineType from './MenuOnlineType'
import { mapGetters } from 'vuex'

export default {
  name: 'MenuDialog',

  components: {
    MenuGameType,
    MenuOnlineType
  },

  data: () => ({
    backgroundImage: require('@/assets/dialog_background.png'),
    backBtn: require('@/assets/back_btn.png'),
    closeBtn: require('@/assets/close_btn.png')
  }),

  computed: {
    ...mapGetters([
      'isMenuDialog',
      'isGameTypeMenu',
      'isOnlineTypeMenu'
    ])
  },

  methods: {
    selectGameType () {
      this.$store.dispatch('toggleGameTypeMenu')
    },
    selectOnlineType () {
      this.$store.dispatch('toggleOnlineTypeMenu')
    },
    goBack () {
      if (this.isGameTypeMenu) {
        this.$store.dispatch('toggleGameTypeMenu')
      } else {
        this.$store.dispatch('toggleOnlineTypeMenu')
      }
    },
    closeMenuDialog () {
      this.$store.dispatch('closeAllDialogs')
    }
  }

}
</script>

<style scoped>
.menu-container {
  position: relative;
}

.image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn {
  position: absolute;
  left: 0;
  top: 0;
  margin: 10px 0 0 10px;
  z-index: 10;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px 10px 0 0;
  z-index: 10;
}
</style>
