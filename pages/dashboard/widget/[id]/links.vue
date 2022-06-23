<script setup lang="ts">
const data = ref([
  { id: 1, data: "Princess Mononoke" },
  { id: 2, data: "Spirited Away" },
])
const { onDrop, applyDrag } = useDnd(data)
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
            <button
              class="mr-2 py-1 text-gray-400 hover:text-gray-800 handle bg-transparent hover:bg-orange-100 transition rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                class="iconify iconify--radix-icons"
                width="24"
                height="24"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 15 15"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M5.5 4.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25Zm4 0a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25ZM10.625 7.5a1.125 1.125 0 1 1-2.25 0a1.125 1.125 0 0 1 2.25 0ZM5.5 8.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25Zm5.125 2.875a1.125 1.125 0 1 1-2.25 0a1.125 1.125 0 0 1 2.25 0ZM5.5 12.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>

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
