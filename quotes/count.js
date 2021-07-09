withQuoteData(data => {
    const roles = parseRoles(data.roles);
    const counts = calculateCounts(data.quotes);
    const table = document.getElementById("counts");
    const fragment = document.createDocumentFragment();

    for (const entry of counts) fragment.appendChild(addRow(data, roles, entry[0], entry[1]));

    table.appendChild(fragment);
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
 * @template K, V
 * @extends {Map<K, V>}
 */
class SortableMap extends Map {

    /**
     * Sorts the Map
     * Note this relies on the fact that the Map's iteration order is based on the insertion order
     * @param {function([K, V], [K, V]): number=} comparison
     * @return {SortableMap}
     */
    sort(comparison) {
        let tupleArray = [];
        for (const [k, v] of this) tupleArray.push([k, v]);

        tupleArray.sort(comparison || ((a, b) => b[1] - a[1]));

        for (const [k, v] of tupleArray) this.deleteAndSet(k, v)

        return this
    }

    /**
     * @param key : K
     * @param value : V
     * @return {SortableMap}
     */
    deleteAndSet(key, value) {
        this.delete(key)
        this.set(key, value)

        return this
    }

    /**
     * @param key : K
     * @param func : {function(V):V}
     * @param _default : V
     * @return {SortableMap}
     */
    apply(key, func, _default) {
        this.set(key, func(this.get(key) || _default))

        return this
    }
}

/**
 * Generates a Username to Number of Quotes Map from an array of Quotes
 * @param quotes : Quote[]
 * @return {Map<string, number>}
 */
function calculateCounts(quotes) {
    /**
     * @param {SortableMap<string, number>} map
     * @param {string} user
     */
    const countingFunction = (map, user) => map.apply(user, it => it + 1, 0)
    const nonNull = it => it

    return quotes
        .map(it => it?.user)
        .filter(nonNull)
        .reduce(countingFunction, new SortableMap())
        .sort()
}