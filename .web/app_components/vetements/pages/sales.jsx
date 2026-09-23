
import {ReflexEvent,applyEventActions,isNotNullOrUndefined,isTrue} from "$/utils/state"
import {Box as RadixThemesBox,Button as RadixThemesButton,Flex as RadixThemesFlex,IconButton as RadixThemesIconButton,Link as RadixThemesLink,Select as RadixThemesSelect,Table as RadixThemesTable,Text as RadixThemesText,TextField as RadixThemesTextField} from "@radix-ui/themes"
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








export const Box_box_abc55a20e129793b59234eb0338273c7_c7d0729d = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesBox,{css:({ ["backgroundColor"] : "rgba(26, 24, 21, 0.35)", ["position"] : "fixed", ["top"] : "0", ["left"] : "0", ["width"] : "100vw", ["height"] : "100vh", ["zIndex"] : "40" }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},)
    )
});
Box_box_abc55a20e129793b59234eb0338273c7_c7d0729d.displayName = "Box";

export const Cond_comp_65443c3810dd2cf69e9797fa5a363cec_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___components___shell____shell_state = useContext(StateContexts.reflex___state____state__vetements___components___shell____shell_state)



    return(
        (reflex___state____state__vetements___components___shell____shell_state.sidebar_open_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_65443c3810dd2cf69e9797fa5a363cec_c7d0729d.displayName = "Cond";

export const Link_link_338c2ac82a34c3fffd67b5c98779bdcf_c7d0729d = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideLayoutDashboard,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Dashboard"))))
    )
});
Link_link_338c2ac82a34c3fffd67b5c98779bdcf_c7d0729d.displayName = "Link";

export const Link_link_b156310230aba91de101b6b7128c1e0b_c7d0729d = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideLayoutDashboard,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Dashboard"))))
    )
});
Link_link_b156310230aba91de101b6b7128c1e0b_c7d0729d.displayName = "Link";

export const Cond_comp_502fc95db9f80f5e608b732915450d96_c7d0729d = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_502fc95db9f80f5e608b732915450d96_c7d0729d.displayName = "Cond";

export const Link_link_08f9a7cd5d13cf33adeb5bf8baff9d10_c7d0729d = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/produtos"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideShirt,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Produtos"))))
    )
});
Link_link_08f9a7cd5d13cf33adeb5bf8baff9d10_c7d0729d.displayName = "Link";

export const Link_link_1f4b90b28726d6880b0307dc1b046772_c7d0729d = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/produtos"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideShirt,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Produtos"))))
    )
});
Link_link_1f4b90b28726d6880b0307dc1b046772_c7d0729d.displayName = "Link";

export const Cond_comp_aa5f52b7850e5cb4acf689339da8edc7_c7d0729d = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/produtos"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_aa5f52b7850e5cb4acf689339da8edc7_c7d0729d.displayName = "Cond";

export const Link_link_9cf2c9c05db4cfc5e41a1a8252cf3408_c7d0729d = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/estoque"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucidePackage,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Estoque"))))
    )
});
Link_link_9cf2c9c05db4cfc5e41a1a8252cf3408_c7d0729d.displayName = "Link";

export const Link_link_3e9e5b146f207edcf0c3ccecc1223104_c7d0729d = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/estoque"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucidePackage,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Estoque"))))
    )
});
Link_link_3e9e5b146f207edcf0c3ccecc1223104_c7d0729d.displayName = "Link";

export const Cond_comp_0a7267143915d363dd000d321d1295d3_c7d0729d = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/estoque"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_0a7267143915d363dd000d321d1295d3_c7d0729d.displayName = "Cond";

export const Link_link_eb582514259b684cca4bc50110fb7f86_c7d0729d = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/vendas"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideReceipt,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Vendas"))))
    )
});
Link_link_eb582514259b684cca4bc50110fb7f86_c7d0729d.displayName = "Link";

export const Link_link_e5c702088abc08907e6edc8ddd4b7541_c7d0729d = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/vendas"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideReceipt,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Vendas"))))
    )
});
Link_link_e5c702088abc08907e6edc8ddd4b7541_c7d0729d.displayName = "Link";

export const Cond_comp_1fd33976a0f4be8d5d63583b370cbfb0_c7d0729d = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/vendas"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_1fd33976a0f4be8d5d63583b370cbfb0_c7d0729d.displayName = "Cond";

