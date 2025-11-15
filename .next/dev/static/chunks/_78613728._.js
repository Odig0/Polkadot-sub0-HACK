(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/wallet-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletProvider",
    ()=>WalletProvider,
    "useWallet",
    ()=>useWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$polkadot$2b$extension$2d$dapp$40$0$2e$_dc86f7e3913e20007a0f2734386a0a3b$2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@polkadot+extension-dapp@0._dc86f7e3913e20007a0f2734386a0a3b/node_modules/@polkadot/extension-dapp/bundle.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const WalletContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function WalletProvider({ children }) {
    _s();
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [account, setAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [accounts, setAccounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Intentar conectar automáticamente al montar
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WalletProvider.useEffect": ()=>{
            const autoConnect = {
                "WalletProvider.useEffect.autoConnect": async ()=>{
                    try {
                        const extensions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$polkadot$2b$extension$2d$dapp$40$0$2e$_dc86f7e3913e20007a0f2734386a0a3b$2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["web3Enable"])('ArtBid-Polkadot');
                        if (extensions.length === 0) {
                            console.log('No Polkadot extension found');
                            return;
                        }
                        const allAccounts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$polkadot$2b$extension$2d$dapp$40$0$2e$_dc86f7e3913e20007a0f2734386a0a3b$2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["web3Accounts"])();
                        if (allAccounts.length > 0) {
                            const formattedAccounts = allAccounts.map({
                                "WalletProvider.useEffect.autoConnect.formattedAccounts": (acc)=>({
                                        address: acc.address,
                                        name: acc.meta.name || 'Unknown',
                                        type: acc.type || 'unknown'
                                    })
                            }["WalletProvider.useEffect.autoConnect.formattedAccounts"]);
                            setAccounts(formattedAccounts);
                            setAccount(formattedAccounts[0]);
                            setIsConnected(true);
                            console.log('Auto-connected to Polkadot wallet');
                        }
                    } catch (err) {
                        console.error('Auto-connect failed:', err);
                    }
                }
            }["WalletProvider.useEffect.autoConnect"];
            autoConnect();
        }
    }["WalletProvider.useEffect"], []);
    const connect = async ()=>{
        try {
            setIsLoading(true);
            setError(null);
            const extensions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$polkadot$2b$extension$2d$dapp$40$0$2e$_dc86f7e3913e20007a0f2734386a0a3b$2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["web3Enable"])('ArtBid-Polkadot');
            if (extensions.length === 0) {
                throw new Error('Polkadot extension no encontrada. Por favor instala Polkadot.js');
            }
            const allAccounts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$polkadot$2b$extension$2d$dapp$40$0$2e$_dc86f7e3913e20007a0f2734386a0a3b$2f$node_modules$2f40$polkadot$2f$extension$2d$dapp$2f$bundle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["web3Accounts"])();
            if (allAccounts.length === 0) {
                throw new Error('No hay cuentas disponibles en la extensión de Polkadot');
            }
            const formattedAccounts = allAccounts.map((acc)=>({
                    address: acc.address,
                    name: acc.meta.name || 'Unknown',
                    type: acc.type || 'unknown'
                }));
            setAccounts(formattedAccounts);
            setAccount(formattedAccounts[0]);
            setIsConnected(true);
            console.log('Conectado a wallet:', formattedAccounts[0]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Connection error:', err);
        } finally{
            setIsLoading(false);
        }
    };
    const disconnect = ()=>{
        setIsConnected(false);
        setAccount(null);
        setAccounts([]);
        setError(null);
        console.log('Desconectado de wallet');
    };
    const switchAccount = (address)=>{
        const selected = accounts.find((acc)=>acc.address === address);
        if (selected) {
            setAccount(selected);
            console.log('Cuenta cambiada a:', selected);
        }
    };
    const value = {
        isConnected,
        account,
        accounts,
        isLoading,
        error,
        connect,
        disconnect,
        switchAccount
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WalletContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/wallet-context.tsx",
        lineNumber: 127,
        columnNumber: 10
    }, this);
}
_s(WalletProvider, "6ma/kqLM1Jdsaf1Rs6rdhw9UrOk=");
_c = WalletProvider;
function useWallet() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
}
_s1(useWallet, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "WalletProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$4$2e$6_react$2d$dom_c91534e86f74096d969606227a1c49a3$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-themes@0.4.6_react-dom_c91534e86f74096d969606227a1c49a3/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
'use client';
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$4$2e$6_react$2d$dom_c91534e86f74096d969606227a1c49a3$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_78613728._.js.map