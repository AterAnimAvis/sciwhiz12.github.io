fetch("data.json")
    .then(req => req.json())
    .then( /** @param data : Quotes */ data => {
        const roles = parseRoles(data.roles);
        const counts = calculateCounts(data.quotes);
        const table = document.getElementById("counts");
        for (const entry of counts) {
            addRow(data, roles, table, entry[0], entry[1])
        }
    }).catch(err => {
        console.error("Error while loading: " + err)
        document.getElementById("loading_error").style.display = ""
    })

function addRow(data : Quotes, roles : {[key: string] : Role}, parent : Node, user : string, count : number) {
    const userdata = data.users[user];

    const row = parent.appendChild(document.createElement("tr"))

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
    countData.innerText = String(count)
}

function sorted<A, B>(map : Map<A, B>, comparator:  (a: [A, B], b: [A, B]) => number) : Map<A, B> {
    return new Map<A, B>([...map.entries()].sort(comparator))
}

/**
 * Generates a Username to Number of Quotes Map from an array of Quotes
 */
function calculateCounts(quotes : Quote[]) : Map<string, number> {
    const quoteCount = quotes
        .filter(it => it)
        .map(it => it.user)
        .reduce((counts, user) => counts.set(user, (counts.get(user) || 0) + 1), new Map<string, number>());

    return sorted(quoteCount, (a, b) => b[1] - a[1])
}