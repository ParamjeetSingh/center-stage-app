import cheerio from 'cheerio'
import moment from 'moment'
export const parseSalesPage = html => {
  return new Promise((resolve, reject) => {
    let $ = cheerio.load(html, {
      normalizeWhitespace:true
    })
    let salesTableRows = $('tbody > tr').toArray()
    let events = []
    let onSaleDate
    let onSaleTime
    salesTableRows.forEach(row => {
      let tableCells = $(row).children('td').toArray()
      let saleTimeStampIdentifier = new RegExp('Sales Starting')
      if(tableCells.length > 0) {
          let event = {}
          let onSaleTime = $(tableCells[0]).text().trim()
          //console.log($($(tableCells[1]).html().split('<br>')).toArray())
          events.push({
            eventName: $(tableCells[1]).text().trim(),
            city: $(tableCells[3]).text().trim(),
            venue:$(tableCells[2]).text().trim(),
            eventDate:'',
            merchant:'',
            publicSaleUrl:'',
            password: $(tableCells[4]).text().trim(),
            ticketLink:$(tableCells[5]).html().split('href=')[1].split('target')[0].split('"')[1],
            provider: 'ticketonsalelist',
            onSaleDate: moment().format('MM/DD/YY'),
            onSaleTime
          })
        }
      })
    resolve(events)
  })
}