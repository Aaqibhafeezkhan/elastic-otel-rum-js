/**
 * @param {BrowserSdkConfiguration} cfg
 * @returns {{
 *      shutdown: () => Promise<void>;
 * }}
 */
export function startBrowserSdk(cfg?: BrowserSdkConfiguration): {
    shutdown: () => Promise<void>;
};
export type InstrumentationsConfigMap = {
    "navigation": import("@opentelemetry/browser-instrumentation/experimental/navigation").NavigationInstrumentationConfig & { enabled?: boolean | undefined; };
    "navigation-timing": import("@opentelemetry/browser-instrumentation/experimental/navigation-timing").NavigationTimingInstrumentationConfig & { enabled?: boolean | undefined; };
    "resource-timing": import("@opentelemetry/browser-instrumentation/experimental/resource-timing").ResourceTimingInstrumentationConfig & { enabled?: boolean | undefined; };
    "fetch": import("@opentelemetry/browser-instrumentation/experimental/fetch").FetchInstrumentationConfig & { enabled?: boolean | undefined; };
    "user-action": import("@opentelemetry/browser-instrumentation/experimental/user-action").UserActionInstrumentationConfig & { enabled?: boolean | undefined; };
    "xhr": import("@opentelemetry/browser-instrumentation/experimental/xhr").XhrInstrumentationConfig & { enabled?: boolean | undefined; };
    "errors": import("@opentelemetry/browser-instrumentation/experimental/errors").ErrorsInstrumentationConfig & { enabled?: boolean | undefined; };
    "web-vitals": import("@opentelemetry/browser-instrumentation/experimental/web-vitals").WebVitalsInstrumentationConfig & { enabled?: boolean | undefined; };
};
/**
 * Configuration that is defined in upstream SDK
 */
export type SdkConfig = {
    disabled?: boolean | undefined;
    logLevel?: "warn" | "none" | "error" | "info" | "debug" | "verbose" | "all" | undefined;
    serviceName?: string | undefined;
    serviceVersion?: string | undefined;
    resourceAttributes?: import("@opentelemetry/api").Attributes | undefined;
    exportConfig?: {
        url?: string;
        headers?: Record<string, string>;
    } | undefined;
};
/**
 * Configuration properties that are only in EDOT
 */
export type EdotConfig = {
    instrumentations?: Partial<InstrumentationsConfigMap> | undefined;
    disableInstrumentations?: (keyof InstrumentationsConfigMap)[] | undefined;
    session?: import("./session.js").SessionConfig | undefined;
};
export type BrowserSdkConfiguration = SdkConfig & EdotConfig;
export type DefaultConfigProps = "logLevel" | "serviceName" | "resourceAttributes" | "exportConfig";
