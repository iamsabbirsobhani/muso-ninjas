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
    <input type="file" @change="handleChange" />

    <div class="error">{{ fileError }}</div>

    <div class="error"></div>

    <button v-if="!isPending">Create</button>
    <button v-else disabled>Sending...</button>
  </form>
  <img src="url" alt="" />
</template>

<script>
import useStorage from "@/composable/useStorage";
import { ref } from "vue";
import useCollection from "@/composable/useCollection";
import getUser from "@/composable/getUser";
import { timestamp } from "../../firebase/config";
export default {
  setup() {
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("playlists");
    const { user } = getUser();

    const title = ref("");
    const description = ref("");
    const file = ref("");
    const fileError = ref("");
    const isPending = ref(false);

    const handleSubmit = async () => {
      if (file.value) {

        // isPending start
        isPending.value = true;
        // end of isPending start

        await uploadImage(file.value);

        await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp(),
        });

        // isPending end
        isPending.value = false;
        // end of isPending end

        if (!error.value) {
          console.log("Playlist created");
        }

        console.log("image uploaded, url: ", url.value);
      }
    };

    const handleChange = (e) => {
      const selected = e.target.files[0];

      // allowed file types
      const fileType = ["image/png", "image/jpeg"];

      if (selected && fileType.includes(selected.type)) {
        file.value = selected;
        console.log(file.value);
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpeg)";
      }
    };

    return { title, description, handleSubmit, handleChange, fileError, url, isPending };
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