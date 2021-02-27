import {
    ref
} from 'vue'
import {
    projectAuth
} from '../firebase/config'

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, displayname) => {
    error.value = null
    isPending.value = true
    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)

        if (!res) {
            throw new Error('Could not complete the signup')
        }

        await res.user.updateProfile({
            displayName: displayname
        })

        isPending.value = false
        error.value = null
        return res
    } catch (err) {
        console.log(err.message)
        error.value = err.message
    }
}

const useSignup = () => {
    return {
        error,
        signup,
        isPending
    }
}

export default useSignup