
import {ReflexEvent,applyEventActions,isTrue} from "$/utils/state"
import {Box as RadixThemesBox,Button as RadixThemesButton,Flex as RadixThemesFlex,IconButton as RadixThemesIconButton,Link as RadixThemesLink,Table as RadixThemesTable,Text as RadixThemesText} from "@radix-ui/themes"
import {ClientSide,StateContexts,addEvents} from "$/utils/context"
import {Fragment,memo,useCallback,useContext,useEffect} from "react"
import {jsx} from "@emotion/react"
import {Link as ReactRouterLink} from "react-router"
import LucideLayoutDashboard from "lucide-react/dist/esm/icons/layout-dashboard.mjs"
import LucideShirt from "lucide-react/dist/esm/icons/shirt.mjs"
import LucidePackage from "lucide-react/dist/esm/icons/package.mjs"
import LucideReceipt from "lucide-react/dist/esm/icons/receipt.mjs"
import LucideUsers from "lucide-react/dist/esm/icons/users.mjs"
import {Bar as RechartsBar,CartesianGrid as RechartsCartesianGrid,Line as RechartsLine,ResponsiveContainer as RechartsResponsiveContainer,Tooltip as RechartsTooltip,XAxis as RechartsXAxis,YAxis as RechartsYAxis} from "recharts"

const RechartsBarChart = ClientSide(() => import('recharts').then((mod) => mod.BarChart), "RechartsBarChart")
const RechartsLineChart = ClientSide(() => import('recharts').then((mod) => mod.LineChart), "RechartsLineChart")






export const Box_box_abc55a20e129793b59234eb0338273c7_1473eb75 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesBox,{css:({ ["backgroundColor"] : "rgba(26, 24, 21, 0.35)", ["position"] : "fixed", ["top"] : "0", ["left"] : "0", ["width"] : "100vw", ["height"] : "100vh", ["zIndex"] : "40" }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},)
    )
});
Box_box_abc55a20e129793b59234eb0338273c7_1473eb75.displayName = "Box";

export const Cond_comp_65443c3810dd2cf69e9797fa5a363cec_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___components___shell____shell_state = useContext(StateContexts.reflex___state____state__vetements___components___shell____shell_state)



    return(
        (reflex___state____state__vetements___components___shell____shell_state.sidebar_open_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_65443c3810dd2cf69e9797fa5a363cec_1473eb75.displayName = "Cond";

export const Link_link_338c2ac82a34c3fffd67b5c98779bdcf_1473eb75 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideLayoutDashboard,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Dashboard"))))
    )
});
Link_link_338c2ac82a34c3fffd67b5c98779bdcf_1473eb75.displayName = "Link";

export const Link_link_b156310230aba91de101b6b7128c1e0b_1473eb75 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideLayoutDashboard,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Dashboard"))))
    )
});
Link_link_b156310230aba91de101b6b7128c1e0b_1473eb75.displayName = "Link";

export const Cond_comp_502fc95db9f80f5e608b732915450d96_1473eb75 = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_502fc95db9f80f5e608b732915450d96_1473eb75.displayName = "Cond";

export const Link_link_08f9a7cd5d13cf33adeb5bf8baff9d10_1473eb75 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/produtos"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideShirt,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Produtos"))))
    )
});
Link_link_08f9a7cd5d13cf33adeb5bf8baff9d10_1473eb75.displayName = "Link";

export const Link_link_1f4b90b28726d6880b0307dc1b046772_1473eb75 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/produtos"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideShirt,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Produtos"))))
    )
});
Link_link_1f4b90b28726d6880b0307dc1b046772_1473eb75.displayName = "Link";

export const Cond_comp_aa5f52b7850e5cb4acf689339da8edc7_1473eb75 = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/produtos"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_aa5f52b7850e5cb4acf689339da8edc7_1473eb75.displayName = "Cond";

export const Link_link_9cf2c9c05db4cfc5e41a1a8252cf3408_1473eb75 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/estoque"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucidePackage,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Estoque"))))
    )
});
Link_link_9cf2c9c05db4cfc5e41a1a8252cf3408_1473eb75.displayName = "Link";

