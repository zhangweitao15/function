// common 公共的, 通用
// 行注释
/* 块注释, 多行注释 */

/**
 * qsa: querySelectorAll
 * 利用选择器获得页面中的所有元素
 */
function qsa( selector ) {
    return document.querySelectorAll( selector );
}

/**
 * qs: querySelector
 * 利用选择器获得页面中的第 0 个元素
 */
function qs( selector ) {
    return document.querySelector( selector );
}

/**
 * ce: createElement
 * 创建一个 DOM 对象
 */
function ce( tagName ) {
    return document.createElement( tagName );
}