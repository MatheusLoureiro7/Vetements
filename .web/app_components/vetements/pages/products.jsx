
import {ReflexEvent,applyEventActions,isNotNullOrUndefined,isTrue} from "$/utils/state"
import {Box as RadixThemesBox,Button as RadixThemesButton,Dialog as RadixThemesDialog,Flex as RadixThemesFlex,IconButton as RadixThemesIconButton,Link as RadixThemesLink,Select as RadixThemesSelect,Table as RadixThemesTable,Text as RadixThemesText,TextArea as RadixThemesTextArea,TextField as RadixThemesTextField} from "@radix-ui/themes"
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








export const Box_box_abc55a20e129793b59234eb0338273c7_a7b885cf = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesBox,{css:({ ["backgroundColor"] : "rgba(26, 24, 21, 0.35)", ["position"] : "fixed", ["top"] : "0", ["left"] : "0", ["width"] : "100vw", ["height"] : "100vh", ["zIndex"] : "40" }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},)
    )
});
Box_box_abc55a20e129793b59234eb0338273c7_a7b885cf.displayName = "Box";

export const Cond_comp_65443c3810dd2cf69e9797fa5a363cec_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___components___shell____shell_state = useContext(StateContexts.reflex___state____state__vetements___components___shell____shell_state)



    return(
        (reflex___state____state__vetements___components___shell____shell_state.sidebar_open_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_65443c3810dd2cf69e9797fa5a363cec_a7b885cf.displayName = "Cond";

export const Link_link_338c2ac82a34c3fffd67b5c98779bdcf_a7b885cf = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideLayoutDashboard,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Dashboard"))))
    )
});
Link_link_338c2ac82a34c3fffd67b5c98779bdcf_a7b885cf.displayName = "Link";

export const Link_link_b156310230aba91de101b6b7128c1e0b_a7b885cf = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideLayoutDashboard,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Dashboard"))))
    )
});
Link_link_b156310230aba91de101b6b7128c1e0b_a7b885cf.displayName = "Link";

export const Cond_comp_502fc95db9f80f5e608b732915450d96_a7b885cf = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_502fc95db9f80f5e608b732915450d96_a7b885cf.displayName = "Cond";

export const Link_link_08f9a7cd5d13cf33adeb5bf8baff9d10_a7b885cf = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/produtos"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideShirt,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Produtos"))))
    )
});
Link_link_08f9a7cd5d13cf33adeb5bf8baff9d10_a7b885cf.displayName = "Link";

export const Link_link_1f4b90b28726d6880b0307dc1b046772_a7b885cf = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/produtos"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideShirt,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Produtos"))))
    )
});
Link_link_1f4b90b28726d6880b0307dc1b046772_a7b885cf.displayName = "Link";

export const Cond_comp_aa5f52b7850e5cb4acf689339da8edc7_a7b885cf = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/produtos"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_aa5f52b7850e5cb4acf689339da8edc7_a7b885cf.displayName = "Cond";

export const Link_link_9cf2c9c05db4cfc5e41a1a8252cf3408_a7b885cf = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/estoque"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucidePackage,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Estoque"))))
    )
});
Link_link_9cf2c9c05db4cfc5e41a1a8252cf3408_a7b885cf.displayName = "Link";

export const Link_link_3e9e5b146f207edcf0c3ccecc1223104_a7b885cf = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/estoque"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucidePackage,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Estoque"))))
    )
});
Link_link_3e9e5b146f207edcf0c3ccecc1223104_a7b885cf.displayName = "Link";

export const Cond_comp_0a7267143915d363dd000d321d1295d3_a7b885cf = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/estoque"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_0a7267143915d363dd000d321d1295d3_a7b885cf.displayName = "Cond";

export const Link_link_eb582514259b684cca4bc50110fb7f86_a7b885cf = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/vendas"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideReceipt,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Vendas"))))
    )
});
Link_link_eb582514259b684cca4bc50110fb7f86_a7b885cf.displayName = "Link";

