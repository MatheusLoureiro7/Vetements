
import {ReflexEvent,applyEventActions,isNotNullOrUndefined,isTrue} from "$/utils/state"
import {Box as RadixThemesBox,Button as RadixThemesButton,Flex as RadixThemesFlex,IconButton as RadixThemesIconButton,Link as RadixThemesLink,Table as RadixThemesTable,Text as RadixThemesText,TextField as RadixThemesTextField} from "@radix-ui/themes"
import {StateContexts,addEvents} from "$/utils/context"
import {Fragment,memo,useCallback,useContext,useEffect} from "react"
import {jsx} from "@emotion/react"
import {Link as ReactRouterLink} from "react-router"
import LucideLayoutDashboard from "lucide-react/dist/esm/icons/layout-dashboard.mjs"
import LucideShirt from "lucide-react/dist/esm/icons/shirt.mjs"
import LucidePackage from "lucide-react/dist/esm/icons/package.mjs"
import LucideReceipt from "lucide-react/dist/esm/icons/receipt.mjs"
import LucideUsers from "lucide-react/dist/esm/icons/users.mjs"
import DebounceInput from "react-debounce-input"








export const Box_box_abc55a20e129793b59234eb0338273c7_23db2c7c = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesBox,{css:({ ["backgroundColor"] : "rgba(26, 24, 21, 0.35)", ["position"] : "fixed", ["top"] : "0", ["left"] : "0", ["width"] : "100vw", ["height"] : "100vh", ["zIndex"] : "40" }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},)
    )
});
Box_box_abc55a20e129793b59234eb0338273c7_23db2c7c.displayName = "Box";

export const Cond_comp_65443c3810dd2cf69e9797fa5a363cec_23db2c7c = memo(({children}) => {
    const reflex___state____state__vetements___components___shell____shell_state = useContext(StateContexts.reflex___state____state__vetements___components___shell____shell_state)



    return(
        (reflex___state____state__vetements___components___shell____shell_state.sidebar_open_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_65443c3810dd2cf69e9797fa5a363cec_23db2c7c.displayName = "Cond";

export const Link_link_338c2ac82a34c3fffd67b5c98779bdcf_23db2c7c = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideLayoutDashboard,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Dashboard"))))
    )
});
Link_link_338c2ac82a34c3fffd67b5c98779bdcf_23db2c7c.displayName = "Link";

export const Link_link_b156310230aba91de101b6b7128c1e0b_23db2c7c = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideLayoutDashboard,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Dashboard"))))
    )
});
Link_link_b156310230aba91de101b6b7128c1e0b_23db2c7c.displayName = "Link";

export const Cond_comp_502fc95db9f80f5e608b732915450d96_23db2c7c = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_502fc95db9f80f5e608b732915450d96_23db2c7c.displayName = "Cond";

export const Link_link_08f9a7cd5d13cf33adeb5bf8baff9d10_23db2c7c = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/produtos"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideShirt,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Produtos"))))
    )
});
Link_link_08f9a7cd5d13cf33adeb5bf8baff9d10_23db2c7c.displayName = "Link";

export const Link_link_1f4b90b28726d6880b0307dc1b046772_23db2c7c = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/produtos"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideShirt,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Produtos"))))
    )
});
Link_link_1f4b90b28726d6880b0307dc1b046772_23db2c7c.displayName = "Link";

export const Cond_comp_aa5f52b7850e5cb4acf689339da8edc7_23db2c7c = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/produtos"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_aa5f52b7850e5cb4acf689339da8edc7_23db2c7c.displayName = "Cond";

export const Link_link_9cf2c9c05db4cfc5e41a1a8252cf3408_23db2c7c = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/estoque"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucidePackage,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Estoque"))))
    )
});
Link_link_9cf2c9c05db4cfc5e41a1a8252cf3408_23db2c7c.displayName = "Link";

