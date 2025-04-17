"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defines = require("./defines");
var ZIM = _interopRequireWildcard(require("zego-zim-react-native"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class ZIMKitPlugins {
  plugins = new Map();
  constructor() {}
  static getInstance() {
    return this._instance || (this._instance = new ZIMKitPlugins());
  }
  installPlugins(plugins = []) {
    plugins.forEach(plugin => {
      console.log('[ZIMKitPlugins]installPlugins plugin', plugin.default.getModuleName);
      if (plugin.default && typeof plugin.default.getModuleName === 'function') {
        const pluginName = plugin.default.getModuleName();
        switch (pluginName) {
          case _defines.ZegoPluginName.PrebuiltCall:
          case _defines.ZegoPluginName.PrebuiltLiveAudioRoom:
          case _defines.ZegoPluginName.PrebuiltLiveStreaming:
          case _defines.ZegoPluginName.PrebuiltVideoConference:
            this.plugins.set(pluginName, plugin);
            console.log('[ZIMKitPlugin]installPlugins pluginName', pluginName);
            break;
          default:
            break;
        }
      }
    });
  }
  // getZegoPrebuiltCallPlugin() {
  //     return this.plugins.get(ZegoPluginName.PrebuiltCall);
  // }
  // initPlugins(appInfo, userInfo, token) {
  //     if (this.getZegoPrebuiltCallPlugin()) {
  //         const ZegoUIKitPrebuiltCallService = this.getZegoPrebuiltCallPlugin().default;
  //         console.log('ZegoUIKitPrebuiltCallService', ZegoUIKitPrebuiltCallService.init);
  //         ZegoUIKitPrebuiltCallService.init(
  //             appInfo.appID,
  //             appInfo.appSign,
  //             userInfo.userID,
  //             userInfo.userName,
  //             [ZIM],
  //             {token}
  //         ).then(() => {
  //             console.log('initPlugins success!');
  //         });
  //     }
  // }
}
exports.default = ZIMKitPlugins;
//# sourceMappingURL=ZIMKitPlugins.js.map