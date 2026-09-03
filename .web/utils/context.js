import React, { createContext, useContext, useMemo, useReducer, useState, createElement, useEffect } from "react"
import { applyDelta, ReflexEvent, hydrateClientStorage, useEventLoop, refs } from "$/utils/state"
import { jsx } from "@emotion/react";

// Disable React dev-build owner-stack capture: the per-element Error()
// dominates dev-mode render CPU on large pages. Costs owner frames in
// `React.captureOwnerStack()`; set REFLEX_REACT_OWNER_STACKS=1 to restore.
// Full context: https://github.com/reflex-dev/reflex/pull/6905
if (typeof window !== "undefined") {
  try {
    const reactInternals =
      React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    const ownerStackCounterKey = "recentlyCreatedOwnerStacks";
    if (
      reactInternals &&
      typeof reactInternals[ownerStackCounterKey] === "number"
    ) {
      Object.defineProperty(reactInternals, ownerStackCounterKey, {
        get: () => 1e9,
        set: () => {},
        configurable: true,
      });
    }
  } catch {}
}

export const initialState = {"reflex___state____state": {"is_hydrated_rx_state_": false, "router_rx_state_": {"session": {"client_token": "", "client_ip": "", "session_id": ""}, "headers": {"host": "", "origin": "", "upgrade": "", "connection": "", "cookie": "", "pragma": "", "cache_control": "", "user_agent": "", "sec_websocket_version": "", "sec_websocket_key": "", "sec_websocket_extensions": "", "accept_encoding": "", "accept_language": "", "raw_headers": {}}, "page": {"host": "", "path": "", "raw_path": "", "full_path": "", "full_raw_path": "", "params": {}}, "url": {"scheme": "", "netloc": "", "origin": "://", "path": "", "query": "", "query_parameters": {}, "fragment": "", "href": ""}, "route_id": ""}}, "reflex___state____state.reflex___istate___shared____shared_state_base_internal": {}, "reflex___state____state.reflex___state____frontend_event_exception_state": {}, "reflex___state____state.reflex___state____on_load_internal_state": {}, "reflex___state____state.reflex___state____update_vars_internal_state": {}, "reflex___state____state.vetements___state___auth____auth_state": {"is_admin_rx_state_": false, "is_authenticated_rx_state_": false, "login_email_rx_state_": "", "login_error_rx_state_": "", "login_senha_rx_state_": "", "nome_rx_state_": "", "papel_rx_state_": "", "papel_label_rx_state_": "Vendedor", "user_id_rx_state_": 0}, "reflex___state____state.vetements___state___auth____auth_state.vetements___state___customers____customers_state": {"customers_rx_state_": [], "form_email_rx_state_": "", "form_error_rx_state_": "", "form_nome_rx_state_": "", "form_telefone_rx_state_": "", "search_rx_state_": "", "show_form_rx_state_": false}, "reflex___state____state.vetements___state___auth____auth_state.vetements___state___dashboard____dashboard_state": {"low_stock_count_rx_state_": 0, "recent_sales_rx_state_": [], "total_customers_rx_state_": 0, "total_products_rx_state_": 0, "total_sold_month_label_rx_state_": "R$ 0,00"}, "reflex___state____state.vetements___state___auth____auth_state.vetements___state___inventory____inventory_state": {"search_rx_state_": "", "variants_rx_state_": []}, "reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state": {"categories_rx_state_": [], "form_categoria_id_rx_state_": "", "form_descricao_rx_state_": "", "form_error_rx_state_": "", "form_nome_rx_state_": "", "form_preco_rx_state_": "", "products_rx_state_": [], "search_rx_state_": "", "selected_product_id_rx_state_": 0, "show_form_rx_state_": false, "variant_cor_rx_state_": "", "variant_error_rx_state_": "", "variant_quantidade_rx_state_": "", "variant_sku_rx_state_": "", "variant_tamanho_rx_state_": "", "variants_of_selected_rx_state_": []}, "reflex___state____state.vetements___state___auth____auth_state.vetements___state___sales____sales_state": {"cart_rx_state_": [], "customers_rx_state_": [], "history_rx_state_": [], "item_error_rx_state_": "", "item_quantidade_rx_state_": "", "sale_error_rx_state_": "", "sale_success_rx_state_": "", "selected_cliente_id_rx_state_": "", "selected_variant_id_rx_state_": "", "total_label_rx_state_": "R$ 0,00", "variant_options_rx_state_": []}}

