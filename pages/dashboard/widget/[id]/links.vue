<script setup lang="ts">
const data = ref([
  { id: 1, data: "Princess Mononoke" },
  { id: 2, data: "Spirited Away" },
])
const { onDrop, applyDrag } = useDnd(data)
const deleteLink = (index: number) => {
  console.log("deleteing " + index)
}
</script>

<template>
  <div class="p-6 w-full bg-orange-50 rounded-xl flex flex-col form">
    <label for="maker_links">Maker Links</label>
    <InputText id="maker_links" name="maker_links" placeholder="Zernonia"></InputText>

    <h3>Links</h3>

    <Container orientation="vertical" @drop="onDrop" drag-handle-selector=".handle">
      <Draggable v-for="(item, i) in data" :key="item.id">
        <div class="my-2">
          <div class="flex items-center">
            <Handle @delete="deleteLink(i)"></Handle>

            <div class="w-full flex items-center space-x-2">
              <Dropdown class="w-186px h-44px"></Dropdown>
              <InputText class="!my-0 !mx-2 flex-grow" placeholder="Title"></InputText>
              <InputText class="!m-0" placeholder="URL"></InputText>
            </div>
          </div>
        </div>
      </Draggable>
    </Container>
  </div>
</template>
