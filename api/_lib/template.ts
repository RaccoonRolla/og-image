import {readFileSync} from 'fs';
import {marked} from 'marked';
import {sanitizeHtml} from './sanitizer';
import {ParsedRequest} from './types';

const twemoji = require('twemoji');
const twOptions = {folder: 'svg', ext: '.svg'};
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/CircularStd-Book.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/CircularStd-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss() {
    let background = 'white';
    return `
    @font-face {
        font-family: 'Circular';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Circular';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        height: 628px;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: start;
        padding: 96px 106px 133px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: start;
        align-content: start;
        justify-content: start;
        justify-items: start;
        margin-bottom: 48px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .divider {
        background-color: #4B66FF;
        border-radius: 99px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 14px 32px;
        margin-bottom: 32px;
        font-family: 'Circular', sans-serif;
        font-style: normal;
        font-size: 32px;
        line-height: 35px;
        color: #FFFFFF;
    }
    
    .heading {
        font-family: 'Circular', sans-serif;
        font-size: 60px;
        font-style: normal;
        font-weight: bold;
        color: #1A1A1A;
        line-height: 66px;
        margin-bottom: 16px;
    }
    
    .description {
        font-family: 'Circular', sans-serif;
        font-size: 32px;
        font-style: normal;
        color: #1A1A1A;
        line-height: 40px;`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const {text, md, description} = parsedReq;
    console.log(parsedReq)
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=1200px, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    
    <body>        
        <div class="logo-wrapper">
            <img src="https://og-image-git-test-changes-raccoonrolla.vercel.app//atlas-logo.png" alt="Atlas logo" width={300} height={58}>
        </div>
        <div class="divider">Alignment</div>
        <div class="heading">${emojify(md ? marked(text) : sanitizeHtml(text))}</div>
        <div class="description">${description}</div>
    </body>
</html>`;
}
