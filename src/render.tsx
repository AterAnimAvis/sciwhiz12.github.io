import * as fs from "fs";
import prettier from "prettier";
import ReactDOMServer from "react-dom/server"
import {ReactElement} from "react";
import React from "react";
import { Popup } from "./common"
import {QuoteCount} from "./count";

const render = (destination: string, element: ReactElement) => {
    let html = "<!DOCTYPE html>" + ReactDOMServer.renderToStaticMarkup(element)
    let pretty = prettier.format(html, { parser: "html" })

    fs.writeFileSync(destination, pretty);
    console.log(`Wrote ${destination}`)
}

render("./quote.html", HelloWorldPage())
render("./quotes/count.html", CountPage())

function HelloWorldPage() {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <title>Hello world</title>
        </head>
        <body>
            <h1>Hello world</h1>
            <Popup user="test" roles={{}}/>
        </body>
        </html>
    );
}

function CountPage() {
    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta charSet="UTF-8"/>
            <link rel="stylesheet" href="style.css"/>
            <link rel="stylesheet" href="user-popups.css"/>
            <link rel="icon" type="image/x-icon" href="/assets/icon/favicon.ico"/>
            <title>Quotes Count</title>
        </head>

        <body>
        <div className="header">
            <a href="/"><img src="/assets/icon/home.svg" className="home" title="Homepage"/></a>
            <h2>Quotes on <img className="server_icon"
                               src="https://cdn.discordapp.com/icons/313125603924639766/42fdc634eac27c976bed5563c22a2056.webp"
                               alt="server icon"/><span className="server_title"> The Forge Project</span></h2>
        </div>

        <div className="error" id="loading_error" style={{"display": "none"}}>
            <div className="error_popup">
                Error loading quotes! <br/> Please try again.
            </div>
        </div>

        <QuoteCount />

        <div className="footer">
            This page is not affiliated with Discord nor with The Forge Project. <br/> It is authored by <span className="white">sciwhiz12#1286</span>, the quote historian of The Forge Project's Discord.<br/> This page is manually updated by the author.
        </div>
        </body>

        </html>
    )
}