export const Link_link_e5c702088abc08907e6edc8ddd4b7541_a7b885cf = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/vendas"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideReceipt,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Vendas"))))
    )
});
Link_link_e5c702088abc08907e6edc8ddd4b7541_a7b885cf.displayName = "Link";

export const Cond_comp_1fd33976a0f4be8d5d63583b370cbfb0_a7b885cf = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/vendas"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_1fd33976a0f4be8d5d63583b370cbfb0_a7b885cf.displayName = "Cond";

export const Link_link_6c0cecf820744f3f44b4fd09076527da_a7b885cf = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/clientes"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideUsers,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Clientes"))))
    )
});
Link_link_6c0cecf820744f3f44b4fd09076527da_a7b885cf.displayName = "Link";

export const Link_link_55653036e2064afed720ca52a0c4fd38_a7b885cf = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/clientes"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideUsers,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Clientes"))))
    )
});
Link_link_55653036e2064afed720ca52a0c4fd38_a7b885cf.displayName = "Link";

export const Cond_comp_2b864549a4a68b24559c291f20b585b5_a7b885cf = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/clientes"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_2b864549a4a68b24559c291f20b585b5_a7b885cf.displayName = "Cond";

export const Bare_comp_c3a580bedf1415a3b5e60e5eda6397bc_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state.iniciais_rx_state_
    )
});
Bare_comp_c3a580bedf1415a3b5e60e5eda6397bc_a7b885cf.displayName = "Bare";

export const Bare_comp_14a2a83cd2d090706e4125125dbf5156_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state.nome_rx_state_
    )
});
Bare_comp_14a2a83cd2d090706e4125125dbf5156_a7b885cf.displayName = "Bare";

export const Bare_comp_b23a33cac0f4c7804c4e5376767bbf33_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state.papel_label_rx_state_
    )
});
Bare_comp_b23a33cac0f4c7804c4e5376767bbf33_a7b885cf.displayName = "Bare";

export const Button_button_7c48a7bdf914201894641fc3e5e580a8_a7b885cf = memo(({children}) => {
    const on_click_9e4c3b0d666fae3936a3ea05b396b0b0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.logout", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{color:"gray",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["justifyContent"] : "flex-start", ["padding"] : "0 0.75rem", ["height"] : "2.25rem", ["margin"] : "0", ["boxSizing"] : "border-box", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)", ["color"] : "#FFFFFF" }), ["width"] : "100%" }),onClick:on_click_9e4c3b0d666fae3936a3ea05b396b0b0,size:"2",variant:"ghost"},children)
    )
});
Button_button_7c48a7bdf914201894641fc3e5e580a8_a7b885cf.displayName = "Button";

export const Vstack_flex_079e4e3cf9693f15a8b8cc8e4e960a60_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___components___shell____shell_state = useContext(StateContexts.reflex___state____state__vetements___components___shell____shell_state)



    return(
        jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["backgroundColor"] : "#2A0A12", ["@media (max-width: 768px)"] : ({ ["position"] : "fixed", ["left"] : "0", ["top"] : "0", ["zIndex"] : "50", ["boxShadow"] : "0 0 24px rgba(26, 24, 21, 0.18)", ["transform"] : (reflex___state____state__vetements___components___shell____shell_state.sidebar_open_rx_state_ ? "translateX(0)" : "translateX(-100%)"), ["transition"] : "transform 0.2s ease" }), ["width"] : "240px", ["minWidth"] : "240px", ["height"] : "100vh", ["padding"] : "1.25rem 1rem", ["alignItems"] : "start", ["position"] : "sticky", ["top"] : "0" }),direction:"column",gap:"0"},children)
    )
});
Vstack_flex_079e4e3cf9693f15a8b8cc8e4e960a60_a7b885cf.displayName = "VStack";

export const Iconbutton_iconbutton_268210dc79e202908c88d7f4f9e8091d_a7b885cf = memo(({children}) => {
    const on_click_f317130a899c54241a90a0245bb80061 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.toggle_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesIconButton,{color:"gray",css:({ ["padding"] : "6px" }),onClick:on_click_f317130a899c54241a90a0245bb80061,variant:"ghost"},children)
    )
});
Iconbutton_iconbutton_268210dc79e202908c88d7f4f9e8091d_a7b885cf.displayName = "IconButton";

