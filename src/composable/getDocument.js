import {
    ref,
    watchEffect
} from 'vue'
import {
    projectFirestore
} from '../firebase/config'

const getDocument = (collection, id) => {
    const document = ref(null)
    const error = ref(null)

    // register the firestore collection reference
    let collectionRef = projectFirestore.collection(collection).doc(id)

    const unsub = collectionRef.onSnapshot((doc) => {

        if (doc) {
            document.value = {...doc.data(), id: doc.id}
            error.value = null
        } else {
            error.value = 'That document does not exist'
        }

    }, (err) => {
        // update values
        document.value = null
        error.value = "Could not fetch the document"
    })

    // onInvalidate() will run when the component on mounts.
    // so if we go another page and come back to this page again, realtime listener will not fetch data everytime.
    // so we have to unsubscribe using onInvalidate() function, which is returned to us (line:16) when we set.
    // this watcheffect unsubscribes realtime listener from the real time listener.
    watchEffect((onInvalidate) => {
        onInvalidate(() => {
            unsub()
        })
    })
    return {
        error,
        document,
    }
}

export default getDocument