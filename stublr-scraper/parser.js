import cheerio from 'cheerio'
import moment from 'moment'
export const parseSalesPage = html => {
  return new Promise((resolve, reject) => {
    let $ = cheerio.load(html, {
      normalizeWhitespace:true
    })
    let salesTableRows = $('.eventlist > tbody > tr').toArray()
    let saleTimeBars = $("td[class='saletimebar']").toArray()
    let events = []
    let onSaleDate
    let onSaleTime
    salesTableRows.forEach(row => {
      let tableCells = $(row).children('td').toArray()
      let saleTimeStampIdentifier = new RegExp('Sales Starting')
      let eventName
      let city
      let venue
      let eventDate
      let publicSaleUrl
      let merchant
      let password
      if(tableCells.length > 0) {
          let event = {}
          let firstCell = $(tableCells[0]).text()
         if(saleTimeStampIdentifier.test(firstCell)) {
            let dateAndTime = firstCell.split('Sales Starting')[1].split('at')
            onSaleDate = dateAndTime[0].trim()
            onSaleTime = dateAndTime[1].trim()
         }
         else {
            if(firstCell !== undefined)
              eventName = firstCell
            try {
              city = $($(tableCells[1]).html().split('<br>')).toArray()[1].split('<a')[0].trim()
            }
            catch(err) {
              city =  'unknown'
            }
            try {
              venue = $($(tableCells[1]).html().split('<br>')).toArray()[0].trim()
            }
            catch(err) {
              venue =  'unknown'
            }
            try {
              eventDate = $($(tableCells[2]).html().split('<br>')).toArray()[1].trim()
            }
            catch(err) {
              eventDate = 'unknown'
            }
            try {
              merchant = $(tableCells[3]).text().trim()
            }
            catch(err) {
              merchant = 'unknown'
            }
            try {
              publicSaleUrl = $(tableCells[4]).html().split('href="')[1].split('title')[0].split('"')[0]
            }
            catch(err) {
              publicSaleUrl = 'unknown'
            }
            try {
              password = $(tableCells[4]).children('img').attr('title')
            }
            catch(err) {
              password = 'unknown'
            }
            events.push({
              eventName,
              city,
              venue,
              eventDate,
              merchant,
              publicSaleUrl,
              provider: 'Stublr',
              password,
              ticketLink:'',
              onSaleDate,
              onSaleTime
            })
          }
        }
      })
      resolve(events)
    })
}

export const getEventListPages = html => {
  return new Promise((resolve, reject) => {
    let $ = cheerio.load(html)
    let links = $('.eventlist-pages').children('a').toArray()
    links.forEach((link, index) => {
      if($(link).text() === 'Next') {
        resolve($(links[index-1]).text())
      }
    })
  })
}

