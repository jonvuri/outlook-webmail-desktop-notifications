
{

    setTimeout(() => {

        const defined = (object) => typeof object !== 'undefined'
        const notificationsEqual = (a, b) =>
            a.length === b.length && a.every((el, i) =>
                el.title === b[i].title && el.message === b[i].message
            )

        var lastNotifications = []

        if (defined(Owa) && defined(Owa.UIControls) && defined(Owa.UIControls.ReminderDialog)) {

            Object.defineProperty(Owa.UIControls.ReminderDialog.prototype, 'updateTitlebarButton', {

                get: function() {
                    return this._updateTitlebarButton
                },

                set: function (fn) {

                    this._updateTitlebarButton = function () {

                        const notifications = this.getItems().map((item) => {
                            const regex = /<div id="c1Row1" class="divNotificationsColumn1Row1">(.*?)<\/div><div id="c1Row2" class="divNotificationsColumn1Row2">(.*?)<\/div>/
                            const [ , title, message ] = item._oTarget.innerHTML.match(regex)
                            return { title, message }
                        })

                        if (!notificationsEqual(notifications, lastNotifications)) {

                            window.postMessage({ type: 'notification', notifications: notifications }, '*')

                            lastNotifications = notifications.slice()

                        }

                        return fn.apply(this, arguments)

                    }

                }

            })

        } else {
            console.error('[Desktop Notifications for Outlook Webmail] No reminder object to bind to on the current page')
        }

    }, 1500)

}
