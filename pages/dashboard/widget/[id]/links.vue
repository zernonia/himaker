<script setup lang="ts">
const widget = useWidgetStore()
const { list } = toRefs(widget.value.links[0])
const { onDrop, applyDrag } = useDnd(list)

const deleteLink = (index: number) => {
  console.log("deleteing " + index)
}

const iconOptions = ref([
  { name: "Twitter", value: "twitter" },
  { name: "Facebook", value: "facebook" },
  { name: "Instagram", value: "instagram" },
  { name: "Pinterest", value: "pinterest" },
  { name: "GitHub", value: "github" },
])
</script>

<template>
  <div class="p-6 w-full bg-orange-50 rounded-xl flex flex-col form">
    <label for="maker_links">Title</label>
    <InputText v-model="widget.links[0].title" id="maker_links" name="maker_links" placeholder="Zernonia"></InputText>

    <h3>Social Link</h3>

    <Container orientation="vertical" @drop="onDrop" drag-handle-selector=".handle">
      <Draggable v-for="(item, i) in list" :key="i">
        <div class="my-2">
          <div class="flex items-center">
            <Handle @delete="deleteLink(i)"></Handle>

            <div class="w-full flex items-center space-x-2">
              <Dropdown class="w-186px" :options="iconOptions" optionValue="value" v-model="list[i].icon">
                <template #value="slotProps">
                  <div class="flex items-center h-19px">
                    <div :class="`i-ion-logo-${slotProps.value} mr-2 text-xl`"></div>
                    <p>{{ iconOptions.find((i) => i.value === slotProps.value).name }}</p>
                  </div>
                </template>
                <template #option="slotProps">
                  <div class="flex items-center">
                    <div :class="`i-ion-logo-${slotProps.option.value} mr-2 text-xl`"></div>
                    <p>{{ slotProps.option.name }}</p>
                  </div>
                </template>
              </Dropdown>

              <InputText v-model="list[i].title" class="!my-0 !mx-2 flex-grow" placeholder="Title"></InputText>
              <InputText v-model="list[i].url" class="!m-0" placeholder="URL"></InputText>
            </div>
          </div>
        </div>
      </Draggable>
    </Container>
  </div>
</template>
