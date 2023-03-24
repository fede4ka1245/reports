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
      label="Не указано/Да/Нет"
      size="sm"
      @update:model-value="updateResult"
    />
    <div class="comment">
      <input
        class="comment-input"
        :value="props.comment"
        :placeholder="props.hint"
      />
      <div class="comment-btn">
        <q-btn
          :disable="isCommentEditDisabled"
          round
          flat
          color="grey"
          icon="more_horiz"
        >
          <q-menu style="width: 150px">
            <q-list>
              <q-item v-close-popup clickable @click="onUpdateCommentClick">
                Редактировать
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { modalName } from "@/modalPages/helpers/modalName";
import { openModalPage } from "@/modalPages/helpers/openModalPage";
import { computed } from "vue";

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

const selectOptions = ["Да", "Нет", "Не указано"];
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
  margin-top: 10px;
  background: white;
  display: flex;
  height: 56px;
  align-items: center;
}

.comment-input {
  flex: 1;
  pointer-events: none;
  border: none;
  padding: 15px;
}

.comment-btn {
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: grey solid 2px;
}
</style>
