<template>
  <form @submit.prevent="handleSubmit">
    <Input
      v-model="receivable.description"
      name="description"
      label="Descrição"
    />
    <Input
      v-model.number="receivable.money"
      name="money"
      type="number"
      label="Valor"
    />
    <Input
      v-model="receivable.paymentAt"
      name="paymentAt"
      type="date"
      label="Dia do Pagamento"
    />
    <Button style="margin-top: 10px" variant="success"> Salvar </Button>
  </form>
</template>

<script>
import moment from "moment";
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import { receivableCollection } from "../services/db";

export default {
  components: { Input, Button },
  name: "ReceivableForm",
  data: () => ({
    receivable: {},
  }),
  props: {
    initialValues: {
      required: true,
      type: Object,
    },
  },
  watch: {
    initialValues: {
      immediate: true,
      handler() {
        console.log(this.initialValues);
        this.receivable = { ...(this.initialValues || {}) };
      },
    },
  },
  methods: {
    async handleSubmit() {
      const { receivable } = this;
      const newReceivable = {
        description: this.receivable.description,
        money: this.receivable.money,
        paymentAt: moment(this.receivable.paymentAt).toDate(),
        createdAt: receivable.createdAt || moment().toDate()
      };
      if (receivable.id) {
        const docRef = receivableCollection.doc(receivable.id);
        await docRef.set(newReceivable);
      } else {
        await receivableCollection.add(newReceivable);
      }

      alert("Salvo com sucesso");

      this.$emit("endsubmit", { ...this.receivable });
    },
  },
};
</script>
