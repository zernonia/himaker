<script setup lang="ts">
import { mapIcon } from "mapping"

const widget = useWidgetStore()
const { isSuperUser } = useUserStore()
const { list } = toRefs(widget.value.links[0])
const { onDrop, applyDrag } = useDnd(list)
const isMax10Link = computed(() => !isSuperUser.value && list.value.length >= 10)

const addLink = () => {
  list.value.push({
    icon: "",
    title: "",
    url: "",
  })
}
const deleteLink = (index: number) => {
  list.value.splice(index, 1)
}
const copyLink = (index: number) => {
  list.value.splice(index + 1, 0, list.value[index])
}

const iconOptions = ref([
  { name: "Link", value: "link" },
  { name: "Twitter", value: "twitter" },
  { name: "Facebook", value: "facebook" },
  { name: "Instagram", value: "instagram" },
  { name: "Pinterest", value: "pinterest" },
  { name: "GitHub", value: "github" },
  { name: "Dribbble", value: "dribbble" },
  { name: "LinkedIn", value: "linkedin" },
])
</script>

<template>
  <div class="p-6 w-full bg-gray-50 rounded-xl flex flex-col form">
    <!-- <label for="maker_links">Title</label>
    <InputText v-model="widget.links[0].title" id="maker_links" name="maker_links" placeholder="Zernonia"></InputText> -->

    <h3>Social Link <span v-if="!isSuperUser" class="text-gray-400 font-normal text-sm ml-2">(Max 10)</span></h3>

    <Container orientation="vertical" @drop="onDrop" drag-handle-selector=".handle">
      <Draggable v-for="(item, i) in list" :key="i">
        <div class="my-2">
          <div class="flex items-center">
            <Handle @delete="deleteLink(i)" @copy="copyLink(i)"></Handle>

            <div class="w-full flex items-center space-x-2">
              <Dropdown class="w-186px" :options="iconOptions" optionValue="value" v-model="list[i].icon">
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center h-19px">
                    <div :class="`${mapIcon[slotProps.value]} mr-2 text-xl`"></div>
                    <p>{{ iconOptions.find((i) => i.value === slotProps.value).name }}</p>
                  </div>
                  <div v-else class="flex items-center h-19px">
                    <div class="i-ion-link mr-2 text-xl"></div>
                    <p>Link</p>
                  </div>
                </template>
                <template #option="slotProps">
                  <div class="flex items-center">
                    <div :class="`${mapIcon[slotProps.option.value]} mr-2 text-xl`"></div>
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

    <div class="flex space-x-4">
      <Button
        :disabled="isMax10Link"
        @click="addLink"
        icon="pi pi-plus"
        class="p-button-rounded p-button-sm !mt-2 !w-10 !h-10"
      ></Button>
      <div v-if="isMax10Link" class="text-red-500">
        <p class="inline-flex items-center">Max links added, upgrade to <TagSuper class="ml-2"></TagSuper></p>
        <p>to have unlimited link.</p>
      </div>
    </div>
  </div>
</template>
