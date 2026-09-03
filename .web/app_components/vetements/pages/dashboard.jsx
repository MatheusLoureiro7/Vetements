
import {ReflexEvent,applyEventActions,isTrue} from "$/utils/state"
import {StateContexts,addEvents} from "$/utils/context"
import {Fragment,memo,useCallback,useContext,useEffect} from "react"
import {jsx} from "@emotion/react"
import {Button as RadixThemesButton,Table as RadixThemesTable} from "@radix-ui/themes"








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

export const Foreach_comp_0b2f3c0725e283d20970122248fa214b_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        Array.prototype.map.call(reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.recent_sales_rx_state_ ?? [],((venda_rx_state_,index_762134c0de21aebcb4e9bfa57dbd8d5b)=>(jsx(RadixThemesTable.Row,{css:({ ["borderBottom"] : "1px solid #DDD8CC", ["borderLeft"] : (false ? "3px solid #6E1423" : "3px solid transparent") }),key:index_762134c0de21aebcb4e9bfa57dbd8d5b},jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},venda_rx_state_?.["data_label"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},venda_rx_state_?.["cliente"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},venda_rx_state_?.["responsavel"]),jsx(RadixThemesTable.Cell,{css:({ ["paddingTop"] : "0.65rem", ["paddingBottom"] : "0.65rem", ["color"] : "#1A1815" })},venda_rx_state_?.["total_label"])))))
    )
});
Foreach_comp_0b2f3c0725e283d20970122248fa214b_1473eb75.displayName = "Foreach";

export const Cond_comp_f5a9d947133a1d3826c80aa4eaa08b57_1473eb75 = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state)



    return(
        ((reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.recent_sales_rx_state_.length > 0)?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_f5a9d947133a1d3826c80aa4eaa08b57_1473eb75.displayName = "Cond";