export const Button_button_b95419e6023d2d34f714bd3d6cebfe8e_a7b885cf = memo(({children}) => {
    const on_click_3a059eaf906bb9b8d7a17e37e4b9748f = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.open_form", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{onClick:on_click_3a059eaf906bb9b8d7a17e37e4b9748f,size:"2"},children)
    )
});
Button_button_b95419e6023d2d34f714bd3d6cebfe8e_a7b885cf.displayName = "Button";

export const Cond_comp_5ed51ce33b8435e705539c48d1a16d55_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        (reflex___state____state__vetements___state___auth____auth_state.is_admin_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_5ed51ce33b8435e705539c48d1a16d55_a7b885cf.displayName = "Cond";

export const Bare_comp_236ebbfd7fc90fd3bd3359909b1a8770_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.load_error_rx_state_
    )
});
Bare_comp_236ebbfd7fc90fd3bd3359909b1a8770_a7b885cf.displayName = "Bare";

export const Cond_comp_903593ccb9dcb120b49127c61408eb9a_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        (!((reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.load_error_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_903593ccb9dcb120b49127c61408eb9a_a7b885cf.displayName = "Cond";

export const Bare_comp_b0e8788170901321182bfeb7a6f8e0ed_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.product_success_rx_state_
    )
});
Bare_comp_b0e8788170901321182bfeb7a6f8e0ed_a7b885cf.displayName = "Bare";

export const Cond_comp_5a8300b7d806561dd976e5786be44426_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        (!((reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.product_success_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_5a8300b7d806561dd976e5786be44426_a7b885cf.displayName = "Cond";

export const Debounceinput_debounceinput_e47ca70e972838f398b15414c8a9fb65_a7b885cf = memo(({children}) => {
    const on_change_f141b38c8cca21b1934789c768705ece = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.set_search", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        jsx(DebounceInput,{css:({ ["maxWidth"] : "320px", ["marginBottom"] : "1.5rem" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_f141b38c8cca21b1934789c768705ece,placeholder:"Buscar por nome...",value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.search_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.search_rx_state_ : "")},)
    )
});
Debounceinput_debounceinput_e47ca70e972838f398b15414c8a9fb65_a7b885cf.displayName = "DebounceInput";

export const Bare_comp_7e3518e34c9d14d3de4719b411a2e663_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.form_error_rx_state_
    )
});
Bare_comp_7e3518e34c9d14d3de4719b411a2e663_a7b885cf.displayName = "Bare";

export const Cond_comp_2bb3485f407e1300294a2e8f44cc72e2_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        (!((reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.form_error_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_2bb3485f407e1300294a2e8f44cc72e2_a7b885cf.displayName = "Cond";

export const Debounceinput_debounceinput_51e9a23b4efdca4f2b9c58e3ef75295d_a7b885cf = memo(({children}) => {
    const on_change_e91b9fcd831a5fca199bbceb97f2a86f = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.set_form_nome", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_e91b9fcd831a5fca199bbceb97f2a86f,value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.form_nome_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.form_nome_rx_state_ : "")},)
    )
});
Debounceinput_debounceinput_51e9a23b4efdca4f2b9c58e3ef75295d_a7b885cf.displayName = "DebounceInput";

export const Bare_comp_7c0d25f345cfbb1222d4a10c6a547647_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.nome_error_rx_state_
    )
});
Bare_comp_7c0d25f345cfbb1222d4a10c6a547647_a7b885cf.displayName = "Bare";

