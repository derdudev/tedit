function randstr(prefix) {
    if (prefix)
        return Math.random().toString(36).replace('0.', prefix || '');
    return Math.random().toString(36).replace('0.', "ted_" || '');
}
export { randstr };
//# sourceMappingURL=random.js.map