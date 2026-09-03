
import {ReflexEvent,applyEventActions,isNotNullOrUndefined,isTrue} from "$/utils/state"
import {StateContexts,addEvents} from "$/utils/context"
import {Fragment,memo,useCallback,useContext,useEffect} from "react"
import {jsx} from "@emotion/react"
import {Button as RadixThemesButton,Select as RadixThemesSelect,Table as RadixThemesTable,TextField as RadixThemesTextField} from "@radix-ui/themes"
import DebounceInput from "react-debounce-input"








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

export const Foreach_comp_dd914526f04c645b130f6ba0738f3aa5_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.cart_rx_state_ ?? [],((item_rx_state_,index_70aaef6d7ef3aa3b9268adafe45ebcae)=>(jsx(RadixThemesTable.Row,{css:({ ["borderBottom"] : "1px solid #DDD8CC", ["borderLeft"] : (false ? "3px solid #6E1423" : "3px solid transparent") }),key:index_70aaef6d7ef3aa3b9268adafe45ebcae},jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},item_rx_state_?.["label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},item_rx_state_?.["quantidade"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},item_rx_state_?.["subtotal_label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},jsx(RadixThemesButton,{onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___sales____sales_state.remove_item", ({ ["variacao_id"] : item_rx_state_?.["variacao_id"] }), ({  })))], [_e], ({  })))),size:"1",variant:"ghost"},"Remover"))))))
    )
});
Foreach_comp_dd914526f04c645b130f6ba0738f3aa5_c7d0729d.displayName = "Foreach";

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

export const Button_button_f0c12550045997db13881128486d62bf_c7d0729d = memo(({children}) => {
    const on_click_a4de794beb0ee18020d972e042fb592c = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___sales____sales_state.confirm_sale", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{css:({ ["backgroundColor"] : "#6E1423", ["color"] : "white", ["marginTop"] : "0.5rem" }),onClick:on_click_a4de794beb0ee18020d972e042fb592c},children)
    )
});
Button_button_f0c12550045997db13881128486d62bf_c7d0729d.displayName = "Button";

export const Foreach_comp_b6c78d53f4db032f310d1d08f4847759_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.history_rx_state_ ?? [],((venda_rx_state_,index_762134c0de21aebcb4e9bfa57dbd8d5b)=>(jsx(RadixThemesTable.Row,{css:({ ["borderBottom"] : "1px solid #DDD8CC", ["borderLeft"] : (false ? "3px solid #6E1423" : "3px solid transparent") }),key:index_762134c0de21aebcb4e9bfa57dbd8d5b},jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},venda_rx_state_?.["data_label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},venda_rx_state_?.["cliente"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},venda_rx_state_?.["itens_label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},venda_rx_state_?.["total_label"])))))
    )
});
Foreach_comp_b6c78d53f4db032f310d1d08f4847759_c7d0729d.displayName = "Foreach";

export const Cond_comp_ee478337d8e3143bce62684451b6a85e_c7d0729d = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state)



    return(
        ((reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.history_rx_state_.length > 0)?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_ee478337d8e3143bce62684451b6a85e_c7d0729d.displayName = "Cond";