export const Link_link_6c0cecf820744f3f44b4fd09076527da_c7d0729d = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/clientes"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideUsers,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Clientes"))))
    )
});
Link_link_6c0cecf820744f3f44b4fd09076527da_c7d0729d.displayName = "Link";

export const Link_link_55653036e2064afed720ca52a0c4fd38_c7d0729d = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/clientes"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideUsers,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Clientes"))))
    )
});
Link_link_55653036e2064afed720ca52a0c4fd38_c7d0729d.displayName = "Link";

export const Cond_comp_2b864549a4a68b24559c291f20b585b5_c7d0729d = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/clientes"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_2b864549a4a68b24559c291f20b585b5_c7d0729d.displayName = "Cond";

export const Bare_comp_c3a580bedf1415a3b5e60e5eda6397bc_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state.iniciais_rx_state_
    )
});
Bare_comp_c3a580bedf1415a3b5e60e5eda6397bc_c7d0729d.displayName = "Bare";

export const Bare_comp_14a2a83cd2d090706e4125125dbf5156_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state.nome_rx_state_
    )
});
Bare_comp_14a2a83cd2d090706e4125125dbf5156_c7d0729d.displayName = "Bare";

export const Bare_comp_b23a33cac0f4c7804c4e5376767bbf33_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state.papel_label_rx_state_
    )
});
Bare_comp_b23a33cac0f4c7804c4e5376767bbf33_c7d0729d.displayName = "Bare";

export const Button_button_7c48a7bdf914201894641fc3e5e580a8_c7d0729d = memo(({children}) => {
    const on_click_9e4c3b0d666fae3936a3ea05b396b0b0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.logout", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{color:"gray",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["justifyContent"] : "flex-start", ["padding"] : "0 0.75rem", ["height"] : "2.25rem", ["margin"] : "0", ["boxSizing"] : "border-box", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)", ["color"] : "#FFFFFF" }), ["width"] : "100%" }),onClick:on_click_9e4c3b0d666fae3936a3ea05b396b0b0,size:"2",variant:"ghost"},children)
    )
});
Button_button_7c48a7bdf914201894641fc3e5e580a8_c7d0729d.displayName = "Button";

export const Vstack_flex_079e4e3cf9693f15a8b8cc8e4e960a60_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___components___shell____shell_state = useContext(StateContexts.reflex___state____state__vetements___components___shell____shell_state)



    return(
        jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["backgroundColor"] : "#2A0A12", ["@media (max-width: 768px)"] : ({ ["position"] : "fixed", ["left"] : "0", ["top"] : "0", ["zIndex"] : "50", ["boxShadow"] : "0 0 24px rgba(26, 24, 21, 0.18)", ["transform"] : (reflex___state____state__vetements___components___shell____shell_state.sidebar_open_rx_state_ ? "translateX(0)" : "translateX(-100%)"), ["transition"] : "transform 0.2s ease" }), ["width"] : "240px", ["minWidth"] : "240px", ["height"] : "100vh", ["padding"] : "1.25rem 1rem", ["alignItems"] : "start", ["position"] : "sticky", ["top"] : "0" }),direction:"column",gap:"0"},children)
    )
});
Vstack_flex_079e4e3cf9693f15a8b8cc8e4e960a60_c7d0729d.displayName = "VStack";

export const Iconbutton_iconbutton_268210dc79e202908c88d7f4f9e8091d_c7d0729d = memo(({children}) => {
    const on_click_f317130a899c54241a90a0245bb80061 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.toggle_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesIconButton,{color:"gray",css:({ ["padding"] : "6px" }),onClick:on_click_f317130a899c54241a90a0245bb80061,variant:"ghost"},children)
    )
});
Iconbutton_iconbutton_268210dc79e202908c88d7f4f9e8091d_c7d0729d.displayName = "IconButton";

export const Bare_comp_60f87e10c576c2c49a1996aff187ad2e_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.item_error_rx_state_
    )
});
Bare_comp_60f87e10c576c2c49a1996aff187ad2e_c7d0729d.displayName = "Bare";

