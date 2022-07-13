<template>
  <default-table :columns="appBalanceColumns" :rows="tableProps.rows">
    <template #body-cell-edit-time="{ props }">
      <cell-edit-time
        :money-code="props.row.moneyCode"
        :edit="tableProps.edit"
        :page-index="props.pageIndex"
      />
    </template>
    <template #header-cell-date="{ props }">
      <q-th style="min-width: 60px">
        {{ props.col.label }}
      </q-th>
    </template>
    <template #body-cell-balance-converted-sum="{ props }">
      <q-td v-if="store.allReports?.isBalanceLoading">
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
      <cell-filled :value="props.value" />
    </template>
  </default-table>
</template>

<script setup>
import DefaultTable from "@/components/table/DefaultTable";
import CellEditTime from "@/pages/allReports/panels/balance/components/balanceTable/cellEditTime/CellEditTime";
import { appBalanceColumns } from "@/pages/allReports/panels/balance/components/balanceTable/appBalanceColumns";
import CellFilled from "@/components/table/cellFilled/cellFilled";
import { store } from "@/store/store";
import { onMounted, reactive } from "vue";
import { hasInternetConnection } from "@/helpers/hasInternetConnection";

const isRubles = (label) => {
  if (!label || label.split(" ").length < 2) {
    return false;
  }

  if (label.split(" ")[1] === "RUB") {
    return true;
  } else {
    return false;
  }
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
</script>