export const defaultColorMode = "light"
export const ColorModeContext = createContext({
  colorMode: defaultColorMode,
  resolvedColorMode: defaultColorMode === "dark" ? "dark" : "light",
  toggleColorMode: () => {},
  setColorMode: () => {},
});
export const UploadFilesContext = createContext(null);
export const DispatchContext = createContext(null);
export const StateContexts = {reflex___state____state: createContext(null),reflex___state____state__reflex___istate___shared____shared_state_base_internal: createContext(null),reflex___state____state__reflex___state____frontend_event_exception_state: createContext(null),reflex___state____state__reflex___state____on_load_internal_state: createContext(null),reflex___state____state__reflex___state____update_vars_internal_state: createContext(null),reflex___state____state__vetements___state___auth____auth_state: createContext(null),reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state: createContext(null),reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state: createContext(null),reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state: createContext(null),reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state: createContext(null),reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state: createContext(null),};
export const EventLoopContext = createContext(null);
export const clientStorage = {"cookies": {}, "local_storage": {}, "session_storage": {}}

ColorModeContext.displayName = "ColorModeContext";
UploadFilesContext.displayName = "UploadFilesContext";
DispatchContext.displayName = "DispatchContext";
EventLoopContext.displayName = "EventLoopContext";
StateContexts.reflex___state____state.displayName = "StateContext(reflex___state____state)";
StateContexts.reflex___state____state__reflex___istate___shared____shared_state_base_internal.displayName = "StateContext(reflex___state____state.reflex___istate___shared____shared_state_base_internal)";
StateContexts.reflex___state____state__reflex___state____frontend_event_exception_state.displayName = "StateContext(reflex___state____state.reflex___state____frontend_event_exception_state)";
StateContexts.reflex___state____state__reflex___state____on_load_internal_state.displayName = "StateContext(reflex___state____state.reflex___state____on_load_internal_state)";
StateContexts.reflex___state____state__reflex___state____update_vars_internal_state.displayName = "StateContext(reflex___state____state.reflex___state____update_vars_internal_state)";
StateContexts.reflex___state____state__vetements___state___auth____auth_state.displayName = "StateContext(reflex___state____state.vetements___state___auth____auth_state)";
StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state.displayName = "StateContext(reflex___state____state.vetements___state___auth____auth_state.vetements___state___customers____customers_state)";
StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state.displayName = "StateContext(reflex___state____state.vetements___state___auth____auth_state.vetements___state___dashboard____dashboard_state)";
StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state.displayName = "StateContext(reflex___state____state.vetements___state___auth____auth_state.vetements___state___inventory____inventory_state)";
StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state.displayName = "StateContext(reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state)";
StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state.displayName = "StateContext(reflex___state____state.vetements___state___auth____auth_state.vetements___state___sales____sales_state)";


export const state_name = "reflex___state____state"

export const exception_state_name = "reflex___state____state.reflex___state____frontend_event_exception_state"

// These events are triggered on initial load and each page navigation.
export const onLoadInternalEvent = () => {
    const internal_events = [];

    // Get tracked cookie and local storage vars to send to the backend.
    const client_storage_vars = hydrateClientStorage(clientStorage);
    // But only send the vars if any are actually set in the browser.
    if (client_storage_vars && Object.keys(client_storage_vars).length !== 0) {
        internal_events.push(
            ReflexEvent(
                'reflex___state____state.reflex___state____update_vars_internal_state.update_vars_internal',
                {vars: client_storage_vars},
            ),
        );
    }

    // `on_load_internal` triggers the correct on_load event(s) for the current page.
    // If the page does not define any on_load event, this will just set `is_hydrated = true`.
    internal_events.push(ReflexEvent('reflex___state____state.reflex___state____on_load_internal_state.on_load_internal'));

    return internal_events;
}

