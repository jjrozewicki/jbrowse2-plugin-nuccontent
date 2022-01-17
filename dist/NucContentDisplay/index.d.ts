import React from "react";
import PluginManager from "@jbrowse/core/PluginManager";
export declare function configSchemaFactory(pluginManager: PluginManager): import("@jbrowse/core/configuration/configurationSchema").AnyConfigurationSchemaType;
export declare function stateModelFactory(pluginManager: PluginManager, configSchema: any): import("mobx-state-tree").IModelType<{
    id: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ISimpleType<string>, [undefined]>;
    type: import("mobx-state-tree").ISimpleType<string>;
    rpcDriverName: import("mobx-state-tree").IMaybe<import("mobx-state-tree").ISimpleType<string>>;
} & {
    height: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ISimpleType<number>, [undefined]>;
    blockState: import("mobx-state-tree").IMapType<import("mobx-state-tree").IModelType<{
        key: import("mobx-state-tree").ISimpleType<string>;
        region: import("mobx-state-tree").IModelType<{
            refName: import("mobx-state-tree").ISimpleType<string>;
            start: import("mobx-state-tree").ISimpleType<number>;
            end: import("mobx-state-tree").ISimpleType<number>;
            reversed: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ISimpleType<boolean>, [undefined]>;
        } & {
            assemblyName: import("mobx-state-tree").ISimpleType<string>;
        }, {
            setRefName(newRefName: string): void;
        }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>;
        reloadFlag: import("mobx-state-tree").IType<number | undefined, number, number>;
        isLeftEndOfDisplayedRegion: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        isRightEndOfDisplayedRegion: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    }, {
        renderInProgress: AbortController | undefined;
        filled: boolean;
        reactElement: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        features: Map<string, import("@jbrowse/core/util/simpleFeature").Feature> | undefined;
        layout: any;
        status: string;
        error: unknown;
        message: string | undefined;
        maxHeightReached: boolean;
        ReactComponent: ({ model, }: {
            model: any;
        }) => any;
        renderProps: any;
    } & {
        doReload(): void;
        afterAttach(): void;
        setStatus(message: string): void;
        setLoading(abortController: AbortController): void;
        setMessage(messageText: string): void;
        setRendered(props: {
            reactElement: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
            features: Map<string, import("@jbrowse/core/util/simpleFeature").Feature>;
            layout: any;
            maxHeightReached: boolean;
            renderProps: any;
        } | undefined): void;
        setError(error: unknown): void;
        reload(): void;
        beforeDestroy(): void;
    }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>;
    userBpPerPxLimit: import("mobx-state-tree").IMaybe<import("mobx-state-tree").ISimpleType<number>>;
} & {
    type: import("mobx-state-tree").ISimpleType<"LinearWiggleDisplay">;
    configuration: import("mobx-state-tree").ITypeUnion<any, any, any>;
    selectedRendering: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ISimpleType<string>, [undefined]>;
    resolution: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ISimpleType<number>, [undefined]>;
    fill: import("mobx-state-tree").IMaybe<import("mobx-state-tree").ISimpleType<boolean>>;
    color: import("mobx-state-tree").IMaybe<import("mobx-state-tree").ISimpleType<string>>;
    summaryScoreMode: import("mobx-state-tree").IMaybe<import("mobx-state-tree").ISimpleType<string>>;
    rendererTypeNameState: import("mobx-state-tree").IMaybe<import("mobx-state-tree").ISimpleType<string>>;
    scale: import("mobx-state-tree").IMaybe<import("mobx-state-tree").ISimpleType<string>>;
    autoscale: import("mobx-state-tree").IMaybe<import("mobx-state-tree").ISimpleType<string>>;
    displayCrossHatches: import("mobx-state-tree").IMaybe<import("mobx-state-tree").ISimpleType<boolean>>;
    constraints: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IModelType<{
        max: import("mobx-state-tree").IMaybe<import("mobx-state-tree").ISimpleType<number>>;
        min: import("mobx-state-tree").IMaybe<import("mobx-state-tree").ISimpleType<number>>;
    }, {}, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>, [undefined]>;
} & {
    type: import("mobx-state-tree").ISimpleType<"NucContentDisplay">;
}, {
    rendererTypeName: string;
    error: unknown;
} & {
    readonly RenderingComponent: React.FC<{
        model: {
            id: string;
            type: string;
            rpcDriverName: string | undefined;
        } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
            rendererTypeName: string;
            error: unknown;
        } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
            id: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ISimpleType<string>, [undefined]>;
            type: import("mobx-state-tree").ISimpleType<string>;
            rpcDriverName: import("mobx-state-tree").IMaybe<import("mobx-state-tree").ISimpleType<string>>;
        }, {
            rendererTypeName: string;
            error: unknown;
        }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>;
        onHorizontalScroll?: Function | undefined;
        blockState?: Record<string, any> | undefined;
    }>;
    readonly DisplayBlurb: React.FC<{
        model: {
            id: string;
            type: string;
            rpcDriverName: string | undefined;
        } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
            rendererTypeName: string;
            error: unknown;
        } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
            id: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ISimpleType<string>, [undefined]>;
            type: import("mobx-state-tree").ISimpleType<string>;
            rpcDriverName: import("mobx-state-tree").IMaybe<import("mobx-state-tree").ISimpleType<string>>;
        }, {
            rendererTypeName: string;
            error: unknown;
        }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>;
    }> | null;
    readonly adapterConfig: any;
    readonly parentTrack: any;
    renderProps(): any;
    readonly rendererType: any;
    readonly DisplayMessageComponent: React.FC<any> | undefined;
    trackMenuItems(): import("@jbrowse/core/ui").MenuItem[];
    readonly viewMenuActions: import("@jbrowse/core/ui").MenuItem[];
    regionCannotBeRendered(): undefined;
} & {
    setError(error?: unknown): void;
    setRpcDriverName(rpcDriverName: string): void;
    reload(): void;
} & {
    message: string;
    featureIdUnderMouse: string | undefined;
    contextMenuFeature: import("@jbrowse/core/util/simpleFeature").Feature | undefined;
    scrollTop: number;
} & {
    readonly blockType: "staticBlocks" | "dynamicBlocks";
    readonly blockDefinitions: import("@jbrowse/core/util/blockTypes").BlockSet;
} & {
    readonly maxViewBpPerPx: any;
    readonly renderDelay: number;
    readonly TooltipComponent: React.FC<any>;
    readonly selectedFeatureId: string | undefined;
    readonly DisplayMessageComponent: React.FC<any> | undefined;
} & {
    readonly features: import("@jbrowse/core/util/compositeMap").default<string, import("@jbrowse/core/util/simpleFeature").Feature>;
    readonly featureUnderMouse: import("@jbrowse/core/util/simpleFeature").Feature | undefined;
    getFeatureOverlapping(blockKey: string, x: number, y: number): any;
    getFeatureByID(blockKey: string, id: string): [number, number, number, number] | undefined;
    searchFeatureByID(id: string): [number, number, number, number] | undefined;
} & {
    afterAttach(): void;
    setHeight(displayHeight: number): number;
    resizeHeight(distance: number): number;
    setScrollTop(scrollTop: number): void;
    setUserBpPerPxLimit(limit: number): void;
    setMessage(message: string): void;
    addBlock(key: string, block: import("@jbrowse/core/util/blockTypes").BaseBlock): void;
    deleteBlock(key: string): void;
    selectFeature(feature: import("@jbrowse/core/util/simpleFeature").Feature): void;
    clearFeatureSelection(): void;
    setFeatureIdUnderMouse(feature: string | undefined): void;
    reload(): void;
    setContextMenuFeature(feature?: import("@jbrowse/core/util/simpleFeature").Feature | undefined): void;
} & {
    regionCannotBeRenderedText(_region: import("@jbrowse/core/util").Region): "" | "Zoom in to see features";
    regionCannotBeRendered(_region: import("@jbrowse/core/util").Region): JSX.Element | undefined;
    trackMenuItems(): import("@jbrowse/core/ui").MenuItem[];
    contextMenuItems(): {
        label: string;
        icon: any;
        onClick: () => void;
    }[];
    renderProps(): any;
} & {
    renderSvg(opts: import("@jbrowse/plugin-linear-genome-view/src/LinearGenomeView").ExportSvgOptions & {
        overrideHeight: number;
    }): Promise<JSX.Element>;
} & {
    ready: boolean;
    message: string | undefined;
    stats: any;
    statsFetchInProgress: AbortController | undefined;
} & {
    updateStats(stats: {
        scoreMin: number;
        scoreMax: number;
    }): void;
    setColor(color: string): void;
    setLoading(aborter: AbortController): void;
    selectFeature(feature: import("@jbrowse/core/util/simpleFeature").Feature): void;
    setResolution(res: number): void;
    setFill(fill: boolean): void;
    toggleLogScale(): void;
    setScaleType(scale?: string | undefined): void;
    setSummaryScoreMode(val: string): void;
    setAutoscale(val: string): void;
    setMaxScore(val?: number | undefined): void;
    setRendererType(val: string): void;
    setMinScore(val?: number | undefined): void;
    toggleCrossHatches(): void;
    setCrossHatches(cross: boolean): void;
} & {
    readonly TooltipComponent: React.FC<{}>;
    readonly adapterTypeName: any;
    readonly rendererTypeName: string;
    readonly filters: undefined;
    readonly scaleType: any;
    readonly filled: any;
    readonly maxScore: any;
    readonly minScore: any;
    readonly rendererConfig: any;
} & {
    readonly summaryScoreModeSetting: any;
    readonly domain: number[];
    readonly needsScalebar: boolean;
    readonly scaleOpts: {
        domain: number[];
        stats: any;
        autoscaleType: any;
        scaleType: any;
        inverted: any;
    };
    readonly canHaveFill: boolean;
    readonly autoscaleType: any;
    readonly displayCrossHatchesSetting: any;
} & {
    readonly ticks: any;
} & {
    renderProps(): any;
    readonly adapterCapabilities: string[];
    readonly hasResolution: boolean;
    readonly hasGlobalStats: boolean;
} & {
    trackMenuItems(): (import("@jbrowse/core/ui").MenuDivider | import("@jbrowse/core/ui").MenuSubHeader | import("@jbrowse/core/ui").NormalMenuItem | import("@jbrowse/core/ui").CheckboxMenuItem | import("@jbrowse/core/ui").RadioMenuItem | import("@jbrowse/core/ui").SubMenuItem | {
        type: string;
        label: string;
        checked: any;
        onClick: () => void;
    })[];
} & {
    reload(): Promise<void>;
    afterAttach(): void;
    renderSvg(opts: import("@jbrowse/plugin-linear-genome-view/src/LinearGenomeView").ExportSvgOptions & {
        overrideHeight: number;
    }): Promise<JSX.Element>;
} & {
    trackMenuItems(): (import("@jbrowse/core/ui").MenuDivider | import("@jbrowse/core/ui").MenuSubHeader | import("@jbrowse/core/ui").NormalMenuItem | import("@jbrowse/core/ui").CheckboxMenuItem | import("@jbrowse/core/ui").RadioMenuItem | import("@jbrowse/core/ui").SubMenuItem | {
        label: string;
        onClick: () => void;
    })[];
}, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>;
export declare type NucContentDisplayModel = ReturnType<typeof stateModelFactory>;
