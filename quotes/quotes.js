fetch("data.json")
    .then(req => req.json())
    .then((data) => {
    const container = document.getElementById("quotes");
    const roles = parseRoles(data.roles);
    const quotes = data.quotes;
    quotes.forEach((quote, index) => {
        const hasQuote = !(quote === null || quote === void 0 ? void 0 : quote.user);
        container.appendChild(hasQuote
            ? createNoQuote(index + 1)
            : createQuote(data, roles, index + 1, quote));
    });
    forEachElementByClassName("count", element => element.addEventListener("click", removeAllHovers));
    const id = window.location.hash;
    removeAllHovers();
    if (id && id.length) {
        const element = document.getElementById(id.substr(1));
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            element.classList.add("hover");
        }
    }
}).catch(err => {
    console.error("Error while loading: " + err);
    document.getElementById("loading_error").style.display = "";
    throw err;
});
window.addEventListener("hashchange", removeAllHovers);
function removeAllHovers() {
    forEachElementByClassName("hover", element => element.classList.remove("hover"));
}
function forEachElementByClassName(name, consumer) {
    const elements = document.getElementsByClassName(name);
    for (let i = 0; i < elements.length; i++)
        consumer(elements[i]);
}
function createNoQuote(number) {
    const quoteDiv = createDiv("quote");
    quoteDiv.id = String(number);
    createLink("count", "#" + number, quoteDiv);
    const content = createDiv("content", quoteDiv);
    const nameDiv = createDiv("name", content);
    createSpan("meta-text", nameDiv, "Quote does not exist.");
    return quoteDiv;
}
function createQuote(data, roles, number, quote) {
    const user = quote.user;
    const text = quote.text;
    const userdata = data.users.hasOwnProperty(user) ? data.users[user] : null;
    const quoteDiv = createDiv("quote");
    quoteDiv.id = String(number);
    createLink("count", "#" + number, quoteDiv);
    const avatar = createImg(userdata ? "collapse-avatar avatar" : "avatar", quoteDiv, userdata === null || userdata === void 0 ? void 0 : userdata.avatar);
    avatar.tabIndex = 1;
    if (userdata)
        avatar.alt = "avatar for " + user;
    const content = createDiv("content", quoteDiv);
    const nameDiv = createDiv(userdata ? "collapse-name name" : "name", content);
    nameDiv.tabIndex = 1;
    createName(user, userdata, roles, nameDiv, content);
    if (quote === null || quote === void 0 ? void 0 : quote.side_text) {
        content.appendChild(document.createTextNode(" "));
        createSpan("side-text", content, quote === null || quote === void 0 ? void 0 : quote.side_text);
    }
    createDiv("text", content, text);
    return quoteDiv;
}
