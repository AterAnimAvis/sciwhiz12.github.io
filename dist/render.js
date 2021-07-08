"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs = __importStar(require("fs"));
var prettier_1 = __importDefault(require("prettier"));
var server_1 = __importDefault(require("react-dom/server"));
var react_1 = __importDefault(require("react"));
var common_1 = require("./common");
var count_1 = require("./count");
var render = function (destination, element) {
    var html = "<!DOCTYPE html>" + server_1["default"].renderToStaticMarkup(element);
    var pretty = prettier_1["default"].format(html, { parser: "html" });
    fs.writeFileSync(destination, pretty);
    console.log("Wrote " + destination);
};
render("./quote.html", HelloWorldPage());
render("./quotes/count.html", CountPage());
function HelloWorldPage() {
    return (react_1["default"].createElement("html", { lang: "en" },
        react_1["default"].createElement("head", null,
            react_1["default"].createElement("meta", { charSet: "utf-8" }),
            react_1["default"].createElement("title", null, "Hello world")),
        react_1["default"].createElement("body", null,
            react_1["default"].createElement("h1", null, "Hello world"),
            react_1["default"].createElement(common_1.Popup, { user: "test", roles: {} }))));
}
function CountPage() {
    return (react_1["default"].createElement("html", { lang: "en" },
        react_1["default"].createElement("head", null,
            react_1["default"].createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
            react_1["default"].createElement("meta", { charSet: "UTF-8" }),
            react_1["default"].createElement("link", { rel: "stylesheet", href: "style.css" }),
            react_1["default"].createElement("link", { rel: "stylesheet", href: "user-popups.css" }),
            react_1["default"].createElement("link", { rel: "icon", type: "image/x-icon", href: "/assets/icon/favicon.ico" }),
            react_1["default"].createElement("title", null, "Quotes Count")),
        react_1["default"].createElement("body", null,
            react_1["default"].createElement("div", { className: "header" },
                react_1["default"].createElement("a", { href: "/" },
                    react_1["default"].createElement("img", { src: "/assets/icon/home.svg", className: "home", title: "Homepage" })),
                react_1["default"].createElement("h2", null,
                    "Quotes on ",
                    react_1["default"].createElement("img", { className: "server_icon", src: "https://cdn.discordapp.com/icons/313125603924639766/42fdc634eac27c976bed5563c22a2056.webp", alt: "server icon" }),
                    react_1["default"].createElement("span", { className: "server_title" }, " The Forge Project"))),
            react_1["default"].createElement("div", { className: "error", id: "loading_error", style: { "display": "none" } },
                react_1["default"].createElement("div", { className: "error_popup" },
                    "Error loading quotes! ",
                    react_1["default"].createElement("br", null),
                    " Please try again.")),
            react_1["default"].createElement(count_1.QuoteCount, null),
            react_1["default"].createElement("div", { className: "footer" },
                "This page is not affiliated with Discord nor with The Forge Project. ",
                react_1["default"].createElement("br", null),
                " It is authored by ",
                react_1["default"].createElement("span", { className: "white" }, "sciwhiz12#1286"),
                ", the quote historian of The Forge Project's Discord.",
                react_1["default"].createElement("br", null),
                " This page is manually updated by the author."))));
}
