
import {ReflexEvent,applyEventActions,isTrue} from "$/utils/state"
import {Button as RadixThemesButton,Flex as RadixThemesFlex,Link as RadixThemesLink,Table as RadixThemesTable,Text as RadixThemesText} from "@radix-ui/themes"
import {ClientSide,StateContexts,addEvents} from "$/utils/context"
import {Fragment,memo,useCallback,useContext,useEffect} from "react"
import {Link as ReactRouterLink} from "react-router"
import LucideLayoutDashboard from "lucide-react/dist/esm/icons/layout-dashboard.mjs"
import LucideShirt from "lucide-react/dist/esm/icons/shirt.mjs"
import LucidePackage from "lucide-react/dist/esm/icons/package.mjs"
import LucideReceipt from "lucide-react/dist/esm/icons/receipt.mjs"
import LucideUsers from "lucide-react/dist/esm/icons/users.mjs"
import {jsx} from "@emotion/react"
import {Bar as RechartsBar,CartesianGrid as RechartsCartesianGrid,Line as RechartsLine,ResponsiveContainer as RechartsResponsiveContainer,Tooltip as RechartsTooltip,XAxis as RechartsXAxis,YAxis as RechartsYAxis} from "recharts"

const RechartsBarChart = ClientSide(() => import('recharts').then((mod) => mod.BarChart), "RechartsBarChart")
const RechartsLineChart = ClientSide(() => import('recharts').then((mod) => mod.LineChart), "RechartsLineChart")






export const Link_link_4cd50d83ee35373dd1e072f197931b2f_1473eb75 = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["backgroundColor"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/"?.valueOf?.()) ? "#F1E4E1" : "transparent"), ["textDecoration"] : "none", ["padding"] : "0.5rem 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"2"},jsx(LucideLayoutDashboard,{css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/"?.valueOf?.()) ? "#6E1423" : "#6B665D") }),size:16},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/"?.valueOf?.()) ? "#6E1423" : "#1A1815"), ["fontWeight"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/"?.valueOf?.()) ? "600" : "400") }),size:"3"},"Dashboard"))))
    )
});
Link_link_4cd50d83ee35373dd1e072f197931b2f_1473eb75.displayName = "Link";

export const Link_link_96dd182a6043f51bc2360f41219983ce_1473eb75 = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["backgroundColor"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/produtos"?.valueOf?.()) ? "#F1E4E1" : "transparent"), ["textDecoration"] : "none", ["padding"] : "0.5rem 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/produtos"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"2"},jsx(LucideShirt,{css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/produtos"?.valueOf?.()) ? "#6E1423" : "#6B665D") }),size:16},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/produtos"?.valueOf?.()) ? "#6E1423" : "#1A1815"), ["fontWeight"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/produtos"?.valueOf?.()) ? "600" : "400") }),size:"3"},"Produtos"))))
    )
});
Link_link_96dd182a6043f51bc2360f41219983ce_1473eb75.displayName = "Link";

export const Link_link_4d684eec7fac1faf17b6d1dad1cf27e0_1473eb75 = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["backgroundColor"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/estoque"?.valueOf?.()) ? "#F1E4E1" : "transparent"), ["textDecoration"] : "none", ["padding"] : "0.5rem 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/estoque"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"2"},jsx(LucidePackage,{css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/estoque"?.valueOf?.()) ? "#6E1423" : "#6B665D") }),size:16},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/estoque"?.valueOf?.()) ? "#6E1423" : "#1A1815"), ["fontWeight"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/estoque"?.valueOf?.()) ? "600" : "400") }),size:"3"},"Estoque"))))
    )
});
Link_link_4d684eec7fac1faf17b6d1dad1cf27e0_1473eb75.displayName = "Link";

export const Link_link_a8e544140e4e126cd0d5983c0761f711_1473eb75 = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["backgroundColor"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/vendas"?.valueOf?.()) ? "#F1E4E1" : "transparent"), ["textDecoration"] : "none", ["padding"] : "0.5rem 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/vendas"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"2"},jsx(LucideReceipt,{css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/vendas"?.valueOf?.()) ? "#6E1423" : "#6B665D") }),size:16},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/vendas"?.valueOf?.()) ? "#6E1423" : "#1A1815"), ["fontWeight"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/vendas"?.valueOf?.()) ? "600" : "400") }),size:"3"},"Vendas"))))
    )
});
Link_link_a8e544140e4e126cd0d5983c0761f711_1473eb75.displayName = "Link";

export const Link_link_5575b88e34c09ee6947431db395cf580_1473eb75 = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["backgroundColor"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/clientes"?.valueOf?.()) ? "#F1E4E1" : "transparent"), ["textDecoration"] : "none", ["padding"] : "0.5rem 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/clientes"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"2"},jsx(LucideUsers,{css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/clientes"?.valueOf?.()) ? "#6E1423" : "#6B665D") }),size:16},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/clientes"?.valueOf?.()) ? "#6E1423" : "#1A1815"), ["fontWeight"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/clientes"?.valueOf?.()) ? "600" : "400") }),size:"3"},"Clientes"))))
    )
});
Link_link_5575b88e34c09ee6947431db395cf580_1473eb75.displayName = "Link";

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

export const Button_button_3c7370fe4b8fbd10664da711e404fc2e_1473eb75 = memo(({children}) => {
    const on_click_9e4c3b0d666fae3936a3ea05b396b0b0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.logout", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{color:"gray",onClick:on_click_9e4c3b0d666fae3936a3ea05b396b0b0,size:"1",variant:"ghost"},children)
    )
});
Button_button_3c7370fe4b8fbd10664da711e404fc2e_1473eb75.displayName = "Button";

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

export const Foreach_comp_db9d8436ee8f9abf81161993f9f224b2_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.recent_sales_rx_state_ ?? [],((venda_rx_state_,index_762134c0de21aebcb4e9bfa57dbd8d5b)=>(jsx(RadixThemesTable.Row,{css:({ ["borderBottom"] : "1px solid #E1E4E9", ["borderLeft"] : (false ? "3px solid #6E1423" : "3px solid transparent") }),key:index_762134c0de21aebcb4e9bfa57dbd8d5b},jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},venda_rx_state_?.["data_label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},venda_rx_state_?.["cliente"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},venda_rx_state_?.["responsavel"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},venda_rx_state_?.["total_label"])))))
    )
});
Foreach_comp_db9d8436ee8f9abf81161993f9f224b2_1473eb75.displayName = "Foreach";

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
