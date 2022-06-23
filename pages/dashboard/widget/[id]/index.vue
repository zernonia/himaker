<script setup lang="ts">
const {
  params: { id },
} = useRoute()

const data = ref([
  { id: 1, data: "Princess Mononoke" },
  { id: 2, data: "Spirited Away" },
  { id: 3, data: "My Neighbor Totoro" },
  { id: 4, data: "Howl's Moving Castle" },
])
const { onDrop, applyDrag } = useDnd(data)
</script>

<template>
  <div class="flex flex-col form">
    <label for="title">Title</label>
    <InputText id="title" name="title" placeholder="by Me"></InputText>

    <label for="headline">Headline</label>
    <InputText id="headline" name="headline" placeholder="This project is made by"></InputText>

    <label for="maker_names">Names</label>
    <InputText id="maker_names" name="maker_names" placeholder="Supabase ⚡️"></InputText>

    <h3>Images</h3>
    <Container orientation="vertical" @drop="onDrop" drag-class="transition" drop-class="transition">
      <Draggable v-for="(item, i) in data" :key="item.id">
        <div>{{ item.data }}</div>
      </Draggable>
    </Container>
  </div>
</template>
