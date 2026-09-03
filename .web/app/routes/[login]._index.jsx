import {Flex as RadixThemesFlex,Grid as RadixThemesGrid,Heading as RadixThemesHeading,Text as RadixThemesText} from "@radix-ui/themes"
import {Bare_comp_50000de5e9441d16ecf724eed90d6160_abbe39ac,Button_button_56ff7c12a412a04ab1f8d3cc92fee4ba_abbe39ac,Cond_comp_ec295e2f98292d71acee29c869192eae_abbe39ac,Debounceinput_debounceinput_56ae85201565ff42ccefc47fbfc1f34a_abbe39ac,Debounceinput_debounceinput_ff28f84e1e0846955c6177ae4dc54bd1_abbe39ac} from "$/app_components/vetements/pages/login"
import {Fragment,useEffect} from "react"
import {jsx} from "@emotion/react"





function Component() {





  return (
    jsx(Fragment,{},jsx(RadixThemesGrid,{columns:"2",css:({ ["@media (max-width: 768px)"] : ({ ["gridTemplateColumns"] : "1fr" }), ["width"] : "100%" })},jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["backgroundColor"] : "#F7F5F0", ["width"] : "100%", ["height"] : "100vh", ["paddingInlineStart"] : "3rem", ["paddingInlineEnd"] : "3rem" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "start" }),direction:"column",gap:"2"},jsx(RadixThemesHeading,{css:({ ["fontFamily"] : "Fraunces, 'Iowan Old Style', serif", ["--default-font-family"] : "Fraunces, 'Iowan Old Style', serif", ["fontWeight"] : "500", ["color"] : "#6E1423", ["letterSpacing"] : "-0.01em", ["fontSize"] : "3rem" })},"VETEMENTS"),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#6B665D" }),size:"4"},"Gest\u00e3o da loja"))),jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["backgroundColor"] : "#FFFFFF", ["width"] : "100%", ["height"] : "100vh" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "320px" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{css:({ ["fontFamily"] : "Fraunces, 'Iowan Old Style', serif", ["--default-font-family"] : "Fraunces, 'Iowan Old Style', serif", ["fontWeight"] : "500", ["color"] : "#1A1815", ["letterSpacing"] : "-0.01em" }),size:"6"},"Entrar"),jsx(Fragment,{},jsx(Cond_comp_ec295e2f98292d71acee29c869192eae_abbe39ac,{},jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#6E1423" }),size:"2"},jsx(Bare_comp_50000de5e9441d16ecf724eed90d6160_abbe39ac,{},))),jsx(Fragment,{},))),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "start", ["width"] : "100%" }),direction:"column",gap:"1"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#6B665D" }),size:"2",weight:"medium"},"E-mail"),jsx(Debounceinput_debounceinput_ff28f84e1e0846955c6177ae4dc54bd1_abbe39ac,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "start", ["width"] : "100%" }),direction:"column",gap:"1"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#6B665D" }),size:"2",weight:"medium"},"Senha"),jsx(Debounceinput_debounceinput_56ae85201565ff42ccefc47fbfc1f34a_abbe39ac,{},)),jsx(Button_button_56ff7c12a412a04ab1f8d3cc92fee4ba_abbe39ac,{},"Entrar"),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#6B665D" }),size:"1"},"Dados mockados nesta fase \u2014 nenhuma informa\u00e7\u00e3o real \u00e9 enviada.")))),jsx("title",{},"Vetements | Login"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}
Component.displayName = "Component(login)";

export default Component;
