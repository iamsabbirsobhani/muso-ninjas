import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)

const login = async ( email, password ) => {
    error.value = null

    try{
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        error.value = null

        return res
    } catch(err) {
        let ermsg = err.message
        error.value = ermsg

        console.log(err.code)
    }
}

const userLogin = () => {
    return {login, error}
}

export default userLogin