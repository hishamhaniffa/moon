"use strict";

/* ======= Global Variables ======= */
let directives = {};
let specialDirectives = {};
let components = {};
let eventModifiersCode = {
  stop: 'event.stopPropagation();',
  prevent: 'event.preventDefault();',
  ctrl: 'if(!event.ctrlKey) {return;};',
  shift: 'if(!event.shiftKey) {return;};',
  alt: 'if(!event.altKey) {return;};',
  enter: 'if(event.keyCode !== 13) {return;};'
};

/* ======= Observer ======= */
//=require observer/methods.js
//=require observer/computed.js
//=require observer/observer.js

//=require util/util.js
//=require util/dom.js
//=require util/vdom.js

/* ======= Compiler ======= */
//=require compiler/template.js
//=require compiler/lexer.js
//=require compiler/parser.js
//=require compiler/generator.js
//=require compiler/compiler.js

function Moon(options) {
    /* ======= Initial Values ======= */

    // Options
    if(options === undefined) {
      options = {};
    }
    this.$options = options;

    // Reference to Instance
    const self = this;

    // Readable name (component name or "root")
    defineProperty(this, "$name", options.name, "root");

    // Custom Data
    const data = options.data;
    if(data === undefined) {
      this.$data = {};
    } else if(typeof data === "function") {
      this.$data = data();
    } else {
      this.$data = data;
    }

    // Render function
    defineProperty(this, "$render", options.render, noop);

    // Hooks
    defineProperty(this, "$hooks", options.hooks, {});

    // Custom Methods
    const methods = options.methods;
    if(methods !== undefined) {
      initMethods(self, methods);
    }

    // Events
    this.$events = {};

    // Virtual DOM
    this.$dom = {};

    // Observer
    this.$observer = new Observer(this);

    // Destroyed State
    this.$destroyed = true;

    // State of Queue
    this.$queued = false;

    // Setup Computed Properties
    const computed = options.computed;
    if(computed !== undefined) {
      initComputed(this, computed);
    }

    /* ======= Initialize 🎉 ======= */
    this.init();
}

//=require instance/methods.js

//=require global/api.js

//=require directives/default.js
