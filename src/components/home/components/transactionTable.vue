<template>
  <div class="c-home__transaction">
    <p class="c-home__transaction_title">Latest Transactions</p>
    <div class="c-home__transaction-table">
      <div class="c-home__transaction-table_list" v-if="transactionList.length < 1">
        ~ There is no Transactions!
      </div>
      <div class="c-home__transaction-table_list" v-for="(item, i) in transactionList" :key="i">

        <div class="c-home__transaction-table_icon">
          <span class="material-icons" v-if="item.type == 'pay'">add</span>
          <span class="material-icons" v-else>remove</span>
        </div>
        <div class="c-home__transaction-table_detil">
          <span class="font-semibold">{{item.title == '' ? '-' : item.title}}</span>
          <span class="text-primary-grey2 text-xs">{{item.dateLoan | moment('DD MMMM YY, HH:mm')}}</span>
        </div>
        <div class="c-home__transaction-table_total">
          <span>{{ item.type == 'pay' ? '+' : '-' }} {{formatter(item.total)}}</span>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'transactionComponent',
  components: {

  },
  data() {
    return {

    }
  },
  computed: {
    transactionList() {
      return this.$store.getters.getTransactionList
    }
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