export const Cond_comp_970a1a82937d333d5ddb8b9e2ef06929_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        (!((reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.nome_error_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_970a1a82937d333d5ddb8b9e2ef06929_a7b885cf.displayName = "Cond";

export const Foreach_comp_e2a124cbf1cc9530c9b6ee634fff1144_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.categories_rx_state_ ?? [],((categoria_rx_state_,index_9e069c272beb3e1b87bc74f5438e2754)=>(jsx(RadixThemesSelect.Item,{key:index_9e069c272beb3e1b87bc74f5438e2754,value:(JSON.stringify(categoria_rx_state_?.["id"]))},categoria_rx_state_?.["nome"]))))
    )
});
Foreach_comp_e2a124cbf1cc9530c9b6ee634fff1144_a7b885cf.displayName = "Foreach";

export const Selectroot_select__root_17795b4ad67c2a02c57d3c1be5611ab9_a7b885cf = memo(({children}) => {
    const on_change_d4542cc8f59e263af025eb414ba0cac1 = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.set_form_categoria_id", ({ ["value"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        jsx(RadixThemesSelect.Root,{onValueChange:on_change_d4542cc8f59e263af025eb414ba0cac1,value:reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.form_categoria_id_rx_state_},children)
    )
});
Selectroot_select__root_17795b4ad67c2a02c57d3c1be5611ab9_a7b885cf.displayName = "SelectRoot";

export const Bare_comp_1c49d38ab3686fccc45f9159b3b1dfce_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.categoria_error_rx_state_
    )
});
Bare_comp_1c49d38ab3686fccc45f9159b3b1dfce_a7b885cf.displayName = "Bare";

export const Cond_comp_a5ba9773f307a74ca73e26d0eb3e3da8_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        (!((reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.categoria_error_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_a5ba9773f307a74ca73e26d0eb3e3da8_a7b885cf.displayName = "Cond";

export const Debounceinput_debounceinput_e9996fc02964d85752cfcadfe6bb2bbe_a7b885cf = memo(({children}) => {
    const on_change_9704c11c0cf60911ca8b98f3ec8337a4 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.set_form_preco", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,inputMode:"decimal",onChange:on_change_9704c11c0cf60911ca8b98f3ec8337a4,placeholder:"0,00",value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.form_preco_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.form_preco_rx_state_ : "")},children)
    )
});
Debounceinput_debounceinput_e9996fc02964d85752cfcadfe6bb2bbe_a7b885cf.displayName = "DebounceInput";

export const Bare_comp_84d20351d369c427c15ed69657a85524_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.preco_error_rx_state_
    )
});
Bare_comp_84d20351d369c427c15ed69657a85524_a7b885cf.displayName = "Bare";

export const Cond_comp_d25c6e2c14defcdb6132d74a8d59bfba_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        (!((reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.preco_error_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_d25c6e2c14defcdb6132d74a8d59bfba_a7b885cf.displayName = "Cond";

export const Debounceinput_debounceinput_69e26bdd05627c6576dd4047c1bcd8dd_a7b885cf = memo(({children}) => {
    const on_change_5f98e982f528a873ab174383800a2b78 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.set_form_descricao", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextArea,onChange:on_change_5f98e982f528a873ab174383800a2b78,value:reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.form_descricao_rx_state_},)
    )
});
Debounceinput_debounceinput_69e26bdd05627c6576dd4047c1bcd8dd_a7b885cf.displayName = "DebounceInput";

export const Bare_comp_3b668febb6c7f68ec76fdab248c0b24d_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        (reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.is_submitting_product_rx_state_ ? "Salvando..." : "Salvar produto")
    )
});
Bare_comp_3b668febb6c7f68ec76fdab248c0b24d_a7b885cf.displayName = "Bare";

