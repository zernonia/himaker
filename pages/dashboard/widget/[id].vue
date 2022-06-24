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
const save = async () => {
  const { data, error } = await client.from("widgets").upsert({ id, user_id: user.value.id, payload: widget.value })
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
    <div class="w-full h-64 rounded-2xl bg-gray-50 flex items-center justify-center">
      <div>{{ widget }}</div>
    </div>

    <div class="flex mt-8">
      <div class="flex flex-col items-start space-y-4 flex-shrink-0 w-1/5">
        <button @click="goTo('')">Heading</button>
        <button @click="goTo('links')">Links</button>
        <button @click="goTo('projects')">Projects</button>
        <button @click="goTo('etc')">Etc</button>

        <Button @click="save">Save</Button>
      </div>

      <div class="w-4/5">
        <ClientOnly>
          <NuxtPage :key="tick"></NuxtPage>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
