'use strict';

export function select(selector, parent = document){
    return parent.querySelector(selector);
}

export function selectAll(selector, parent = document){
    return [...parent.querySelectorAll(selector)];
}

export function print(arg){
    console.log(arg);
}