export const Button_button_3b535a3cdefa279fcc22be636df6e07d_a7b885cf = memo(({children}) => {
    const on_click_dc0b7a7da9801a7d677280df59c27cc8 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.create_product", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        jsx(RadixThemesButton,{css:({ ["backgroundColor"] : "#6E1423", ["color"] : "white", ["borderRadius"] : "6px", ["boxShadow"] : "0 1px 2px rgba(26, 24, 21, 0.04), 0 4px 12px rgba(26, 24, 21, 0.06)", ["transition"] : "box-shadow 0.15s ease, transform 0.15s ease", ["&:hover"] : ({ ["boxShadow"] : "0 0 0 3px rgba(110, 20, 35, 0.12)", ["transform"] : "translateY(-1px)" }), ["&:focus-visible"] : ({ ["boxShadow"] : "0 0 0 3px rgba(110, 20, 35, 0.12)" }) }),disabled:reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.is_submitting_product_rx_state_,loading:reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.is_submitting_product_rx_state_,onClick:on_click_dc0b7a7da9801a7d677280df59c27cc8},children)
    )
});
Button_button_3b535a3cdefa279fcc22be636df6e07d_a7b885cf.displayName = "Button";

export const Dialogroot_dialog__root_8cef525b1f27eb8c4cb44e828357da1f_a7b885cf = memo(({children}) => {
    const on_open_change_855adbadb356fe97a39736029ccaf67f = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.set_show_form", ({ ["open"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        jsx(RadixThemesDialog.Root,{onOpenChange:on_open_change_855adbadb356fe97a39736029ccaf67f,open:reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.show_form_rx_state_},children)
    )
});
Dialogroot_dialog__root_8cef525b1f27eb8c4cb44e828357da1f_a7b885cf.displayName = "DialogRoot";

export const Bare_comp_c1cdbc9a1f52047d601aeca89654ae35_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.variant_error_rx_state_
    )
});
Bare_comp_c1cdbc9a1f52047d601aeca89654ae35_a7b885cf.displayName = "Bare";

export const Cond_comp_772512698c8b48a198d8a38aea7a628c_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        (!((reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.variant_error_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_772512698c8b48a198d8a38aea7a628c_a7b885cf.displayName = "Cond";

export const Debounceinput_debounceinput_7f6ebaa23e130342f27fe46d5b3d4149_a7b885cf = memo(({children}) => {
    const on_change_36029fa42739e90339da61963da3c3c3 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.set_variant_tamanho", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        jsx(DebounceInput,{debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_36029fa42739e90339da61963da3c3c3,value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.variant_tamanho_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.variant_tamanho_rx_state_ : "")},)
    )
});
Debounceinput_debounceinput_7f6ebaa23e130342f27fe46d5b3d4149_a7b885cf.displayName = "DebounceInput";

export const Debounceinput_debounceinput_457e688799720ceb1c9c930b7d495636_a7b885cf = memo(({children}) => {
    const on_change_1063ac6f9bee17cec1b072069298a1ba = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.set_variant_cor", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        jsx(DebounceInput,{debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_1063ac6f9bee17cec1b072069298a1ba,value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.variant_cor_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.variant_cor_rx_state_ : "")},)
    )
});
Debounceinput_debounceinput_457e688799720ceb1c9c930b7d495636_a7b885cf.displayName = "DebounceInput";

export const Debounceinput_debounceinput_efb75a6336b0722541303dbbe31a5368_a7b885cf = memo(({children}) => {
    const on_change_753cb928a3bd12541ec1a39a10d51712 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.set_variant_sku", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        jsx(DebounceInput,{debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_753cb928a3bd12541ec1a39a10d51712,value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.variant_sku_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.variant_sku_rx_state_ : "")},)
    )
});
Debounceinput_debounceinput_efb75a6336b0722541303dbbe31a5368_a7b885cf.displayName = "DebounceInput";

export const Debounceinput_debounceinput_d6075cea56d7dbc2b796cd3fba2f1dac_a7b885cf = memo(({children}) => {
    const on_change_fb5c09b94fdc8690895ece9e3d6c6e72 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.set_variant_quantidade", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        jsx(DebounceInput,{debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_fb5c09b94fdc8690895ece9e3d6c6e72,value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.variant_quantidade_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.variant_quantidade_rx_state_ : "")},)
    )
});
Debounceinput_debounceinput_d6075cea56d7dbc2b796cd3fba2f1dac_a7b885cf.displayName = "DebounceInput";

