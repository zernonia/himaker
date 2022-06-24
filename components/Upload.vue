<script setup lang="ts">
const emits = defineEmits(["done"])
const client = useSupabaseClient()

const target = ref()
const pickFile = (ev: Event) => {
  let files = target.value.files as FileList
  if (files.length) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader()
      reader.onload = async (e) => {
        const result = e.target?.result as string
        emits("done", result)
        let r = (Math.random() + 1).toString(36).substring(5)
        const { data } = await client.storage.from("media").upload(r, files[i], { cacheControl: "3600" })
        if (data) {
          const media_url = client.storage.from("media").getPublicUrl(r)
          emits("done", media_url.publicURL)
        }
      }
      reader.readAsDataURL(files[i])
    }
  }
}
</script>

<template>
  <input class="hidden" ref="target" type="file" multiple @input="pickFile" accept="image/*" />
</template>