export const Cond_comp_de2ead744d3d483edadaa729872f2d98_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        (!((reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.item_error_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_de2ead744d3d483edadaa729872f2d98_c7d0729d.displayName = "Cond";

export const Foreach_comp_32ec8e04bb12bac3460c8e440f6ab446_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.variant_options_rx_state_ ?? [],((opt_rx_state_,index_9e069c272beb3e1b87bc74f5438e2754)=>(jsx(RadixThemesSelect.Item,{key:index_9e069c272beb3e1b87bc74f5438e2754,value:(JSON.stringify(opt_rx_state_?.["id"]))},opt_rx_state_?.["label"]))))
    )
});
Foreach_comp_32ec8e04bb12bac3460c8e440f6ab446_c7d0729d.displayName = "Foreach";

export const Selectroot_select__root_65fe9134337aeecdb6bfd982da556662_c7d0729d = memo(({children}) => {
    const on_change_701ba5bd23db0dc4ce02f0e982dedadc = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___sales____sales_state.set_selected_variant_id", ({ ["value"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        jsx(RadixThemesSelect.Root,{onValueChange:on_change_701ba5bd23db0dc4ce02f0e982dedadc,value:reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.selected_variant_id_rx_state_},children)
    )
});
Selectroot_select__root_65fe9134337aeecdb6bfd982da556662_c7d0729d.displayName = "SelectRoot";

export const Debounceinput_debounceinput_84658816958d518e08fb8379ece8ff70_c7d0729d = memo(({children}) => {
    const on_change_2e1ad68ebb2bf42c100ce6e6b6e581f9 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___sales____sales_state.set_item_quantidade", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        jsx(DebounceInput,{debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_2e1ad68ebb2bf42c100ce6e6b6e581f9,placeholder:"1",value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.item_quantidade_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.item_quantidade_rx_state_ : "")},)
    )
});
Debounceinput_debounceinput_84658816958d518e08fb8379ece8ff70_c7d0729d.displayName = "DebounceInput";

export const Button_button_ed5986b9d95f98574d8782df6e444a50_c7d0729d = memo(({children}) => {
    const on_click_9674af9445dd8978b5ed11712e92fdc3 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___sales____sales_state.add_item", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{css:({ ["alignSelf"] : "end" }),onClick:on_click_9674af9445dd8978b5ed11712e92fdc3},children)
    )
});
Button_button_ed5986b9d95f98574d8782df6e444a50_c7d0729d.displayName = "Button";

export const Foreach_comp_2e9f6c61daeb1623367bf993c5b38b9a_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.cart_rx_state_ ?? [],((item_rx_state_,index_70aaef6d7ef3aa3b9268adafe45ebcae)=>(jsx(RadixThemesTable.Row,{css:({ ["borderBottom"] : "1px solid #E1E4E9", ["borderLeft"] : (false ? "3px solid #6E1423" : "3px solid transparent"), ["transition"] : "all 0.2s ease", ["&:hover"] : ({ ["backgroundColor"] : "#F1F2F5" }) }),key:index_70aaef6d7ef3aa3b9268adafe45ebcae},jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},item_rx_state_?.["label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},item_rx_state_?.["quantidade"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},item_rx_state_?.["subtotal_label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},jsx(RadixThemesButton,{onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___sales____sales_state.remove_item", ({ ["variacao_id"] : item_rx_state_?.["variacao_id"] }), ({  })))], [_e], ({  })))),size:"1",variant:"ghost"},"Remover"))))))
    )
});
Foreach_comp_2e9f6c61daeb1623367bf993c5b38b9a_c7d0729d.displayName = "Foreach";

export const Cond_comp_b5c6b9d7d24888de1ddbdcc7da28c178_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        ((reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.cart_rx_state_.length > 0)?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_b5c6b9d7d24888de1ddbdcc7da28c178_c7d0729d.displayName = "Cond";

export const Foreach_comp_86c82705a489c06675e7d9d6abe47322_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.customers_rx_state_ ?? [],((c_rx_state_,index_9e069c272beb3e1b87bc74f5438e2754)=>(jsx(RadixThemesSelect.Item,{key:index_9e069c272beb3e1b87bc74f5438e2754,value:(JSON.stringify(c_rx_state_?.["id"]))},c_rx_state_?.["nome"]))))
    )
});
Foreach_comp_86c82705a489c06675e7d9d6abe47322_c7d0729d.displayName = "Foreach";