// The following events are sent when the websocket connects or reconnects.
export const initialEvents = () => [
    ReflexEvent('reflex___state____state.hydrate'),
    ...onLoadInternalEvent()
]
    

export const isDevMode = true;

// Module-level event dispatchers populated by ``EventLoopProvider`` on each
// render. Components reach addEvents/connectErrors via this import instead of
// hoisting ``useContext(EventLoopContext)`` so JSX literals (e.g.
// ``ErrorBoundary.onError``) constructed in any JS scope can dispatch events
// without depending on lexical hook hoisting.
let _addEventsImpl = (events, args, event_actions) => {
  console.warn("addEvents called before EventLoopProvider mounted", events);
};
let _connectErrorsImpl = [];

export function addEvents(events, args, event_actions) {
  return _addEventsImpl(events, args, event_actions);
}

export function getConnectErrors() {
  return _connectErrorsImpl;
}

export function UploadFilesProvider({ children }) {
  const [filesById, setFilesById] = useState({})
  refs["__clear_selected_files"] = (id) => setFilesById(filesById => {
    const newFilesById = {...filesById}
    delete newFilesById[id]
    return newFilesById
  })
  return createElement(
    UploadFilesContext.Provider,
    { value: [filesById, setFilesById] },
    children
  );
}

// ``displayName`` is what React DevTools shows for the wrapper; without it
// every client-only component in the tree renders as ``Anonymous``.
export function ClientSide(component, name) {
  function ClientSideComponent({ children, ...props }) {
    const [Component, setComponent] = useState(null);
    useEffect(() => {
      async function load() {
        const comp = await component();
        setComponent(() => comp);
      }
      load();
    }, []);
    return Component ? jsx(Component, props, children) : null;
  }
  ClientSideComponent.displayName = name ? `ClientSide(${name})` : "ClientSide";
  return ClientSideComponent;
}

export function EventLoopProvider({ children }) {
  const dispatch = useContext(DispatchContext)
  const [addEventsLocal, connectErrors] = useEventLoop(
    dispatch,
    initialEvents,
    clientStorage,
  )
  // Populate the module-level dispatchers so JSX literals constructed
  // outside the React-tree path (e.g. ``ErrorBoundary.onError``) can call
  // ``addEvents`` without needing the events hook hoisted in their scope.
  _addEventsImpl = addEventsLocal;
  _connectErrorsImpl = connectErrors;
  return createElement(
    EventLoopContext.Provider,
    { value: [addEventsLocal, connectErrors] },
    children
  );
}