export const Link_link_3e9e5b146f207edcf0c3ccecc1223104_1473eb75 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/estoque"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucidePackage,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Estoque"))))
    )
});
Link_link_3e9e5b146f207edcf0c3ccecc1223104_1473eb75.displayName = "Link";

export const Cond_comp_0a7267143915d363dd000d321d1295d3_1473eb75 = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/estoque"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_0a7267143915d363dd000d321d1295d3_1473eb75.displayName = "Cond";

export const Link_link_eb582514259b684cca4bc50110fb7f86_1473eb75 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/vendas"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideReceipt,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Vendas"))))
    )
});
Link_link_eb582514259b684cca4bc50110fb7f86_1473eb75.displayName = "Link";

export const Link_link_e5c702088abc08907e6edc8ddd4b7541_1473eb75 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/vendas"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideReceipt,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Vendas"))))
    )
});
Link_link_e5c702088abc08907e6edc8ddd4b7541_1473eb75.displayName = "Link";

export const Cond_comp_1fd33976a0f4be8d5d63583b370cbfb0_1473eb75 = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/vendas"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_1fd33976a0f4be8d5d63583b370cbfb0_1473eb75.displayName = "Cond";

export const Link_link_6c0cecf820744f3f44b4fd09076527da_1473eb75 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "rgba(255, 255, 255, 0.10)", ["boxShadow"] : "inset 3px 0 0 #E7B7BE", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.10)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/clientes"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideUsers,{css:({ ["color"] : "#E7B7BE" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#FFFFFF", ["fontWeight"] : "600" }),size:"3"},"Clientes"))))
    )
});
Link_link_6c0cecf820744f3f44b4fd09076527da_1473eb75.displayName = "Link";

export const Link_link_55653036e2064afed720ca52a0c4fd38_1473eb75 = memo(({children}) => {
    const on_click_bd9b8371c16e9940d40699c0f9c0f572 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.close_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["transition"] : "background-color 0.15s ease", ["backgroundColor"] : "transparent", ["boxShadow"] : "none", ["textDecoration"] : "none", ["display"] : "flex", ["alignItems"] : "center", ["height"] : "2.5rem", ["padding"] : "0 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)" }) }),onClick:on_click_bd9b8371c16e9940d40699c0f9c0f572},jsx(ReactRouterLink,{to:"/clientes"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"3"},jsx(LucideUsers,{css:({ ["color"] : "rgba(255, 255, 255, 0.72)" }),size:18},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["fontWeight"] : "400" }),size:"3"},"Clientes"))))
    )
});
Link_link_55653036e2064afed720ca52a0c4fd38_1473eb75.displayName = "Link";

export const Cond_comp_2b864549a4a68b24559c291f20b585b5_1473eb75 = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        ((reflex___state____state.router_rx_state_?.["page"]?.["raw_path"]?.valueOf?.() === "/clientes"?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_2b864549a4a68b24559c291f20b585b5_1473eb75.displayName = "Cond";

export const Bare_comp_c3a580bedf1415a3b5e60e5eda6397bc_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state.iniciais_rx_state_
    )
});
Bare_comp_c3a580bedf1415a3b5e60e5eda6397bc_1473eb75.displayName = "Bare";

export const Bare_comp_14a2a83cd2d090706e4125125dbf5156_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state.nome_rx_state_
    )
});
Bare_comp_14a2a83cd2d090706e4125125dbf5156_1473eb75.displayName = "Bare";

export const Bare_comp_b23a33cac0f4c7804c4e5376767bbf33_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state.papel_label_rx_state_
    )
});
Bare_comp_b23a33cac0f4c7804c4e5376767bbf33_1473eb75.displayName = "Bare";

export const Button_button_7c48a7bdf914201894641fc3e5e580a8_1473eb75 = memo(({children}) => {
    const on_click_9e4c3b0d666fae3936a3ea05b396b0b0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.logout", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{color:"gray",css:({ ["color"] : "rgba(255, 255, 255, 0.72)", ["justifyContent"] : "flex-start", ["padding"] : "0 0.75rem", ["height"] : "2.25rem", ["margin"] : "0", ["boxSizing"] : "border-box", ["&:hover"] : ({ ["backgroundColor"] : "rgba(255, 255, 255, 0.06)", ["color"] : "#FFFFFF" }), ["width"] : "100%" }),onClick:on_click_9e4c3b0d666fae3936a3ea05b396b0b0,size:"2",variant:"ghost"},children)
    )
});
Button_button_7c48a7bdf914201894641fc3e5e580a8_1473eb75.displayName = "Button";

