<template>
  <form @submit.prevent="handleSubmit">
    <Input v-model="payable.description" name="description" label="Descrição" />
    <Input v-model.number="payable.money" name="money" type="number" label="Valor" />
    <Input v-model="payable.paymentDueAt" name="paymentDueAt" type="date" label="Vencimento" />
    <Input v-model="payable.paymentAt" name="paymentAt" type="date" label="Dia do Pagamento" />
    <Button style="margin-top: 10px" variant="success"> Salvar </Button>
  </form>
</template>

<script>
import moment from 'moment';
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import { payableCollection } from '../services/db';

export default {
  components: { Input, Button },
  name: "PayableForm",
  data: () => ({
    payable: {}
  }),
  props: {
    initialValues: {
      required: true,
      type: Object
    }
  },
  watch: {
    initialValues: {
      immediate: true,
      handler() {
        this.payable = { ...(this.initialValues || {})}
      }
    }
  },
  methods: {
    async handleSubmit() {
      const { payable } = this

      const newPayable = {
          description: payable.description,
          money: payable.money,
          paymentDueAt: moment(payable.paymentDueAt).toDate(),
          paymentAt: payable.paymentAt ? moment(payable.paymentAt).toDate() : '',
          createdAt: payable.createdAt ||  moment().toDate()
      }

      if(payable.id) {
        const docRef = payableCollection.doc(payable.id)
        await docRef.set(newPayable)
      }
      else {
        await payableCollection.add(newPayable)
      }


      alert('Salvo com sucesso')

      this.$emit('endsubmit', { ...this.payable})
    },
  },
};
</script>