export const Link_link_3e9e5b146f207edcf0c3ccecc1223104_23db2c7c = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/estoque"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucidePackage,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Estoque"))))
    )
});
Link_link_3e9e5b146f207edcf0c3ccecc1223104_23db2c7c.displayName = "Link";

export const Cond_comp_0a7267143915d363dd000d321d1295d3_23db2c7c = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/estoque"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_0a7267143915d363dd000d321d1295d3_23db2c7c.displayName = "Cond";

export const Link_link_eb582514259b684cca4bc50110fb7f86_23db2c7c = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/vendas"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideReceipt,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Vendas"))))
    )
});
Link_link_eb582514259b684cca4bc50110fb7f86_23db2c7c.displayName = "Link";

export const Link_link_e5c702088abc08907e6edc8ddd4b7541_23db2c7c = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/vendas"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideReceipt,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Vendas"))))
    )
});
Link_link_e5c702088abc08907e6edc8ddd4b7541_23db2c7c.displayName = "Link";

export const Cond_comp_1fd33976a0f4be8d5d63583b370cbfb0_23db2c7c = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/vendas"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_1fd33976a0f4be8d5d63583b370cbfb0_23db2c7c.displayName = "Cond";

export const Link_link_6c0cecf820744f3f44b4fd09076527da_23db2c7c = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/clientes"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideUsers,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Clientes"))))
    )
});
Link_link_6c0cecf820744f3f44b4fd09076527da_23db2c7c.displayName = "Link";

export const Link_link_55653036e2064afed720ca52a0c4fd38_23db2c7c = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/clientes"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideUsers,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Clientes"))))
    )
});
Link_link_55653036e2064afed720ca52a0c4fd38_23db2c7c.displayName = "Link";

export const Cond_comp_2b864549a4a68b24559c291f20b585b5_23db2c7c = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/clientes"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_2b864549a4a68b24559c291f20b585b5_23db2c7c.displayName = "Cond";

export const Bare_comp_c3a580bedf1415a3b5e60e5eda6397bc_23db2c7c = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state.iniciais_rx_state_
    )
});
Bare_comp_c3a580bedf1415a3b5e60e5eda6397bc_23db2c7c.displayName = "Bare";

export const Bare_comp_14a2a83cd2d090706e4125125dbf5156_23db2c7c = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state.nome_rx_state_
    )
});
Bare_comp_14a2a83cd2d090706e4125125dbf5156_23db2c7c.displayName = "Bare";

export const Bare_comp_b23a33cac0f4c7804c4e5376767bbf33_23db2c7c = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state.papel_label_rx_state_
    )
});
Bare_comp_b23a33cac0f4c7804c4e5376767bbf33_23db2c7c.displayName = "Bare";

export const Button_button_7c48a7bdf914201894641fc3e5e580a8_23db2c7c = memo(({children}) => {
    const on_click_9e4c3b0d666fae3936a3ea05b396b0b0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.logout", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{color:"gray",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["justifyContent"] : "flex-start", ["padding"] : "0 0.75rem", ["height"] : "2.25rem", ["margin"] : "0", ["boxSizing"] : "border-box", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)", ["color"] : "#FFFFFF" }), ["width"] : "100%" }),onClick:on_click_9e4c3b0d666fae3936a3ea05b396b0b0,size:"2",variant:"ghost"},children)
    )
});
Button_button_7c48a7bdf914201894641fc3e5e580a8_23db2c7c.displayName = "Button";