export const Vstack_flex_079e4e3cf9693f15a8b8cc8e4e960a60_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___components___shell____shell_state = useContext(StateContexts.reflex___state____state__vetements___components___shell____shell_state)



    return(
        jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["backgroundColor"] : "#2A0A12", ["@media (max-width: 768px)"] : ({ ["position"] : "fixed", ["left"] : "0", ["top"] : "0", ["zIndex"] : "50", ["boxShadow"] : "0 0 24px rgba(26, 24, 21, 0.18)", ["transform"] : (reflex___state____state__vetements___components___shell____shell_state.sidebar_open_rx_state_ ? "translateX(0)" : "translateX(-100%)"), ["transition"] : "transform 0.2s ease" }), ["width"] : "240px", ["minWidth"] : "240px", ["height"] : "100vh", ["padding"] : "1.25rem 1rem", ["alignItems"] : "start", ["position"] : "sticky", ["top"] : "0" }),direction:"column",gap:"0"},children)
    )
});
Vstack_flex_079e4e3cf9693f15a8b8cc8e4e960a60_1473eb75.displayName = "VStack";

export const Iconbutton_iconbutton_268210dc79e202908c88d7f4f9e8091d_1473eb75 = memo(({children}) => {
    const on_click_f317130a899c54241a90a0245bb80061 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___components___shell____shell_state.toggle_sidebar", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesIconButton,{color:"gray",css:({ ["padding"] : "6px" }),onClick:on_click_f317130a899c54241a90a0245bb80061,variant:"ghost"},children)
    )
});
Iconbutton_iconbutton_268210dc79e202908c88d7f4f9e8091d_1473eb75.displayName = "IconButton";

export const Bare_comp_a33d263623703ae1e32b5fd4045d75bd_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.load_error_rx_state_
    )
});
Bare_comp_a33d263623703ae1e32b5fd4045d75bd_1473eb75.displayName = "Bare";

export const Bare_comp_7bdee29f8ed5b076c1a9f15d4e169b8f_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.total_products_rx_state_
    )
});
Bare_comp_7bdee29f8ed5b076c1a9f15d4e169b8f_1473eb75.displayName = "Bare";

export const Bare_comp_4593ebcc3e67373b50ba7bdc44f56aee_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.low_stock_count_rx_state_
    )
});
Bare_comp_4593ebcc3e67373b50ba7bdc44f56aee_1473eb75.displayName = "Bare";

export const Bare_comp_d2c89d29a7cd1e6114c3f05f5b4ee6ca_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.total_sold_month_label_rx_state_
    )
});
Bare_comp_d2c89d29a7cd1e6114c3f05f5b4ee6ca_1473eb75.displayName = "Bare";

export const Bare_comp_0bf71b6bca378dee4e0e3fb073f1a8f2_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.month_trend_label_rx_state_
    )
});
Bare_comp_0bf71b6bca378dee4e0e3fb073f1a8f2_1473eb75.displayName = "Bare";

export const Cond_comp_a8fad164834fea4c832d0859eb161cfe_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        (reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.month_trend_up_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_a8fad164834fea4c832d0859eb161cfe_1473eb75.displayName = "Cond";

export const Cond_comp_001d57c04fb6870d021f93bc7abe5040_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        (reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.has_month_trend_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_001d57c04fb6870d021f93bc7abe5040_1473eb75.displayName = "Cond";

export const Bare_comp_f14dd6ed431474adadf595acee3c4b09_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.total_customers_rx_state_
    )
});
Bare_comp_f14dd6ed431474adadf595acee3c4b09_1473eb75.displayName = "Bare";

