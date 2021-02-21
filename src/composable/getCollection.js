import {
    ref,
    watchEffect
} from 'vue'
import {
    projectFirestore
} from '../firebase/config'

const getCollection = (collection) => {
    const documents = ref(null)
    const error = ref(null)

    // register the firestore collection reference
    let collectionRef = projectFirestore.collection(collection)
        .orderBy('createdAt')

    const unsub = collectionRef.onSnapshot((snap) => {
        let results = []
        console.log('snapshot')
        snap.docs.forEach(doc => {
        // must wait for the server to create the timestamp & send it back
            doc.data().createdAt && results.push({
                ...doc.data(),
                id: doc.id
            })
        })
        documents.value = results
        error.value = null
        // console.log(documents.value.name)

    }, (err) => {
        // update values
        documents.value = null
        error.value = "Could not fetch data"
    })
    watchEffect((onInvalidate) => {
        onInvalidate(() => {
            unsub()
        })
    })
    return {
        error,
        documents,
    }
}

export default getCollection