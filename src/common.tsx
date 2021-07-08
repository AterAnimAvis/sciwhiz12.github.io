import React from "react";

interface PopupProperties {
    user: string,
    roles: RoleRegistry,
    userdata?: User|null
}

export class Popup extends React.Component<PopupProperties, {}> {
    render() {
        const user = this.props.user
        const roles = this.props.roles
        const userdata = this.props.userdata;

        return <div className="popup">
            <div className="popup_head">
                <img className="popup_avatar" src={userdata?.avatar} alt={"avatar for " + user}/>
                <div className="popup_bold">{userdata?.nickname || userdata?.username || user}</div>
                <span className="popup_smaller">
                { userdata ? (userdata?.nickname ? userdata.username : "") + "#" + userdata?.discriminator : ""}
                    { userdata?.tag ? <span className="tag"> {userdata.tag} </span> : "" }
            </span>
                <PopupBody user={user} roles={roles} userdata={userdata}/>
            </div>
        </div>
    }
}

class PopupBody extends React.Component<PopupProperties, {}> {
    render() {
        const roles = this.props.roles
        const userRoles = this.props.userdata?.roles;
        const header = (!userRoles || userRoles.length <= 0) ? "No Roles" : userRoles.length === 1 ? "Role" : "Roles"

        const rolesProperties = Object.getOwnPropertyNames(roles)
        userRoles?.sort((a, b) => rolesProperties.indexOf(a) - rolesProperties.indexOf(b))

        return <div className="popup_body">
            <div className="popup_body_header">
                {header}
                {userRoles?.map(role => createRoleBubble(roles, role)) || []}
            </div>
        </div>
    }
}

function createRoleBubble(roles: RoleRegistry, name: string) {
    const role = roles[name]
    return <div className={role?.css || "role_default"}>
        <p>role?.name</p>
    </div>
}

export function parseRoles(roles: RoleRegistry) : [String, RoleRegistry] {
    let style = ""

    //TODO:
    for (const roleName in roles) {
        if (!roles.hasOwnProperty(roleName)) continue

        let save = false;

        const cssKey = "role_custom_" + roleName;
        let css = "." + cssKey + " {\n";
        const role = roles[roleName];

        if (role.hasOwnProperty("color")) {
            css += "color: " + role.color + ";\n"
            save = true
        }
        css += "}\n"

        if (save) {
            style = css + style
            roles[roleName].css = cssKey
        }
    }

    return [style, roles]
}