
import {ReflexEvent,applyEventActions,isNotNullOrUndefined,isTrue} from "$/utils/state"
import {StateContexts,addEvents} from "$/utils/context"
import {Fragment,memo,useCallback,useContext,useEffect} from "react"
import {jsx} from "@emotion/react"
import {Button as RadixThemesButton,Select as RadixThemesSelect,Table as RadixThemesTable,Text as RadixThemesText,TextArea as RadixThemesTextArea,TextField as RadixThemesTextField} from "@radix-ui/themes"
import DebounceInput from "react-debounce-input"








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

export const Button_button_3c7370fe4b8fbd10664da711e404fc2e_a7b885cf = memo(({children}) => {
    const on_click_9e4c3b0d666fae3936a3ea05b396b0b0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.logout", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{color:"gray",onClick:on_click_9e4c3b0d666fae3936a3ea05b396b0b0,size:"1",variant:"ghost"},children)
    )
});
Button_button_3c7370fe4b8fbd10664da711e404fc2e_a7b885cf.displayName = "Button";

export const Button_button_24f28d3d572810711a382444deced9ff_a7b885cf = memo(({children}) => {
    const on_click_07732961a467cf327bf7386a9646bc94 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.toggle_form", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{onClick:on_click_07732961a467cf327bf7386a9646bc94,size:"2"},children)
    )
});
Button_button_24f28d3d572810711a382444deced9ff_a7b885cf.displayName = "Button";

export const Cond_comp_5ed51ce33b8435e705539c48d1a16d55_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        (reflex___state____state__vetements___state___auth____auth_state.is_admin_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_5ed51ce33b8435e705539c48d1a16d55_a7b885cf.displayName = "Cond";

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

export const Debounceinput_debounceinput_3bc42a6d14154bddbc55b48c32397bd2_a7b885cf = memo(({children}) => {
    const on_change_9704c11c0cf60911ca8b98f3ec8337a4 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.set_form_preco", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_9704c11c0cf60911ca8b98f3ec8337a4,placeholder:"0,00",value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.form_preco_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.form_preco_rx_state_ : "")},)
    )
});
Debounceinput_debounceinput_3bc42a6d14154bddbc55b48c32397bd2_a7b885cf.displayName = "DebounceInput";

export const Debounceinput_debounceinput_69e26bdd05627c6576dd4047c1bcd8dd_a7b885cf = memo(({children}) => {
    const on_change_5f98e982f528a873ab174383800a2b78 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.set_form_descricao", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextArea,onChange:on_change_5f98e982f528a873ab174383800a2b78,value:reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.form_descricao_rx_state_},)
    )
});
Debounceinput_debounceinput_69e26bdd05627c6576dd4047c1bcd8dd_a7b885cf.displayName = "DebounceInput";

export const Button_button_cd683323c1ee70a9eb0a55fffb5a164b_a7b885cf = memo(({children}) => {
    const on_click_dc0b7a7da9801a7d677280df59c27cc8 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.create_product", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{css:({ ["backgroundColor"] : "#6E1423", ["color"] : "white" }),onClick:on_click_dc0b7a7da9801a7d677280df59c27cc8},children)
    )
});
Button_button_cd683323c1ee70a9eb0a55fffb5a164b_a7b885cf.displayName = "Button";

export const Cond_comp_eafab6ec514ca558805f52fbf0a84322_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        (reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.show_form_rx_state_?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_eafab6ec514ca558805f52fbf0a84322_a7b885cf.displayName = "Cond";

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

export const Button_button_ffcad13178e1693242bdf2ca9dd4285d_a7b885cf = memo(({children}) => {
    const on_click_b67c5fc803be66d378e1b15756944931 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.add_variant", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{css:({ ["alignSelf"] : "end" }),onClick:on_click_b67c5fc803be66d378e1b15756944931},children)
    )
});
Button_button_ffcad13178e1693242bdf2ca9dd4285d_a7b885cf.displayName = "Button";

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

export const Foreach_comp_f55d621d6215a102156322f788c76ebe_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)
const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.products_rx_state_ ?? [],((produto_rx_state_,index_3bf12516eefbb8098726ab24e0dbbae0)=>(jsx(RadixThemesTable.Row,{css:({ ["borderBottom"] : "1px solid #DDD8CC", ["borderLeft"] : (false ? "3px solid #6E1423" : "3px solid transparent") }),key:index_3bf12516eefbb8098726ab24e0dbbae0},jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},produto_rx_state_?.["nome"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},produto_rx_state_?.["categoria_nome"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},produto_rx_state_?.["preco_label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},produto_rx_state_?.["variantes_count"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},jsx(Fragment,{},(reflex___state____state__vetements___state___auth____auth_state.is_admin_rx_state_?(jsx(Fragment,{},jsx(RadixThemesButton,{onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state.select_product", ({ ["produto_id"] : produto_rx_state_?.["id"] }), ({  })))], [_e], ({  })))),size:"1",variant:"soft"},"Varia\u00e7\u00f5es"))):(jsx(Fragment,{},)))))))))
    )
});
Foreach_comp_f55d621d6215a102156322f788c76ebe_a7b885cf.displayName = "Foreach";

export const Cond_comp_0cbe89534eb7c924a41ba3b5d657c3f4_a7b885cf = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state)



    return(
        ((reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.products_rx_state_.length > 0)?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_0cbe89534eb7c924a41ba3b5d657c3f4_a7b885cf.displayName = "Cond";
