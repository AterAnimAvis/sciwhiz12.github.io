fetch("data.json")
    .then(req => req.json())
    .then((data) => {
    const roles = parseRoles(data.roles);
    const counts = calculateCounts(data.quotes);
    const table = document.getElementById("counts");
    for (const entry of counts) {
        table.appendChild(addRow(data, roles, table, entry[0], entry[1]));
    }
}).catch(err => {
    console.error("Error while loading: " + err);
    document.getElementById("loading_error").style.display = "";
});
function addRow(data, roles, parent, user, count) {
    const userdata = data.users[user];
    const row = document.createElement("tr");
    const username = create("td", "collapse", row);
    username.tabIndex = 1;
    createName(user, userdata, roles, username, username);
    create("td", "count", row, String(count));
    return row;
}
function sorted(map, comparator) {
    return new Map([...map.entries()].sort(comparator));
}
/**
 * Generates a Username to Number of Quotes Map from an array of Quotes
 */
function calculateCounts(quotes) {
    const quoteCount = quotes
        .filter(it => it)
        .map(it => it.user)
        .reduce((counts, user) => counts.set(user, (counts.get(user) || 0) + 1), new Map());
    return sorted(quoteCount, (a, b) => b[1] - a[1]);
}