export const Vstack_flex_079e4e3cf9693f15a8b8cc8e4e960a60_23db2c7c = memo(({children}) => {
    const reflex___state____state__vetements___components___shell____shell_state = useContext(StateContexts.reflex___state____state__vetements___components___shell____shell_state)



    return(
        jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["backgroundColor"] : "#2A0A12", ["@media (max-width: 768px)"] : ({ ["position"] : "fixed", ["left"] : "0", ["top"] : "0", ["zIndex"] : "50", ["boxShadow"] : "0 0 24px rgba(26, 24, 21, 0.18)", ["transform"] : (reflex___state____state__vetements___components___shell____shell_state.sidebar_open_rx_state_ ? "translateX(0)" : "translateX(-100%)"), ["transition"] : "transform 0.2s ease" }), ["width"] : "240px", ["minWidth"] : "240px", ["height"] : "100vh", ["padding"] : "1.25rem 1rem", ["alignItems"] : "start", ["position"] : "sticky", ["top"] : "0" }),direction:"column",gap:"0"},children)
    )
});
Vstack_flex_079e4e3cf9693f15a8b8cc8e4e960a60_23db2c7c.displayName = "VStack";

export const Iconbutton_iconbutton_268210dc79e202908c88d7f4f9e8091d_23db2c7c = memo(({children}) => {
    const on_click_f317130a899c54241a90a0245bb80061 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.toggle_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesIconButton,{color:"gray",css:({ ["padding"] : "6px" }),onClick:on_click_f317130a899c54241a90a0245bb80061,variant:"ghost"},children)
    )
});
Iconbutton_iconbutton_268210dc79e202908c88d7f4f9e8091d_23db2c7c.displayName = "IconButton";

export const Button_button_b46dbbc6cf60f90b8c62177b1f587a40_23db2c7c = memo(({children}) => {
    const on_click_1c37b35a6df81a0c6fe3c56a9a86a8e6 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___customers____customers_state.toggle_form", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{onClick:on_click_1c37b35a6df81a0c6fe3c56a9a86a8e6,size:"2"},children)
    )
});
Button_button_b46dbbc6cf60f90b8c62177b1f587a40_23db2c7c.displayName = "Button";

export const Bare_comp_987f340207267d0e02fefe51918ab37c_23db2c7c = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.success_rx_state_
    )
});
Bare_comp_987f340207267d0e02fefe51918ab37c_23db2c7c.displayName = "Bare";

export const Cond_comp_a17a25df2996005478d32391b6857700_23db2c7c = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state)



    return(
        (!((reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.success_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_a17a25df2996005478d32391b6857700_23db2c7c.displayName = "Cond";

export const Debounceinput_debounceinput_845625ba858830ab5575d47d7df6c3ae_23db2c7c = memo(({children}) => {
    const on_change_26231c3af014524d1acdcd8032af2457 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___customers____customers_state.set_search", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state)



    return(
        jsx(DebounceInput,{css:({ ["maxWidth"] : "320px", ["marginBottom"] : "1.5rem" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_26231c3af014524d1acdcd8032af2457,placeholder:"Buscar por nome...",value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.search_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.search_rx_state_ : "")},)
    )
});
Debounceinput_debounceinput_845625ba858830ab5575d47d7df6c3ae_23db2c7c.displayName = "DebounceInput";

export const Bare_comp_70b10a57454ce70da06c78b1c6d79e16_23db2c7c = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.form_error_rx_state_
    )
});
Bare_comp_70b10a57454ce70da06c78b1c6d79e16_23db2c7c.displayName = "Bare";

export const Cond_comp_2c43f5329bb69d389d4c48defa34c23f_23db2c7c = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state)



    return(
        (!((reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.form_error_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_2c43f5329bb69d389d4c48defa34c23f_23db2c7c.displayName = "Cond";

export const Debounceinput_debounceinput_23e68c19ae05ab5fc92fa4650beaa060_23db2c7c = memo(({children}) => {
    const on_change_62a872b27bf42e7b92b32c3ad105e29b = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___customers____customers_state.set_form_nome", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state)



    return(
        jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_62a872b27bf42e7b92b32c3ad105e29b,value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.form_nome_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.form_nome_rx_state_ : "")},)
    )
});
Debounceinput_debounceinput_23e68c19ae05ab5fc92fa4650beaa060_23db2c7c.displayName = "DebounceInput";

export const Debounceinput_debounceinput_46aea1a7cfc60f969e2228af0d115a58_23db2c7c = memo(({children}) => {
    const on_change_2c0835909666f3e15484a9de7749e704 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___customers____customers_state.set_form_telefone", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state)



    return(
        jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_2c0835909666f3e15484a9de7749e704,value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.form_telefone_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.form_telefone_rx_state_ : "")},)
    )
});
Debounceinput_debounceinput_46aea1a7cfc60f969e2228af0d115a58_23db2c7c.displayName = "DebounceInput";

