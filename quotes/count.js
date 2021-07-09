withQuoteData(data => {
    const roles = parseRoles(data.roles);
    const counts = calculateCounts(data.quotes);
    const table = document.getElementById("counts");
    for (const entry of counts) {
        table.appendChild(addRow(data, roles, entry[0], entry[1]))
    }
})

/**
 * @param data : Quotes
 * @param roles : RoleRegistry
 * @param user : string
 * @param count : number
 */
function addRow(data, roles, user, count) {
    const userdata = data.users[user];

    const row = document.createElement("tr")

    const username = row.appendChild(document.createElement("td"))
    username.className = "collapse"
    username.tabIndex = 1

    const userSpan = username.appendChild(document.createElement("span"))
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
            const tagSpan = username.appendChild(document.createElement("span"))
            tagSpan.className = "tag"
            tagSpan.innerHTML = userdata.tag
        }

        username.appendChild(createPopup(user, roles, userdata))
    } else {
        userSpan.className = "non_user"
    }

    const countData = row.appendChild(document.createElement("td"))
    countData.className = "count"
    countData.innerText = count.toString()

    return row
}

/**
 * Generates a Username to Number of Quotes Map from an array of Quotes
 * @param quotes : Quote[]
 * @return {Map<string, number>}
 */
function calculateCounts(quotes) {
    const quoteCount = new Map();
    quotes.forEach(element => {
        if (element) {
            const number = quoteCount.has(element.user) ? quoteCount.get(element.user) : 0;
            quoteCount.set(element.user, number + 1)
        }
    });
    return new Map([...quoteCount.entries()].sort((a, b) => b[1] - a[1])) //TODO: Double check need for new map
}