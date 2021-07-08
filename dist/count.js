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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.QuoteCount = void 0;
var fs = __importStar(require("fs"));
var react_1 = __importDefault(require("react"));
var common_1 = require("./common");
function QuoteCount() {
    var e_1, _a;
    var data = JSON.parse(fs.readFileSync("./quotes/data.json").toString());
    var _b = __read(common_1.parseRoles(data.roles), 2), style = _b[0], roles = _b[1];
    var counts = calculateCounts(data.quotes);
    var result = [];
    try {
        for (var counts_1 = __values(counts), counts_1_1 = counts_1.next(); !counts_1_1.done; counts_1_1 = counts_1.next()) {
            var entry = counts_1_1.value;
            result.push(addRow(data, roles, entry[0], entry[1]));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (counts_1_1 && !counts_1_1.done && (_a = counts_1["return"])) _a.call(counts_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return react_1["default"].createElement("table", { id: "counts" },
        react_1["default"].createElement("tr", { className: "table_header" },
            react_1["default"].createElement("th", null, "Quotee (@)"),
            react_1["default"].createElement("th", null, "Number of Quotes (#)")),
        result);
}
exports.QuoteCount = QuoteCount;
function addRow(data, roles, user, count) {
    var userdata = data.users[user];
    // createName(user, userdata, roles, username, username)
    return react_1["default"].createElement("tr", { key: user },
        react_1["default"].createElement("td", { className: "collapse", tabIndex: 1 }),
        react_1["default"].createElement("td", { className: "count" }, count));
}
function sorted(map, comparator) {
    return new Map(__spreadArray([], __read(map.entries())).sort(comparator));
}
/**
 * Generates a Username to Number of Quotes Map from an array of Quotes
 */
function calculateCounts(quotes) {
    var quoteCount = quotes
        .filter(function (it) { return it; })
        .map(function (it) { return it.user; })
        .reduce(function (counts, user) { return counts.set(user, (counts.get(user) || 0) + 1); }, new Map());
    return sorted(quoteCount, function (a, b) { return b[1] - a[1]; });
}
