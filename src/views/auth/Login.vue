<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <div v-if="error" class="error"> {{ error }} </div>
    <button class="btn" v-if="!isPending">Login</button>
    <button class="btn" v-if="isPending" disabled>loading</button>
  </form>
</template>

<script>
import useLogin from "@/composable/useLogin";
import { ref } from "vue";
export default {
  setup() {
    const { login, error, isPending } = useLogin();

    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      let res = await login(email.value, password.value);
      if (!error.value) {
        console.log("User Logged in");
      }
    };

    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style>
</style>