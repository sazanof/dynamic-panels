'use strict';
function DynamicPanels(options){
    this.id = null;
    this.name_key = null;
    this.el = null;
    this.classes = {
        inner :'.dynamic',
        header : '.dynamic-header',
        title : '.dynamic-title',
        actions : '.dynamic-actions'
    };
    this.plus = null;
    this.minus = null;
    this.mergeOptions = function (options,real) {
        for (var key in options){
            console.log(options[key])
            if(real[key] !== undefined){
                if (typeof options[key] === 'object'){
                    this.mergeOptions(options[key],this[key])
                }
                else {
                    real[key] = options[key]
                }
            }
        }
    };
    this.init = function(){
        if(options){
            this.mergeOptions(options,this);
        }
        return this.render()
    };
    this.render = function () {
        this.el = document.getElementById(this.id);
        if (!this.el) return false;
        this.plus = this.classes.actions + ' *[data-plus]';
        this.minus = this.classes.actions + ' *[data-minus]';
        this.registerEvents();
    };
    this.registerEvents = function () {
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
    }
    this.countPanels = function (length) {
        return length ? this.el.querySelectorAll(this.classes.inner).length : this.el.querySelectorAll(this.classes.inner);
    };
    this.addPanel =function (key) {
        var childs = this.countPanels();
        var inner = childs[key - 1].cloneNode(true);
        this.clearInner(inner);
        childs[key - 1].insertAdjacentElement('afterend',inner);
        this.updateData();
    };
    this.deletePanel = function (el) {
        el.remove();
        this.updateData(true);
    };
    this.updateData = function (AD) {
        var childs = this.countPanels();
        var self = this;
        childs.forEach(function (el,i) {
            var elms = el.querySelectorAll('input,select,textarea');
            el.querySelector(self.classes.header + ' span').innerText = (i + 1);
            el.dataset.pos = (i + 1);
            elms.forEach(function (ist) {
                if (AD){
                    console.log(el.dataset.pos,i,ist.name);
                    ist.name = ist.name.replace('['+ (parseInt(el.dataset.pos) + 1) +']','[' + el.dataset.pos + ']');
                }
                else{
                    ist.name = ist.name.replace('['+ i +']','[' + el.dataset.pos  + ']');
                }
            });
        });

    };
    this.clearInner = function (inner) {
        var elms = inner.querySelectorAll('input,select,textarea');
        var self = this;
        elms.forEach(function (el,i) {
            switch (el.nodeName) {
                case 'INPUT' :
                    switch (el.type) {
                        case 'text' :
                        case 'file' :
                            el.value = '';
                            break;
                        case 'checkbox' :
                        case 'radio' :
                            el.checked = false;
                            break
                    }
                    break;
                case 'TEXTAREA' :
                    el.value = '';
                    el.innerHTML = '';
                    break;
                case 'SELECT' :
                    el.selected = false;
            }
        })
    };
    return this;
};