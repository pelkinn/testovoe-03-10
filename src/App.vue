<template>
  <VApp>
    <VMain>
      <VContainer>
        <VForm class="grid" @submit.prevent="submit">
          <div>
            <VNumberInput
              :label="label.price"
              :model-value="form.price"
              @update:model-value="(evt) => updateModel(KeyForm.price, evt)"
              :precision="2"
              class="mb-6"
            ></VNumberInput>
            <p class="text-h5">{{ form.price }}</p>
          </div>
          <div>
            <VNumberInput
              :label="label.qty"
              :model-value="form.qty"
              @update:model-value="(evt) => updateModel(KeyForm.qty, evt)"
              class="mb-6"
            ></VNumberInput>
            <p class="text-h5">{{ form.qty }}</p>
          </div>
          <div>
            <VNumberInput
              :label="label.amount"
              :model-value="form.amount"
              @update:model-value="(evt) => updateModel(KeyForm.amount, evt)"
              :precision="2"
              class="mb-6"
            ></VNumberInput>
            <p class="text-h5">{{ form.amount }}</p>
          </div>

          <div class="d-flex flex-column">
            <VBtn class="mb-6" type="submit" :loading="loading">Отправить</VBtn>
            LocalStorage state:
            <pre>{{ result }}</pre>
          </div>
        </VForm>

        <VCard class="pa-6" rounded="lg" variant="outlined" flat>
          <VCard
            v-for="(event, index) in eventList"
            :key="event.title"
            class="pa-4 mb-2"
            :class="{ 'mb-2': index + 1 !== eventList.length }"
            flat
            color="grey-lighten-4"
            >{{ event.title }}</VCard
          >
        </VCard>
      </VContainer>
    </VMain>

    <div class="alert-container">
      <VAlert
        v-if="visibilityToastError"
        title="Ошибка"
        text="Данные не сохранены"
        type="error"
        closable
        @click:close="visibilityToastError = !visibilityToastError"
      ></VAlert>
    </div>
  </VApp>
</template>

<script setup lang="ts">
  import { onBeforeMount, onMounted, ref, watch } from 'vue';
  import { useServices } from '@/composables/useServices';
  import type { BodyForm } from './types/common';

  const { sendForm } = useServices();

  const form = ref<Omit<BodyForm, 'counter'>>({
    price: 0,
    amount: 0,
    qty: 0
  });

  const counter = ref(0);

  const result = ref('');

  const loading = ref(false);

  const visibilityToastError = ref(false);

  const submit = async () => {
    loading.value = true;
    try {
      const body = JSON.stringify({ ...form.value, counter: counter.value });
      eventList.value.unshift({ title: `Клик по кнопке Отправить. МОМЕНТ НАЖАТИЯ: ${localStorage.getItem('form')}`, value: body });
      await sendForm(body, form.value.amount);
      eventList.value.unshift({ title: `Клик по кнопке Отправить. ОТПРАВЛЕНО: ${body}`, value: body });
      result.value = body;
    } catch (err) {
      visibilityToastError.value = true;
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  let timer = 0;

  onMounted(() => {
    timer = window.setInterval(() => {
      counter.value++;
    }, 1000);
  });

  onBeforeMount(() => {
    clearInterval(timer);
  });

  enum KeyForm {
    price = 'price',
    amount = 'amount',
    qty = 'qty'
  }

  const label = {
    [KeyForm.price]: 'Цена',
    [KeyForm.amount]: 'Сумма',
    [KeyForm.qty]: 'Количество'
  };

  const updateModel = (key: KeyForm, value: number) => {
    setTimeout(() => {
      form.value[key] = value;
    }, 300);
  };

  const eventList = ref<{ title: string; value: unknown }[]>([]);

  const setEventChangeModel = (payload: { key: KeyForm; value: number }) => {
    eventList.value.unshift({
      title: `Изменение поля ${label[payload.key]}: ${payload.value}`,
      value: payload.value
    });
  };

  watch(
    () => form.value.price,
    (newVal) => {
      setEventChangeModel({ key: KeyForm.price, value: newVal });
      updateModel(KeyForm.amount, newVal * form.value.qty);
    }
  );

  watch(
    () => form.value.amount,
    (newVal) => {
      setEventChangeModel({ key: KeyForm.amount, value: newVal });
      updateModel(KeyForm.price, newVal / form.value.qty);
    }
  );

  watch(
    () => form.value.qty,
    (newVal) => {
      setEventChangeModel({ key: KeyForm.qty, value: newVal });
      updateModel(KeyForm.amount, form.value.price * newVal);
    }
  );
</script>

<style lang="scss" scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr) 250px;
    gap: 16px;
    margin-bottom: 100px;
  }

  .alert-container {
    position: fixed;
    width: 280px;
    bottom: 24px;
    left: calc(50%);
    display: flex;
    justify-content: center;
  }
</style>
