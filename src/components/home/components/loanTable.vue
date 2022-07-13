<template>
  <div class="c-home__transaction">
    <p class="c-home__transaction_title">
      Your Loan
      <span class="text-xs">( click list for paid your loan! )</span>
    </p>
    <div class="c-home__transaction-table">
      <div class="c-home__transaction-table_list" v-if="loanList.length < 1">
        ~ There is no Loan!
      </div>
      <div class="c-home__transaction-table_list hover:bg-primary-grey3 cursor-pointer" v-for="(item, i) in loanList" :key="i" @click="getLoanItem(item)">

        <div class="c-home__transaction-table_icon">
          <span class="material-icons">credit_score</span>
        </div>
        <div class="c-home__transaction-table_detil">
          <span class="font-semibold">{{item.title == '' ? '-' : item.title}}</span>
          <span class="text-primary-grey2 text-xs">Due Date : {{item.dueDate | moment('DD MMMM YY, HH:mm')}}</span>
        </div>
        <div class="c-home__transaction-table_total flex flex-col">
          <span>{{ item.type == 'pay' ? '+' : '-' }} {{formatter(item.total)}}</span>
          <span class="text-xs text-right">
            <span class="text-green-600" v-if="item.status!='unpaid'">{{item.status}}</span>
            <span class="text-pink-600" v-else>{{item.status}}</span>
          </span>
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
    loanList() {
      let getLoanList = this.$store.getters.getLoanList
      let loanListData = []
      getLoanList.forEach((item) => {
        if (item.status == "unpaid") {
          loanListData.push(item)
        }
      });

      loanListData.sort((a,b) => {
        const date1 = new Date(a.dueDate)
        const date2 = new Date(b.dueDate)
        return date1 - date2;
      })

      return loanListData
    }
  },
  watch: {

  },
  mounted() {

  },
  methods: {
    getLoanItem(dt) {
      this.$emit('loanItem', dt)
    },
    formatter(number) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(number)
    }
  },
}
</script>
