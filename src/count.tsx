import * as fs from "fs";
import React from "react";
import {parseRoles} from "./common";

export function QuoteCount() {
    const data : Quotes = JSON.parse(fs.readFileSync("./quotes/data.json").toString())

    const [style, roles] = parseRoles(data.roles);
    const counts = calculateCounts(data.quotes);
    let result : JSX.Element[] = []

    for (const entry of counts) {
        result.push(addRow(data, roles, entry[0], entry[1]))
    }

    return <table id="counts">
        <tr className="table_header">
            <th>Quotee (@)</th>
            <th>Number of Quotes (#)</th>
        </tr>
        { result }
    </table>
}

function addRow(data : Quotes, roles : RoleRegistry, user : string, count : number) {
    const userdata = data.users[user];

    // createName(user, userdata, roles, username, username)
    return <tr key={user}>
        <td className="collapse" tabIndex={1}>

        </td>
        <td className="count">
            {count}
        </td>
    </tr>
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