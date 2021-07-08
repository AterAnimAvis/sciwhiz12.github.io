const DIV = "div";
const LINK = "a";
const SPAN = "span";
const IMG = "img";
function create(type, className, parent = null, content = null) {
    const element = document.createElement(type);
    if (className)
        element.className = className;
    if (content)
        element.innerHTML = content;
    parent === null || parent === void 0 ? void 0 : parent.appendChild(element);
    return element;
}
function createDiv(className, parent = null, content = null) {
    return create(DIV, className, parent, content);
}
function createLink(className, destination, parent = null, content = null) {
    const element = create(LINK, className, parent, content || destination);
    element.href = destination;
    return element;
}
function createSpan(className, parent = null, content = null) {
    return create(SPAN, className, parent, content);
}
function createImg(className, parent = null, src = null, alt = null) {
    const element = create(IMG, className, parent);
    if (src)
        element.src = src;
    if (alt)
        element.alt = alt;
    return element;
}
/**
 * Creates a Popup for a user
 */
function createPopup(user, roles, userdata) {
    // The main div for the popup
    const popupDiv = createDiv("popup");
    // The top part of the poppup, for the user's info (name, discriminator, etc)
    const popupHead = createDiv("popup_head", popupDiv);
    // Part of the popup head, the user's avatar
    createImg("popup_avatar", popupHead, userdata === null || userdata === void 0 ? void 0 : userdata.avatar, "avatar for " + user);
    // If there is a nickname, have that in bold otherwise use the username
    const name = (userdata === null || userdata === void 0 ? void 0 : userdata.nickname) || (userdata === null || userdata === void 0 ? void 0 : userdata.username);
    createDiv("popup_bold", popupHead, name);
    // And the discriminator as smaller text (with username if there's a nick)
    const discriminator = ((userdata === null || userdata === void 0 ? void 0 : userdata.nickname) ? userdata.username : "") + "#" + (userdata === null || userdata === void 0 ? void 0 : userdata.discriminator);
    const smaller = createSpan("popup_smaller", popupHead, discriminator);
    // An optional tag, attached to the name of the user (such as for bots)
    if (userdata === null || userdata === void 0 ? void 0 : userdata.tag)
        createSpan("tag", smaller, userdata.tag);
    // The rest of the popup (the body)
    const popupBody = createDiv("popup_body", popupDiv);
    // The roles of the user
    const roleHeader = createDiv("popup_body_header", popupBody, "No Roles");
    const userRoles = userdata === null || userdata === void 0 ? void 0 : userdata.roles;
    if (!userRoles || userRoles.length <= 0)
        return popupDiv;
    const rolesProperties = Object.getOwnPropertyNames(roles);
    userRoles.sort((a, b) => rolesProperties.indexOf(a) - rolesProperties.indexOf(b));
    roleHeader.innerText = userRoles.length === 1 ? "Role" : "Roles";
    // List out all the roles
    for (const roleName of userRoles) {
        const role = roles[roleName];
        // The surrounding div for the role
        const roleDiv = createDiv((role === null || role === void 0 ? void 0 : role.css) ? role.css : "role_default", popupBody);
        // The name of the role
        create("p", null, roleDiv, role.name);
    }
    return popupDiv;
}
/**
 * Parses the roles data, creates a stylesheet for each entry, and returns a 'map' of role name -> css class
 */
function parseRoles(roles) {
    const dynStyle = document.createElement("style");
    dynStyle.innerText = "";
    //TODO:
    for (const roleName in roles) {
        let save = false;
        const cssKey = "role_custom_" + roleName;
        let css = "." + cssKey + " {\n";
        const role = roles[roleName];
        if (role.hasOwnProperty("color")) {
            css += "color: " + role.color + ";\n";
            save = true;
        }
        css += "}\n";
        if (save) {
            dynStyle.innerText = css + dynStyle.innerText;
            roles[roleName].css = cssKey;
        }
    }
    document.body.appendChild(dynStyle);
    return roles;
}
function createName(user, userdata, roles, parent, popupParent) {
    const userSpan = createSpan(userdata ? null : "non_user", parent, (userdata === null || userdata === void 0 ? void 0 : userdata.nickname) || (userdata === null || userdata === void 0 ? void 0 : userdata.username) || user);
    const userRoles = userdata === null || userdata === void 0 ? void 0 : userdata.roles;
    if (userRoles && userRoles.length > 0) {
        userRoles.forEach(roleName => { var _a; if ((_a = roles[roleName]) === null || _a === void 0 ? void 0 : _a.css)
            userSpan.classList.add(roles[roleName].css); });
    }
    if (userdata === null || userdata === void 0 ? void 0 : userdata.tag)
        createSpan("tag", parent, userdata === null || userdata === void 0 ? void 0 : userdata.tag);
    if (userdata)
        popupParent.appendChild(createPopup(user, roles, userdata));
}
