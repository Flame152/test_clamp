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
    check_input_data();
    document.addEventListener("DOMContentLoaded", (function() {
        const copyButton = document.getElementById("result-btn");
        const copyTarget = document.getElementById("copy-target");
        copyButton.addEventListener("click", (async function() {
            try {
                const text = copyTarget.textContent;
                await navigator.clipboard.writeText(text);
                copyButton.textContent = "good";
                copyButton.classList.add("good-status");
                setTimeout((() => {
                    copyButton.classList.remove("good-status");
                }), 2e3);
            } catch (err) {
                console.error("Не удалось скопировать текст: ", err);
                copyButton.textContent = "error";
                copyButton.classList.add("error-status");
                setTimeout((() => {
                    copyButton.textContent = "copy";
                    copyButton.classList.remove("error-status");
                }), 2e3);
            }
        }));
    }));
    window["FLS"] = true;
    isWebp();
})();