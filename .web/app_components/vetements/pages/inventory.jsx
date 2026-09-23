
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








export const Box_box_abc55a20e129793b59234eb0338273c7_41993b85 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesBox,{css:({ ["backgroundColor"] : "rgba(26, 24, 21, 0.35)", ["position"] : "fixed", ["top"] : "0", ["left"] : "0", ["width"] : "100vw", ["height"] : "100vh", ["zIndex"] : "40" }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},)
    )
});
Box_box_abc55a20e129793b59234eb0338273c7_41993b85.displayName = "Box";

export const Cond_comp_65443c3810dd2cf69e9797fa5a363cec_41993b85 = memo(({children}) => {
    const reflex___state____state__vetements___components___shell____shell_state = useContext(StateContexts.reflex___state____state__vetements___components___shell____shell_state)



    return(
        (reflex___state____state__vetements___components___shell____shell_state.sidebar_open_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_65443c3810dd2cf69e9797fa5a363cec_41993b85.displayName = "Cond";

export const Link_link_338c2ac82a34c3fffd67b5c98779bdcf_41993b85 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideLayoutDashboard,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Dashboard"))))
    )
});
Link_link_338c2ac82a34c3fffd67b5c98779bdcf_41993b85.displayName = "Link";

export const Link_link_b156310230aba91de101b6b7128c1e0b_41993b85 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideLayoutDashboard,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Dashboard"))))
    )
});
Link_link_b156310230aba91de101b6b7128c1e0b_41993b85.displayName = "Link";

export const Cond_comp_502fc95db9f80f5e608b732915450d96_41993b85 = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_502fc95db9f80f5e608b732915450d96_41993b85.displayName = "Cond";

export const Link_link_08f9a7cd5d13cf33adeb5bf8baff9d10_41993b85 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/produtos"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideShirt,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Produtos"))))
    )
});
Link_link_08f9a7cd5d13cf33adeb5bf8baff9d10_41993b85.displayName = "Link";

export const Link_link_1f4b90b28726d6880b0307dc1b046772_41993b85 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/produtos"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideShirt,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Produtos"))))
    )
});
Link_link_1f4b90b28726d6880b0307dc1b046772_41993b85.displayName = "Link";

export const Cond_comp_aa5f52b7850e5cb4acf689339da8edc7_41993b85 = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/produtos"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_aa5f52b7850e5cb4acf689339da8edc7_41993b85.displayName = "Cond";

export const Link_link_9cf2c9c05db4cfc5e41a1a8252cf3408_41993b85 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/estoque"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucidePackage,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Estoque"))))
    )
});
Link_link_9cf2c9c05db4cfc5e41a1a8252cf3408_41993b85.displayName = "Link";

export const Link_link_3e9e5b146f207edcf0c3ccecc1223104_41993b85 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/estoque"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucidePackage,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Estoque"))))
    )
});
Link_link_3e9e5b146f207edcf0c3ccecc1223104_41993b85.displayName = "Link";

export const Cond_comp_0a7267143915d363dd000d321d1295d3_41993b85 = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/estoque"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_0a7267143915d363dd000d321d1295d3_41993b85.displayName = "Cond";

export const Link_link_eb582514259b684cca4bc50110fb7f86_41993b85 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/vendas"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideReceipt,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Vendas"))))
    )
});
Link_link_eb582514259b684cca4bc50110fb7f86_41993b85.displayName = "Link";

export const Link_link_e5c702088abc08907e6edc8ddd4b7541_41993b85 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/vendas"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideReceipt,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Vendas"))))
    )
});
Link_link_e5c702088abc08907e6edc8ddd4b7541_41993b85.displayName = "Link";

export const Cond_comp_1fd33976a0f4be8d5d63583b370cbfb0_41993b85 = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/vendas"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_1fd33976a0f4be8d5d63583b370cbfb0_41993b85.displayName = "Cond";

export const Link_link_6c0cecf820744f3f44b4fd09076527da_41993b85 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/clientes"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideUsers,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Clientes"))))
    )
});
Link_link_6c0cecf820744f3f44b4fd09076527da_41993b85.displayName = "Link";

export const Link_link_55653036e2064afed720ca52a0c4fd38_41993b85 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/clientes"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideUsers,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Clientes"))))
    )
});
Link_link_55653036e2064afed720ca52a0c4fd38_41993b85.displayName = "Link";

export const Cond_comp_2b864549a4a68b24559c291f20b585b5_41993b85 = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/clientes"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_2b864549a4a68b24559c291f20b585b5_41993b85.displayName = "Cond";

export const Bare_comp_c3a580bedf1415a3b5e60e5eda6397bc_41993b85 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state.iniciais_rx_state_
    )
});
Bare_comp_c3a580bedf1415a3b5e60e5eda6397bc_41993b85.displayName = "Bare";

export const Bare_comp_14a2a83cd2d090706e4125125dbf5156_41993b85 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state.nome_rx_state_
    )
});
Bare_comp_14a2a83cd2d090706e4125125dbf5156_41993b85.displayName = "Bare";

export const Bare_comp_b23a33cac0f4c7804c4e5376767bbf33_41993b85 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state.papel_label_rx_state_
    )
});
Bare_comp_b23a33cac0f4c7804c4e5376767bbf33_41993b85.displayName = "Bare";

