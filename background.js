chrome.runtime.onMessage.addListener((message, sender, cb) => {

    const number = message.notifications.length

    chrome.notifications.create({
        type: 'list',
        iconUrl: 'icon128.png',
        title: 'Outlook Reminders',
        message: `${number} reminder${number === 1 ? '' : 's' }`,
        items: message.notifications,
        isClickable: true
    }, (notificationId) => {

        const listener = () => {

            chrome.notifications.onClicked.removeListener(listener)

            chrome.windows.update(sender.tab.windowId, { focused: true })
            chrome.tabs.update(sender.tab.id, { active: true, highlighted: true })

            chrome.notifications.clear(notificationId)

        }

        chrome.notifications.onClicked.addListener(listener)

    })

})
