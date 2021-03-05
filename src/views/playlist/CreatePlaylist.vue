<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title" />
    <textarea
      required
      placeholder="Playlist description..."
      v-model="description"
    ></textarea>
    <!-- upload playlist image -->
    <label>Upload Playlist cover image</label>
    <input type="file" @change="handleChange"/>

    <div class="error">{{ fileError }}</div>

    <div class="error"></div>

    <button>Create</button>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const file = ref("")
    const fileError = ref("")

    const handleSubmit = () => {
      if(file.value) {
        console.log(title.value, description.value, file.value);
      }
    };

    const handleChange = (e) => {
      const selected = e.target.files[0]

      // allowed file types
      const fileType = ['image/png', 'image/jpeg']

      if(selected && fileType.includes(selected.type)){
        file.value = selected
        console.log(file.value)
        fileError.value = null
      } else {
        file.value = null
        fileError.value = "Please select an image file (png or jpeg)"
      }
    }

    return { title, description, handleSubmit, handleChange, fileError };
  },
};
</script>

<style>
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>