export const Button_button_7c48a7bdf914201894641fc3e5e580a8_41993b85 = memo(({children}) => {
    const on_click_9e4c3b0d666fae3936a3ea05b396b0b0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.logout", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{color:"gray",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["justifyContent"] : "flex-start", ["padding"] : "0 0.75rem", ["height"] : "2.25rem", ["margin"] : "0", ["boxSizing"] : "border-box", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)", ["color"] : "#FFFFFF" }), ["width"] : "100%" }),onClick:on_click_9e4c3b0d666fae3936a3ea05b396b0b0,size:"2",variant:"ghost"},children)
    )
});
Button_button_7c48a7bdf914201894641fc3e5e580a8_41993b85.displayName = "Button";

export const Vstack_flex_079e4e3cf9693f15a8b8cc8e4e960a60_41993b85 = memo(({children}) => {
    const reflex___state____state__vetements___components___shell____shell_state = useContext(StateContexts.reflex___state____state__vetements___components___shell____shell_state)



    return(
        jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["backgroundColor"] : "#2A0A12", ["@media (max-width: 768px)"] : ({ ["position"] : "fixed", ["left"] : "0", ["top"] : "0", ["zIndex"] : "50", ["boxShadow"] : "0 0 24px rgba(26, 24, 21, 0.18)", ["transform"] : (reflex___state____state__vetements___components___shell____shell_state.sidebar_open_rx_state_ ? "translateX(0)" : "translateX(-100%)"), ["transition"] : "transform 0.2s ease" }), ["width"] : "240px", ["minWidth"] : "240px", ["height"] : "100vh", ["padding"] : "1.25rem 1rem", ["alignItems"] : "start", ["position"] : "sticky", ["top"] : "0" }),direction:"column",gap:"0"},children)
    )
});
Vstack_flex_079e4e3cf9693f15a8b8cc8e4e960a60_41993b85.displayName = "VStack";

export const Iconbutton_iconbutton_268210dc79e202908c88d7f4f9e8091d_41993b85 = memo(({children}) => {
    const on_click_f317130a899c54241a90a0245bb80061 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.toggle_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesIconButton,{color:"gray",css:({ ["padding"] : "6px" }),onClick:on_click_f317130a899c54241a90a0245bb80061,variant:"ghost"},children)
    )
});
Iconbutton_iconbutton_268210dc79e202908c88d7f4f9e8091d_41993b85.displayName = "IconButton";

export const Bare_comp_dfe71b4b1ddfeb8ff9e14b1d625729cc_41993b85 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state.load_error_rx_state_
    )
});
Bare_comp_dfe71b4b1ddfeb8ff9e14b1d625729cc_41993b85.displayName = "Bare";

export const Cond_comp_8f49e5ff7f95855e602b4e82382f6964_41993b85 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state)



    return(
        (!((reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state.load_error_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_8f49e5ff7f95855e602b4e82382f6964_41993b85.displayName = "Cond";

export const Debounceinput_debounceinput_ac0f76d9478b28785b9d974845661f24_41993b85 = memo(({children}) => {
    const on_change_624fd339ce8cfbd7e5f6ee4d5d5d3ea0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___inventory____inventory_state.set_search", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state)



    return(
        jsx(DebounceInput,{css:({ ["maxWidth"] : "320px", ["marginBottom"] : "1.5rem" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_624fd339ce8cfbd7e5f6ee4d5d5d3ea0,placeholder:"Buscar por produto ou SKU...",value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state.search_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state.search_rx_state_ : "")},)
    )
});
Debounceinput_debounceinput_ac0f76d9478b28785b9d974845661f24_41993b85.displayName = "DebounceInput";

export const Foreach_comp_b326020bd230ac2d990551c1e2f5c0b0_41993b85 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state.variants_rx_state_ ?? [],((v_rx_state_,index_8ea21678ac1994f9b6fe5c5207f50369)=>(jsx(RadixThemesTable.Row,{css:({ ["borderBottom"] : "1px solid #E1E4E9", ["borderLeft"] : (v_rx_state_?.["is_low"] ? "3px solid #6E1423" : "3px solid transparent"), ["transition"] : "all 0.2s ease", ["&:hover"] : ({ ["backgroundColor"] : "#F1F2F5" }) }),key:index_8ea21678ac1994f9b6fe5c5207f50369},jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},v_rx_state_?.["produto_nome"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},v_rx_state_?.["tamanho"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},v_rx_state_?.["cor"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},v_rx_state_?.["sku"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},v_rx_state_?.["quantidade"])))))
    )
});
Foreach_comp_b326020bd230ac2d990551c1e2f5c0b0_41993b85.displayName = "Foreach";

export const Cond_comp_2cec12a4a675b7796aebfaae90e8c7a3_41993b85 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state)



    return(
        ((reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state.variants_rx_state_.length > 0)?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_2cec12a4a675b7796aebfaae90e8c7a3_41993b85.displayName = "Cond";

export const Cond_comp_8cb940a0e44250ce22b3357f4472123b_41993b85 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state)



    return(
        (reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state.is_loading_page_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_8cb940a0e44250ce22b3357f4472123b_41993b85.displayName = "Cond";

export const Cond_comp_f0589ac62479bc9523c5daffc24b5baf_41993b85 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state)



    return(
        ((reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state.load_error_rx_state_?.valueOf?.() === ""?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_f0589ac62479bc9523c5daffc24b5baf_41993b85.displayName = "Cond";
