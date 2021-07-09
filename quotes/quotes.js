withQuoteData(data => {
    const container = document.getElementById("quotes")
    const fragment  = document.createDocumentFragment()
    const roles = parseRoles(data.roles);

    const quotes = data.quotes;
    for (let i = 0; i < quotes.length; i++) {
        const quote = quotes[i];
        const hasNoUser = !quote || !quote.user
        fragment.appendChild(hasNoUser
            ? createNoQuote(i + 1)
            : createQuote(data, roles, i + 1, quote)
        )
    }

    container.appendChild(fragment)

    const counts = document.getElementsByClassName("count")
    for (let i = 0; i < counts.length; i++) {
        counts[i].addEventListener("click", removeAllHovers)
    }

    const id = window.location.hash;
    removeAllHovers()
    if (id && id.length) {
        const element = document.getElementById(id.substr(1))
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            element.classList.add("hover")
        }
    }
})

window.addEventListener("hashchange", removeAllHovers)

function removeAllHovers() {
    const elements = document.getElementsByClassName("hover")
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("hover");
    }
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
 * @return {HTMLElement}
 */
function createQuote(data, roles, number, quote) {
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

    const userSpan = nameDiv.appendChild(document.createElement("span"))
    userSpan.innerHTML = userdata ? (userdata.hasOwnProperty("nickname") ? userdata.nickname : userdata.username) : user
    if (userdata) {
        const userRoles = userdata.roles
        if (userRoles && userRoles.length > 0) {
            userRoles.forEach(roleName => {
                if (roles[roleName]?.css) {
                    userSpan.classList.add(roles[roleName].css)
                }
            });
        }
        if (userdata.hasOwnProperty("tag")) {
            const tagSpan = nameDiv.appendChild(document.createElement("span"))
            tagSpan.className = "tag"
            tagSpan.innerHTML = userdata.tag
        }

        content.appendChild(createPopup(user, roles, userdata))
    } else {
        userSpan.className = "non_user"
    }

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