withQuoteData(data => {
    // We disable the popups if the useragent contains `Mobi` or a `?mobile` is present in the url
    const isMobile = /Mobi/.test(window.navigator.userAgent) || /Mobile/i.test(window.location.search)
    // On my test device:
    // With Popups enabled roughly ~275 quotes can load without causing a crash
    // With them disabled at least 1300 quotes can load

    const container = document.getElementById("quotes")
    const fragment  = document.createDocumentFragment()
    const roles = data.roles;
    injectStyleSheet(parseRoles(roles));

    const quotes = data.quotes;
    for (let i = 0; i < quotes.length; i++) {
        const quote = quotes[i];
        const hasNoUser = !quote || !quote.user
        fragment.appendChild(hasNoUser
            ? createNoQuote(i + 1)
            : createQuote(data, roles, i + 1, quote, !isMobile)
        )
    }

    container.appendChild(fragment)

    setupHovers()
})

function setupHovers() {
    forAllElementsWithClassName("count", element => element.addEventListener("click", removeAllHovers))

    const id = window.location.hash;
    removeAllHovers()
    if (id && id.length) {
        const element = document.getElementById(id.substr(1))
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            element.classList.add("hover")
        }
    }
}

function removeAllHovers() {
    forAllElementsWithClassName("hover", element => element.classList.remove("hover"))
}

window.addEventListener("hashchange", removeAllHovers)

/**
 *
 * @param className : string
 * @param consumer : {function(HTMLElement):any}
 */
function forAllElementsWithClassName(className, consumer) {
    const elements = document.getElementsByClassName(className)
    for (const element of elements) consumer(element)
}

/**
 * @param number : number
 * @return {HTMLElement}
 */
function createNoQuote(number) {
    const quoteDiv = document.createElement("div")
    quoteDiv.className = "quote"
    quoteDiv.id = number.toString()

    const numberElement = quoteDiv.appendChild(document.createElement("a"))
    numberElement.className = "count"
    numberElement.href = numberElement.innerText = "#" + number

    const content = quoteDiv.appendChild(document.createElement("div"))
    content.className = "content"

    const nameDiv = content.appendChild(document.createElement("div"))
    nameDiv.className = "name"

    const metaText = nameDiv.appendChild(document.createElement("span"))
    metaText.className = "meta-text"
    metaText.innerText = "Quote does not exist."

    return quoteDiv;
}

/**
 * @param data : Quotes
 * @param roles : RoleRegistry
 * @param number : number
 * @param quote : Quote
 * @param addPopups : boolean
 * @return {HTMLElement}
 */
function createQuote(data, roles, number, quote, addPopups) {
    const user = quote.user
    const text = quote.text
    let userdata = null;
    if (data.users.hasOwnProperty(user)) {
        userdata = data.users[user]
    }

    const quoteDiv = document.createElement("div")
    quoteDiv.className = "quote"
    quoteDiv.id = number.toString()

    const numberElement = quoteDiv.appendChild(document.createElement("a"))
    numberElement.className = "count"
    numberElement.href = numberElement.innerText = "#" + number

    const avatar = quoteDiv.appendChild(document.createElement("img"))
    avatar.className = userdata ? "collapse-avatar avatar" : "avatar"
    avatar.tabIndex = 1
    if (userdata) {
        avatar.src = userdata.avatar
        avatar.alt = "avatar for " + user
    }

    const content = quoteDiv.appendChild(document.createElement("div"))
    content.className = "content"

    const nameDiv = content.appendChild(document.createElement("div"))
    nameDiv.className = userdata ? "collapse-name name" : "name"
    nameDiv.tabIndex = 1

    createQuotee(nameDiv, userdata, roles, user);
    if (userdata && addPopups) content.appendChild(createPopup(user, roles, userdata))

    if (quote.hasOwnProperty("side_text")) {
        content.appendChild(document.createTextNode(" "))
        const sideTextSpan = content.appendChild(document.createElement("span"))
        sideTextSpan.className = "side-text"
        sideTextSpan.innerHTML = quote.side_text
    }

    const textDiv = content.appendChild(document.createElement("div"))
    textDiv.className = "text"
    textDiv.innerHTML = text

    return quoteDiv
}