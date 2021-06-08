<template>
  <div>
    <h1 class="title">Dividas</h1>
    <Table :columns="columns" :items="items">
      <template #paymentDueAt="{ item }">
        {{ item.paymentDueAt.toDate() | date }}
      </template>
      <template #createdAt="{ item }">
        {{ item.createdAt.toDate() | date('DD/MM/YYYY HH:mm') }}
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
    <Modal @toggle="open = false" :show="open" title="Registrar Divida">
      <PayableForm :initialValues="payable" @endsubmit="getDataFromApi()" />
    </Modal>
  </div>
</template>

<script>
import moment from 'moment';
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import Table from "../components/Table.vue";
import { payableCollection } from "../services/db";
import PayableForm from "./PayableForm.vue";

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
    property: "paymentDueAt",
    title: "Vencimento",
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
  components: { Table, Button, Modal, PayableForm },
  name: "Payable",
  data: () => ({
    open: false,
    items: [],
    columns,
    payable: {},
  }),
  methods: {
    async getDataFromApi() {
      const { docs } = await payableCollection.get();
      this.items = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },
    openModal(model = {}) {
     
      if(model.id) {
        this.payable = {
          ...model,
          paymentAt: model.paymentAt.toDate ? moment(model.paymentAt.toDate()).format('YYYY-MM-DD') : '',
          paymentDueAt: moment(model.paymentDueAt.toDate()).format('YYYY-MM-DD')
        }
      }
      else
        this.payable = model;
      
      this.open = true;
    },
    async remove(id) {
      await payableCollection.doc(id).delete();
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