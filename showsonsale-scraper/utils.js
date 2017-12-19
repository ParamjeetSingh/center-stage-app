//takes an array of objects as argument
export const buildParams = (array) => {
  let str=''; 
  array.forEach((obj, index) => {
    Object.keys(obj).map(k => {
      if(index === 0) {
        str+= '?'+k+'='+obj[k].split(' ').join('%20')
      }
      else {
        str+= '&'+k+'='+obj[k].split(' ').join('%20')

      }
    }); 
  })    
  return str
}

export const buildUrl = (url, params) => {
  if(!params) {
    return url
  }
  else {
    return `${url}${params}`
  }
}
