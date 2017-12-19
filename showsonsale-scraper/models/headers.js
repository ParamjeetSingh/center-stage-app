import mongoose from 'mongoose'

const headerSchema = mongoose.Schema({
  'Accept-Encoding': String,
  'Accept-Language': String,
  'Upgrade-Insecure-Requests': String,
  'User-Agent': String,
  'Accept': String,
  'Referer': String,
  'Connection': String,
  'Cache-Control': String,
  'Cookie': String
}, {strict: false})

headerSchema.statics.updateHeaders = function(newHeaders) {
  console.log('header schema updating headers', newHeaders)
  return this.findOne({createdAt:-1})
  .then(res => {
    if(!!res) {
      return res
    }
    else {
      return this.create(newHeaders).then(this.save)
    }
  })
}

export default mongoose.model('headers', headerSchema)