export const Responsivecontainer_responsivecontainer_7aad52bdcf30aaee6264523199a2c8c9_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        jsx(RechartsResponsiveContainer,{height:260,minHeight:10,minWidth:10,width:"100%"},jsx(RechartsLineChart,{data:reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.sales_by_day_rx_state_,height:"100%",width:"100%"},jsx(RechartsCartesianGrid,{stroke:"var(--gray-7)",strokeDasharray:"3 3"},),jsx(RechartsXAxis,{dataKey:"dia",stroke:"var(--gray-9)"},),jsx(RechartsYAxis,{stroke:"var(--gray-9)"},),jsx(RechartsTooltip,{contentStyle:({ ["background"] : "var(--gray-1)", ["borderColor"] : "var(--gray-4)", ["borderRadius"] : "8px" }),cursor:({ ["strokeWidth"] : 1, ["fill"] : "var(--gray-3)" }),itemStyle:({ ["color"] : "var(--gray-12)" }),labelStyle:({ ["color"] : "var(--gray-11)" })},),jsx(RechartsLine,{activeDot:({ ["stroke"] : "var(--accent-2)", ["fill"] : "var(--accent-10)" }),dataKey:"total",dot:({ ["stroke"] : "var(--accent-10)", ["fill"] : "var(--accent-4)" }),stroke:"#6E1423",strokeWidth:2,type:"monotone"},)))
    )
});
Responsivecontainer_responsivecontainer_7aad52bdcf30aaee6264523199a2c8c9_1473eb75.displayName = "ResponsiveContainer";

export const Responsivecontainer_responsivecontainer_b1ee8b2e3089b1e547318507a47ae2f3_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        jsx(RechartsResponsiveContainer,{height:260,minHeight:10,minWidth:10,width:"100%"},jsx(RechartsBarChart,{data:reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.products_by_category_rx_state_,height:"100%",width:"100%"},jsx(RechartsCartesianGrid,{stroke:"var(--gray-7)",strokeDasharray:"3 3"},),jsx(RechartsXAxis,{dataKey:"categoria",stroke:"var(--gray-9)"},),jsx(RechartsYAxis,{allowDecimals:false,stroke:"var(--gray-9)"},),jsx(RechartsTooltip,{contentStyle:({ ["background"] : "var(--gray-1)", ["borderColor"] : "var(--gray-4)", ["borderRadius"] : "8px" }),cursor:({ ["strokeWidth"] : 1, ["fill"] : "var(--gray-3)" }),itemStyle:({ ["color"] : "var(--gray-12)" }),labelStyle:({ ["color"] : "var(--gray-11)" })},),jsx(RechartsBar,{dataKey:"quantidade",fill:"#3A5A8C",radius:[6, 6, 0, 0]},)))
    )
});
Responsivecontainer_responsivecontainer_b1ee8b2e3089b1e547318507a47ae2f3_1473eb75.displayName = "ResponsiveContainer";

export const Foreach_comp_84095fb818771ce765e0b4b97e798d66_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.recent_sales_rx_state_ ?? [],((venda_rx_state_,index_762134c0de21aebcb4e9bfa57dbd8d5b)=>(jsx(RadixThemesTable.Row,{css:({ ["borderBottom"] : "1px solid #E1E4E9", ["borderLeft"] : (false ? "3px solid #6E1423" : "3px solid transparent"), ["transition"] : "all 0.2s ease", ["&:hover"] : ({ ["backgroundColor"] : "#F1F2F5" }) }),key:index_762134c0de21aebcb4e9bfa57dbd8d5b},jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},venda_rx_state_?.["data_label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},venda_rx_state_?.["cliente"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},venda_rx_state_?.["responsavel"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.5rem", ["paddingBottom"] : "0.5rem", ["color"] : "#1A1815" })},venda_rx_state_?.["total_label"])))))
    )
});
Foreach_comp_84095fb818771ce765e0b4b97e798d66_1473eb75.displayName = "Foreach";

export const Cond_comp_f5a9d947133a1d3826c80aa4eaa08b57_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        ((reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.recent_sales_rx_state_.length > 0)?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_f5a9d947133a1d3826c80aa4eaa08b57_1473eb75.displayName = "Cond";

export const Cond_comp_f589707e605331ac9c8c359ed89f1abd_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        (!((reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.load_error_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_f589707e605331ac9c8c359ed89f1abd_1473eb75.displayName = "Cond";

export const Cond_comp_8508a2c87e226bce6e7bb7ec423a5cde_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        (reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.is_loading_page_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_8508a2c87e226bce6e7bb7ec423a5cde_1473eb75.displayName = "Cond";
