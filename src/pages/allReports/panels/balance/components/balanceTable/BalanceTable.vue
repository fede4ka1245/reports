<template>
  <default-table :columns="appBalanceColumns" :rows="tableRows">
    <template #body-cell-date="{ props }">
      <q-td v-if="props.pageIndex !== tableRows.length - 1">
        <div class="cell">{{ props.value }}</div>
      </q-td>
    </template>
    <template #body-cell-edit-time="{ props }">
      <cell-edit-time
        v-if="props.pageIndex !== tableRows.length - 1"
        :money-code="props.row.moneyCode"
        :edit="tableProps.edit"
      />
    </template>
    <template #header-cell-date="{ props }">
      <q-th style="min-width: 60px">
        {{ props.col.label }}
      </q-th>
    </template>
    <template #body-cell-balance-converted-sum="{ props }">
      <cell-filled v-if="props.pageIndex === tableRows.length - 1" :value="props.value" />
      <q-td v-else-if="store.allReports?.isBalanceLoading">
        <div class="cell">
          <q-spinner color="orange" size="24px" />
        </div>
      </q-td>
      <cell-filled
        v-else-if="
          (reactiveData.hasConnection && props.value) || isRubles(props.value)
        "
        :value="props.value"
      />
      <q-td v-else-if="!reactiveData.hasConnection">
        <div class="cell">Ожидание интернета</div>
      </q-td>
      <q-td v-else>
        <div class="cell">-</div>
      </q-td>
    </template>
    <template #body-cell-balance-sum="{ props }">
      <q-td v-if="props.pageIndex === tableRows.length - 1" style="background: rgb(128, 128, 128); color: white">
        <div class="cell">
          {{ props.value }}
        </div>
      </q-td>
      <cell-filled v-else :value="props.value" />
    </template>
  </default-table>
</template>

<script setup>
import DefaultTable from "@/components/table/DefaultTable";
import CellEditTime from "@/pages/allReports/panels/balance/components/balanceTable/cellEditTime/CellEditTime";
import { appBalanceColumns } from "@/pages/allReports/panels/balance/components/balanceTable/appBalanceColumns";
import CellFilled from "@/components/table/cellFilled/cellFilled";
import { store } from "@/store/store";
import { computed, onMounted, reactive } from "vue";
import { hasInternetConnection } from "@/helpers/hasInternetConnection";

const isRubles = (label) => {
  if (!label || label.split(" ").length < 2) {
    return false;
  }

  return label.split(" ")[1] === "RUB";
};

const tableProps = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
  edit: {
    type: Function,
    default: undefined,
  },
});

const reactiveData = reactive({
  hasConnection: true,
});

onMounted(async () => {
  reactiveData.hasConnection = await hasInternetConnection();
});

const tableRows = computed(() => {
  return [
    ...tableProps.rows,
    {
      moneyCode: "RUB",
      sum: 'Итого:',
      date: '-',
      convertedSum: (tableProps.rows.reduce((previousValue, currentValue) => {
        let convertedSum = 0;

        if (currentValue.convertedSum.includes(' ')) {
          convertedSum = Number(currentValue.convertedSum.split(' ')[0]);
        }

        return {
          convertedSum: previousValue.convertedSum + Number(convertedSum)
        };
      }, { convertedSum: 0 })).convertedSum + ' RUB'
    },
  ];
});
</script>