export const Bare_comp_76c146e80d6f29248b5d338ef2f9edf1_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        (reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.is_submitting_variant_rx_state_ ? "Adicionando..." : "Adicionar")
    )
});
Bare_comp_76c146e80d6f29248b5d338ef2f9edf1_a7b885cf.displayName = "Bare";

export const Button_button_2063bc394b9483e440ba37fe428c2dc3_a7b885cf = memo(({children}) => {
    const on_click_b67c5fc803be66d378e1b15756944931 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.add_variant", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        jsx(RadixThemesButton,{css:({ ["alignSelf"] : "end" }),disabled:reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.is_submitting_variant_rx_state_,loading:reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.is_submitting_variant_rx_state_,onClick:on_click_b67c5fc803be66d378e1b15756944931},children)
    )
});
Button_button_2063bc394b9483e440ba37fe428c2dc3_a7b885cf.displayName = "Button";

export const Bare_comp_d68d70bae83066966e58f892fd8c806b_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.variant_success_rx_state_
    )
});
Bare_comp_d68d70bae83066966e58f892fd8c806b_a7b885cf.displayName = "Bare";

export const Cond_comp_df838abac9fc8ec47b4dff5121abf9ac_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        (!((reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.variant_success_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_df838abac9fc8ec47b4dff5121abf9ac_a7b885cf.displayName = "Cond";

export const Foreach_comp_aa3b697f2b7724110ecb0f1748df4a51_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.variants_of_selected_rx_state_ ?? [],((v_rx_state_,index_25414cf939a0dc8e8591f06759505638)=>(jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#6B665D" }),key:index_25414cf939a0dc8e8591f06759505638,size:"2"},(v_rx_state_?.["tamanho"]+" \u00b7 "+v_rx_state_?.["cor"]+" \u00b7 SKU "+v_rx_state_?.["sku"]+" \u00b7 estoque "+v_rx_state_?.["quantidade"])))))
    )
});
Foreach_comp_aa3b697f2b7724110ecb0f1748df4a51_a7b885cf.displayName = "Foreach";

export const Cond_comp_ec68a31f3c2dd8a5765c47405db4caa3_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        ((reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.selected_product_id_rx_state_ > 0)?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_ec68a31f3c2dd8a5765c47405db4caa3_a7b885cf.displayName = "Cond";

export const Foreach_comp_d7f1b709d7acb5e13da5a4679dba5f45_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)
const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.products_rx_state_ ?? [],((produto_rx_state_,index_3bf12516eefbb8098726ab24e0dbbae0)=>(jsx(RadixThemesTable.Row,{css:({ ["borderBottom"] : "1px solid #E1E4E9", ["borderLeft"] : (false ? "3px solid #6E1423" : "3px solid transparent"), ["transition"] : "all 0.2s ease", ["&:hover"] : ({ ["backgroundColor"] : "#F1F2F5" }) }),key:index_3bf12516eefbb8098726ab24e0dbbae0},jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},produto_rx_state_?.["nome"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},produto_rx_state_?.["categoria_nome"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},produto_rx_state_?.["preco_label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},produto_rx_state_?.["variantes_count"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},jsx(Fragment,{},(reflex___state____state__vetements___state___auth____auth_state.is_admin_rx_state_?(jsx(Fragment,{},jsx(RadixThemesButton,{onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.select_product", ({ ["produto_id"] : produto_rx_state_?.["id"] }), ({  })))], [_e], ({  })))),size:"1",variant:"soft"},"Varia\u00e7\u00f5es"))):(jsx(Fragment,{},)))))))))
    )
});
Foreach_comp_d7f1b709d7acb5e13da5a4679dba5f45_a7b885cf.displayName = "Foreach";

export const Cond_comp_0cbe89534eb7c924a41ba3b5d657c3f4_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        ((reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.products_rx_state_.length > 0)?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_0cbe89534eb7c924a41ba3b5d657c3f4_a7b885cf.displayName = "Cond";

export const Cond_comp_1c7a5b458f4db80900fa82b3b61c1577_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        (reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.is_loading_page_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_1c7a5b458f4db80900fa82b3b61c1577_a7b885cf.displayName = "Cond";
