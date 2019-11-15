'use strict';
(function() {
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
})();
var DynamicPanels = {
    id: null,
    el: null,
    classes: {
        inner: '.dynamic',
        header: '.dynamic-header',
        title: '.dynamic-title',
        actions: '.dynamic-actions'
    },
    plus:null,
    minus:null,
    data: null,
    name_key:null,
    init: function(id,name){
        return Object.create(this).render(id,name)
    },
    render: function (id,name) {
        this.id = id;
        this.el = document.getElementById(id);
        this.plus = this.classes.actions + ' *[data-plus]';
        this.minus = this.classes.actions + ' *[data-minus]';
        this.name_key = name;
        this.registerEvents();
    },
    registerEvents: function () {
        var self = this;
        this.el.addEventListener('click',function (e) {
            var tar = e.target;
            if (tar.closest(self.plus)){
                e.preventDefault();
                self.addPanel(tar.closest(self.classes.inner).dataset.pos);

            }
            else if (tar.closest(self.minus)){
                if (self.countPanels(true) > 1){
                    self.deletePanel(tar.closest(self.classes.inner))
                }
                else {
                    console.warn('You cant delete all elements!')
                }
            }
        })
    },
    countPanels: function (length) {
        return length ? this.el.querySelectorAll(this.classes.inner).length : this.el.querySelectorAll(this.classes.inner);
    },
    addPanel:function (key) {
        var childs = this.countPanels();
        var inner = childs[key - 1].cloneNode(true);
        this.clearInner(inner);
        childs[key - 1].insertAdjacentElement('afterend',inner);
        this.updateData();
    },
    deletePanel: function (el) {
        el.remove();
        this.updateData();
    },
    recountPanels: function () {

    },
    updateData: function () {
        var childs = this.countPanels();
        var self = this;
        childs.forEach(function (el,i) {
            var elms = el.querySelectorAll('input,select,textarea');
            el.querySelector(self.classes.header + ' span').innerText = (i + 1);
            el.dataset.pos = (i + 1);
            elms.forEach(function (ist) {
                ist.name = ist.name.replace('[' + i + ']','[' + el.dataset.pos + ']');
            });
        });

    },
    clearInner: function (inner) {
        var elms = inner.querySelectorAll('input,select,textarea');
        var self = this;
        elms.forEach(function (el,i) {
            switch (el.nodeName) {
                case 'INPUT':
                    switch (el.type) {
                        case 'text':
                        case 'file':
                            el.value = '';
                            break;
                        case 'checkbox':
                        case 'radio':
                            el.checked = false;
                            break
                    }
                    break;
                case 'TEXTAREA':
                    el.value = '';
                    el.innerHTML = '';
                    break;
                case 'SELECT':
                    el.selected = false;
            }
        })
    }

};