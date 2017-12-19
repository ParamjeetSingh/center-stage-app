import { onSaleRef, userRef, reportRef } from './config'
import moment from 'moment'
import firebaseAdmin from 'firebase-admin'


const removeOnSaleRef = () => {
  return onSaleRef
  .remove()
  .then(() => console.log('done'))
}

const listenForUserDeleted = () => {
  userRef.on('child_removed', s => {
    console.log('user deleted', s.val())
    let {uid} = s.val()
    return firebaseAdmin.auth().deleteUser(uid)
  })
}

// removeOnSaleRef()
// .then(() => process.exit())

module.exports = removeOnSaleRef;