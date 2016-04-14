const script = document.createElement('script')
script.type = 'text/javascript'
script.src = chrome.extension.getURL('page.js')

document.getElementsByTagName('head')[0].appendChild(script)

window.addEventListener('message', (event) => {

    if (event.source === window && event.data.type && (event.data.type === 'notification')) {
        chrome.runtime.sendMessage({ notifications: event.data.notifications })
    }

}, false)
