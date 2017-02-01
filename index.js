'use strict';

if (process.env.NODE_ENV && /^dev/i.test(process.env.NODE_ENV)) {
    const md = require('module');
    const originalWrap = md.wrap,
        cRe = /^(\s*)(.*?)(\s*)$/gi,
        pRe = /^[\t\f\v]*(.*?\s*)\/\*(\s*->[\s\S]*?){1}\*\//gim;

    function escapeCode(code) {
        return code.replace(/(['\\])/g, '\\$1');
    }

    Object.freeze(md.wrap = function (script) {
        return originalWrap(script.replace(pRe, (all, line, comment) => {
            comment = comment.split('->').map(s => s.replace(cRe, (all, spaceBefore, group, spaceAfter) => {
                return group ? `${spaceBefore}try{console.warn('[${escapeCode(group)}]:',${group},'\\n'+new Error().stack.match(__stack_re__).join('\\n'))}catch(___){console.error(___)}${spaceAfter}` : all;
            })).join('');
            return `${line};{ const __stack_re__ = /^.*?\\(.*?[/\\\\].*?:\\d+:\\d+\\)$/gim; ${comment} }`;
        }));
    });
}