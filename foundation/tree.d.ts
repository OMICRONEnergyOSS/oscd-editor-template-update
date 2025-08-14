import { LNodeDescription } from '@openenergytools/scl-lib';
export declare function buildLNodeTree(selectedLNodeTypeClass: string, lNodeType: Element, doc: XMLDocument): {
    tree: LNodeDescription | undefined;
    unsupportedDOs: string[];
};
