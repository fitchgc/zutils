var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/utils/curry.util.ts
function curry(func) {
  return /* @__PURE__ */ __name(function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  }, "curried");
}
__name(curry, "curry");
export {
  curry
};
//# sourceMappingURL=curry.util.js.map