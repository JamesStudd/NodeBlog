function toLink (raw) {
    return raw.replace(/[^a-zA-Z0-9]/g, "");
}

module.exports.toLink = toLink;