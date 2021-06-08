<template>
  <div>
    <h1 class="title">Recebimentos</h1>
    <Table :columns="columns" :items="items">
      <template #createdAt="{ item }">
        {{ item.createdAt | date('DD/MM/YYYY HH:mm') }}
      </template>
      <template #paymentAt="{ item }">
        {{ item.paymentAt | date }}
      </template>
      <template #money="{ item }">
        {{ item.money | money }}
      </template>
      <template #actions="{ item }">
        <a @click="openModal(item)" class="action" href="javascript:void(0)">
          <i class="fa fa-pen" />
        </a>
        <a @click="remove(item.id)" class="action" href="javascript:void(0)">
          <i class="fa fa-trash" />
        </a>
      </template>
    </Table>
    <Button @click="openModal()" style="margin-top: 10px" variant="success"
      >Adicionar</Button
    >
    <Modal @toggle="open = false" :show="open" title="Registrar Recebimento">
      <ReceivableForm :initialValues="receivable" @endsubmit="getDataFromApi()" />
    </Modal>
  </div>
</template>

<script>
import moment from 'moment';
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import Table from "../components/Table.vue";
import { receivableCollection } from "../services/db";
import ReceivableForm from "./ReceivableForm.vue";

const columns = [
  {
    property: "description",
    title: "Descrição",
  },
  {
    property: "money",
    title: "Valor",
  },
  {
    property: "paymentAt",
    title: "Paga em",
  },
  {
    property: "createdAt",
    title: "Criação",
  },
  {
    property: "actions",
    title: "Ações",
  },
];

export default {
  components: { Table, Button, Modal, ReceivableForm },
  name: "Receivable",
  data: () => ({
    open: false,
    items: [],
    columns,
    receivable: {}
  }),
  methods: {
    async getDataFromApi() {
      const { docs } = await receivableCollection.get();
      this.items = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },
    openModal(model = { paymentAt: moment().format('YYYY-MM-DD') }) {
      if(model.id && model.paymentAt) {
        this.receivable = {
          ...model,
          paymentAt: moment(model.paymentAt.toDate()).format('YYYY-MM-DD'),
        }
      }
      else
        this.receivable = model;
      this.open = true;
    },
    async remove(id) {
      await receivableCollection.doc(id).delete();
      await this.getDataFromApi();
    },
  },
  mounted() {
    this.getDataFromApi();
  },
};
</script>

<style lang="scss">
.action {
  color: $black;
  margin: 0px 3px;
}
</style>