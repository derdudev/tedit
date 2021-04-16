// source: https://stackoverflow.com/a/59837035/15545643

function randstr(prefix?: string)
{
    if(prefix) return Math.random().toString(36).replace('0.',prefix || '');
    return Math.random().toString(36).replace('0.',"ted_" || '');
}

export {randstr};