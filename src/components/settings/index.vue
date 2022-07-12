<template>
  <div class="c-settings">
    <h3 class="c-settings__title">Settings</h3>

    <div class="flex flex-col w-full mt-12">

      <label for="toggleB" class="flex items-center cursor-pointer">
        <div class="mr-11 text-gray-700 font-medium">
          <span v-if="currentState">Light Mode</span>
          <span v-if="!currentState">Dark Mode</span>

        </div>

        <div class="relative">
          <input type="checkbox" v-model="checkedValue" id="toggleB" class="sr-only">
          <div class="dotbg block bg-primary-black w-14 h-8 rounded-full"></div>
          <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
        </div>
      </label>

      <label for="toggleB" class="flex items-center cursor-pointer mt-8">
        <div class="mr-11 text-gray-700 font-medium">
          Reset Local Storage
        </div>

        <button class="bg-primary-black hover:bg-primary-grey text-white font-bold py-2 px-4 rounded transition" @click="resetStorage()">
          Reset Now!
        </button>
      </label>

    </div>



  </div>
</template>

<script>
export default {
  name: 'SettingsComponent',
  components: {

  },
  data() {
    return {
      currentState: false
    }
  },
  computed: {
    isActive() {
      return this.currentState;
    },

    checkedValue: {
      get() {
        return this.currentState
      },
      set(newValue) {
        this.currentState = newValue;
      }
    }
  },
  watch: {

  },
  mounted() {

  },
  methods: {
    resetStorage() {
      this.$store.commit("setFunds", 4000000);
      this.$store.commit("setBorrowedFunds", 0);
      this.$store.commit("setTransactionList", []);
      this.$store.commit("setLoanList", []);

      this.$vToastify.success("Reset Local Storage Successful!");
    }
  },
}
</script>
