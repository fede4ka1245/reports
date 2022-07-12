<template>
  <q-td>
    <div
      class="cell"
    >
      <div v-if="store.allReports?.isBalanceLoading">
        <q-spinner
            color="orange"
            size="24px"
        />
      </div>
      <div v-else-if="reactiveData.hasConnection && props.value">{{props.value}}</div>
      <div v-else-if="!reactiveData.hasConnection">Ожидание интернета</div>
      <div v-else>-</div>
    </div>
  </q-td>
</template>

<script setup>
import {store} from "@/store/store";
import {onMounted, reactive} from "vue";
import {hasInternetConnection} from "@/helpers/hasInternetConnection";

const props = defineProps({
  value: {
    type: String,
    default: ""
  }
})

const reactiveData = reactive({
  hasConnection: true
})

onMounted(async () => {
  reactiveData.hasConnection = await hasInternetConnection();
})
</script>