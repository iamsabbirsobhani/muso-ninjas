<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/ninja.png" alt="" />
      <h1><router-link :to="{ name: 'Home' }">Muso Ninjas</router-link></h1>
      <div class="links">
        <div v-if="user">
          <button @click="handleSubmit">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">Log in</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "../composable/useLogout";
import getUser from "../composable/getUser";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { user } = getUser();
    const { logout } = useLogout();
    const router = useRouter();

    const handleSubmit = async () => {
      await logout();
      console.log("User Logged out");
      router.push({ name: "Login" });
    };

    return { handleSubmit, user };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  /* New Tricks: On display flex, if its item set margin-left: auto (instead of justify-content: space-between)
         as auto it will be positioned auto left */
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
nav img {
  max-height: 60px;
}
</style>