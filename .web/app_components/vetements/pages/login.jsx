
import {ReflexEvent,applyEventActions,isNotNullOrUndefined,isTrue} from "$/utils/state"
import {StateContexts,addEvents} from "$/utils/context"
import {Fragment,memo,useCallback,useContext,useEffect} from "react"
import {jsx} from "@emotion/react"
import DebounceInput from "react-debounce-input"
import {Button as RadixThemesButton,TextField as RadixThemesTextField} from "@radix-ui/themes"








export const Bare_comp_50000de5e9441d16ecf724eed90d6160_abbe39ac = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        reflex___state____state__vetements___state___auth____auth_state.login_error_rx_state_
    )
});
Bare_comp_50000de5e9441d16ecf724eed90d6160_abbe39ac.displayName = "Bare";

export const Cond_comp_ec295e2f98292d71acee29c869192eae_abbe39ac = memo(({children}) => {
    const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        (!((reflex___state____state__vetements___state___auth____auth_state.login_error_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_ec295e2f98292d71acee29c869192eae_abbe39ac.displayName = "Cond";

export const Debounceinput_debounceinput_ff28f84e1e0846955c6177ae4dc54bd1_abbe39ac = memo(({children}) => {
    const on_change_4d696528b566de939334185ad829e203 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.set_login_email", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_4d696528b566de939334185ad829e203,placeholder:"voce@vetements.com",value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state.login_email_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state.login_email_rx_state_ : "")},)
    )
});
Debounceinput_debounceinput_ff28f84e1e0846955c6177ae4dc54bd1_abbe39ac.displayName = "DebounceInput";

export const Debounceinput_debounceinput_56ae85201565ff42ccefc47fbfc1f34a_abbe39ac = memo(({children}) => {
    const on_change_59fd2981f62e2e5bb961b281a22db9d0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.set_login_senha", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])
const reflex___state____state__vetements___state___auth____auth_state = useContext(StateContexts.reflex___state____state__vetements___state___auth____auth_state)



    return(
        jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_59fd2981f62e2e5bb961b281a22db9d0,type:"password",value:(isNotNullOrUndefined(reflex___state____state__vetements___state___auth____auth_state.login_senha_rx_state_) ? reflex___state____state__vetements___state___auth____auth_state.login_senha_rx_state_ : "")},)
    )
});
Debounceinput_debounceinput_56ae85201565ff42ccefc47fbfc1f34a_abbe39ac.displayName = "DebounceInput";

export const Button_button_56ff7c12a412a04ab1f8d3cc92fee4ba_abbe39ac = memo(({children}) => {
    const on_click_7f8762006374db934a9233a52231777e = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.vetements___state___auth____auth_state.login", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{css:({ ["backgroundColor"] : "#6E1423", ["color"] : "white", ["width"] : "100%" }),onClick:on_click_7f8762006374db934a9233a52231777e},children)
    )
});
Button_button_56ff7c12a412a04ab1f8d3cc92fee4ba_abbe39ac.displayName = "Button";
