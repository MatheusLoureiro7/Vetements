
import {ReflexEvent,applyEventActions,isNotNullOrUndefined,isTrue} from "$/utils/state"
import {Button as RadixThemesButton,Flex as RadixThemesFlex,Link as RadixThemesLink,Table as RadixThemesTable,Text as RadixThemesText,TextField as RadixThemesTextField} from "@radix-ui/themes"
import {StateContexts,addEvents} from "$/utils/context"
import {Fragment,memo,useCallback,useContext,useEffect} from "react"
import {Link as ReactRouterLink} from "react-router"
import LucideLayoutDashboard from "lucide-react/dist/esm/icons/layout-dashboard.mjs"
import LucideShirt from "lucide-react/dist/esm/icons/shirt.mjs"
import LucidePackage from "lucide-react/dist/esm/icons/package.mjs"
import LucideReceipt from "lucide-react/dist/esm/icons/receipt.mjs"
import LucideUsers from "lucide-react/dist/esm/icons/users.mjs"
import {jsx} from "@emotion/react"
import DebounceInput from "react-debounce-input"








export const Link_link_4cd50d83ee35373dd1e072f197931b2f_23db2c7c = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["backgroundColor"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/"?.valueOf?.()) ? "#F1E4E1" : "transparent"), ["textDecoration"] : "none", ["padding"] : "0.5rem 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"2"},jsx(LucideLayoutDashboard,{css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/"?.valueOf?.()) ? "#6E1423" : "#6B665D") }),size:16},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/"?.valueOf?.()) ? "#6E1423" : "#1A1815"), ["fontWeight"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/"?.valueOf?.()) ? "600" : "400") }),size:"3"},"Dashboard"))))
    )
});
Link_link_4cd50d83ee35373dd1e072f197931b2f_23db2c7c.displayName = "Link";

export const Link_link_96dd182a6043f51bc2360f41219983ce_23db2c7c = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["backgroundColor"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/produtos"?.valueOf?.()) ? "#F1E4E1" : "transparent"), ["textDecoration"] : "none", ["padding"] : "0.5rem 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/produtos"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"2"},jsx(LucideShirt,{css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/produtos"?.valueOf?.()) ? "#6E1423" : "#6B665D") }),size:16},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/produtos"?.valueOf?.()) ? "#6E1423" : "#1A1815"), ["fontWeight"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/produtos"?.valueOf?.()) ? "600" : "400") }),size:"3"},"Produtos"))))
    )
});
Link_link_96dd182a6043f51bc2360f41219983ce_23db2c7c.displayName = "Link";

export const Link_link_4d684eec7fac1faf17b6d1dad1cf27e0_23db2c7c = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["backgroundColor"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/estoque"?.valueOf?.()) ? "#F1E4E1" : "transparent"), ["textDecoration"] : "none", ["padding"] : "0.5rem 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/estoque"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"2"},jsx(LucidePackage,{css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/estoque"?.valueOf?.()) ? "#6E1423" : "#6B665D") }),size:16},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/estoque"?.valueOf?.()) ? "#6E1423" : "#1A1815"), ["fontWeight"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/estoque"?.valueOf?.()) ? "600" : "400") }),size:"3"},"Estoque"))))
    )
});
Link_link_4d684eec7fac1faf17b6d1dad1cf27e0_23db2c7c.displayName = "Link";

export const Link_link_a8e544140e4e126cd0d5983c0761f711_23db2c7c = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["backgroundColor"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/vendas"?.valueOf?.()) ? "#F1E4E1" : "transparent"), ["textDecoration"] : "none", ["padding"] : "0.5rem 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/vendas"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"2"},jsx(LucideReceipt,{css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/vendas"?.valueOf?.()) ? "#6E1423" : "#6B665D") }),size:16},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/vendas"?.valueOf?.()) ? "#6E1423" : "#1A1815"), ["fontWeight"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/vendas"?.valueOf?.()) ? "600" : "400") }),size:"3"},"Vendas"))))
    )
});
Link_link_a8e544140e4e126cd0d5983c0761f711_23db2c7c.displayName = "Link";

