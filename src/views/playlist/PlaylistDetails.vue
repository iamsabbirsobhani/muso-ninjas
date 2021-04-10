<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" alt="Cover photo" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="isOwner" @click="deletePlaylist">Delete Playlist</button>
    </div>

    <!-- song list -->
    <div class="song-list">
      <p>Song list here</p>
    </div>
  </div>
</template>

<script>
import getDocument from "@/composable/getDocument";
import getUser from "@/composable/getUser";
import { ref, watch } from "vue";
import { projectFirestore } from "@/firebase/config";
import { useRouter } from 'vue-router'
export default {
  props: ["id"],
  setup(props) {
    const { user } = getUser();
    const { error, document: playlist } = getDocument("playlists", props.id);
    const isOwner = ref(false);
    const router = useRouter()

    watch(playlist, (newPlaylist) => {
      console.log(newPlaylist.userName);

      if (newPlaylist.userName === user.value.displayName) {
        isOwner.value = true;
      } else {
        isOwner.value = false;
      }
    });

    const deletePlaylist = async () => {
      router.push({ name: 'Home' })
      await projectFirestore.collection("playlists").doc(props.id).delete();
    };
    console.log(props.id)
    return { error, playlist, isOwner, deletePlaylist };
  },
};
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}

.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
  margin-bottom: 10px;
}

.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}

.playlist-info {
  text-align: center;
}
</style>