<template>
  <div class="home">
    <!-- <p>Homepage</p> -->
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="documents">
      <div v-for="doc in documents" :key="doc.id" class="playlist">
        <h1>{{ doc.title }}</h1>
        <p>{{ doc.userName }}</p>
        <p>{{ doc.description }}</p>
        <div class="img">
          <img :src="doc.coverUrl" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, ref } from "vue";
import getCollection from "../composable/getCollection";
export default {
  name: "Home",
  setup() {
    const { error, documents } = getCollection("playlists");

    return { documents, error };
  },
};
</script>

<style scoped>
.playlist {
  max-width: 400px;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
  box-shadow: 0.1px 1px 2px 0.5px rgba(128, 128, 128, 0.459);
  margin: 20px;
}
.img {
  max-width: 100%;
  padding: 10px;
  text-align: center;
}
img {
  max-width: 350px;
}
</style>