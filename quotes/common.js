/**
 * Creates a Popup for a user
 * @param user : string
 * @param roles : RoleRegistry
 * @param userdata : User|null
 * @returns {HTMLElement}
 */
function createPopup(user, roles, userdata) {
    // The main div for the popup
    const popupDiv = document.createElement("div")
    popupDiv.className = "popup"

    // The top part of the poppup, for the user's info (name, discriminator, etc)
    const popupHead = popupDiv.appendChild(document.createElement("div"))
    popupHead.className = "popup_head"

    // Part of the popup head, the user's avatar
    const avatar = popupHead.appendChild(document.createElement("img"))
    avatar.className = "popup_avatar"
    avatar.src = userdata?.avatar
    avatar.alt = "avatar for " + user

    // An optional tag, attached to the name of the user (such as for bots)
    let tagSpan = null;
    if (userdata?.tag) {
        tagSpan = document.createElement("span")
        tagSpan.className = "tag"
        tagSpan.innerHTML = userdata.tag
    }

    const discriminator = "#" + userdata.discriminator
    if (userdata?.nickname) {
        // If there is a nickname, have that in bold
        const bold = popupHead.appendChild(document.createElement("div"))
        bold.className = "popup_bold"
        bold.innerHTML = userdata.nickname

        // And the discriminator as smaller text
        const smaller = popupHead.appendChild(document.createElement("span"))
        smaller.className = "popup_smaller"
        smaller.innerHTML = userdata.username + discriminator

        // Append the tag to the userinfo, if any
        if (tagSpan) {
            smaller.appendChild(tagSpan)
        }
    } else {
        // Make a container div for the userinfo
        const div = popupHead.appendChild(document.createElement("div"))

        // Have the username in bold
        const bold = div.appendChild(document.createElement("span"))
        bold.className = "popup_bold"
        bold.innerHTML = userdata.username

        // And the discriminator as regular text
        div.appendChild(document.createTextNode(discriminator))

        // Append the tag to the userinfo, if any
        if (tagSpan) {
            div.appendChild(tagSpan)
        }
    }

    // The rest of the popup (the body)
    const popupBody = popupDiv.appendChild(document.createElement("div"))
    popupBody.className = "popup_body"

    // The roles of the user
    const roleHeader = popupBody.appendChild(document.createElement("div"))
    roleHeader.className = "popup_body_header"
    const userRoles = userdata?.roles;

    if (userRoles && userRoles.length > 0) {
        const rolesProperties = Object.getOwnPropertyNames(roles)
        userRoles.sort(function(a, b) {
            return rolesProperties.indexOf(a) - rolesProperties.indexOf(b);
        })

        roleHeader.innerText = userRoles.length === 1 ? "Role" : "Roles"

        // List out all the roles
        for (const roleName of userRoles) {
            const role = roles[roleName]

            // The surrounding div for the role
            const roleDiv = popupBody.appendChild(document.createElement("div"))
            roleDiv.className = role?.css ? role.css : "role_default"

            // The name of the role
            const roleP = roleDiv.appendChild(document.createElement("p"))
            roleP.innerText = role.name
        }
    } else {
        roleHeader.innerText = "No Roles"
    }

    return popupDiv
}

/**
 *
 * @param parent : Node
 * @param userdata : User
 * @param roles : RoleRegistry
 * @param user : string
 * @return HTMLElement
 */
function createQuotee(parent, userdata, roles, user) {
    const userSpan = parent.appendChild(document.createElement("span"))
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
            const tagSpan = parent.appendChild(document.createElement("span"))
            tagSpan.className = "tag"
            tagSpan.innerHTML = userdata.tag
        }
    } else {
        userSpan.className = "non_user"
    }

    return userSpan
}

/**
 * Parses the roles data, creates a stylesheet for each entry, and returns a 'map' of role name -> css class
 * @param roles : RoleRegistry
 * @return RoleRegistry
 */
function parseRoles(roles) {
    let style = ""

    for (const roleName in roles) {
        if (!roles.hasOwnProperty(roleName)) continue

        const role = roles[roleName];
        if (!role.hasOwnProperty("color")) continue

        const cssKey = "role_custom_" + roleName;

        let css = ""
        css += "." + cssKey + " {\n";
        css += "color: " + role.color + ";\n"
        css += "}\n"

        style = css + style

        roles[roleName].css = cssKey
    }

    const dynStyle = document.body.appendChild(document.createElement("style"));
    dynStyle.innerText = style
    return roles
}

/**
 * @param callback : {function(Quotes):any}
 */
function withQuoteData(callback) {
    fetch("data.json")
        .then(req => req.json())
        .then(/** @param data : Quotes */ data => callback(data))
        .catch(err => {
            console.error("Error while loading: " + err)
            document.getElementById("loading_error").style.display = ""
        })
}