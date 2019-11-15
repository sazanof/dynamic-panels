if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
}
if (!Element.prototype.closest) {
    Element.prototype.closest = function(css) {
        var node = this;
        while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
        }
        return null;
    };
}
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}