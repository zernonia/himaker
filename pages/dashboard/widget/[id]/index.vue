<script setup lang="ts">
const {
  params: { id },
} = useRoute()

const data = ref([
  { id: 1, data: "Princess Mononoke" },
  { id: 2, data: "Spirited Away" },
])
const { onDrop, applyDrag } = useDnd(data)
</script>

<template>
  <div class="p-6 w-full bg-orange-50 rounded-xl flex flex-col form">
    <label for="title">Title</label>
    <InputText id="title" name="title" placeholder="by Me"></InputText>

    <label for="headline">Headline</label>
    <InputText id="headline" name="headline" placeholder="This project is made by"></InputText>

    <label for="maker_names">Names</label>
    <InputText id="maker_names" name="maker_names" placeholder="Supabase ⚡️"></InputText>

    <h3>Images</h3>
    <Container orientation="vertical" @drop="onDrop">
      <Draggable v-for="(item, i) in data" :key="item.id">
        <div class="mb-4">
          <div class="w-20 h-20 rounded-full bg-white">{{ item.data.length }}</div>
        </div>
      </Draggable>
    </Container>
  </div>
</template>