export const Link_link_5575b88e34c09ee6947431db395cf580_23db2c7c = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["backgroundColor"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/clientes"?.valueOf?.()) ? "#F1E4E1" : "transparent"), ["textDecoration"] : "none", ["padding"] : "0.5rem 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/clientes"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"2"},jsx(LucideUsers,{css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/clientes"?.valueOf?.()) ? "#6E1423" : "#6B665D") }),size:16},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/clientes"?.valueOf?.()) ? "#6E1423" : "#1A1815"), ["fontWeight"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/clientes"?.valueOf?.()) ? "600" : "400") }),size:"3"},"Clientes"))))
    )
});
Link_link_5575b88e34c09ee6947431db395cf580_23db2c7c.displayName = "Link";

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

export const Button_button_3c7370fe4b8fbd10664da711e404fc2e_23db2c7c = memo(({children}) => {
    const on_click_9e4c3b0d666fae3936a3ea05b396b0b0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.logout", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{color:"gray",onClick:on_click_9e4c3b0d666fae3936a3ea05b396b0b0,size:"1",variant:"ghost"},children)
    )
});
Button_button_3c7370fe4b8fbd10664da711e404fc2e_23db2c7c.displayName = "Button";

export const Button_button_b46dbbc6cf60f90b8c62177b1f587a40_23db2c7c = memo(({children}) => {
    const on_click_1c37b35a6df81a0c6fe3c56a9a86a8e6 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___customers____customers_state.toggle_form", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{onClick:on_click_1c37b35a6df81a0c6fe3c56a9a86a8e6,size:"2"},children)
    )
});
Button_button_b46dbbc6cf60f90b8c62177b1f587a40_23db2c7c.displayName = "Button";

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

export const Button_button_cbb18208ef0a06b7a8cf40fcdb2f5319_23db2c7c = memo(({children}) => {
    const on_click_0115765a98d1b871a5025f4ffb5276fe = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___customers____customers_state.create_customer", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{css:({ ["backgroundColor"] : "#6E1423", ["color"] : "white", ["borderRadius"] : "6px", ["boxShadow"] : "0 1px 2px rgba(26, 24, 21, 0.04), 0 4px 12px rgba(26, 24, 21, 0.06)", ["transition"] : "box-shadow 0.15s ease, transform 0.15s ease", ["&:hover"] : ({ ["boxShadow"] : "0 0 0 3px rgba(110, 20, 35, 0.12)", ["transform"] : "translateY(-1px)" }), ["&:focus-visible"] : ({ ["boxShadow"] : "0 0 0 3px rgba(110, 20, 35, 0.12)" }) }),onClick:on_click_0115765a98d1b871a5025f4ffb5276fe},children)
    )
});
Button_button_cbb18208ef0a06b7a8cf40fcdb2f5319_23db2c7c.displayName = "Button";

export const Cond_comp_afb0fed549b809af8972000d357ee255_23db2c7c = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state)



    return(
        (reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.show_form_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_afb0fed549b809af8972000d357ee255_23db2c7c.displayName = "Cond";

export const Foreach_comp_d934f614f46bd3be3de47d59524c89f2_23db2c7c = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.customers_rx_state_ ?? [],((c_rx_state_,index_ea38ba42aed0509d6ccb85008441344d)=>(jsx(RadixThemesTable.Row,{css:({ ["borderBottom"] : "1px solid #E1E4E9", ["borderLeft"] : (false ? "3px solid #6E1423" : "3px solid transparent") }),key:index_ea38ba42aed0509d6ccb85008441344d},jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},c_rx_state_?.["nome"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},c_rx_state_?.["telefone"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},c_rx_state_?.["email"])))))
    )
});
Foreach_comp_d934f614f46bd3be3de47d59524c89f2_23db2c7c.displayName = "Foreach";

export const Cond_comp_ce31260b814ce5dfd25755afad8273b0_23db2c7c = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state)



    return(
        ((reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.customers_rx_state_.length > 0)?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_ce31260b814ce5dfd25755afad8273b0_23db2c7c.displayName = "Cond";
