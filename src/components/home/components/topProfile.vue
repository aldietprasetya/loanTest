<template>
  <div class="c-home__wrapper-detail">

    <div class="c-home__profile-funds">
      <div class="c-home__funds-logo">
        <span class="c-home__profile-more material-icons">wallet</span>
      </div>
      <div class="c-home__funds-detail">
        <span class="c-home__funds-total">{{formatter(funds)}}</span>
        <p class="c-home__funds-title">Your funds</p>
      </div>
    </div>

    <div class="c-home__profile-funds">
      <div class="c-home__funds-logo">
        <span class="c-home__profile-more material-icons">soap</span>
      </div>
      <div class="c-home__funds-detail">
        <span class="c-home__funds-total">{{formatter(borrowedFunds)}}</span>
        <p class="c-home__funds-title">Borrowed funds</p>
      </div>
    </div>

    <div class="c-home__profile-funds">
      <div class="c-home__funds-logo">
        <span class="c-home__profile-more material-icons">language</span>
      </div>
      <div class="c-home__funds-detail">
        <span class="c-home__funds-total">{{percentageFunds.toFixed(2)}}%</span>
        <p class="c-home__funds-title">Percent</p>
      </div>
    </div>

    <div class="c-home__profile-detail">
      <span class="c-home__profile-more material-icons">more_horiz</span>
      <img class="c-home__profile-img" src="@/assets/img/profile-pic.jpg" alt="profile picture">
    </div>

  </div>
</template>

<script>
export default {
  name: 'topProfileComponents',
  components: {

  },
  data() {
    return {

    }
  },
  computed: {
    percentageFunds() {
      let totalFunds = window.Decimal.add(this.funds,this.borrowedFunds);
      let div = window.Decimal.div(this.borrowedFunds,totalFunds);
      let getPercentage = window.Decimal.mul(div,100);
      return getPercentage
    },
    funds() {
      return this.$store.getters.getFunds
    },
    borrowedFunds() {
      let borrowStore = this.$store.getters.getBorrowedFunds
      return borrowStore < 0 ? 0 : borrowStore
    },
  },
  watch: {

  },
  mounted() {

  },
  methods: {
    formatter(number) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(number)
    }
  },
}
</script>
