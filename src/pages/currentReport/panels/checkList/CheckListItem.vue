<template>
  <div>
    <p class="header">
      {{ props.header }}
    </p>
    <q-select
      :options="selectOptions"
      class="select"
      outlined
      :model-value="props.result"
      size="sm"
      @update:model-value="updateResult"
    />
    <div class="comment">
      <check-list-table
        :rows="[{ comment: props.comment }]"
        :disabled="isCommentEditDisabled"
        :edit="onUpdateCommentClick"
      />
    </div>
  </div>
</template>

<script setup>
import { modalName } from "@/modalPages/helpers/modalName";
import { openModalPage } from "@/modalPages/helpers/openModalPage";
import { computed } from "vue";
import { selectOptions } from "@/helpers/selectOptions";
import CheckListTable from "@/pages/currentReport/panels/checkList/components/CheckListTable.vue";

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
    default: () => "Комментарии",
  },
  comment: {
    type: String,
    required: true,
  },
  putItem: {
    type: Function,
    default: () => {},
  },
});

const isCommentEditDisabled = computed(() => {
  return !props.result || props.result === selectOptions[2];
});

const updateResult = (result) => {
  props.putItem({
    result,
  });
};

const onUpdateCommentClick = () => {
  openModalPage(modalName.modalComment, {
    saveData: (comment) =>
      props.putItem({
        comment,
      }),
    placeholder: "",
  });
};
</script>

<style scoped>
.header {
  font-weight: 600;
  font-size: 15px;
}

.select {
  width: 220px;
}

.comment {
  margin-top: 15px;
}
</style>