export const Selectroot_select__root_9a5678042592fb85658e70716d54a557_c7d0729d = memo(({children}) => {
    const on_change_98ceb6b45f0319c2d3b75269c186f845 = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___sales____sales_state.set_selected_cliente_id", ({ ["value"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        jsx(RadixThemesSelect.Root,{onValueChange:on_change_98ceb6b45f0319c2d3b75269c186f845,value:reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.selected_cliente_id_rx_state_},children)
    )
});
Selectroot_select__root_9a5678042592fb85658e70716d54a557_c7d0729d.displayName = "SelectRoot";

export const Bare_comp_864087134f8ca3d167de393dce0d4bb1_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        ("Total: "+reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.total_label_rx_state_)
    )
});
Bare_comp_864087134f8ca3d167de393dce0d4bb1_c7d0729d.displayName = "Bare";

export const Bare_comp_2c360d24d5c74557656b179c770255fb_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.sale_error_rx_state_
    )
});
Bare_comp_2c360d24d5c74557656b179c770255fb_c7d0729d.displayName = "Bare";

export const Cond_comp_0ee2716304247f85a351bb3f72775ddd_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        (!((reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.sale_error_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_0ee2716304247f85a351bb3f72775ddd_c7d0729d.displayName = "Cond";

export const Bare_comp_9fcea173bee03e9e4e76e76ff83200fb_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.sale_success_rx_state_
    )
});
Bare_comp_9fcea173bee03e9e4e76e76ff83200fb_c7d0729d.displayName = "Bare";

export const Cond_comp_ff4f9d4e87deb0788b5ceff0c164ea14_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        (!((reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.sale_success_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_ff4f9d4e87deb0788b5ceff0c164ea14_c7d0729d.displayName = "Cond";

export const Button_button_23f8046490d5752598b7bfc17c43a80d_c7d0729d = memo(({children}) => {
    const on_click_a4de794beb0ee18020d972e042fb592c = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___sales____sales_state.confirm_sale", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{css:({ ["backgroundColor"] : "#6E1423", ["color"] : "white", ["borderRadius"] : "6px", ["boxShadow"] : "0 1px 2px rgba(26, 24, 21, 0.04), 0 4px 12px rgba(26, 24, 21, 0.06)", ["transition"] : "box-shadow 0.15s ease, transform 0.15s ease", ["&:hover"] : ({ ["boxShadow"] : "0 0 0 3px rgba(110, 20, 35, 0.12)", ["transform"] : "translateY(-1px)" }), ["&:focus-visible"] : ({ ["boxShadow"] : "0 0 0 3px rgba(110, 20, 35, 0.12)" }), ["marginTop"] : "0.5rem" }),disabled:false,loading:false,onClick:on_click_a4de794beb0ee18020d972e042fb592c},children)
    )
});
Button_button_23f8046490d5752598b7bfc17c43a80d_c7d0729d.displayName = "Button";

export const Foreach_comp_0c29b90bb093c1ebe424a257fbfcd68c_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.history_rx_state_ ?? [],((venda_rx_state_,index_762134c0de21aebcb4e9bfa57dbd8d5b)=>(jsx(RadixThemesTable.Row,{css:({ ["borderBottom"] : "1px solid #E1E4E9", ["borderLeft"] : (false ? "3px solid #6E1423" : "3px solid transparent"), ["transition"] : "all 0.2s ease", ["&:hover"] : ({ ["backgroundColor"] : "#F1F2F5" }) }),key:index_762134c0de21aebcb4e9bfa57dbd8d5b},jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},venda_rx_state_?.["data_label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},venda_rx_state_?.["cliente"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},venda_rx_state_?.["itens_label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},venda_rx_state_?.["total_label"])))))
    )
});
Foreach_comp_0c29b90bb093c1ebe424a257fbfcd68c_c7d0729d.displayName = "Foreach";

export const Cond_comp_ee478337d8e3143bce62684451b6a85e_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        ((reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.history_rx_state_.length > 0)?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_ee478337d8e3143bce62684451b6a85e_c7d0729d.displayName = "Cond";

export const Cond_comp_47cd10d631c9ca597dfcb7030158d2ae_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        (reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.is_loading_page_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_47cd10d631c9ca597dfcb7030158d2ae_c7d0729d.displayName = "Cond";
