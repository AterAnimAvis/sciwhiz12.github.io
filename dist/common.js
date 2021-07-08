"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.parseRoles = exports.Popup = void 0;
var react_1 = __importDefault(require("react"));
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Popup.prototype.render = function () {
        var user = this.props.user;
        var roles = this.props.roles;
        var userdata = this.props.userdata;
        return react_1["default"].createElement("div", { className: "popup" },
            react_1["default"].createElement("div", { className: "popup_head" },
                react_1["default"].createElement("img", { className: "popup_avatar", src: userdata === null || userdata === void 0 ? void 0 : userdata.avatar, alt: "avatar for " + user }),
                react_1["default"].createElement("div", { className: "popup_bold" }, (userdata === null || userdata === void 0 ? void 0 : userdata.nickname) || (userdata === null || userdata === void 0 ? void 0 : userdata.username) || user),
                react_1["default"].createElement("span", { className: "popup_smaller" },
                    userdata ? ((userdata === null || userdata === void 0 ? void 0 : userdata.nickname) ? userdata.username : "") + "#" + (userdata === null || userdata === void 0 ? void 0 : userdata.discriminator) : "",
                    (userdata === null || userdata === void 0 ? void 0 : userdata.tag) ? react_1["default"].createElement("span", { className: "tag" },
                        " ",
                        userdata.tag,
                        " ") : ""),
                react_1["default"].createElement(PopupBody, { user: user, roles: roles, userdata: userdata })));
    };
    return Popup;
}(react_1["default"].Component));
exports.Popup = Popup;
var PopupBody = /** @class */ (function (_super) {
    __extends(PopupBody, _super);
    function PopupBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopupBody.prototype.render = function () {
        var _a;
        var roles = this.props.roles;
        var userRoles = (_a = this.props.userdata) === null || _a === void 0 ? void 0 : _a.roles;
        var header = (!userRoles || userRoles.length <= 0) ? "No Roles" : userRoles.length === 1 ? "Role" : "Roles";
        var rolesProperties = Object.getOwnPropertyNames(roles);
        userRoles === null || userRoles === void 0 ? void 0 : userRoles.sort(function (a, b) { return rolesProperties.indexOf(a) - rolesProperties.indexOf(b); });
        return react_1["default"].createElement("div", { className: "popup_body" },
            react_1["default"].createElement("div", { className: "popup_body_header" },
                header,
                (userRoles === null || userRoles === void 0 ? void 0 : userRoles.map(function (role) { return createRoleBubble(roles, role); })) || []));
    };
    return PopupBody;
}(react_1["default"].Component));
function createRoleBubble(roles, name) {
    var role = roles[name];
    return react_1["default"].createElement("div", { className: (role === null || role === void 0 ? void 0 : role.css) || "role_default" },
        react_1["default"].createElement("p", null, "role?.name"));
}
function parseRoles(roles) {
    var style = "";
    //TODO:
    for (var roleName in roles) {
        if (!roles.hasOwnProperty(roleName))
            continue;
        var save = false;
        var cssKey = "role_custom_" + roleName;
        var css = "." + cssKey + " {\n";
        var role = roles[roleName];
        if (role.hasOwnProperty("color")) {
            css += "color: " + role.color + ";\n";
            save = true;
        }
        css += "}\n";
        if (save) {
            style = css + style;
            roles[roleName].css = cssKey;
        }
    }
    return [style, roles];
}
exports.parseRoles = parseRoles;
