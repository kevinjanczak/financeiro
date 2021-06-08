<template>
  <div>
    <h1 class="title">Dashboard</h1>
    <div v-if="!statistics.length" class="loading">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
    <div v-for="(stat, i) in statistics" :key="i" class="statistics">
      <h2 class="subtitle">{{ stat.title }}</h2>
      <div class="container">
        <div class="stat receivable">
          <span>Á Receber</span>
          <strong class="price">{{ stat.receivable | money }}</strong>
        </div>
        <div class="stat payable">
          <span>Á Pagar</span>
          <strong class="price">{{ stat.payable | money }}</strong>
        </div>
        <div class="stat remain">
          <span>Sobrou</span>
          <strong class="price">{{ stat.total | money }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { payableCollection, receivableCollection } from "../services/db";

export default {
  name: "Dashboard",
  data: () => ({
    statistics: [],
  }),
  methods: {
    async getDataFromApi() {
      let today = {
        title: "Hoje",
        receivable: 0,
        payable: 0,
        total: 0,
      };

      let week = {
        title: "Essa Semana",
        receivable: 0,
        payable: 0,
        total: 0,
      };

      let month = {
        title: "Esse Mês",
        receivable: 0,
        payable: 0,
        total: 0,
      };

      let year = {
        title: "Esse Ano",
        receivable: 0,
        payable: 0,
        total: 0,
      };

      const payablesToday = await payableCollection
        .where("paymentDueAt", "==", moment().startOf("day").toDate())
        .where("paymentAt", "==", '')
        .get();

      payablesToday.forEach((snapshot) => {
        today.payable += snapshot.data().money;
      });

      const payablesWeek = await payableCollection
        .where("paymentDueAt", ">=", moment().startOf("week").toDate())
        .where("paymentDueAt", "<=", moment().endOf("week").toDate())
        .get();

      payablesWeek.forEach((snapshot) => {
        week.payable += snapshot.data().money;
      });

      const payablesMonth = await payableCollection
        .where("paymentDueAt", ">=", moment().startOf("month").toDate())
        .where("paymentDueAt", "<=", moment().endOf("month").toDate())
        .get();

      payablesMonth.forEach((snapshot) => {
        month.payable += snapshot.data().money;
      });

      const payablesYear = await payableCollection
        .where("paymentDueAt", ">=", moment().startOf("year").toDate())
        .where("paymentDueAt", "<=", moment().endOf("year").toDate())
        .get();

      payablesYear.forEach((snapshot) => {
        year.payable += snapshot.data().money;
      });

      const receivablesToday = await receivableCollection
        .where("paymentAt", "==", moment().startOf("day").toDate())
        .get();

      receivablesToday.forEach((snapshot) => {
        today.receivable += snapshot.data().money;
      });

      const receivablesWeek = await receivableCollection
        .where("paymentAt", ">=", moment().startOf("week").toDate())
        .where("paymentAt", "<=", moment().endOf("week").toDate())
        .get();

      receivablesWeek.forEach((snapshot) => {
        week.receivable += snapshot.data().money;
      });

      const receivablesMonth = await receivableCollection
        .where("paymentAt", ">=", moment().startOf("month").toDate())
        .where("paymentAt", "<=", moment().endOf("month").toDate())
        .get();

      receivablesMonth.forEach((snapshot) => {
        month.receivable += snapshot.data().money;
      });

      const receivablesYear = await receivableCollection
        .where("paymentAt", ">=", moment().startOf("year").toDate())
        .where("paymentAt", "<=", moment().endOf("year").toDate())
        .get();

      receivablesYear.forEach((snapshot) => {
        year.receivable += snapshot.data().money;
      });

      today.total = today.receivable - today.payable
      year.total = year.receivable - year.payable
      week.total = week.receivable - week.payable
      month.total = month.receivable - month.payable

      this.statistics = [today, week, month, year];
    },
  },
  mounted() {
    this.getDataFromApi();
  },
};
</script>

<style lang="scss">

.loading {
  font-size: 3rem;
  text-align: center;
}
.statistics {
  margin-top: 20px;
  .subtitle {
    margin-bottom: 10px;
  }

  .container {
    display: flex;
    justify-content: space-between;
    gap: 10px;

    .stat {
      flex: 0.33;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
      color: $white;

      &.receivable {
        background-color: $success;
      }

      &.payable {
        background-color: $danger;
      }

      &.remain {
        background-color: $primary;
      }

      .price {
        margin: 15px 0px;
        text-align: center;
        display: block;
        font-size: 1.5rem;
      }
    }
  }
}
</style>