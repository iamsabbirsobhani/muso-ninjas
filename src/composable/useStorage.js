import { ref } from '@vue/reactivity'
import { projectStorage } from '../firebase/config'

const { user } = getUser()

const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filepath = ref(null)

    const uploadImage = async (file) => {
        filepath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = projectStorage.ref(filepath.value)

        try{
            const res = await storageRef.put(file)
            url.value = res.ref.getDownloadURL()
        } catch(err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    return { url, filepath, error}
}

export default useStorage