export const Debounceinput_debounceinput_0775d26f8c0ad083d1571d610f67f3ec_23db2c7c = memo(({children}) => {
    const on_change_6fd5f33cc6db53c14d1b5aa6e080ca51 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___customers____customers_state.set_form_email", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state)



    return(
        jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_6fd5f33cc6db53c14d1b5aa6e080ca51,value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.form_email_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.form_email_rx_state_ : "")},)
    )
});
Debounceinput_debounceinput_0775d26f8c0ad083d1571d610f67f3ec_23db2c7c.displayName = "DebounceInput";

export const Button_button_ff5c5b228bab35c5282bff937e973ca0_23db2c7c = memo(({children}) => {
    const on_click_0115765a98d1b871a5025f4ffb5276fe = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___customers____customers_state.create_customer", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{css:({ ["backgroundColor"] : "#6E1423", ["color"] : "white", ["borderRadius"] : "6px", ["boxShadow"] : "0 1px 2px rgba(26, 24, 21, 0.04), 0 4px 12px rgba(26, 24, 21, 0.06)", ["transition"] : "box-shadow 0.15s ease, transform 0.15s ease", ["&:hover"] : ({ ["boxShadow"] : "0 0 0 3px rgba(110, 20, 35, 0.12)", ["transform"] : "translateY(-1px)" }), ["&:focus-visible"] : ({ ["boxShadow"] : "0 0 0 3px rgba(110, 20, 35, 0.12)" }) }),disabled:false,loading:false,onClick:on_click_0115765a98d1b871a5025f4ffb5276fe},children)
    )
});
Button_button_ff5c5b228bab35c5282bff937e973ca0_23db2c7c.displayName = "Button";

export const Cond_comp_afb0fed549b809af8972000d357ee255_23db2c7c = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state)



    return(
        (reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.show_form_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_afb0fed549b809af8972000d357ee255_23db2c7c.displayName = "Cond";

export const Foreach_comp_0f562b80d6d3171903b1000512aaeca9_23db2c7c = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.customers_rx_state_ ?? [],((c_rx_state_,index_ea38ba42aed0509d6ccb85008441344d)=>(jsx(RadixThemesTable.Row,{css:({ ["borderBottom"] : "1px solid #E1E4E9", ["borderLeft"] : (false ? "3px solid #6E1423" : "3px solid transparent"), ["transition"] : "all 0.2s ease", ["&:hover"] : ({ ["backgroundColor"] : "#F1F2F5" }) }),key:index_ea38ba42aed0509d6ccb85008441344d},jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},c_rx_state_?.["nome"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},c_rx_state_?.["telefone"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},c_rx_state_?.["email"])))))
    )
});
Foreach_comp_0f562b80d6d3171903b1000512aaeca9_23db2c7c.displayName = "Foreach";

export const Cond_comp_ce31260b814ce5dfd25755afad8273b0_23db2c7c = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state)



    return(
        ((reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.customers_rx_state_.length > 0)?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_ce31260b814ce5dfd25755afad8273b0_23db2c7c.displayName = "Cond";

export const Cond_comp_b1da1d3a9d0f64b07acd503d1f9f89e6_23db2c7c = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state)



    return(
        (reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.is_loading_page_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_b1da1d3a9d0f64b07acd503d1f9f89e6_23db2c7c.displayName = "Cond";
