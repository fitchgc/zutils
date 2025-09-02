var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/common/ZError.ts
var ZError_exports = {};
__export(ZError_exports, {
  ZError: () => ZError
});
module.exports = __toCommonJS(ZError_exports);
var _ZError = class _ZError {
  constructor(statusCode, message) {
    __publicField(this, "code");
    __publicField(this, "statusCode");
    __publicField(this, "message");
    __publicField(this, "name");
    this.statusCode = statusCode;
    this.message = message;
  }
};
__name(_ZError, "ZError");
var ZError = _ZError;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ZError
});
//# sourceMappingURL=ZError.cjs.map