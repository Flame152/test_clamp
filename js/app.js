(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.getElementById("year").textContent = (new Date).getFullYear();
    const inputMinView = document.getElementById("min-width");
    const inputMaxView = document.getElementById("max-width");
    const inputMinSize = document.getElementById("min-size");
    const inputMaxSize = document.getElementById("max-size");
    const _select_min_view = document.querySelector(".unit__px");
    const _select_max_view = document.querySelector(".unit__px");
    const _select_min_font = document.querySelector(".unit__px");
    const _select_max_font = document.querySelector(".unit__px");
    const copyButton = document.querySelector(".result__btn");
    let _unit = 16;
    const baseSize = document.getElementById("base-size");
    const initBaseSize = () => {
        baseSize.addEventListener("change", (function() {
            _unit = baseSize.value;
            check_input_data();
        }));
    };
    initBaseSize();
    const check_input_data = () => {
        const minView = _select_min_view.value === "px" ? inputMinView.value / _unit : inputMinView.value / _unit;
        const maxView = _select_max_view.value === "px" ? inputMaxView.value / _unit : inputMaxView.value / _unit;
        const minFont = _select_min_font.value === "px" ? inputMinSize.value / _unit : inputMinSize.value / _unit;
        const maxFont = _select_max_font.value === "px" ? inputMaxSize.value / _unit : inputMaxSize.value / _unit;
        clamp_calc(Number(maxFont), Number(minFont), Number(maxView), Number(minView));
        copy_button_reset();
    };
    const clamp_calc = (maxFont, minFont, maxView, minView) => {
        const slope = (maxFont - minFont) / (maxView - minView);
        const yAxisIntersection = -minView * slope + minFont;
        const _yAxisStr = yAxisIntersection.toFixed(2);
        const _slopeStr = (slope * 100).toFixed(2);
        const result = `clamp(${minFont}rem, ${_yAxisStr}rem + ${_slopeStr}vw, ${maxFont}rem)`;
        const _result_pre = document.querySelector(".result pre");
        _result_pre.innerText = result;
    };
    inputMinView.addEventListener("change", (function() {
        check_input_data();
    }));
    inputMaxView.addEventListener("change", (function() {
        check_input_data();
    }));
    inputMinSize.addEventListener("change", (function() {
        check_input_data();
    }));
    inputMaxSize.addEventListener("change", (function() {
        check_input_data();
    }));
    copyButton.addEventListener("click", (() => {
        const data = document.getElementById("rtar").innerText;
        copy_to_clipboard(data);
    }));
    const copy_to_clipboard = val => {
        if (navigator.clipboard) {
            let txt = val;
            navigator.clipboard.writeText(txt).then((function() {
                copy_button_active();
            }));
        } else console.log("ERROR");
    };
    const copy_button_active = () => {
        copyButton.querySelector("span.normal").classList.remove("on");
        copyButton.querySelector("span.active").classList.add("on");
    };
    const copy_button_reset = () => {
        copyButton.querySelector("span.normal").classList.add("on");
        copyButton.querySelector("span.active").classList.remove("on");
    };
    check_input_data();
    window["FLS"] = true;
    isWebp();
})();