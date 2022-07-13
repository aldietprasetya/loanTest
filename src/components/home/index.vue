<template>
  <div class="c-home">

    <topProfile ref='topProfile'/>

    <div class="c-home__wrapper-loan">

      <div class="c-home__loan">

        <div class="c-home__loan-header">
          <p class="c-home__loan_title">{{payLoan ? 'Pay Loan' : 'Loan Set'}}</p>
          <span class="material-icons text-primary-white ml-auto cursor-pointer" v-if="payLoan" @click="cancelPayLoan">close</span>
        </div>

        <div class="c-home__loan-transaction p-4" v-if="!payLoan">
          <div class="flex flex-col mt-4">
            <label class="c-home__loan-label" for="funds">
              Loan Amount
            </label>
            <input class="c-home__loan-input" v-model="amountLoan" @keypress="isNumber($event)" type="text" placeholder="$ ... ...">
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
            <input class="c-home__loan-input" v-model="aboutLoan" type="text" placeholder="... ... ...">
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

        <div class="c-home__loan-detil p-4" v-if="!payLoan">
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

        <div class="c-home__loan-detil p-4" v-if="payLoan">
          <div class="flex flex-col mt-4">
            <label class="c-home__loan-label" for="funds">
              Loan About
            </label>
            <p class="text-primary-white text-2xl">~ {{payLoanData == null ? '-' : payLoanData.title}}</p>
          </div>
          <div class="flex justify-between mt-4">

            <div class="w-1/2 flex flex-col">
              <label class="c-home__loan-label" for="funds">
                Loan Amount to Pay
              </label>
              <p class="text-primary-white text-2xl">{{payLoanData == null ? '-' : formatter(payLoanData.total)}}</p>
            </div>
            <div class="w-1/2 flex flex-col">
              <label class="c-home__loan-label" for="funds">
                Loan Pay Date
              </label>
              <p class="text-primary-white text-2xl">{{ payLoanData == null ? 0 : payLoanData.dueDate | moment('DD MMM YY, HH:mm') }}</p>
            </div>
          </div>
          <div class="flex flex-col mt-4">
            <label class="c-home__loan-label" for="funds">
              Loan Status
            </label>
            <p class="text-primary-white text-2xl">~ {{payLoanData == null ? '-' : payLoanData.status}}</p>
          </div>
        </div>

        <div class="c-home__loan-button" @click="proceed()">
          {{payLoan ? '- Proceed Pay Loan -' : '- Proceed -'}}
        </div>
      </div>

      <div class="w-1/2 p-10">
        <loanTable @loanItem="getLoanItem" ref='loanTable'/>
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
      payLoan: false,
      payLoanData: {}
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
    makeId() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },
    resetForm() {
      this.selectedPeriod = '1 Month'
      this.amountLoan = ''
      this.aboutLoan = ''
      this.payLoan = false
    },
    proceed() {
      if (this.payLoan) {
        let getLoanList = this.$store.getters.getLoanList
        getLoanList.forEach((item) => {
          if (item.id == this.payLoanData.id && item.dueDate == this.payLoanData.dueDate) {
            item.status = 'paid'
            item.type = 'pay'
            this.$store.commit("addTransactionList", item);
          }
        });
        this.$vToastify.success("Loan has been Paid!");
        this.calculateFundsPaid()
        this.$store.commit("setLoanList", getLoanList);
      } else {
        if (this.amountLoan == '') {
          return false
        }
        let currentDate = this.$moment().format()
        let data = {
          title: this.aboutLoan == '' ? this.makeId() : this.aboutLoan,
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

      }
      this.resetForm()
    },
    calculateFunds() {
      let borrowed = window.Decimal.add(Number(this.borrowedFunds), Number(this.totalLoan))
      let funds = window.Decimal.sub(Number(this.funds), Number(this.totalLoan))

      this.$store.commit("setBorrowedFunds", borrowed);
      this.$store.commit("setFunds", funds);
    },
    calculateFundsPaid() {
      let divFee = window.Decimal.div(Number(this.payLoanData.fee), Number(this.payLoanData.period))
      let loanTotal = window.Decimal.sub(Number(this.payLoanData.total), Number(divFee))
      let borrowed = window.Decimal.sub(Number(this.borrowedFunds), Number(this.payLoanData.total))
      let funds = window.Decimal.add(Number(this.funds), Number(this.payLoanData.total))

      console.log(Number(divFee))
      console.log(Number(loanTotal))
      console.log(Number(borrowed))
      console.log(Number(funds))

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
    },
    getLoanItem(dt) {
      console.log(dt)
      this.payLoanData = dt
      this.payLoan = true
    },
    cancelPayLoan() {
      this.payLoan = false
      this.resetForm()
    }
  },
}
</script>