export function StateProvider({ children }) {
  const [reflex___state____state, dispatch_reflex___state____state] = useReducer(applyDelta, initialState["reflex___state____state"])
const [reflex___state____state__reflex___istate___shared____shared_state_base_internal, dispatch_reflex___state____state__reflex___istate___shared____shared_state_base_internal] = useReducer(applyDelta, initialState["reflex___state____state.reflex___istate___shared____shared_state_base_internal"])
const [reflex___state____state__reflex___state____frontend_event_exception_state, dispatch_reflex___state____state__reflex___state____frontend_event_exception_state] = useReducer(applyDelta, initialState["reflex___state____state.reflex___state____frontend_event_exception_state"])
const [reflex___state____state__reflex___state____on_load_internal_state, dispatch_reflex___state____state__reflex___state____on_load_internal_state] = useReducer(applyDelta, initialState["reflex___state____state.reflex___state____on_load_internal_state"])
const [reflex___state____state__reflex___state____update_vars_internal_state, dispatch_reflex___state____state__reflex___state____update_vars_internal_state] = useReducer(applyDelta, initialState["reflex___state____state.reflex___state____update_vars_internal_state"])
const [reflex___state____state__vetements___state___auth____auth_state, dispatch_reflex___state____state__vetements___state___auth____auth_state] = useReducer(applyDelta, initialState["reflex___state____state.vetements___state___auth____auth_state"])
const [reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state, dispatch_reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state] = useReducer(applyDelta, initialState["reflex___state____state.vetements___state___auth____auth_state.vetements___state___customers____customers_state"])
const [reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state, dispatch_reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state] = useReducer(applyDelta, initialState["reflex___state____state.vetements___state___auth____auth_state.vetements___state___dashboard____dashboard_state"])
const [reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state, dispatch_reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state] = useReducer(applyDelta, initialState["reflex___state____state.vetements___state___auth____auth_state.vetements___state___inventory____inventory_state"])
const [reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state, dispatch_reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state] = useReducer(applyDelta, initialState["reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state"])
const [reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state, dispatch_reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state] = useReducer(applyDelta, initialState["reflex___state____state.vetements___state___auth____auth_state.vetements___state___sales____sales_state"])
  const dispatchers = useMemo(() => {
    return {
      "reflex___state____state": dispatch_reflex___state____state,
"reflex___state____state.reflex___istate___shared____shared_state_base_internal": dispatch_reflex___state____state__reflex___istate___shared____shared_state_base_internal,
"reflex___state____state.reflex___state____frontend_event_exception_state": dispatch_reflex___state____state__reflex___state____frontend_event_exception_state,
"reflex___state____state.reflex___state____on_load_internal_state": dispatch_reflex___state____state__reflex___state____on_load_internal_state,
"reflex___state____state.reflex___state____update_vars_internal_state": dispatch_reflex___state____state__reflex___state____update_vars_internal_state,
"reflex___state____state.vetements___state___auth____auth_state": dispatch_reflex___state____state__vetements___state___auth____auth_state,
"reflex___state____state.vetements___state___auth____auth_state.vetements___state___customers____customers_state": dispatch_reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state,
"reflex___state____state.vetements___state___auth____auth_state.vetements___state___dashboard____dashboard_state": dispatch_reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state,
"reflex___state____state.vetements___state___auth____auth_state.vetements___state___inventory____inventory_state": dispatch_reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state,
"reflex___state____state.vetements___state___auth____auth_state.vetements___state___products____products_state": dispatch_reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state,
"reflex___state____state.vetements___state___auth____auth_state.vetements___state___sales____sales_state": dispatch_reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state,
    }
  }, [])

  return (
    createElement(StateContexts.reflex___state____state,{value: reflex___state____state},
createElement(StateContexts.reflex___state____state__reflex___istate___shared____shared_state_base_internal,{value: reflex___state____state__reflex___istate___shared____shared_state_base_internal},
createElement(StateContexts.reflex___state____state__reflex___state____frontend_event_exception_state,{value: reflex___state____state__reflex___state____frontend_event_exception_state},
createElement(StateContexts.reflex___state____state__reflex___state____on_load_internal_state,{value: reflex___state____state__reflex___state____on_load_internal_state},
createElement(StateContexts.reflex___state____state__reflex___state____update_vars_internal_state,{value: reflex___state____state__reflex___state____update_vars_internal_state},
createElement(StateContexts.reflex___state____state__vetements___state___auth____auth_state,{value: reflex___state____state__vetements___state___auth____auth_state},
createElement(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state,{value: reflex___state____state__vetements___state___auth____auth_state__vetements___state___customers____customers_state},
createElement(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state,{value: reflex___state____state__vetements___state___auth____auth_state__vetements___state___dashboard____dashboard_state},
createElement(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state,{value: reflex___state____state__vetements___state___auth____auth_state__vetements___state___inventory____inventory_state},
createElement(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state,{value: reflex___state____state__vetements___state___auth____auth_state__vetements___state___products____products_state},
createElement(StateContexts.reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state,{value: reflex___state____state__vetements___state___auth____auth_state__vetements___state___sales____sales_state},
    createElement(DispatchContext, {value: dispatchers}, children)
    )))))))))))
  )
}