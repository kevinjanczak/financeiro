import Vue from 'vue'
import 'typeface-poppins'
import App from './App.vue'
import router from './router'
import moment from 'moment'

Vue.config.productionTip = false

Vue.filter('date', function(value, format) {
  const newDate = value.toDate ? value.toDate() : value
  if(newDate) {
    return moment(newDate).format(format || 'DD/MM/YYYY')
  }
})

Vue.filter('money', function(value) {
  const valueNumber = parseFloat(value || 0)

  return valueNumber.toLocaleString('pt-br', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
