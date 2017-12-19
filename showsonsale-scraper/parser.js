import cheerio from 'cheerio'
import moment from 'moment'
let fs = require('fs');

export const getViewState = html => {
  return new Promise((resolve, reject) => {
    let $ = cheerio.load(html)
    let csrfToken = $('#__VIEWSTATE').attr('value')
    resolve(csrfToken)
  })
}

export const getPostBackUrl = html => {
  return new Promise((resolve, reject) => {
    let $ = cheerio.load(html)
    let postBackUrl = $('#Form1').attr('action')
    console.log('found postback url', postBackUrl)
    resolve(postBackUrl)
    
  })
}

export const getViewStateGenerator = html => {
  return new Promise((resolve, reject) => {
    let $ = cheerio.load(html)
    resolve($('#__VIEWSTATEGENERATOR').attr('value'))
  })
}

const parseURL = url => {
    let parsed_url = {}

    if ( url == null || url.length == 0 )
        return parsed_url;

    let protocol_i = url.indexOf('://');
    parsed_url.protocol = url.substr(0,protocol_i);

    let remaining_url = url.substr(protocol_i + 3, url.length);
    let domain_i = remaining_url.indexOf('/');
    domain_i = domain_i == -1 ? remaining_url.length - 1 : domain_i;
    parsed_url.domain = remaining_url.substr(0, domain_i);
    parsed_url.path = domain_i == -1 || domain_i + 1 == remaining_url.length ? null : remaining_url.substr(domain_i + 1, remaining_url.length);

    let domain_parts = parsed_url.domain.split('.');
    switch ( domain_parts.length ){
        case 2:
          parsed_url.subdomain = null;
          parsed_url.host = domain_parts[0];
          parsed_url.tld = domain_parts[1];
          break;
        case 3:
          parsed_url.subdomain = domain_parts[0];
          parsed_url.host = domain_parts[1];
          parsed_url.tld = domain_parts[2];
          break;
        case 4:
          parsed_url.subdomain = domain_parts[0];
          parsed_url.host = domain_parts[1];
          parsed_url.tld = domain_parts[2] + '.' + domain_parts[3];
          break;
    }

    parsed_url.parent_domain = parsed_url.host + '.' + parsed_url.tld;
    return parsed_url.host;
}

export const parsePresalePage = page => {
  return new Promise((resolve, reject) => {
    let $ = cheerio.load(page,{
        normalizeWhitespace : true
    })
    let presaleNodes = $('#CamListDiv')
      .find('table')
      .find('tbody')
      .find('tr')
      .toArray()
    let events = [];
    let onSaleDate,
        onSaleTime;
    presaleNodes.forEach(presale => {

        let eventName = $(presale)
        .find('.info')
        .text()
        if(eventName === '') return
        let time = $(presale)
            .find('td:nth-child(7)')
            .text()
        let timeCount = time.split(' ')[1]
        let timeSpan = time.split(' ')[2]
        let presaleTime = timeCount+' '+timeSpan
        let url = $(presale)
            .find('.info')
            .attr('href')
        let provider = parseURL(url);
        let venueName = $(presale)
            .find('a')
            .slice(1)
            .eq(0)
            .text()
        let venueUrl = $(presale)
            .find('a')
            .slice(1)
            .eq(0)
            .attr('href')
        let city = $(presale)
            .find('a')
            .slice(2)
            .eq(0)
            .text()
            .split(',')[0]
        let state = $(presale)
            .find('a')
            .slice(2)
            .eq(0)
            .text()
            .split(',')[1]
        events.push({
            eventName: eventName,
            city: city,
            venue: venueName,
            eventDate: '',
            merchant: '',
            publicSaleUrl: '',
            password: '',
            ticketLink: url,
            provider: provider,
            onSaleDate: moment().format('MM/DD/YY'),
            onSaleTime: presaleTime
        })
        
      // console.log({presaleTime}, {eventName}, {url}, {provider}, {venueName}, {venueUrl}, {city}, {state})
    })
    resolve(events)
  })
}