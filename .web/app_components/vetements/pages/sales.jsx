
import {ReflexEvent,applyEventActions,isNotNullOrUndefined,isTrue} from "$/utils/state"
import {Button as RadixThemesButton,Flex as RadixThemesFlex,Link as RadixThemesLink,Select as RadixThemesSelect,Table as RadixThemesTable,Text as RadixThemesText,TextField as RadixThemesTextField} from "@radix-ui/themes"
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








export const Link_link_4cd50d83ee35373dd1e072f197931b2f_c7d0729d = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["backgroundColor"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/"?.valueOf?.()) ? "#F1E4E1" : "transparent"), ["textDecoration"] : "none", ["padding"] : "0.5rem 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"2"},jsx(LucideLayoutDashboard,{css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/"?.valueOf?.()) ? "#6E1423" : "#6B665D") }),size:16},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/"?.valueOf?.()) ? "#6E1423" : "#1A1815"), ["fontWeight"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/"?.valueOf?.()) ? "600" : "400") }),size:"3"},"Dashboard"))))
    )
});
Link_link_4cd50d83ee35373dd1e072f197931b2f_c7d0729d.displayName = "Link";

export const Link_link_96dd182a6043f51bc2360f41219983ce_c7d0729d = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["backgroundColor"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/produtos"?.valueOf?.()) ? "#F1E4E1" : "transparent"), ["textDecoration"] : "none", ["padding"] : "0.5rem 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/produtos"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"2"},jsx(LucideShirt,{css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/produtos"?.valueOf?.()) ? "#6E1423" : "#6B665D") }),size:16},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/produtos"?.valueOf?.()) ? "#6E1423" : "#1A1815"), ["fontWeight"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/produtos"?.valueOf?.()) ? "600" : "400") }),size:"3"},"Produtos"))))
    )
});
Link_link_96dd182a6043f51bc2360f41219983ce_c7d0729d.displayName = "Link";

export const Link_link_4d684eec7fac1faf17b6d1dad1cf27e0_c7d0729d = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["backgroundColor"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/estoque"?.valueOf?.()) ? "#F1E4E1" : "transparent"), ["textDecoration"] : "none", ["padding"] : "0.5rem 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/estoque"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"2"},jsx(LucidePackage,{css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/estoque"?.valueOf?.()) ? "#6E1423" : "#6B665D") }),size:16},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/estoque"?.valueOf?.()) ? "#6E1423" : "#1A1815"), ["fontWeight"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/estoque"?.valueOf?.()) ? "600" : "400") }),size:"3"},"Estoque"))))
    )
});
Link_link_4d684eec7fac1faf17b6d1dad1cf27e0_c7d0729d.displayName = "Link";

export const Link_link_a8e544140e4e126cd0d5983c0761f711_c7d0729d = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["backgroundColor"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/vendas"?.valueOf?.()) ? "#F1E4E1" : "transparent"), ["textDecoration"] : "none", ["padding"] : "0.5rem 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/vendas"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"2"},jsx(LucideReceipt,{css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/vendas"?.valueOf?.()) ? "#6E1423" : "#6B665D") }),size:16},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/vendas"?.valueOf?.()) ? "#6E1423" : "#1A1815"), ["fontWeight"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/vendas"?.valueOf?.()) ? "600" : "400") }),size:"3"},"Vendas"))))
    )
});
Link_link_a8e544140e4e126cd0d5983c0761f711_c7d0729d.displayName = "Link";

