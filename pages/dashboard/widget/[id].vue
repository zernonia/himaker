<script setup lang="ts">
const {
  params: { id },
} = useRoute()
const { path } = toRefs(useRoute())

const goTo = (child: string) => {
  navigateTo(`/dashboard/widget/${id}/${child}`)
}
const widget = useWidgetStore()
const widgetList = useWidgetListStore()
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
const { clear } = useWidgetClear()
onMounted(async () => {
  clear()
  const w = widgetList.value.find((i) => i.id === id)
  if (w) {
    Object.assign(widget.value, w.payload)
  } else {
    const { data, error } = await client.from("widgets").select("*").eq("id", id).single()
    if (data) widget.value = data.payload
    if (error) {
      widget.value.heading.name = user.value.user_metadata.full_name
      widget.value.heading.images[0] = user.value.user_metadata.avatar_url
    }
  }
  tick.value = "1"
})

const isOpen = ref(false)
const childPath = computed(() => path.value.split(`${id}`)[1])
const previewEl = ref<HTMLDivElement>()

watch(childPath, (n, o) => {
  if (!n || isOpen.value) return
  let selector = n.replace("/", "")
  selector = selector == "" ? "#heading" : "#" + selector

  let section = previewEl.value.querySelector(selector)
  const headerOffset = selector === "#projects" ? 150 : 180
  const top = section?.getBoundingClientRect().top
  const offsetPosition = top + previewEl.value.scrollTop - headerOffset
  previewEl.value.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  })
})

const gopro = () => {}
</script>

<template>
  <div>
    <NuxtLink
      to="/dashboard"
      class="flex items-center mb-4 px-6 py-3 w-max text-left font-semibold rounded-lg bg-transparent hover:bg-gray-100 transition"
    >
      <div class="i-ion-md-arrow-dropleft text-2xl mr-2"></div>
      Dashboard</NuxtLink
    >
    <div class="relative">
      <div
        ref="previewEl"
        class="w-full h-80 relative rounded-2xl bg-gray-50 overflow-y-auto border border-dark-500 ring ring-dark-500 transition-all ease-in-out duration-700"
        :class="{ 'h-screen-md': isOpen }"
      >
        <div class="absolute top-4 left-4">
          <TriggerButton :widget="widget"></TriggerButton>
        </div>
        <div class="absolute top-20 pb-20 left-1/2 transform -translate-x-1/2">
          <Widget :widget="widget"></Widget>
        </div>
      </div>
      <Button label="Preview" class="!absolute top-4 right-6" @click="isOpen = !isOpen"></Button>

      <Transition name="slide-fade">
        <Styler v-if="isOpen" class="absolute top-36 right-6"></Styler>
      </Transition>
    </div>

    <div class="flex mt-8">
      <div class="flex flex-col items-start space-y-2 flex-shrink-0 w-1/5 pr-4">
        <Button
          @click="save"
          icon="pi pi-save"
          class="w-full"
          :loading="isSaving"
          label="Save"
          iconPos="right"
        ></Button>

        <h5 class="font-bold text-gray-400 !mt-8">Setup</h5>
        <button
          class="px-2 py-2 flex items-center w-full text-left rounded-lg bg-transparent hover:bg-gray-100 transition-all"
          :class="{ 'font-semibold text-teal-500 text-lg': childPath === '/' }"
          @click="goTo('')"
        >
          <div class="i-ion-md-person text-xl mr-2"></div>
          Heading
        </button>
        <button
          class="px-2 py-2 flex items-center w-full text-left rounded-lg bg-transparent hover:bg-gray-100 transition-all"
          :class="{ 'font-semibold text-teal-500 text-lg': childPath === '/links' }"
          @click="goTo('links')"
        >
          <div class="i-ion-link text-xl mr-2"></div>
          Links
        </button>
        <button
          class="px-2 py-2 flex items-center w-full text-left rounded-lg bg-transparent hover:bg-gray-100 transition-all"
          :class="{ 'font-semibold text-teal-500 text-lg': childPath === '/projects' }"
          @click="goTo('projects')"
        >
          <div class="i-ion-rocket-outline text-xl mr-2"></div>
          Projects
        </button>
        <button
          class="px-2 py-2 flex items-center w-full text-left rounded-lg bg-transparent hover:bg-gray-100 transition-all"
          :class="{ 'font-semibold text-teal-500 text-lg': childPath === '/etc' }"
          @click="goTo('etc')"
        >
          <div class="i-ion-medical-outline text-xl mr-2"></div>
          Etc
        </button>

        <Button @click="gopro" class="w-full p-button-secondary" label="Go Pro ✨" iconPos="right"></Button>
      </div>

      <div class="w-4/5">
        <ClientOnly>
          <NuxtPage class="border" :key="tick"></NuxtPage>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
