// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

  // var keywords = words("caso então entao senao senão para de ate até passo se senãose senaose "+
  //                      "escolha enquanto fim faça faca gere " +
  //                      "use var tipo mod div e ou não nao formato ");


CodeMirror.defineMode("potigol3", function(){
  // The start state contains the rules that are intially used
  start: [
    // The regex matches the token, the token property contains the type
    {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
    // You can match multiple tokens at once. Note that the captured
    // groups must span the whole string in this case
    {regex: /(function)(\s+)([a-z$][\w$]*)/,
     token: ["keyword", null, "variable-2"]},
    // Rules are matched in the order in which they appear, so there is
    // no ambiguity between this one and the one above
    {regex: /(?:caso|senão|senao|se|até|while|else|do|this)\b/,
     token: "keyword"},
    {regex: /true|false|null|undefined/, token: "atom"},
    {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
     token: "number"},
    {regex: /\/\/.*/, token: "comment"},
    {regex: /\/(?:[^\\]|\\.)*?\//, token: "variable-3"},
    // A next property will cause the mode to move to a different state
    {regex: /\/\*/, token: "comment", next: "comment"},
    {regex: /[-+\/*=<>!]+/, token: "operator"},
    // indent and dedent properties guide autoindentation
    {regex: /[\{\[\(]/, indent: true},
    {regex: /[\}\]\)]/, dedent: true},
    {regex: /[a-z$][\w$]*/, token: "variable"},
    // You can embed other modes with the mode property. This rule
    // causes all code between << and >> to be highlighted with the XML
    // mode.
    {regex: /<</, token: "meta", mode: {spec: "xml", end: />>/}}
  ]
});

CodeMirror.defineMIME("text/x-potigol3", "potigol3");

});