export const Link_link_5575b88e34c09ee6947431db395cf580_c7d0729d = memo(({children}) => {
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        jsx(RadixThemesLink,{asChild:true,css:({ ["backgroundColor"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/clientes"?.valueOf?.()) ? "#F1E4E1" : "transparent"), ["textDecoration"] : "none", ["padding"] : "0.5rem 0.75rem", ["width"] : "100%", ["borderRadius"] : "6px", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/clientes"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "center" }),direction:"row",gap:"2"},jsx(LucideUsers,{css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/clientes"?.valueOf?.()) ? "#6E1423" : "#6B665D") }),size:16},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/clientes"?.valueOf?.()) ? "#6E1423" : "#1A1815"), ["fontWeight"] : ((reflex___state____state.router_rx_state_?.["page"]?.["path"]?.valueOf?.() === "/clientes"?.valueOf?.()) ? "600" : "400") }),size:"3"},"Clientes"))))
    )
});
Link_link_5575b88e34c09ee6947431db395cf580_c7d0729d.displayName = "Link";

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

export const Button_button_3c7370fe4b8fbd10664da711e404fc2e_c7d0729d = memo(({children}) => {
    const on_click_9e4c3b0d666fae3936a3ea05b396b0b0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.logout", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{color:"gray",onClick:on_click_9e4c3b0d666fae3936a3ea05b396b0b0,size:"1",variant:"ghost"},children)
    )
});
Button_button_3c7370fe4b8fbd10664da711e404fc2e_c7d0729d.displayName = "Button";

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

export const Foreach_comp_59f66937e12a6878aaf4c851e663b3de_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.cart_rx_state_ ?? [],((item_rx_state_,index_70aaef6d7ef3aa3b9268adafe45ebcae)=>(jsx(RadixThemesTable.Row,{css:({ ["borderBottom"] : "1px solid #E1E4E9", ["borderLeft"] : (false ? "3px solid #6E1423" : "3px solid transparent") }),key:index_70aaef6d7ef3aa3b9268adafe45ebcae},jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},item_rx_state_?.["label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},item_rx_state_?.["quantidade"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},item_rx_state_?.["subtotal_label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},jsx(RadixThemesButton,{onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___sales____sales_state.remove_item", ({ ["variacao_id"] : item_rx_state_?.["variacao_id"] }), ({  })))], [_e], ({  })))),size:"1",variant:"ghost"},"Remover"))))))
    )
});
Foreach_comp_59f66937e12a6878aaf4c851e663b3de_c7d0729d.displayName = "Foreach";

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

export const Button_button_40c4cd413f69ee0554c8995489d92237_c7d0729d = memo(({children}) => {
    const on_click_a4de794beb0ee18020d972e042fb592c = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___sales____sales_state.confirm_sale", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{css:({ ["backgroundColor"] : "#6E1423", ["color"] : "white", ["borderRadius"] : "6px", ["boxShadow"] : "0 1px 2px rgba(26, 24, 21, 0.04), 0 4px 12px rgba(26, 24, 21, 0.06)", ["transition"] : "box-shadow 0.15s ease, transform 0.15s ease", ["&:hover"] : ({ ["boxShadow"] : "0 0 0 3px rgba(110, 20, 35, 0.12)", ["transform"] : "translateY(-1px)" }), ["&:focus-visible"] : ({ ["boxShadow"] : "0 0 0 3px rgba(110, 20, 35, 0.12)" }), ["marginTop"] : "0.5rem" }),onClick:on_click_a4de794beb0ee18020d972e042fb592c},children)
    )
});
Button_button_40c4cd413f69ee0554c8995489d92237_c7d0729d.displayName = "Button";

export const Foreach_comp_c87b0a0e3f906fc2321b78953b88580d_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.history_rx_state_ ?? [],((venda_rx_state_,index_762134c0de21aebcb4e9bfa57dbd8d5b)=>(jsx(RadixThemesTable.Row,{css:({ ["borderBottom"] : "1px solid #E1E4E9", ["borderLeft"] : (false ? "3px solid #6E1423" : "3px solid transparent") }),key:index_762134c0de21aebcb4e9bfa57dbd8d5b},jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},venda_rx_state_?.["data_label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},venda_rx_state_?.["cliente"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},venda_rx_state_?.["itens_label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},venda_rx_state_?.["total_label"])))))
    )
});
Foreach_comp_c87b0a0e3f906fc2321b78953b88580d_c7d0729d.displayName = "Foreach";

export const Cond_comp_ee478337d8e3143bce62684451b6a85e_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        ((reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.history_rx_state_.length > 0)?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_ee478337d8e3143bce62684451b6a85e_c7d0729d.displayName = "Cond";
