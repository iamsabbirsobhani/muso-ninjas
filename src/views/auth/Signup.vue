<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display Name" v-model="displayName" required>
    <input type="email" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <div v-if="error" class="error"> {{ error }} </div>
    <button class="btn" v-if="!isPending">Sign up</button>
    <button class="btn" v-if="isPending" disabled>loading</button>
  </form>
</template>

<script>
import useSignup from '@/composable/useSignup'
import { ref } from 'vue'
export default {
    setup() {
        const { error, signup, isPending} = useSignup()

        const displayName = ref('')
        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            const res = await signup(email.value, password.value, displayName.value)
            if(!error.value){
                console.log('User signed up!')
            }
        }

        return { displayName,
         email,
          password,
           isPending,
            handleSubmit,
            error }
    }
}
</script>

<style>

</style>