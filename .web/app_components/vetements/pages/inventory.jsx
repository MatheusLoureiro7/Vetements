
import {ReflexEvent,applyEventActions,isNotNullOrUndefined,isTrue} from "$/utils/state"
import {StateContexts,addEvents} from "$/utils/context"
import {Fragment,memo,useCallback,useContext,useEffect} from "react"
import {jsx} from "@emotion/react"
import {Button as RadixThemesButton,Table as RadixThemesTable,TextField as RadixThemesTextField} from "@radix-ui/themes"
import DebounceInput from "react-debounce-input"








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

export const Button_button_3c7370fe4b8fbd10664da711e404fc2e_41993b85 = memo(({children}) => {
    const on_click_9e4c3b0d666fae3936a3ea05b396b0b0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.logout", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{color:"gray",onClick:on_click_9e4c3b0d666fae3936a3ea05b396b0b0,size:"1",variant:"ghost"},children)
    )
});
Button_button_3c7370fe4b8fbd10664da711e404fc2e_41993b85.displayName = "Button";

export const Debounceinput_debounceinput_ac0f76d9478b28785b9d974845661f24_41993b85 = memo(({children}) => {
    const on_change_624fd339ce8cfbd7e5f6ee4d5d5d3ea0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.vetements___state___inventory____inventory_state.set_search", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state)



    return(
        jsx(DebounceInput,{css:({ ["maxWidth"] : "320px", ["marginBottom"] : "1.5rem" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_624fd339ce8cfbd7e5f6ee4d5d5d3ea0,placeholder:"Buscar por produto ou SKU...",value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state.search_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state.search_rx_state_ : "")},)
    )
});
Debounceinput_debounceinput_ac0f76d9478b28785b9d974845661f24_41993b85.displayName = "DebounceInput";

export const Foreach_comp_aef0446adeec39f6637f4c8a78755318_41993b85 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state.variants_rx_state_ ?? [],((v_rx_state_,index_8ea21678ac1994f9b6fe5c5207f50369)=>(jsx(RadixThemesTable.Row,{css:({ ["borderBottom"] : "1px solid #DDD8CC", ["borderLeft"] : (v_rx_state_?.["is_low"] ? "3px solid #6E1423" : "3px solid transparent") }),key:index_8ea21678ac1994f9b6fe5c5207f50369},jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},v_rx_state_?.["produto_nome"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},v_rx_state_?.["tamanho"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},v_rx_state_?.["cor"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},v_rx_state_?.["sku"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},v_rx_state_?.["quantidade"])))))
    )
});
Foreach_comp_aef0446adeec39f6637f4c8a78755318_41993b85.displayName = "Foreach";

export const Cond_comp_2cec12a4a675b7796aebfaae90e8c7a3_41993b85 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state)



    return(
        ((reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state.variants_rx_state_.length > 0)?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_2cec12a4a675b7796aebfaae90e8c7a3_41993b85.displayName = "Cond";
