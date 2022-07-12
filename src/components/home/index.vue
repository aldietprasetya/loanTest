<template>
  <div class="c-home">

    <topProfile ref='topProfile'/>

    <div class="c-home__wrapper-loan">

      <div class="c-home__loan">

        <div class="c-home__loan-header">
          <p class="c-home__loan_title">Loan Set</p>
        </div>

        <div class="c-home__loan-transaction p-4">
          <div class="flex flex-col mt-4">
            <label class="c-home__loan-label" for="funds">
              Loan Amount
            </label>
            <input class="c-home__loan-input" v-model="amountLoan" pattern="^(?=.?\d)\d{0,14}(\.?\d{0,6})?$" id="funds" type="text" placeholder="$ ... ...">
          </div>
          <div class="flex justify-between items-center">
            <label class="c-home__loan-label" for="funds">
              Loan Period
            </label>
            <div class="c-home__loan-monthly">
              <span :class="{'active':item.text == selectedPeriod}" v-for="(item,i) in monthlyPeriod" :key="i" @click="selectedPeriod = item.text">
                {{ item.text }}
              </span>
            </div>
          </div>
          <div class="flex flex-col mt-8">
            <label class="c-home__loan-label" for="funds">
              Loan About
            </label>
            <input class="c-home__loan-input" v-model="aboutLoan" id="funds" type="text" placeholder="... ... ...">
          </div>
          <div class="flex justify-between mt-5">
            <div class="w-1/2 flex flex-col">
              <label class="c-home__loan-label" for="funds">
                Total Loan
              </label>
              <p class="text-primary-white text-2xl">{{totalLoan == 0 ? '-' : formatter(totalLoan)}}</p>
            </div>
            <div class="w-1/2 flex flex-col">
              <label class="c-home__loan-label" for="funds">
                Loan Interest
              </label>
              <p class="text-primary-white text-2xl">{{totalInterest == 0 ? '-' : formatter(totalInterest)}}</p>
            </div>
          </div>

        </div>

        <div class="c-home__loan-detil p-4">
          <div class="flex justify-between">

            <div class="w-1/2 flex flex-col">
              <label class="c-home__loan-label" for="funds">
                Monthly Payment
              </label>
              <p class="text-primary-white text-2xl">{{monthlyPayment == 0 ? '-' : formatter(monthlyPayment)}}</p>
            </div>
            <div class="w-1/2 flex flex-col">
              <label class="c-home__loan-label" for="funds">
                Service
              </label>
              <p class="text-primary-white text-2xl">{{ selectedPeriod == '1 Month' ? (service == 0 ? '-' : (formatter(service))) : '~ free' }}</p>
            </div>
          </div>
        </div>

        <div class="c-home__loan-button" @click="proceed()">
          - Proceed -
        </div>
      </div>

      <div class="w-1/2 p-10">
        <loanTable ref='loanTable'/>
        <transactionTable ref='transactionTable'/>
      </div>

    </div>

    <div class="">

    </div>
  </div>
</template>

<script>
import topProfile from './components/topProfile.vue'
import loanTable from './components/loanTable.vue'
import transactionTable from './components/transactionTable.vue'
export default {
  name: 'HomeComponent',
  components: {
    topProfile,
    loanTable,
    transactionTable
  },
  data() {
    return {
      monthlyPeriod : [
        {text: '1 Month'},
        {text: '3 Month'},
        {text: '6 Month'},
      ],
      selectedPeriod: '1 Month',
      amountLoan: '',
      aboutLoan: '',
    }
  },
  computed: {
    period() {
      return Number(this.selectedPeriod.split(' ')[0])
    },
    totalLoan() {
      let totalFees = window.Decimal.add(Number(this.service), Number(this.totalInterest))
      return window.Decimal.add(Number(this.amountLoan), Number(totalFees))
    },
    service() {
      let totalService = window.Decimal.mul(Number(this.amountLoan), 0.015)
      return this.period != 1 ? 0 : totalService
    },
    monthlyPayment() {
      let totalFees = window.Decimal.add(Number(this.service), Number(this.totalInterest))
      let totalPerPeriod = window.Decimal.div(Number(this.amountLoan),this.period)
      return window.Decimal.add(totalPerPeriod, totalFees)
    },
    totalInterest() {
      let amountInterest = window.Decimal.mul(Number(this.amountLoan), 0.02)
      let totalInterest = window.Decimal.mul(amountInterest, this.period)
      return this.period == 1 ? 0 : totalInterest
    },
    funds() {
      return this.$store.getters.getFunds
    },
    borrowedFunds() {
      return this.$store.getters.getBorrowedFunds
    },
  },
  watch: {
    amountLoan(dt) {
      if (Number(dt) > this.funds) {
        this.amountLoan = this.funds
      }
    }
  },
  mounted() {

  },
  methods: {
    formatter(number) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(number)
    },
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    resetForm() {
      this.selectedPeriod = '1 Month'
      this.amountLoan = ''
      this.aboutLoan = ''
    },
    proceed() {
      if (this.amountLoan == '') {
        return false
      }
      let currentDate = this.$moment().format()
      let data = {
        title: this.aboutLoan,
        dateLoan: currentDate,
        dueDate: this.$moment(currentDate).add(this.period, 'M'),
        type: 'loan',
        period: this.period,
        totalLoan: Number(this.totalLoan),
        fee: Number(window.Decimal.add(Number(this.service), Number(this.totalInterest))),
        total: Number(this.monthlyPayment)
      }
      this.$vToastify.success("Loan Successful!");

      this.$store.commit("addTransactionList", data);

      this.calculateFunds()

      this.addLoan(data, this.period)

      this.resetForm()
    },
    calculateFunds() {
      let borrowed = window.Decimal.add(Number(this.borrowedFunds), Number(this.totalLoan))
      let funds = window.Decimal.sub(Number(this.funds), Number(this.totalLoan))

      this.$store.commit("setBorrowedFunds", borrowed);
      this.$store.commit("setFunds", funds);
    },
    addLoan(data, period) {
      let store = []
      for (var i = 0; i < period; i++) {
        store.push(data)
      }
      store.forEach((item, index) => {
        let dataLoan = {
          title: item.title,
          dateLoan: item.dateLoan,
          dueDate: this.$moment(item.dateLoan).add(index+1, 'M'),
          type: item.type,
          period: item.period,
          totalLoan: item.totalLoan,
          fee: item.fee,
          total: item.total,
          status: 'unpaid'
        }
        this.$store.commit("addLoanList", dataLoan);
      });
    }
  },
}
</script>
