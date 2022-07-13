import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist/dist/umd'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  key: 'crimsonLoan',
  storage: window.localStorage
})

const store = new Vuex.Store({
  state: {
    funds:4000000,
    fundsLimitBanks:4000000,
    borrowedFunds:0,
    transactionList:[],
    loanList:[]
  },
  getters: {
    getFunds: state => {
      return state.funds
    },
    getFundsLimitBanks: state => {
      return state.fundsLimitBanks
    },
    getBorrowedFunds: state => {
      return state.borrowedFunds
    },
    getTransactionList: state => {
      return state.transactionList
    },
    getLoanList: state => {
      return state.loanList
    },
  },
  mutations: {
    setFunds: function(state,dt) {
      state.funds = dt
    },
    setBorrowedFunds: function(state,dt) {
      state.borrowedFunds = dt
    },
    setTransactionList: function(state,dt) {
      state.transactionList = dt
    },
    addTransactionList: function(state,dt) {
      state.transactionList.unshift(dt)
    },
    setLoanList: function(state,dt) {
      state.loanList = dt
    },
    addLoanList: function(state,dt) {
      state.loanList.unshift(dt)
    },
  },
  plugins: [vuexLocal.plugin]
})

export default store
