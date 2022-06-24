<script setup lang="ts">
const {
  params: { id },
} = useRoute()
const goTo = (child: string) => {
  navigateTo(`/dashboard/widget/${id}/${child}`)
}
const widget = useWidgetStore()
const client = useSupabaseClient()
const user = useSupabaseUser()

const isSaving = ref(false)
const save = async () => {
  isSaving.value = true
  const { data, error } = await client.from("widgets").upsert({ id, user_id: user.value.id, payload: widget.value })
  isSaving.value = false
  console.log(data)
}

const tick = ref("0")
onMounted(async () => {
  const { data } = await client.from("widgets").select("*").eq("id", id).single()
  if (data) widget.value = data.payload
  tick.value = "1"
})
</script>

<template>
  <div>
    <div class="w-full h-80 relative rounded-2xl bg-gray-50 overflow-y-auto border">
      <div class="preview absolute top-20 pb-20 left-1/2 transform -translate-x-1/2">
        <Widget :widget="widget"></Widget>
      </div>
    </div>

    <div class="flex mt-8">
      <div class="flex flex-col items-start space-y-4 flex-shrink-0 w-1/5">
        <button @click="goTo('')">Heading</button>
        <button @click="goTo('links')">Links</button>
        <button @click="goTo('projects')">Projects</button>
        <button @click="goTo('etc')">Etc</button>

        <Button @click="save" icon="pi pi-save" :loading="isSaving" label="Save" iconPos="right"></Button>
      </div>

      <div class="w-4/5">
        <ClientOnly>
          <NuxtPage class="border" :key="tick"></NuxtPage>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
