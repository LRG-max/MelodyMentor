// shepherd.js@14.5.0 downloaded from https://ga.jspm.io/npm:shepherd.js@14.5.0/dist/esm/shepherd.mjs

/**
 * Checks if `value` is classified as an `Element`.
 * @param value The param to check if it is an Element
 */
function isElement$1(e){return e instanceof Element}
/**
 * Checks if `value` is classified as an `HTMLElement`.
 * @param value The param to check if it is an HTMLElement
 */function isHTMLElement$1(e){return e instanceof HTMLElement}
/**
 * Checks if `value` is classified as a `Function` object.
 * @param value The param to check if it is a function
 */function isFunction(e){return typeof e==="function"}
/**
 * Checks if `value` is classified as a `String` object.
 * @param value The param to check if it is a string
 */function isString(e){return typeof e==="string"}
/**
 * Checks if `value` is undefined.
 * @param value The param to check if it is undefined
 */function isUndefined(e){return e===void 0}class Evented{
/**
   * Adds an event listener for the given event string.
   *
   * @param {string} event
   * @param {Function} handler
   * @param ctx
   * @param {boolean} once
   * @returns
   */
on(e,t,n,o=false){var s;isUndefined(this.bindings)&&(this.bindings={});isUndefined(this.bindings[e])&&(this.bindings[e]=[]);(s=this.bindings[e])==null||s.push({handler:t,ctx:n,once:o});return this}
/**
   * Adds an event listener that only fires once for the given event string.
   *
   * @param {string} event
   * @param {Function} handler
   * @param ctx
   * @returns
   */once(e,t,n){return this.on(e,t,n,true)}
/**
   * Removes an event listener for the given event string.
   *
   * @param {string} event
   * @param {Function} handler
   * @returns
   */off(e,t){if(isUndefined(this.bindings)||isUndefined(this.bindings[e]))return this;if(isUndefined(t))delete this.bindings[e];else{var n;(n=this.bindings[e])==null||n.forEach(((n,o)=>{if(n.handler===t){var s;(s=this.bindings[e])==null||s.splice(o,1)}}))}return this}
/**
   * Triggers an event listener for the given event string.
   *
   * @param {string} event
   * @returns
   */
trigger(e,...t){if(!isUndefined(this.bindings)&&this.bindings[e]){var n;(n=this.bindings[e])==null||n.forEach(((n,o)=>{const{ctx:s,handler:i,once:r}=n;const l=s||this;i.apply(l,t);if(r){var c;(c=this.bindings[e])==null||c.splice(o,1)}}))}return this}}function _extends(){return _extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)({}).hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},_extends.apply(null,arguments)}function _objectWithoutPropertiesLoose(e,t){if(null==e)return{};var n={};for(var o in e)if({}.hasOwnProperty.call(e,o)){if(t.includes(o))continue;n[o]=e[o]}return n}const e={defaultMerge:Symbol("deepmerge-ts: default merge"),skip:Symbol("deepmerge-ts: skip")};({defaultMerge:e.defaultMerge});function defaultMetaDataUpdater(e,t){return t}function defaultFilterValues(e,t){return e.filter((e=>e!==void 0))}var t;(function(e){e[e.NOT=0]="NOT";e[e.RECORD=1]="RECORD";e[e.ARRAY=2]="ARRAY";e[e.SET=3]="SET";e[e.MAP=4]="MAP";e[e.OTHER=5]="OTHER"})(t||(t={}));
/**
 * Get the type of the given object.
 *
 * @param object - The object to get the type of.
 * @returns The type of the given object.
 */function getObjectType(e){return typeof e!=="object"||e===null?0:Array.isArray(e)?2:isRecord(e)?1:e instanceof Set?3:e instanceof Map?4:5}
/**
 * Get the keys of the given objects including symbol keys.
 *
 * Note: Only keys to enumerable properties are returned.
 *
 * @param objects - An array of objects to get the keys of.
 * @returns A set containing all the keys of all the given objects.
 */function getKeys(e){const t=new Set;for(const n of e)for(const e of[...Object.keys(n),...Object.getOwnPropertySymbols(n)])t.add(e);return t}
/**
 * Does the given object have the given property.
 *
 * @param object - The object to test.
 * @param property - The property to test.
 * @returns Whether the object has the property.
 */function objectHasProperty(e,t){return typeof e==="object"&&Object.prototype.propertyIsEnumerable.call(e,t)}function getIterableOfIterables(e){return{*[Symbol.iterator](){for(const t of e)for(const e of t)yield e}}}const n=new Set(["[object Object]","[object Module]"]);function isRecord(e){if(!n.has(Object.prototype.toString.call(e)))return false;const{constructor:t}=e;if(t===void 0)return true;const o=t.prototype;return!(o===null||typeof o!=="object"||!n.has(Object.prototype.toString.call(o)))&&!!o.hasOwnProperty("isPrototypeOf")}
/**
 * The default strategy to merge records.
 *
 * @param values - The records.
 */function mergeRecords$1(t,n,o){const s={};for(const i of getKeys(t)){const r=[];for(const e of t)objectHasProperty(e,i)&&r.push(e[i]);if(r.length===0)continue;const l=n.metaDataUpdater(o,{key:i,parents:t});const c=mergeUnknowns(r,n,l);c!==e.skip&&(i==="__proto__"?Object.defineProperty(s,i,{value:c,configurable:true,enumerable:true,writable:true}):s[i]=c)}return s}
/**
 * The default strategy to merge arrays.
 *
 * @param values - The arrays.
 */function mergeArrays$1(e){return e.flat()}
/**
 * The default strategy to merge sets.
 *
 * @param values - The sets.
 */function mergeSets$1(e){return new Set(getIterableOfIterables(e))}
/**
 * The default strategy to merge maps.
 *
 * @param values - The maps.
 */function mergeMaps$1(e){return new Map(getIterableOfIterables(e))}function mergeOthers$1(e){return e.at(-1)}const o={mergeRecords:mergeRecords$1,mergeArrays:mergeArrays$1,mergeSets:mergeSets$1,mergeMaps:mergeMaps$1,mergeOthers:mergeOthers$1};
/**
 * Deeply merge objects.
 *
 * @param objects - The objects to merge.
 */function deepmerge(...e){return deepmergeCustom({})(...e)}function deepmergeCustom(e,t){const n=getUtils(e,customizedDeepmerge);function customizedDeepmerge(...e){return mergeUnknowns(e,n,t)}return customizedDeepmerge}
/**
 * The the utils that are available to the merge functions.
 *
 * @param options - The options the user specified
 */function getUtils(t,n){var s,i,r;return{defaultMergeFunctions:o,mergeFunctions:_extends({},o,Object.fromEntries(Object.entries(t).filter((([e,t])=>Object.hasOwn(o,e))).map((([e,t])=>t===false?[e,o.mergeOthers]:[e,t])))),metaDataUpdater:(s=t.metaDataUpdater)!=null?s:defaultMetaDataUpdater,deepmerge:n,useImplicitDefaultMerging:(i=t.enableImplicitDefaultMerging)!=null&&i,filterValues:t.filterValues===false?void 0:(r=t.filterValues)!=null?r:defaultFilterValues,actions:e}}
/**
 * Merge unknown things.
 *
 * @param values - The values.
 */function mergeUnknowns(e,t,n){var o;const s=(o=t.filterValues==null?void 0:t.filterValues(e,n))!=null?o:e;if(s.length===0)return;if(s.length===1)return mergeOthers(s,t,n);const i=getObjectType(s[0]);if(i!==0&&i!==5)for(let e=1;e<s.length;e++)if(getObjectType(s[e])!==i)return mergeOthers(s,t,n);switch(i){case 1:return mergeRecords(s,t,n);case 2:return mergeArrays(s,t,n);case 3:return mergeSets(s,t,n);case 4:return mergeMaps(s,t,n);default:return mergeOthers(s,t,n)}}
/**
 * Merge records.
 *
 * @param values - The records.
 */function mergeRecords(t,n,o){const s=n.mergeFunctions.mergeRecords(t,n,o);return s===e.defaultMerge||n.useImplicitDefaultMerging&&s===void 0&&n.mergeFunctions.mergeRecords!==n.defaultMergeFunctions.mergeRecords?n.defaultMergeFunctions.mergeRecords(t,n,o):s}
/**
 * Merge arrays.
 *
 * @param values - The arrays.
 */function mergeArrays(t,n,o){const s=n.mergeFunctions.mergeArrays(t,n,o);return s===e.defaultMerge||n.useImplicitDefaultMerging&&s===void 0&&n.mergeFunctions.mergeArrays!==n.defaultMergeFunctions.mergeArrays?n.defaultMergeFunctions.mergeArrays(t):s}
/**
 * Merge sets.
 *
 * @param values - The sets.
 */function mergeSets(t,n,o){const s=n.mergeFunctions.mergeSets(t,n,o);return s===e.defaultMerge||n.useImplicitDefaultMerging&&s===void 0&&n.mergeFunctions.mergeSets!==n.defaultMergeFunctions.mergeSets?n.defaultMergeFunctions.mergeSets(t):s}
/**
 * Merge maps.
 *
 * @param values - The maps.
 */function mergeMaps(t,n,o){const s=n.mergeFunctions.mergeMaps(t,n,o);return s===e.defaultMerge||n.useImplicitDefaultMerging&&s===void 0&&n.mergeFunctions.mergeMaps!==n.defaultMergeFunctions.mergeMaps?n.defaultMergeFunctions.mergeMaps(t):s}
/**
 * Merge other things.
 *
 * @param values - The other things.
 */function mergeOthers(t,n,o){const s=n.mergeFunctions.mergeOthers(t,n,o);return s===e.defaultMerge||n.useImplicitDefaultMerging&&s===void 0&&n.mergeFunctions.mergeOthers!==n.defaultMergeFunctions.mergeOthers?n.defaultMergeFunctions.mergeOthers(t):s}
/**
 * Binds all the methods on a JS Class to the `this` context of the class.
 * Adapted from https://github.com/sindresorhus/auto-bind
 * @param self The `this` context of the class
 * @return The `this` context of the class
 */function autoBind(e){const t=Object.getOwnPropertyNames(e.constructor.prototype);for(let n=0;n<t.length;n++){const o=t[n];const s=e[o];o!=="constructor"&&typeof s==="function"&&(e[o]=s.bind(e))}return e}
/**
 * Sets up the handler to determine if we should advance the tour
 * @param step The step instance
 * @param selector
 * @private
 */function _setupAdvanceOnHandler(e,t){return n=>{if(e.isOpen()){const o=e.el&&n.currentTarget===e.el;const s=!isUndefined(t)&&n.currentTarget.matches(t);(s||o)&&e.tour.next()}}}
/**
 * Bind the event handler for advanceOn
 * @param step The step instance
 */function bindAdvance(e){const{event:t,selector:n}=e.options.advanceOn||{};if(!t)return console.error("advanceOn was defined, but no event name was passed.");{const o=_setupAdvanceOnHandler(e,n);let s=null;if(!isUndefined(n)){s=document.querySelector(n);if(!s)return console.error(`No element was found for the selector supplied to advanceOn: ${n}`)}if(s){s.addEventListener(t,o);e.on("destroy",(()=>s.removeEventListener(t,o)))}else{document.body.addEventListener(t,o,true);e.on("destroy",(()=>document.body.removeEventListener(t,o,true)))}}}class StepNoOp{constructor(e){}}class TourNoOp{constructor(e,t){}}
/**
 * Ensure class prefix ends in `-`
 * @param prefix - The prefix to prepend to the class names generated by nano-css
 * @return The prefix ending in `-`
 */function normalizePrefix(e){return isString(e)&&e!==""?e.charAt(e.length-1)!=="-"?`${e}-`:e:""}
/**
 * Resolves attachTo options, converting element option value to a qualified HTMLElement.
 * @param step - The step instance
 * @returns {{}|{element, on}}
 * `element` is a qualified HTML Element
 * `on` is a string position value
 */function parseAttachTo(e){const t=e.options.attachTo||{};const n=Object.assign({},t);isFunction(n.element)&&(n.element=n.element.call(e));if(isString(n.element)){try{n.element=document.querySelector(n.element)}catch(e){}n.element||console.error(`The element for this Shepherd step was not found ${t.element}`)}return n}function parseExtraHighlights(e){return e.options.extraHighlights?e.options.extraHighlights.flatMap((e=>Array.from(document.querySelectorAll(e)))):[]}function shouldCenterStep(e){return e===void 0||e===null||(!e.element||!e.on)}function uuid(){let e=Date.now();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(t=>{const n=(e+Math.random()*16)%16|0;e=Math.floor(e/16);return(t=="x"?n:n&3|8).toString(16)}))}const s=["top","right","bottom","left"];const i=["start","end"];const r=s.reduce(((e,t)=>e.concat(t,t+"-"+i[0],t+"-"+i[1])),[]);const l=Math.min;const c=Math.max;const a=Math.round;const u=Math.floor;const createCoords=e=>({x:e,y:e});const d={left:"right",right:"left",bottom:"top",top:"bottom"};const f={start:"end",end:"start"};function clamp(e,t,n){return c(e,l(t,n))}function evaluate(e,t){return typeof e==="function"?e(t):e}function getSide(e){return e.split("-")[0]}function getAlignment(e){return e.split("-")[1]}function getOppositeAxis(e){return e==="x"?"y":"x"}function getAxisLength(e){return e==="y"?"height":"width"}function getSideAxis(e){return["top","bottom"].includes(getSide(e))?"y":"x"}function getAlignmentAxis(e){return getOppositeAxis(getSideAxis(e))}function getAlignmentSides(e,t,n){n===void 0&&(n=false);const o=getAlignment(e);const s=getAlignmentAxis(e);const i=getAxisLength(s);let r=s==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";t.reference[i]>t.floating[i]&&(r=getOppositePlacement(r));return[r,getOppositePlacement(r)]}function getExpandedPlacements(e){const t=getOppositePlacement(e);return[getOppositeAlignmentPlacement(e),t,getOppositeAlignmentPlacement(t)]}function getOppositeAlignmentPlacement(e){return e.replace(/start|end/g,(e=>f[e]))}function getSideList(e,t,n){const o=["left","right"];const s=["right","left"];const i=["top","bottom"];const r=["bottom","top"];switch(e){case"top":case"bottom":return n?t?s:o:t?o:s;case"left":case"right":return t?i:r;default:return[]}}function getOppositeAxisPlacements(e,t,n,o){const s=getAlignment(e);let i=getSideList(getSide(e),n==="start",o);if(s){i=i.map((e=>e+"-"+s));t&&(i=i.concat(i.map(getOppositeAlignmentPlacement)))}return i}function getOppositePlacement(e){return e.replace(/left|right|bottom|top/g,(e=>d[e]))}function expandPaddingObject(e){return _extends({top:0,right:0,bottom:0,left:0},e)}function getPaddingObject(e){return typeof e!=="number"?expandPaddingObject(e):{top:e,right:e,bottom:e,left:e}}function rectToClientRect(e){const{x:t,y:n,width:o,height:s}=e;return{width:o,height:s,top:n,left:t,right:t+o,bottom:n+s,x:t,y:n}}const p=["crossAxis","alignment","allowedPlacements","autoAlignment"],h=["mainAxis","crossAxis","fallbackPlacements","fallbackStrategy","fallbackAxisSideDirection","flipAlignment"],g=["mainAxis","crossAxis","limiter"];function computeCoordsFromPlacement(e,t,n){let{reference:o,floating:s}=e;const i=getSideAxis(t);const r=getAlignmentAxis(t);const l=getAxisLength(r);const c=getSide(t);const a=i==="y";const u=o.x+o.width/2-s.width/2;const d=o.y+o.height/2-s.height/2;const f=o[l]/2-s[l]/2;let p;switch(c){case"top":p={x:u,y:o.y-s.height};break;case"bottom":p={x:u,y:o.y+o.height};break;case"right":p={x:o.x+o.width,y:d};break;case"left":p={x:o.x-s.width,y:d};break;default:p={x:o.x,y:o.y}}switch(getAlignment(t)){case"start":p[r]-=f*(n&&a?-1:1);break;case"end":p[r]+=f*(n&&a?-1:1);break}return p}const computePosition$1=async(e,t,n)=>{const{placement:o="bottom",strategy:s="absolute",middleware:i=[],platform:r}=n;const l=i.filter(Boolean);const c=await(r.isRTL==null?void 0:r.isRTL(t));let a=await r.getElementRects({reference:e,floating:t,strategy:s});let{x:u,y:d}=computeCoordsFromPlacement(a,o,c);let f=o;let p={};let h=0;for(let n=0;n<l.length;n++){const{name:i,fn:g}=l[n];const{x:m,y:_,data:b,reset:v}=await g({x:u,y:d,initialPlacement:o,placement:f,strategy:s,middlewareData:p,rects:a,platform:r,elements:{reference:e,floating:t}});u=m!=null?m:u;d=_!=null?_:d;p=_extends({},p,{[i]:_extends({},p[i],b)});if(v&&h<=50){h++;if(typeof v==="object"){v.placement&&(f=v.placement);v.rects&&(a=v.rects===true?await r.getElementRects({reference:e,floating:t,strategy:s}):v.rects);({x:u,y:d}=computeCoordsFromPlacement(a,f,c))}n=-1}}return{x:u,y:d,placement:f,strategy:s,middlewareData:p}};async function detectOverflow(e,t){var n;t===void 0&&(t={});const{x:o,y:s,platform:i,rects:r,elements:l,strategy:c}=e;const{boundary:a="clippingAncestors",rootBoundary:u="viewport",elementContext:d="floating",altBoundary:f=false,padding:p=0}=evaluate(t,e);const h=getPaddingObject(p);const g=d==="floating"?"reference":"floating";const m=l[f?g:d];const _=rectToClientRect(await i.getClippingRect({element:(n=await(i.isElement==null?void 0:i.isElement(m)))==null||n?m:m.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(l.floating)),boundary:a,rootBoundary:u,strategy:c}));const b=d==="floating"?{x:o,y:s,width:r.floating.width,height:r.floating.height}:r.reference;const v=await(i.getOffsetParent==null?void 0:i.getOffsetParent(l.floating));const y=await(i.isElement==null?void 0:i.isElement(v))&&await(i.getScale==null?void 0:i.getScale(v))||{x:1,y:1};const w=rectToClientRect(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:b,offsetParent:v,strategy:c}):b);return{top:(_.top-w.top+h.top)/y.y,bottom:(w.bottom-_.bottom+h.bottom)/y.y,left:(_.left-w.left+h.left)/y.x,right:(w.right-_.right+h.right)/y.x}}const arrow$1=e=>({name:"arrow",options:e,async fn(t){const{x:n,y:o,placement:s,rects:i,platform:r,elements:c,middlewareData:a}=t;const{element:u,padding:d=0}=evaluate(e,t)||{};if(u==null)return{};const f=getPaddingObject(d);const p={x:n,y:o};const h=getAlignmentAxis(s);const g=getAxisLength(h);const m=await r.getDimensions(u);const _=h==="y";const b=_?"top":"left";const v=_?"bottom":"right";const y=_?"clientHeight":"clientWidth";const w=i.reference[g]+i.reference[h]-p[h]-i.floating[g];const x=p[h]-i.reference[h];const $=await(r.getOffsetParent==null?void 0:r.getOffsetParent(u));let S=$?$[y]:0;S&&await(r.isElement==null?void 0:r.isElement($))||(S=c.floating[y]||i.floating[g]);const O=w/2-x/2;const E=S/2-m[g]/2-1;const A=l(f[b],E);const T=l(f[v],E);const P=A;const C=S-m[g]-T;const L=S/2-m[g]/2+O;const R=clamp(P,L,C);const k=!a.arrow&&getAlignment(s)!=null&&L!==R&&i.reference[g]/2-(L<P?A:T)-m[g]/2<0;const M=k?L<P?L-P:L-C:0;return{[h]:p[h]+M,data:_extends({[h]:R,centerOffset:L-R-M},k&&{alignmentOffset:M}),reset:k}}});function getPlacementList(e,t,n){const o=e?[...n.filter((t=>getAlignment(t)===e)),...n.filter((t=>getAlignment(t)!==e))]:n.filter((e=>getSide(e)===e));return o.filter((n=>!e||(getAlignment(n)===e||!!t&&getOppositeAlignmentPlacement(n)!==n)))}const m=function autoPlacement(e){e===void 0&&(e={});return{name:"autoPlacement",options:e,async fn(t){var n,o,s;const{rects:i,middlewareData:l,placement:c,platform:a,elements:u}=t;const d=evaluate(e,t),{crossAxis:f=false,alignment:h,allowedPlacements:g=r,autoAlignment:m=true}=d,_=_objectWithoutPropertiesLoose(d,p);const b=h!==void 0||g===r?getPlacementList(h||null,m,g):g;const v=await detectOverflow(t,_);const y=((n=l.autoPlacement)==null?void 0:n.index)||0;const w=b[y];if(w==null)return{};const x=getAlignmentSides(w,i,await(a.isRTL==null?void 0:a.isRTL(u.floating)));if(c!==w)return{reset:{placement:b[0]}};const $=[v[getSide(w)],v[x[0]],v[x[1]]];const S=[...((o=l.autoPlacement)==null?void 0:o.overflows)||[],{placement:w,overflows:$}];const O=b[y+1];if(O)return{data:{index:y+1,overflows:S},reset:{placement:O}};const E=S.map((e=>{const t=getAlignment(e.placement);return[e.placement,t&&f?e.overflows.slice(0,2).reduce(((e,t)=>e+t),0):e.overflows[0],e.overflows]})).sort(((e,t)=>e[1]-t[1]));const A=E.filter((e=>e[2].slice(0,getAlignment(e[0])?2:3).every((e=>e<=0))));const T=((s=A[0])==null?void 0:s[0])||E[0][0];return T!==c?{data:{index:y+1,overflows:S},reset:{placement:T}}:{}}}};const _=function flip(e){e===void 0&&(e={});return{name:"flip",options:e,async fn(t){var n,o;const{placement:s,middlewareData:i,rects:r,initialPlacement:l,platform:c,elements:a}=t;const u=evaluate(e,t),{mainAxis:d=true,crossAxis:f=true,fallbackPlacements:p,fallbackStrategy:g="bestFit",fallbackAxisSideDirection:m="none",flipAlignment:_=true}=u,b=_objectWithoutPropertiesLoose(u,h);if((n=i.arrow)!=null&&n.alignmentOffset)return{};const v=getSide(s);const y=getSideAxis(l);const w=getSide(l)===l;const x=await(c.isRTL==null?void 0:c.isRTL(a.floating));const $=p||(w||!_?[getOppositePlacement(l)]:getExpandedPlacements(l));const S=m!=="none";!p&&S&&$.push(...getOppositeAxisPlacements(l,_,m,x));const O=[l,...$];const E=await detectOverflow(t,b);const A=[];let T=((o=i.flip)==null?void 0:o.overflows)||[];d&&A.push(E[v]);if(f){const e=getAlignmentSides(s,r,x);A.push(E[e[0]],E[e[1]])}T=[...T,{placement:s,overflows:A}];if(!A.every((e=>e<=0))){var P,C;const e=(((P=i.flip)==null?void 0:P.index)||0)+1;const t=O[e];if(t)return{data:{index:e,overflows:T},reset:{placement:t}};let n=(C=T.filter((e=>e.overflows[0]<=0)).sort(((e,t)=>e.overflows[1]-t.overflows[1]))[0])==null?void 0:C.placement;if(!n)switch(g){case"bestFit":{var L;const e=(L=T.filter((e=>{if(S){const t=getSideAxis(e.placement);return t===y||t==="y"}return true})).map((e=>[e.placement,e.overflows.filter((e=>e>0)).reduce(((e,t)=>e+t),0)])).sort(((e,t)=>e[1]-t[1]))[0])==null?void 0:L[0];e&&(n=e);break}case"initialPlacement":n=l;break}if(s!==n)return{reset:{placement:n}}}return{}}}};const b=function shift(e){e===void 0&&(e={});return{name:"shift",options:e,async fn(t){const{x:n,y:o,placement:s}=t;const i=evaluate(e,t),{mainAxis:r=true,crossAxis:l=false,limiter:c={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}}}=i,a=_objectWithoutPropertiesLoose(i,g);const u={x:n,y:o};const d=await detectOverflow(t,a);const f=getSideAxis(getSide(s));const p=getOppositeAxis(f);let h=u[p];let m=u[f];if(r){const e=p==="y"?"top":"left";const t=p==="y"?"bottom":"right";const n=h+d[e];const o=h-d[t];h=clamp(n,h,o)}if(l){const e=f==="y"?"top":"left";const t=f==="y"?"bottom":"right";const n=m+d[e];const o=m-d[t];m=clamp(n,m,o)}const _=c.fn(_extends({},t,{[p]:h,[f]:m}));return _extends({},_,{data:{x:_.x-n,y:_.y-o}})}}};const v=function limitShift(e){e===void 0&&(e={});return{options:e,fn(t){const{x:n,y:o,placement:s,rects:i,middlewareData:r}=t;const{offset:l=0,mainAxis:c=true,crossAxis:a=true}=evaluate(e,t);const u={x:n,y:o};const d=getSideAxis(s);const f=getOppositeAxis(d);let p=u[f];let h=u[d];const g=evaluate(l,t);const m=typeof g==="number"?{mainAxis:g,crossAxis:0}:_extends({mainAxis:0,crossAxis:0},g);if(c){const e=f==="y"?"height":"width";const t=i.reference[f]-i.floating[e]+m.mainAxis;const n=i.reference[f]+i.reference[e]-m.mainAxis;p<t?p=t:p>n&&(p=n)}if(a){var _,b;const e=f==="y"?"width":"height";const t=["top","left"].includes(getSide(s));const n=i.reference[d]-i.floating[e]+(t&&((_=r.offset)==null?void 0:_[d])||0)+(t?0:m.crossAxis);const o=i.reference[d]+i.reference[e]+(t?0:((b=r.offset)==null?void 0:b[d])||0)-(t?m.crossAxis:0);h<n?h=n:h>o&&(h=o)}return{[f]:p,[d]:h}}}};function hasWindow(){return typeof window!=="undefined"}function getNodeName(e){return isNode(e)?(e.nodeName||"").toLowerCase():"#document"}function getWindow(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function getDocumentElement(e){var t;return(t=(isNode(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function isNode(e){return!!hasWindow()&&(e instanceof Node||e instanceof getWindow(e).Node)}function isElement(e){return!!hasWindow()&&(e instanceof Element||e instanceof getWindow(e).Element)}function isHTMLElement(e){return!!hasWindow()&&(e instanceof HTMLElement||e instanceof getWindow(e).HTMLElement)}function isShadowRoot(e){return!(!hasWindow()||typeof ShadowRoot==="undefined")&&(e instanceof ShadowRoot||e instanceof getWindow(e).ShadowRoot)}function isOverflowElement(e){const{overflow:t,overflowX:n,overflowY:o,display:s}=getComputedStyle(e);return/auto|scroll|overlay|hidden|clip/.test(t+o+n)&&!["inline","contents"].includes(s)}function isTableElement(e){return["table","td","th"].includes(getNodeName(e))}function isTopLayer(e){return[":popover-open",":modal"].some((t=>{try{return e.matches(t)}catch(e){return false}}))}function isContainingBlock(e){const t=isWebKit();const n=isElement(e)?getComputedStyle(e):e;return n.transform!=="none"||n.perspective!=="none"||!!n.containerType&&n.containerType!=="normal"||!t&&!!n.backdropFilter&&n.backdropFilter!=="none"||!t&&!!n.filter&&n.filter!=="none"||["transform","perspective","filter"].some((e=>(n.willChange||"").includes(e)))||["paint","layout","strict","content"].some((e=>(n.contain||"").includes(e)))}function getContainingBlock(e){let t=getParentNode(e);while(isHTMLElement(t)&&!isLastTraversableNode(t)){if(isContainingBlock(t))return t;if(isTopLayer(t))return null;t=getParentNode(t)}return null}function isWebKit(){return!(typeof CSS==="undefined"||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function isLastTraversableNode(e){return["html","body","#document"].includes(getNodeName(e))}function getComputedStyle(e){return getWindow(e).getComputedStyle(e)}function getNodeScroll(e){return isElement(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function getParentNode(e){if(getNodeName(e)==="html")return e;const t=e.assignedSlot||e.parentNode||isShadowRoot(e)&&e.host||getDocumentElement(e);return isShadowRoot(t)?t.host:t}function getNearestOverflowAncestor(e){const t=getParentNode(e);return isLastTraversableNode(t)?e.ownerDocument?e.ownerDocument.body:e.body:isHTMLElement(t)&&isOverflowElement(t)?t:getNearestOverflowAncestor(t)}function getOverflowAncestors(e,t,n){var o;t===void 0&&(t=[]);n===void 0&&(n=true);const s=getNearestOverflowAncestor(e);const i=s===((o=e.ownerDocument)==null?void 0:o.body);const r=getWindow(s);if(i){const e=getFrameElement(r);return t.concat(r,r.visualViewport||[],isOverflowElement(s)?s:[],e&&n?getOverflowAncestors(e):[])}return t.concat(s,getOverflowAncestors(s,[],n))}function getFrameElement(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function getCssDimensions(e){const t=getComputedStyle(e);let n=parseFloat(t.width)||0;let o=parseFloat(t.height)||0;const s=isHTMLElement(e);const i=s?e.offsetWidth:n;const r=s?e.offsetHeight:o;const l=a(n)!==i||a(o)!==r;if(l){n=i;o=r}return{width:n,height:o,$:l}}function unwrapElement(e){return isElement(e)?e:e.contextElement}function getScale(e){const t=unwrapElement(e);if(!isHTMLElement(t))return createCoords(1);const n=t.getBoundingClientRect();const{width:o,height:s,$:i}=getCssDimensions(t);let r=(i?a(n.width):n.width)/o;let l=(i?a(n.height):n.height)/s;r&&Number.isFinite(r)||(r=1);l&&Number.isFinite(l)||(l=1);return{x:r,y:l}}const y=createCoords(0);function getVisualOffsets(e){const t=getWindow(e);return isWebKit()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:y}function shouldAddVisualOffsets(e,t,n){t===void 0&&(t=false);return!(!n||t&&n!==getWindow(e))&&t}function getBoundingClientRect(e,t,n,o){t===void 0&&(t=false);n===void 0&&(n=false);const s=e.getBoundingClientRect();const i=unwrapElement(e);let r=createCoords(1);t&&(o?isElement(o)&&(r=getScale(o)):r=getScale(e));const l=shouldAddVisualOffsets(i,n,o)?getVisualOffsets(i):createCoords(0);let c=(s.left+l.x)/r.x;let a=(s.top+l.y)/r.y;let u=s.width/r.x;let d=s.height/r.y;if(i){const e=getWindow(i);const t=o&&isElement(o)?getWindow(o):o;let n=e;let s=getFrameElement(n);while(s&&o&&t!==n){const e=getScale(s);const t=s.getBoundingClientRect();const o=getComputedStyle(s);const i=t.left+(s.clientLeft+parseFloat(o.paddingLeft))*e.x;const r=t.top+(s.clientTop+parseFloat(o.paddingTop))*e.y;c*=e.x;a*=e.y;u*=e.x;d*=e.y;c+=i;a+=r;n=getWindow(s);s=getFrameElement(n)}}return rectToClientRect({width:u,height:d,x:c,y:a})}function getWindowScrollBarX(e,t){const n=getNodeScroll(e).scrollLeft;return t?t.left+n:getBoundingClientRect(getDocumentElement(e)).left+n}function getHTMLOffset(e,t,n){n===void 0&&(n=false);const o=e.getBoundingClientRect();const s=o.left+t.scrollLeft-(n?0:getWindowScrollBarX(e,o));const i=o.top+t.scrollTop;return{x:s,y:i}}function convertOffsetParentRelativeRectToViewportRelativeRect(e){let{elements:t,rect:n,offsetParent:o,strategy:s}=e;const i=s==="fixed";const r=getDocumentElement(o);const l=!!t&&isTopLayer(t.floating);if(o===r||l&&i)return n;let c={scrollLeft:0,scrollTop:0};let a=createCoords(1);const u=createCoords(0);const d=isHTMLElement(o);if(d||!d&&!i){(getNodeName(o)!=="body"||isOverflowElement(r))&&(c=getNodeScroll(o));if(isHTMLElement(o)){const e=getBoundingClientRect(o);a=getScale(o);u.x=e.x+o.clientLeft;u.y=e.y+o.clientTop}}const f=!r||d||i?createCoords(0):getHTMLOffset(r,c,true);return{width:n.width*a.x,height:n.height*a.y,x:n.x*a.x-c.scrollLeft*a.x+u.x+f.x,y:n.y*a.y-c.scrollTop*a.y+u.y+f.y}}function getClientRects(e){return Array.from(e.getClientRects())}function getDocumentRect(e){const t=getDocumentElement(e);const n=getNodeScroll(e);const o=e.ownerDocument.body;const s=c(t.scrollWidth,t.clientWidth,o.scrollWidth,o.clientWidth);const i=c(t.scrollHeight,t.clientHeight,o.scrollHeight,o.clientHeight);let r=-n.scrollLeft+getWindowScrollBarX(e);const l=-n.scrollTop;getComputedStyle(o).direction==="rtl"&&(r+=c(t.clientWidth,o.clientWidth)-s);return{width:s,height:i,x:r,y:l}}function getViewportRect(e,t){const n=getWindow(e);const o=getDocumentElement(e);const s=n.visualViewport;let i=o.clientWidth;let r=o.clientHeight;let l=0;let c=0;if(s){i=s.width;r=s.height;const e=isWebKit();if(!e||e&&t==="fixed"){l=s.offsetLeft;c=s.offsetTop}}return{width:i,height:r,x:l,y:c}}function getInnerBoundingClientRect(e,t){const n=getBoundingClientRect(e,true,t==="fixed");const o=n.top+e.clientTop;const s=n.left+e.clientLeft;const i=isHTMLElement(e)?getScale(e):createCoords(1);const r=e.clientWidth*i.x;const l=e.clientHeight*i.y;const c=s*i.x;const a=o*i.y;return{width:r,height:l,x:c,y:a}}function getClientRectFromClippingAncestor(e,t,n){let o;if(t==="viewport")o=getViewportRect(e,n);else if(t==="document")o=getDocumentRect(getDocumentElement(e));else if(isElement(t))o=getInnerBoundingClientRect(t,n);else{const n=getVisualOffsets(e);o={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return rectToClientRect(o)}function hasFixedPositionAncestor(e,t){const n=getParentNode(e);return!(n===t||!isElement(n)||isLastTraversableNode(n))&&(getComputedStyle(n).position==="fixed"||hasFixedPositionAncestor(n,t))}function getClippingElementAncestors(e,t){const n=t.get(e);if(n)return n;let o=getOverflowAncestors(e,[],false).filter((e=>isElement(e)&&getNodeName(e)!=="body"));let s=null;const i=getComputedStyle(e).position==="fixed";let r=i?getParentNode(e):e;while(isElement(r)&&!isLastTraversableNode(r)){const t=getComputedStyle(r);const n=isContainingBlock(r);n||t.position!=="fixed"||(s=null);const l=i?!n&&!s:!n&&t.position==="static"&&!!s&&["absolute","fixed"].includes(s.position)||isOverflowElement(r)&&!n&&hasFixedPositionAncestor(e,r);l?o=o.filter((e=>e!==r)):s=t;r=getParentNode(r)}t.set(e,o);return o}function getClippingRect(e){let{element:t,boundary:n,rootBoundary:o,strategy:s}=e;const i=n==="clippingAncestors"?isTopLayer(t)?[]:getClippingElementAncestors(t,this._c):[].concat(n);const r=[...i,o];const a=r[0];const u=r.reduce(((e,n)=>{const o=getClientRectFromClippingAncestor(t,n,s);e.top=c(o.top,e.top);e.right=l(o.right,e.right);e.bottom=l(o.bottom,e.bottom);e.left=c(o.left,e.left);return e}),getClientRectFromClippingAncestor(t,a,s));return{width:u.right-u.left,height:u.bottom-u.top,x:u.left,y:u.top}}function getDimensions(e){const{width:t,height:n}=getCssDimensions(e);return{width:t,height:n}}function getRectRelativeToOffsetParent(e,t,n){const o=isHTMLElement(t);const s=getDocumentElement(t);const i=n==="fixed";const r=getBoundingClientRect(e,true,i,t);let l={scrollLeft:0,scrollTop:0};const c=createCoords(0);if(o||!o&&!i){(getNodeName(t)!=="body"||isOverflowElement(s))&&(l=getNodeScroll(t));if(o){const e=getBoundingClientRect(t,true,i,t);c.x=e.x+t.clientLeft;c.y=e.y+t.clientTop}else s&&(c.x=getWindowScrollBarX(s))}const a=!s||o||i?createCoords(0):getHTMLOffset(s,l);const u=r.left+l.scrollLeft-c.x-a.x;const d=r.top+l.scrollTop-c.y-a.y;return{x:u,y:d,width:r.width,height:r.height}}function isStaticPositioned(e){return getComputedStyle(e).position==="static"}function getTrueOffsetParent(e,t){if(!isHTMLElement(e)||getComputedStyle(e).position==="fixed")return null;if(t)return t(e);let n=e.offsetParent;getDocumentElement(e)===n&&(n=n.ownerDocument.body);return n}function getOffsetParent(e,t){const n=getWindow(e);if(isTopLayer(e))return n;if(!isHTMLElement(e)){let t=getParentNode(e);while(t&&!isLastTraversableNode(t)){if(isElement(t)&&!isStaticPositioned(t))return t;t=getParentNode(t)}return n}let o=getTrueOffsetParent(e,t);while(o&&isTableElement(o)&&isStaticPositioned(o))o=getTrueOffsetParent(o,t);return o&&isLastTraversableNode(o)&&isStaticPositioned(o)&&!isContainingBlock(o)?n:o||getContainingBlock(e)||n}const w=async function getElementRects(e){const t=this.getOffsetParent||getOffsetParent;const n=this.getDimensions;const o=await n(e.floating);return{reference:getRectRelativeToOffsetParent(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function isRTL(e){return getComputedStyle(e).direction==="rtl"}const x={convertOffsetParentRelativeRectToViewportRelativeRect:convertOffsetParentRelativeRectToViewportRelativeRect,getDocumentElement:getDocumentElement,getClippingRect:getClippingRect,getOffsetParent:getOffsetParent,getElementRects:w,getClientRects:getClientRects,getDimensions:getDimensions,getScale:getScale,isElement:isElement,isRTL:isRTL};function observeMove(e,t){let n=null;let o;const s=getDocumentElement(e);function cleanup(){var e;clearTimeout(o);(e=n)==null||e.disconnect();n=null}function refresh(i,r){i===void 0&&(i=false);r===void 0&&(r=1);cleanup();const{left:a,top:d,width:f,height:p}=e.getBoundingClientRect();i||t();if(!f||!p)return;const h=u(d);const g=u(s.clientWidth-(a+f));const m=u(s.clientHeight-(d+p));const _=u(a);const b=-h+"px "+-g+"px "+-m+"px "+-_+"px";const v={rootMargin:b,threshold:c(0,l(1,r))||1};let y=true;function handleObserve(e){const t=e[0].intersectionRatio;if(t!==r){if(!y)return refresh();t?refresh(false,t):o=setTimeout((()=>{refresh(false,1e-7)}),1e3)}y=false}try{n=new IntersectionObserver(handleObserve,_extends({},v,{root:s.ownerDocument}))}catch(e){n=new IntersectionObserver(handleObserve,v)}n.observe(e)}refresh(true);return cleanup}
/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */function autoUpdate(e,t,n,o){o===void 0&&(o={});const{ancestorScroll:s=true,ancestorResize:i=true,elementResize:r=typeof ResizeObserver==="function",layoutShift:l=typeof IntersectionObserver==="function",animationFrame:c=false}=o;const a=unwrapElement(e);const u=s||i?[...a?getOverflowAncestors(a):[],...getOverflowAncestors(t)]:[];u.forEach((e=>{s&&e.addEventListener("scroll",n,{passive:true});i&&e.addEventListener("resize",n)}));const d=a&&l?observeMove(a,n):null;let f=-1;let p=null;if(r){p=new ResizeObserver((e=>{let[o]=e;if(o&&o.target===a&&p){p.unobserve(t);cancelAnimationFrame(f);f=requestAnimationFrame((()=>{var e;(e=p)==null||e.observe(t)}))}n()}));a&&!c&&p.observe(a);p.observe(t)}let h;let g=c?getBoundingClientRect(e):null;c&&frameLoop();function frameLoop(){const t=getBoundingClientRect(e);!g||t.x===g.x&&t.y===g.y&&t.width===g.width&&t.height===g.height||n();g=t;h=requestAnimationFrame(frameLoop)}n();return()=>{var e;u.forEach((e=>{s&&e.removeEventListener("scroll",n);i&&e.removeEventListener("resize",n)}));d==null||d();(e=p)==null||e.disconnect();p=null;c&&cancelAnimationFrame(h)}}const $=m;const S=b;const O=_;const E=arrow$1;const A=v;const computePosition=(e,t,n)=>{const o=new Map;const s=_extends({platform:x},n);const i=_extends({},s.platform,{_c:o});return computePosition$1(e,t,_extends({},s,{platform:i}))};
/**
 * Determines options for the tooltip and initializes event listeners.
 *
 * @param step The step instance
 */function setupTooltip(e){e.cleanup&&e.cleanup();const t=e._getResolvedAttachToOptions();let n=t.element;const o=getFloatingUIOptions(t,e);const s=shouldCenterStep(t);if(s){n=document.body;const t=e.shepherdElementComponent.getElement();t.classList.add("shepherd-centered")}e.cleanup=autoUpdate(n,e.el,(()=>{e.el?setPosition(n,e,o,s):e.cleanup==null||e.cleanup()}));e.target=t.element;return o}
/**
 * Merge tooltip options handling nested keys.
 *
 * @param tourOptions - The default tour options.
 * @param options - Step specific options.
 *
 * @return {floatingUIOptions: FloatingUIOptions}
 */function mergeTooltipConfig(e,t){return{floatingUIOptions:deepmerge(e.floatingUIOptions||{},t.floatingUIOptions||{})}}
/**
 * Cleanup function called when the step is closed/destroyed.
 *
 * @param step
 */function destroyTooltip(e){e.cleanup&&e.cleanup();e.cleanup=null}function setPosition(e,t,n,o){return computePosition(e,t.el,n).then(floatingUIposition(t,o)).then((e=>new Promise((t=>{setTimeout((()=>t(e)),300)})))).then((e=>{e!=null&&e.el&&e.el.focus({preventScroll:true})}))}function floatingUIposition(e,t){return({x:n,y:o,placement:s,middlewareData:i})=>{if(!e.el)return e;t?Object.assign(e.el.style,{position:"fixed",left:"50%",top:"50%",transform:"translate(-50%, -50%)"}):Object.assign(e.el.style,{position:"absolute",left:`${n}px`,top:`${o}px`});e.el.dataset.popperPlacement=s;placeArrow(e.el,i);return e}}function placeArrow(e,t){const n=e.querySelector(".shepherd-arrow");if(isHTMLElement$1(n)&&t.arrow){const{x:e,y:o}=t.arrow;Object.assign(n.style,{left:e!=null?`${e}px`:"",top:o!=null?`${o}px`:""})}}
/**
 * Gets the `Floating UI` options from a set of base `attachTo` options
 * @param attachToOptions
 * @param step The step instance
 * @private
 */function getFloatingUIOptions(e,t){var n,o,s;const i={strategy:"absolute"};i.middleware=[];const r=addArrow(t);const l=shouldCenterStep(e);const c=(n=e.on)==null?void 0:n.includes("auto");const a=(e==null||(o=e.on)==null?void 0:o.includes("-start"))||(e==null||(s=e.on)==null?void 0:s.includes("-end"));if(!l){if(c){var u;i.middleware.push($({crossAxis:true,alignment:a?e==null||(u=e.on)==null?void 0:u.split("-").pop():null}))}else i.middleware.push(O());i.middleware.push(S({limiter:A(),crossAxis:true}));if(r){const e=typeof t.options.arrow==="object"?t.options.arrow:{padding:4};i.middleware.push(E({element:r,padding:a?e.padding:0}))}c||(i.placement=e.on)}return deepmerge(i,t.options.floatingUIOptions||{})}function addArrow(e){return!(!e.options.arrow||!e.el)&&e.el.querySelector(".shepherd-arrow")}
/** @returns {void} */function noop(){}
/**
 * @template T
 * @template S
 * @param {T} tar
 * @param {S} src
 * @returns {T & S}
 */function assign(e,t){for(const n in t)e[n]=t[n];/** @type {T & S} */
return e}function run(e){return e()}function blank_object(){return Object.create(null)}
/**
 * @param {Function[]} fns
 * @returns {void}
 */function run_all(e){e.forEach(run)}
/**
 * @param {any} thing
 * @returns {thing is Function}
 */function is_function(e){return typeof e==="function"}
/** @returns {boolean} */function safe_not_equal(e,t){return e!=e?t==t:e!==t||e&&typeof e==="object"||typeof e==="function"}
/** @returns {boolean} */function is_empty(e){return Object.keys(e).length===0}
/**
 * @param {Node} target
 * @param {Node} node
 * @returns {void}
 */function append(e,t){e.appendChild(t)}
/**
 * @param {Node} target
 * @param {Node} node
 * @param {Node} [anchor]
 * @returns {void}
 */function insert(e,t,n){e.insertBefore(t,n||null)}
/**
 * @param {Node} node
 * @returns {void}
 */function detach(e){e.parentNode&&e.parentNode.removeChild(e)}
/**
 * @returns {void} */function destroy_each(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}
/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} name
 * @returns {HTMLElementTagNameMap[K]}
 */function element(e){return document.createElement(e)}
/**
 * @template {keyof SVGElementTagNameMap} K
 * @param {K} name
 * @returns {SVGElement}
 */function svg_element(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}
/**
 * @param {string} data
 * @returns {Text}
 */function text(e){return document.createTextNode(e)}
/**
 * @returns {Text} */function space(){return text(" ")}
/**
 * @returns {Text} */function empty(){return text("")}
/**
 * @param {EventTarget} node
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
 * @returns {() => void}
 */function listen(e,t,n,o){e.addEventListener(t,n,o);return()=>e.removeEventListener(t,n,o)}
/**
 * @param {Element} node
 * @param {string} attribute
 * @param {string} [value]
 * @returns {void}
 */function attr(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}const T=["width","height"];
/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {{ [x: string]: string }} attributes
 * @returns {void}
 */function set_attributes(e,t){const n=Object.getOwnPropertyDescriptors(e.__proto__);for(const o in t)t[o]==null?e.removeAttribute(o):o==="style"?e.style.cssText=t[o]:o==="__value"?
/** @type {any} */e.value=e[o]=t[o]:n[o]&&n[o].set&&T.indexOf(o)===-1?e[o]=t[o]:attr(e,o,t[o])}
/**
 * @param {Element} element
 * @returns {ChildNode[]}
 */function children(e){return Array.from(e.childNodes)}
/**
 * @returns {void} */function toggle_class(e,t,n){e.classList.toggle(t,!!n)}
/**
 * @typedef {Node & {
 * 	claim_order?: number;
 * 	hydrate_init?: true;
 * 	actual_end_child?: NodeEx;
 * 	childNodes: NodeListOf<NodeEx>;
 * }} NodeEx
 */
/** @typedef {ChildNode & NodeEx} ChildNodeEx */
/** @typedef {NodeEx & { claim_order: number }} NodeEx2 */
/**
 * @typedef {ChildNodeEx[] & {
 * 	claim_info?: {
 * 		last_index: number;
 * 		total_claimed: number;
 * 	};
 * }} ChildNodeArray
 */let P;
/** @returns {void} */function set_current_component(e){P=e}function get_current_component(){if(!P)throw new Error("Function called outside component initialization");return P}
/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * If a function is returned _synchronously_ from `onMount`, it will be called when the component is unmounted.
 *
 * `onMount` does not run inside a [server-side component](https://svelte.dev/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs/svelte#onmount
 * @template T
 * @param {() => import('./private.js').NotFunction<T> | Promise<import('./private.js').NotFunction<T>> | (() => any)} fn
 * @returns {void}
 */function onMount(e){get_current_component().$$.on_mount.push(e)}
/**
 * Schedules a callback to run immediately after the component has been updated.
 *
 * The first time the callback runs will be after the initial `onMount`
 *
 * https://svelte.dev/docs/svelte#afterupdate
 * @param {() => any} fn
 * @returns {void}
 */function afterUpdate(e){get_current_component().$$.after_update.push(e)}const C=[];const L=[];let R=[];const k=[];const M=Promise.resolve();let I=false;
/** @returns {void} */function schedule_update(){if(!I){I=true;M.then(flush)}}
/** @returns {void} */function add_render_callback(e){R.push(e)}const F=new Set;let D=0;
/** @returns {void} */function flush(){if(D!==0)return;const e=P;do{try{while(D<C.length){const e=C[D];D++;set_current_component(e);update(e.$$)}}catch(e){C.length=0;D=0;throw e}set_current_component(null);C.length=0;D=0;while(L.length)L.pop()();for(let e=0;e<R.length;e+=1){const t=R[e];if(!F.has(t)){F.add(t);t()}}R.length=0}while(C.length);while(k.length)k.pop()();I=false;F.clear();set_current_component(e)}
/** @returns {void} */function update(e){if(e.fragment!==null){e.update();run_all(e.before_update);const t=e.dirty;e.dirty=[-1];e.fragment&&e.fragment.p(e.ctx,t);e.after_update.forEach(add_render_callback)}}
/**
 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
 * @param {Function[]} fns
 * @returns {void}
 */function flush_render_callbacks(e){const t=[];const n=[];R.forEach((o=>e.indexOf(o)===-1?t.push(o):n.push(o)));n.forEach((e=>e()));R=t}const H=new Set;
/**
 * @type {Outro}
 */let N;
/**
 * @returns {void} */function group_outros(){N={r:0,c:[],p:N}}
/**
 * @returns {void} */function check_outros(){N.r||run_all(N.c);N=N.p}
/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} [local]
 * @returns {void}
 */function transition_in(e,t){if(e&&e.i){H.delete(e);e.i(t)}}
/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} local
 * @param {0 | 1} [detach]
 * @param {() => void} [callback]
 * @returns {void}
 */function transition_out(e,t,n,o){if(e&&e.o){if(H.has(e))return;H.add(e);N.c.push((()=>{H.delete(e);if(o){n&&e.d(1);o()}}));e.o(t)}else o&&o()}
/** @typedef {1} INTRO */
/** @typedef {0} OUTRO */
/** @typedef {{ direction: 'in' | 'out' | 'both' }} TransitionOptions */
/** @typedef {(node: Element, params: any, options: TransitionOptions) => import('../transition/public.js').TransitionConfig} TransitionFn */
/**
 * @typedef {Object} Outro
 * @property {number} r
 * @property {Function[]} c
 * @property {Object} p
 */
/**
 * @typedef {Object} PendingProgram
 * @property {number} start
 * @property {INTRO|OUTRO} b
 * @property {Outro} [group]
 */
/**
 * @typedef {Object} Program
 * @property {number} a
 * @property {INTRO|OUTRO} b
 * @property {1|-1} d
 * @property {number} duration
 * @property {number} start
 * @property {number} end
 * @property {Outro} [group]
 */function ensure_array_like(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}
/** @returns {{}} */function get_spread_update(e,t){const n={};const o={};const s={$$scope:1};let i=e.length;while(i--){const r=e[i];const l=t[i];if(l){for(const e in r)e in l||(o[e]=1);for(const e in l)if(!s[e]){n[e]=l[e];s[e]=1}e[i]=l}else for(const e in r)s[e]=1}for(const e in o)e in n||(n[e]=void 0);return n}
/** @returns {void} */function create_component(e){e&&e.c()}
/** @returns {void} */function mount_component(e,t,n){const{fragment:o,after_update:s}=e.$$;o&&o.m(t,n);add_render_callback((()=>{const t=e.$$.on_mount.map(run).filter(is_function);e.$$.on_destroy?e.$$.on_destroy.push(...t):run_all(t);e.$$.on_mount=[]}));s.forEach(add_render_callback)}
/** @returns {void} */function destroy_component(e,t){const n=e.$$;if(n.fragment!==null){flush_render_callbacks(n.after_update);run_all(n.on_destroy);n.fragment&&n.fragment.d(t);n.on_destroy=n.fragment=null;n.ctx=[]}}
/** @returns {void} */function make_dirty(e,t){if(e.$$.dirty[0]===-1){C.push(e);schedule_update();e.$$.dirty.fill(0)}e.$$.dirty[t/31|0]|=1<<t%31}
/**
 * @param {SvelteComponent} component
 * @param {import('./public.js').ComponentConstructorOptions} options
 *
 * @param {import('./utils.js')['not_equal']} not_equal Used to compare props and state values.
 * @param {(target: Element | ShadowRoot) => void} [append_styles] Function that appends styles to the DOM when the component is first initialised.
 * This will be the `add_css` function from the compiled component.
 *
 * @returns {void}
 */function init(e,t,n,o,s,i,r=null,l=[-1]){const c=P;set_current_component(e);
/** @type {import('./private.js').T$$} */const a=e.$$={fragment:null,ctx:[],props:i,update:noop,not_equal:s,bound:blank_object(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(c?c.$$.context:[])),callbacks:blank_object(),dirty:l,skip_bound:false,root:t.target||c.$$.root};r&&r(a.root);let u=false;a.ctx=n?n(e,t.props||{},((t,n,...o)=>{const i=o.length?o[0]:n;if(a.ctx&&s(a.ctx[t],a.ctx[t]=i)){!a.skip_bound&&a.bound[t]&&a.bound[t](i);u&&make_dirty(e,t)}return n})):[];a.update();u=true;run_all(a.before_update);a.fragment=!!o&&o(a.ctx);if(t.target){if(t.hydrate){const e=children(t.target);a.fragment&&a.fragment.l(e);e.forEach(detach)}else a.fragment&&a.fragment.c();t.intro&&transition_in(e.$$.fragment);mount_component(e,t.target,t.anchor);flush()}set_current_component(c)}
/**
 * Base class for Svelte components. Used when dev=false.
 *
 * @template {Record<string, any>} [Props=any]
 * @template {Record<string, any>} [Events=any]
 */class SvelteComponent{constructor(){
/**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
this.$$=void 0;
/**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */this.$$set=void 0}
/** @returns {void} */$destroy(){destroy_component(this,1);this.$destroy=noop}
/**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */$on(e,t){if(!is_function(t))return noop;const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);n.push(t);return()=>{const e=n.indexOf(t);e!==-1&&n.splice(e,1)}}
/**
   * @param {Partial<Props>} props
   * @returns {void}
   */$set(e){if(this.$$set&&!is_empty(e)){this.$$.skip_bound=true;this.$$set(e);this.$$.skip_bound=false}}}
/**
 * @typedef {Object} CustomElementPropDefinition
 * @property {string} [attribute]
 * @property {boolean} [reflect]
 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
 */const B="4";typeof window!=="undefined"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(B);function create_fragment$8(e){let t;let n;let o;let s;let i;return{c(){t=element("button");attr(t,"aria-label",n=e[3]?e[3]:null);attr(t,"class",o=`${e[1]||""} shepherd-button ${e[4]?"shepherd-button-secondary":""}`);t.disabled=e[2];attr(t,"tabindex","0");attr(t,"type","button")},m(n,o){insert(n,t,o);t.innerHTML=e[5];if(!s){i=listen(t,"click",(function(){is_function(e[0])&&e[0].apply(this,arguments)}));s=true}},p(s,[i]){e=s;i&32&&(t.innerHTML=e[5]);i&8&&n!==(n=e[3]?e[3]:null)&&attr(t,"aria-label",n);i&18&&o!==(o=`${e[1]||""} shepherd-button ${e[4]?"shepherd-button-secondary":""}`)&&attr(t,"class",o);i&4&&(t.disabled=e[2])},i:noop,o:noop,d(e){e&&detach(t);s=false;i()}}}function instance$8(e,t,n){let{config:o,step:s}=t;let i,r,l,c,a,u;function getConfigOption(e){return isFunction(e)?e.call(s):e}e.$$set=e=>{"config"in e&&n(6,o=e.config);"step"in e&&n(7,s=e.step)};e.$$.update=()=>{if(e.$$.dirty&192){n(0,i=o.action?o.action.bind(s.tour):null);n(1,r=o.classes);n(2,l=!!o.disabled&&getConfigOption(o.disabled));n(3,c=o.label?getConfigOption(o.label):null);n(4,a=o.secondary);n(5,u=o.text?getConfigOption(o.text):null)}};return[i,r,l,c,a,u,o,s]}class Shepherd_button extends SvelteComponent{constructor(e){super();init(this,e,instance$8,create_fragment$8,safe_not_equal,{config:6,step:7})}}function get_each_context(e,t,n){const o=e.slice();o[2]=t[n];return o}function create_if_block$3(e){let t;let n;let o=ensure_array_like(e[1]);let s=[];for(let t=0;t<o.length;t+=1)s[t]=create_each_block(get_each_context(e,o,t));const out=e=>transition_out(s[e],1,1,(()=>{s[e]=null}));return{c(){for(let e=0;e<s.length;e+=1)s[e].c();t=empty()},m(e,o){for(let t=0;t<s.length;t+=1)s[t]&&s[t].m(e,o);insert(e,t,o);n=true},p(e,n){if(n&3){o=ensure_array_like(e[1]);let i;for(i=0;i<o.length;i+=1){const r=get_each_context(e,o,i);if(s[i]){s[i].p(r,n);transition_in(s[i],1)}else{s[i]=create_each_block(r);s[i].c();transition_in(s[i],1);s[i].m(t.parentNode,t)}}group_outros();for(i=o.length;i<s.length;i+=1)out(i);check_outros()}},i(e){if(!n){for(let e=0;e<o.length;e+=1)transition_in(s[e]);n=true}},o(e){s=s.filter(Boolean);for(let e=0;e<s.length;e+=1)transition_out(s[e]);n=false},d(e){e&&detach(t);destroy_each(s,e)}}}function create_each_block(e){let t;let n;t=new Shepherd_button({props:{config:e[2],step:e[0]}});return{c(){create_component(t.$$.fragment)},m(e,o){mount_component(t,e,o);n=true},p(e,n){const o={};n&2&&(o.config=e[2]);n&1&&(o.step=e[0]);t.$set(o)},i(e){if(!n){transition_in(t.$$.fragment,e);n=true}},o(e){transition_out(t.$$.fragment,e);n=false},d(e){destroy_component(t,e)}}}function create_fragment$7(e){let t;let n;let o=e[1]&&create_if_block$3(e);return{c(){t=element("footer");o&&o.c();attr(t,"class","shepherd-footer")},m(e,s){insert(e,t,s);o&&o.m(t,null);n=true},p(e,[n]){if(e[1])if(o){o.p(e,n);n&2&&transition_in(o,1)}else{o=create_if_block$3(e);o.c();transition_in(o,1);o.m(t,null)}else if(o){group_outros();transition_out(o,1,1,(()=>{o=null}));check_outros()}},i(e){if(!n){transition_in(o);n=true}},o(e){transition_out(o);n=false},d(e){e&&detach(t);o&&o.d()}}}function instance$7(e,t,n){let o;let{step:s}=t;e.$$set=e=>{"step"in e&&n(0,s=e.step)};e.$$.update=()=>{e.$$.dirty&1&&n(1,o=s.options.buttons)};return[s,o]}class Shepherd_footer extends SvelteComponent{constructor(e){super();init(this,e,instance$7,create_fragment$7,safe_not_equal,{step:0})}}function create_fragment$6(e){let t;let n;let o;let s;let i;return{c(){t=element("button");n=element("span");n.textContent="×";attr(n,"aria-hidden","true");attr(t,"aria-label",o=e[0].label?e[0].label:"Close Tour");attr(t,"class","shepherd-cancel-icon");attr(t,"type","button")},m(o,r){insert(o,t,r);append(t,n);if(!s){i=listen(t,"click",e[1]);s=true}},p(e,[n]){n&1&&o!==(o=e[0].label?e[0].label:"Close Tour")&&attr(t,"aria-label",o)},i:noop,o:noop,d(e){e&&detach(t);s=false;i()}}}function instance$6(e,t,n){let{cancelIcon:o,step:s}=t;const handleCancelClick=e=>{e.preventDefault();s.cancel()};e.$$set=e=>{"cancelIcon"in e&&n(0,o=e.cancelIcon);"step"in e&&n(2,s=e.step)};return[o,handleCancelClick,s]}class Shepherd_cancel_icon extends SvelteComponent{constructor(e){super();init(this,e,instance$6,create_fragment$6,safe_not_equal,{cancelIcon:0,step:2})}}function create_fragment$5(e){let t;return{c(){t=element("h3");attr(t,"id",e[1]);attr(t,"class","shepherd-title")},m(n,o){insert(n,t,o);e[3](t)},p(e,[n]){n&2&&attr(t,"id",e[1])},i:noop,o:noop,d(n){n&&detach(t);e[3](null)}}}function instance$5(e,t,n){let{labelId:o,element:s,title:i}=t;afterUpdate((()=>{isFunction(i)&&n(2,i=i());n(0,s.innerHTML=i,s)}));function h3_binding(e){L[e?"unshift":"push"]((()=>{s=e;n(0,s)}))}e.$$set=e=>{"labelId"in e&&n(1,o=e.labelId);"element"in e&&n(0,s=e.element);"title"in e&&n(2,i=e.title)};return[s,o,i,h3_binding]}class Shepherd_title extends SvelteComponent{constructor(e){super();init(this,e,instance$5,create_fragment$5,safe_not_equal,{labelId:1,element:0,title:2})}}function create_if_block_1$1(e){let t;let n;t=new Shepherd_title({props:{labelId:e[0],title:e[2]}});return{c(){create_component(t.$$.fragment)},m(e,o){mount_component(t,e,o);n=true},p(e,n){const o={};n&1&&(o.labelId=e[0]);n&4&&(o.title=e[2]);t.$set(o)},i(e){if(!n){transition_in(t.$$.fragment,e);n=true}},o(e){transition_out(t.$$.fragment,e);n=false},d(e){destroy_component(t,e)}}}function create_if_block$2(e){let t;let n;t=new Shepherd_cancel_icon({props:{cancelIcon:e[3],step:e[1]}});return{c(){create_component(t.$$.fragment)},m(e,o){mount_component(t,e,o);n=true},p(e,n){const o={};n&8&&(o.cancelIcon=e[3]);n&2&&(o.step=e[1]);t.$set(o)},i(e){if(!n){transition_in(t.$$.fragment,e);n=true}},o(e){transition_out(t.$$.fragment,e);n=false},d(e){destroy_component(t,e)}}}function create_fragment$4(e){let t;let n;let o;let s=e[2]&&create_if_block_1$1(e);let i=e[3]&&e[3].enabled&&create_if_block$2(e);return{c(){t=element("header");s&&s.c();n=space();i&&i.c();attr(t,"class","shepherd-header")},m(e,r){insert(e,t,r);s&&s.m(t,null);append(t,n);i&&i.m(t,null);o=true},p(e,[o]){if(e[2])if(s){s.p(e,o);o&4&&transition_in(s,1)}else{s=create_if_block_1$1(e);s.c();transition_in(s,1);s.m(t,n)}else if(s){group_outros();transition_out(s,1,1,(()=>{s=null}));check_outros()}if(e[3]&&e[3].enabled)if(i){i.p(e,o);o&8&&transition_in(i,1)}else{i=create_if_block$2(e);i.c();transition_in(i,1);i.m(t,null)}else if(i){group_outros();transition_out(i,1,1,(()=>{i=null}));check_outros()}},i(e){if(!o){transition_in(s);transition_in(i);o=true}},o(e){transition_out(s);transition_out(i);o=false},d(e){e&&detach(t);s&&s.d();i&&i.d()}}}function instance$4(e,t,n){let{labelId:o,step:s}=t;let i,r;e.$$set=e=>{"labelId"in e&&n(0,o=e.labelId);"step"in e&&n(1,s=e.step)};e.$$.update=()=>{if(e.$$.dirty&2){n(2,i=s.options.title);n(3,r=s.options.cancelIcon)}};return[o,s,i,r]}class Shepherd_header extends SvelteComponent{constructor(e){super();init(this,e,instance$4,create_fragment$4,safe_not_equal,{labelId:0,step:1})}}function create_fragment$3(e){let t;return{c(){t=element("div");attr(t,"class","shepherd-text");attr(t,"id",e[1])},m(n,o){insert(n,t,o);e[3](t)},p(e,[n]){n&2&&attr(t,"id",e[1])},i:noop,o:noop,d(n){n&&detach(t);e[3](null)}}}function instance$3(e,t,n){let{descriptionId:o,element:s,step:i}=t;afterUpdate((()=>{let{text:e}=i.options;isFunction(e)&&(e=e.call(i));isHTMLElement$1(e)?s.appendChild(e):n(0,s.innerHTML=e,s)}));function div_binding(e){L[e?"unshift":"push"]((()=>{s=e;n(0,s)}))}e.$$set=e=>{"descriptionId"in e&&n(1,o=e.descriptionId);"element"in e&&n(0,s=e.element);"step"in e&&n(2,i=e.step)};return[s,o,i,div_binding]}class Shepherd_text extends SvelteComponent{constructor(e){super();init(this,e,instance$3,create_fragment$3,safe_not_equal,{descriptionId:1,element:0,step:2})}}function create_if_block_2(e){let t;let n;t=new Shepherd_header({props:{labelId:e[1],step:e[2]}});return{c(){create_component(t.$$.fragment)},m(e,o){mount_component(t,e,o);n=true},p(e,n){const o={};n&2&&(o.labelId=e[1]);n&4&&(o.step=e[2]);t.$set(o)},i(e){if(!n){transition_in(t.$$.fragment,e);n=true}},o(e){transition_out(t.$$.fragment,e);n=false},d(e){destroy_component(t,e)}}}function create_if_block_1(e){let t;let n;t=new Shepherd_text({props:{descriptionId:e[0],step:e[2]}});return{c(){create_component(t.$$.fragment)},m(e,o){mount_component(t,e,o);n=true},p(e,n){const o={};n&1&&(o.descriptionId=e[0]);n&4&&(o.step=e[2]);t.$set(o)},i(e){if(!n){transition_in(t.$$.fragment,e);n=true}},o(e){transition_out(t.$$.fragment,e);n=false},d(e){destroy_component(t,e)}}}function create_if_block$1(e){let t;let n;t=new Shepherd_footer({props:{step:e[2]}});return{c(){create_component(t.$$.fragment)},m(e,o){mount_component(t,e,o);n=true},p(e,n){const o={};n&4&&(o.step=e[2]);t.$set(o)},i(e){if(!n){transition_in(t.$$.fragment,e);n=true}},o(e){transition_out(t.$$.fragment,e);n=false},d(e){destroy_component(t,e)}}}function create_fragment$2(e){let t;let n=!isUndefined(e[2].options.title)||e[2].options.cancelIcon&&e[2].options.cancelIcon.enabled;let o;let s=!isUndefined(e[2].options.text);let i;let r=Array.isArray(e[2].options.buttons)&&e[2].options.buttons.length;let l;let c=n&&create_if_block_2(e);let a=s&&create_if_block_1(e);let u=r&&create_if_block$1(e);return{c(){t=element("div");c&&c.c();o=space();a&&a.c();i=space();u&&u.c();attr(t,"class","shepherd-content")},m(e,n){insert(e,t,n);c&&c.m(t,null);append(t,o);a&&a.m(t,null);append(t,i);u&&u.m(t,null);l=true},p(e,[l]){l&4&&(n=!isUndefined(e[2].options.title)||e[2].options.cancelIcon&&e[2].options.cancelIcon.enabled);if(n)if(c){c.p(e,l);l&4&&transition_in(c,1)}else{c=create_if_block_2(e);c.c();transition_in(c,1);c.m(t,o)}else if(c){group_outros();transition_out(c,1,1,(()=>{c=null}));check_outros()}l&4&&(s=!isUndefined(e[2].options.text));if(s)if(a){a.p(e,l);l&4&&transition_in(a,1)}else{a=create_if_block_1(e);a.c();transition_in(a,1);a.m(t,i)}else if(a){group_outros();transition_out(a,1,1,(()=>{a=null}));check_outros()}l&4&&(r=Array.isArray(e[2].options.buttons)&&e[2].options.buttons.length);if(r)if(u){u.p(e,l);l&4&&transition_in(u,1)}else{u=create_if_block$1(e);u.c();transition_in(u,1);u.m(t,null)}else if(u){group_outros();transition_out(u,1,1,(()=>{u=null}));check_outros()}},i(e){if(!l){transition_in(c);transition_in(a);transition_in(u);l=true}},o(e){transition_out(c);transition_out(a);transition_out(u);l=false},d(e){e&&detach(t);c&&c.d();a&&a.d();u&&u.d()}}}function instance$2(e,t,n){let{descriptionId:o,labelId:s,step:i}=t;e.$$set=e=>{"descriptionId"in e&&n(0,o=e.descriptionId);"labelId"in e&&n(1,s=e.labelId);"step"in e&&n(2,i=e.step)};return[o,s,i]}class Shepherd_content extends SvelteComponent{constructor(e){super();init(this,e,instance$2,create_fragment$2,safe_not_equal,{descriptionId:0,labelId:1,step:2})}}function create_if_block(e){let t;return{c(){t=element("div");attr(t,"class","shepherd-arrow");attr(t,"data-popper-arrow","")},m(e,n){insert(e,t,n)},d(e){e&&detach(t)}}}function create_fragment$1(e){let t;let n;let o;let s;let i;let r;let l;let c;let a=e[4].options.arrow&&e[4].options.attachTo&&e[4].options.attachTo.element&&e[4].options.attachTo.on&&create_if_block();o=new Shepherd_content({props:{descriptionId:e[2],labelId:e[3],step:e[4]}});let u=[{"aria-describedby":s=isUndefined(e[4].options.text)?null:e[2]},{"aria-labelledby":i=e[4].options.title?e[3]:null},e[1],{open:"true"}];let d={};for(let e=0;e<u.length;e+=1)d=assign(d,u[e]);return{c(){t=element("dialog");a&&a.c();n=space();create_component(o.$$.fragment);set_attributes(t,d);toggle_class(t,"shepherd-has-cancel-icon",e[5]);toggle_class(t,"shepherd-has-title",e[6]);toggle_class(t,"shepherd-element",true)},m(s,i){insert(s,t,i);a&&a.m(t,null);append(t,n);mount_component(o,t,null);e[13](t);r=true;if(!l){c=listen(t,"keydown",e[7]);l=true}},p(e,[l]){if(e[4].options.arrow&&e[4].options.attachTo&&e[4].options.attachTo.element&&e[4].options.attachTo.on)if(a);else{a=create_if_block();a.c();a.m(t,n)}else if(a){a.d(1);a=null}const c={};l&4&&(c.descriptionId=e[2]);l&8&&(c.labelId=e[3]);l&16&&(c.step=e[4]);o.$set(c);set_attributes(t,d=get_spread_update(u,[(!r||l&20&&s!==(s=isUndefined(e[4].options.text)?null:e[2]))&&{"aria-describedby":s},(!r||l&24&&i!==(i=e[4].options.title?e[3]:null))&&{"aria-labelledby":i},l&2&&e[1],{open:"true"}]));toggle_class(t,"shepherd-has-cancel-icon",e[5]);toggle_class(t,"shepherd-has-title",e[6]);toggle_class(t,"shepherd-element",true)},i(e){if(!r){transition_in(o.$$.fragment,e);r=true}},o(e){transition_out(o.$$.fragment,e);r=false},d(n){n&&detach(t);a&&a.d();destroy_component(o);e[13](null);l=false;c()}}}const j=9;const W=27;const U=37;const V=39;function getClassesArray(e){return e.split(" ").filter((e=>!!e.length))}function instance$1(e,t,n){let{classPrefix:o,element:s,descriptionId:i,firstFocusableElement:r,focusableElements:l,labelId:c,lastFocusableElement:a,step:u,dataStepId:d}=t;let f,p,h;const getElement=()=>s;onMount((()=>{n(1,d={[`data-${o}shepherd-step-id`]:u.id});n(9,l=s.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'));n(8,r=l[0]);n(10,a=l[l.length-1])}));afterUpdate((()=>{h!==u.options.classes&&updateDynamicClasses()}));function updateDynamicClasses(){removeClasses(h);h=u.options.classes;addClasses(h)}function removeClasses(e){if(isString(e)){const t=getClassesArray(e);t.length&&s.classList.remove(...t)}}function addClasses(e){if(isString(e)){const t=getClassesArray(e);t.length&&s.classList.add(...t)}}const handleKeyDown=e=>{const{tour:t}=u;switch(e.keyCode){case j:if(l.length===0){e.preventDefault();break}if(e.shiftKey){if(document.activeElement===r||document.activeElement.classList.contains("shepherd-element")){e.preventDefault();a.focus()}}else if(document.activeElement===a){e.preventDefault();r.focus()}break;case W:if(t.options.exitOnEsc){e.preventDefault();e.stopPropagation();u.cancel()}break;case U:if(t.options.keyboardNavigation){e.preventDefault();e.stopPropagation();t.back()}break;case V:if(t.options.keyboardNavigation){e.preventDefault();e.stopPropagation();t.next()}break}};function dialog_binding(e){L[e?"unshift":"push"]((()=>{s=e;n(0,s)}))}e.$$set=e=>{"classPrefix"in e&&n(11,o=e.classPrefix);"element"in e&&n(0,s=e.element);"descriptionId"in e&&n(2,i=e.descriptionId);"firstFocusableElement"in e&&n(8,r=e.firstFocusableElement);"focusableElements"in e&&n(9,l=e.focusableElements);"labelId"in e&&n(3,c=e.labelId);"lastFocusableElement"in e&&n(10,a=e.lastFocusableElement);"step"in e&&n(4,u=e.step);"dataStepId"in e&&n(1,d=e.dataStepId)};e.$$.update=()=>{if(e.$$.dirty&16){n(5,f=u.options&&u.options.cancelIcon&&u.options.cancelIcon.enabled);n(6,p=u.options&&u.options.title)}};return[s,d,i,c,u,f,p,handleKeyDown,r,l,a,o,getElement,dialog_binding]}class Shepherd_element extends SvelteComponent{constructor(e){super();init(this,e,instance$1,create_fragment$1,safe_not_equal,{classPrefix:11,element:0,descriptionId:2,firstFocusableElement:8,focusableElements:9,labelId:3,lastFocusableElement:10,step:4,dataStepId:1,getElement:12})}get getElement(){return this.$$.ctx[12]}}class Step extends Evented{constructor(e,t={}){super();this._resolvedAttachTo=void 0;this._resolvedExtraHighlightElements=void 0;this.classPrefix=void 0;this.el=void 0;this.target=void 0;this.tour=void 0;this.tour=e;this.classPrefix=this.tour.options?normalizePrefix(this.tour.options.classPrefix):"";this.styles=e.styles;
/**
     * Resolved attachTo options. Due to lazy evaluation, we only resolve the options during `before-show` phase.
     * Do not use this directly, use the _getResolvedAttachToOptions method instead.
     * @type {StepOptionsAttachTo | null}
     * @private
     */this._resolvedAttachTo=null;autoBind(this);this._setOptions(t);return this}cancel(){this.tour.cancel();this.trigger("cancel")}complete(){this.tour.complete();this.trigger("complete")}destroy(){destroyTooltip(this);if(isHTMLElement$1(this.el)){this.el.remove();this.el=null}this._updateStepTargetOnHide();this.trigger("destroy")}getTour(){return this.tour}hide(){var e;(e=this.tour.modal)==null||e.hide();this.trigger("before-hide");this.el&&(this.el.hidden=true);this._updateStepTargetOnHide();this.trigger("hide")}
/**
   * Resolves attachTo options.
   * @returns {{}|{element, on}}
   */_resolveExtraHiglightElements(){this._resolvedExtraHighlightElements=parseExtraHighlights(this);return this._resolvedExtraHighlightElements}
/**
   * Resolves attachTo options.
   * @returns {{}|{element, on}}
   */_resolveAttachToOptions(){this._resolvedAttachTo=parseAttachTo(this);return this._resolvedAttachTo}
/**
   * A selector for resolved attachTo options.
   * @returns {{}|{element, on}}
   * @private
   */_getResolvedAttachToOptions(){return this._resolvedAttachTo===null?this._resolveAttachToOptions():this._resolvedAttachTo}isOpen(){return Boolean(this.el&&!this.el.hidden)}show(){return isFunction(this.options.beforeShowPromise)?Promise.resolve(this.options.beforeShowPromise()).then((()=>this._show())):Promise.resolve(this._show())}
/**
   * Updates the options of the step.
   *
   * @param {StepOptions} options The options for the step
   */updateStepOptions(e){Object.assign(this.options,e);this.shepherdElementComponent&&this.shepherdElementComponent.$set({step:this})}getElement(){return this.el}getTarget(){return this.target}_createTooltipContent(){const e=`${this.id}-description`;const t=`${this.id}-label`;this.shepherdElementComponent=new Shepherd_element({target:this.tour.options.stepsContainer||document.body,props:{classPrefix:this.classPrefix,descriptionId:e,labelId:t,step:this,styles:this.styles}});return this.shepherdElementComponent.getElement()}
/**
   * If a custom scrollToHandler is defined, call that, otherwise do the generic
   * scrollIntoView call.
   *
   * @param {boolean | ScrollIntoViewOptions} scrollToOptions - If true, uses the default `scrollIntoView`,
   * if an object, passes that object as the params to `scrollIntoView` i.e. `{ behavior: 'smooth', block: 'center' }`
   * @private
   */_scrollTo(e){const{element:t}=this._getResolvedAttachToOptions();isFunction(this.options.scrollToHandler)?this.options.scrollToHandler(t):isElement$1(t)&&typeof t.scrollIntoView==="function"&&t.scrollIntoView(e)}
/**
   * _getClassOptions gets all possible classes for the step
   * @param {StepOptions} stepOptions The step specific options
   * @returns {string} unique string from array of classes
   */_getClassOptions(e){const t=this.tour&&this.tour.options&&this.tour.options.defaultStepOptions;const n=e.classes?e.classes:"";const o=t&&t.classes?t.classes:"";const s=[...n.split(" "),...o.split(" ")];const i=new Set(s);return Array.from(i).join(" ").trim()}
/**
   * Sets the options for the step, maps `when` to events, sets up buttons
   * @param options - The options for the step
   */_setOptions(e={}){let t=this.tour&&this.tour.options&&this.tour.options.defaultStepOptions;t=deepmerge({},t||{});this.options=Object.assign({arrow:true},t,e,mergeTooltipConfig(t,e));const{when:n}=this.options;this.options.classes=this._getClassOptions(e);this.destroy();this.id=this.options.id||`step-${uuid()}`;n&&Object.keys(n).forEach((e=>{this.on(e,n[e],this)}))}_setupElements(){isUndefined(this.el)||this.destroy();this.el=this._createTooltipContent();this.options.advanceOn&&bindAdvance(this);setupTooltip(this)}_show(){var e;this.trigger("before-show");this._resolveAttachToOptions();this._resolveExtraHiglightElements();this._setupElements();this.tour.modal||this.tour.setupModal();(e=this.tour.modal)==null||e.setupForStep(this);this._styleTargetElementForStep(this);this.el&&(this.el.hidden=false);this.options.scrollTo&&setTimeout((()=>{this._scrollTo(this.options.scrollTo)}));this.el&&(this.el.hidden=false);const t=this.shepherdElementComponent.getElement();const n=this.target||document.body;const o=this._resolvedExtraHighlightElements;n.classList.add(`${this.classPrefix}shepherd-enabled`);n.classList.add(`${this.classPrefix}shepherd-target`);t.classList.add("shepherd-enabled");o==null||o.forEach((e=>{e.classList.add(`${this.classPrefix}shepherd-enabled`);e.classList.add(`${this.classPrefix}shepherd-target`)}));this.trigger("show")}
/**
   * Modulates the styles of the passed step's target element, based on the step's options and
   * the tour's `modal` option, to visually emphasize the element
   *
   * @param {Step} step The step object that attaches to the element
   * @private
   */_styleTargetElementForStep(e){const t=e.target;const n=e._resolvedExtraHighlightElements;if(!t)return;const o=e.options.highlightClass;if(o){t.classList.add(o);n==null||n.forEach((e=>e.classList.add(o)))}t.classList.remove("shepherd-target-click-disabled");n==null||n.forEach((e=>e.classList.remove("shepherd-target-click-disabled")));if(e.options.canClickTarget===false){t.classList.add("shepherd-target-click-disabled");n==null||n.forEach((e=>e.classList.add("shepherd-target-click-disabled")))}}_updateStepTargetOnHide(){const e=this.target||document.body;const t=this._resolvedExtraHighlightElements;const n=this.options.highlightClass;if(n){e.classList.remove(n);t==null||t.forEach((e=>e.classList.remove(n)))}e.classList.remove("shepherd-target-click-disabled",`${this.classPrefix}shepherd-enabled`,`${this.classPrefix}shepherd-target`);t==null||t.forEach((e=>{e.classList.remove("shepherd-target-click-disabled",`${this.classPrefix}shepherd-enabled`,`${this.classPrefix}shepherd-target`)}))}}
/**
 * Cleanup the steps and set pointerEvents back to 'auto'
 * @param tour The tour object
 */function cleanupSteps(e){if(e){const{steps:t}=e;t.forEach((e=>{if(e.options&&e.options.canClickTarget===false&&e.options.attachTo){isHTMLElement$1(e.target)&&e.target.classList.remove("shepherd-target-click-disabled");e._resolvedExtraHighlightElements&&e._resolvedExtraHighlightElements.forEach((e=>{isHTMLElement$1(e)&&e.classList.remove("shepherd-target-click-disabled")}))}}))}}
/**
 * Generates the svg path data for a rounded rectangle overlay
 * @param dimension - Dimensions of rectangle.
 * @param dimension.width - Width.
 * @param dimension.height - Height.
 * @param dimension.x - Offset from top left corner in x axis. default 0.
 * @param dimension.y - Offset from top left corner in y axis. default 0.
 * @param dimension.r - Corner Radius. Keep this smaller than half of width or height.
 * @returns Rounded rectangle overlay path data.
 */function makeOverlayPath(e){let t="";const{innerWidth:n,innerHeight:o}=window;e.forEach((e=>{const{width:n,height:o,x:s=0,y:i=0,r:r=0}=e;const{topLeft:l=0,topRight:c=0,bottomRight:a=0,bottomLeft:u=0}=typeof r==="number"?{topLeft:r,topRight:r,bottomRight:r,bottomLeft:r}:r;t+=`M${s+l},${i}      a${l},${l},0,0,0-${l},${l}      V${o+i-u}      a${u},${u},0,0,0,${u},${u}      H${n+s-a}      a${a},${a},0,0,0,${a}-${a}      V${i+c}      a${c},${c},0,0,0-${c}-${c}      Z`}));return`M${n},${o}          H0          V0          H${n}          V${o}          Z          ${t}`.replace(/\s/g,"")}function create_fragment(e){let t;let n;let o;let s;let i;return{c(){t=svg_element("svg");n=svg_element("path");attr(n,"d",e[2]);attr(t,"class",o=(e[1]?"shepherd-modal-is-visible":"")+" shepherd-modal-overlay-container")},m(o,r){insert(o,t,r);append(t,n);e[11](t);if(!s){i=listen(t,"touchmove",e[3]);s=true}},p(e,[s]){s&4&&attr(n,"d",e[2]);s&2&&o!==(o=(e[1]?"shepherd-modal-is-visible":"")+" shepherd-modal-overlay-container")&&attr(t,"class",o)},i:noop,o:noop,d(n){n&&detach(t);e[11](null);s=false;i()}}}function _getScrollParent(e){if(!e)return null;const t=e instanceof HTMLElement;const n=t&&window.getComputedStyle(e).overflowY;const o=n!=="hidden"&&n!=="visible";return o&&e.scrollHeight>=e.clientHeight?e:_getScrollParent(e.parentElement)}
/**
 * Get the top and left offset required to position the modal overlay cutout
 * when the target element is within an iframe
 * @param {HTMLElement} element The target element
 * @private
 */function _getIframeOffset(e){let t={top:0,left:0};if(!e)return t;let n=e.ownerDocument.defaultView;while(n!==window.top){var o;const e=(o=n)==null?void 0:o.frameElement;if(e){var s,i;const n=e.getBoundingClientRect();t.top+=n.top+((s=n.scrollTop)!=null?s:0);t.left+=n.left+((i=n.scrollLeft)!=null?i:0)}n=n.parent}return t}
/**
 * Get the visible height of the target element relative to its scrollParent.
 * If there is no scroll parent, the height of the element is returned.
 *
 * @param {HTMLElement} element The target element
 * @param {HTMLElement} [scrollParent] The scrollable parent element
 * @returns {{y: number, height: number}}
 * @private
 */function _getVisibleHeight(e,t){const n=e.getBoundingClientRect();let o=n.y||n.top;let s=n.bottom||o+n.height;if(t){const e=t.getBoundingClientRect();const n=e.y||e.top;const i=e.bottom||n+e.height;o=Math.max(o,n);s=Math.min(s,i)}const i=Math.max(s-o,0);return{y:o,height:i}}function instance(e,t,n){let{element:o,openingProperties:s}=t;let i=false;let r;let l;closeModalOpening();const getElement=()=>o;function closeModalOpening(){n(4,s=[{width:0,height:0,x:0,y:0,r:0}])}function hide(){n(1,i=false);_cleanupStepEventListeners()}function positionModal(e=0,t=0,o=0,i=0,r,l,c){if(l){const a=[l,...c||[]];n(4,s=[]);for(const n of a){if(!n)continue;if(a.indexOf(n)!==a.lastIndexOf(n))continue;const{y:l,height:c}=_getVisibleHeight(n,r);const{x:u,width:d,left:f}=n.getBoundingClientRect();const p=a.some((e=>{if(e===n)return false;const t=e.getBoundingClientRect();return u>=t.left&&u+d<=t.right&&l>=t.top&&l+c<=t.bottom}));p||s.push({width:d+e*2,height:c+e*2,x:(u||f)+o-e,y:l+i-e,r:t})}}else closeModalOpening()}function setupForStep(e){_cleanupStepEventListeners();if(e.tour.options.useModalOverlay){_styleForStep(e);show()}else hide()}function show(){n(1,i=true)}const _preventModalBodyTouch=e=>{e.preventDefault()};const _preventModalOverlayTouch=e=>{e.stopPropagation()};function _addStepEventListeners(){window.addEventListener("touchmove",_preventModalBodyTouch,{passive:false})}function _cleanupStepEventListeners(){if(r){cancelAnimationFrame(r);r=void 0}window.removeEventListener("touchmove",_preventModalBodyTouch,{passive:false})}
/**
  * Style the modal for the step
  * @param {Step} step The step to style the opening for
  * @private
  */function _styleForStep(e){const{modalOverlayOpeningPadding:t,modalOverlayOpeningRadius:n,modalOverlayOpeningXOffset:o=0,modalOverlayOpeningYOffset:s=0}=e.options;const i=_getIframeOffset(e.target);const l=_getScrollParent(e.target);const rafLoop=()=>{r=void 0;positionModal(t,n,o+i.left,s+i.top,l,e.target,e._resolvedExtraHighlightElements);r=requestAnimationFrame(rafLoop)};rafLoop();_addStepEventListeners()}function svg_binding(e){L[e?"unshift":"push"]((()=>{o=e;n(0,o)}))}e.$$set=e=>{"element"in e&&n(0,o=e.element);"openingProperties"in e&&n(4,s=e.openingProperties)};e.$$.update=()=>{e.$$.dirty&16&&n(2,l=makeOverlayPath(s))};return[o,i,l,_preventModalOverlayTouch,s,getElement,closeModalOpening,hide,positionModal,setupForStep,show,svg_binding]}class Shepherd_modal extends SvelteComponent{constructor(e){super();init(this,e,instance,create_fragment,safe_not_equal,{element:0,openingProperties:4,getElement:5,closeModalOpening:6,hide:7,positionModal:8,setupForStep:9,show:10})}get getElement(){return this.$$.ctx[5]}get closeModalOpening(){return this.$$.ctx[6]}get hide(){return this.$$.ctx[7]}get positionModal(){return this.$$.ctx[8]}get setupForStep(){return this.$$.ctx[9]}get show(){return this.$$.ctx[10]}}class ShepherdBase extends Evented{constructor(){super();this.activeTour=void 0;autoBind(this)}}class Tour extends Evented{constructor(e={}){super();this.trackedEvents=["active","cancel","complete","show"];this.classPrefix=void 0;this.currentStep=void 0;this.focusedElBeforeOpen=void 0;this.id=void 0;this.modal=void 0;this.options=void 0;this.steps=void 0;autoBind(this);const t={exitOnEsc:true,keyboardNavigation:true};this.options=Object.assign({},t,e);this.classPrefix=normalizePrefix(this.options.classPrefix);this.steps=[];this.addSteps(this.options.steps);const n=["active","cancel","complete","inactive","show","start"];n.map((e=>{(e=>{this.on(e,(t=>{t=t||{};t.tour=this;q.trigger(e,t)}))})(e)}));this._setTourID(e.id);return this}
/**
   * Adds a new step to the tour
   * @param {StepOptions} options - An object containing step options or a Step instance
   * @param {number | undefined} index - The optional index to insert the step at. If undefined, the step
   * is added to the end of the array.
   * @return The newly added step
   */addStep(e,t){let n=e;n instanceof Step?n.tour=this:n=new Step(this,n);isUndefined(t)?this.steps.push(n):this.steps.splice(t,0,n);return n}
/**
   * Add multiple steps to the tour
   * @param {Array<StepOptions> | Array<Step> | undefined} steps - The steps to add to the tour
   */addSteps(e){Array.isArray(e)&&e.forEach((e=>{this.addStep(e)}));return this}back(){const e=this.steps.indexOf(this.currentStep);this.show(e-1,false)}async cancel(){if(this.options.confirmCancel){const e=this.options.confirmCancelMessage||"Are you sure you want to stop the tour?";let t;t=isFunction(this.options.confirmCancel)?await this.options.confirmCancel():window.confirm(e);t&&this._done("cancel")}else this._done("cancel")}complete(){this._done("complete")}
/**
   * Gets the step from a given id
   * @param {number | string} id - The id of the step to retrieve
   * @return The step corresponding to the `id`
   */getById(e){return this.steps.find((t=>t.id===e))}getCurrentStep(){return this.currentStep}hide(){const e=this.getCurrentStep();if(e)return e.hide()}isActive(){return q.activeTour===this}next(){const e=this.steps.indexOf(this.currentStep);e===this.steps.length-1?this.complete():this.show(e+1,true)}
/**
   * Removes the step from the tour
   * @param {string} name - The id for the step to remove
   */removeStep(e){const t=this.getCurrentStep();this.steps.some(((t,n)=>{if(t.id===e){t.isOpen()&&t.hide();t.destroy();this.steps.splice(n,1);return true}}));if(t&&t.id===e){this.currentStep=void 0;this.steps.length?this.show(0):this.cancel()}}
/**
   * Show a specific step in the tour
   * @param {number | string} key - The key to look up the step by
   * @param {boolean} forward - True if we are going forward, false if backward
   */show(e=0,t=true){const n=isString(e)?this.getById(e):this.steps[e];if(n){this._updateStateBeforeShow();const e=isFunction(n.options.showOn)&&!n.options.showOn();if(e)this._skipStep(n,t);else{this.currentStep=n;this.trigger("show",{step:n,previous:this.currentStep});n.show()}}}async start(){this.trigger("start");this.focusedElBeforeOpen=document.activeElement;this.currentStep=null;this.setupModal();this._setupActiveTour();this.next()}
/**
   * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
   * @param {string} event - The event name to trigger
   * @private
   */_done(e){const t=this.steps.indexOf(this.currentStep);Array.isArray(this.steps)&&this.steps.forEach((e=>e.destroy()));cleanupSteps(this);this.trigger(e,{index:t});q.activeTour=null;this.trigger("inactive",{tour:this});this.modal&&this.modal.hide();if((e==="cancel"||e==="complete")&&this.modal){const e=document.querySelector(".shepherd-modal-overlay-container");if(e){e.remove();this.modal=null}}isHTMLElement$1(this.focusedElBeforeOpen)&&this.focusedElBeforeOpen.focus()}_setupActiveTour(){this.trigger("active",{tour:this});q.activeTour=this}setupModal(){this.modal=new Shepherd_modal({target:this.options.modalContainer||document.body,props:{styles:this.styles}})}
/**
   * Called when `showOn` evaluates to false, to skip the step or complete the tour if it's the last step
   * @param {Step} step - The step to skip
   * @param {boolean} forward - True if we are going forward, false if backward
   * @private
   */_skipStep(e,t){const n=this.steps.indexOf(e);if(n===this.steps.length-1)this.complete();else{const e=t?n+1:n-1;this.show(e,t)}}_updateStateBeforeShow(){this.currentStep&&this.currentStep.hide();this.isActive()||this._setupActiveTour()}
/**
   * Sets this.id to a provided tourName and id or `${tourName}--${uuid}`
   * @param {string} optionsId - True if we are going forward, false if backward
   * @private
   */_setTourID(e){const t=this.options.tourName||"tour";const n=e||uuid();this.id=`${t}--${n}`}}const q=new ShepherdBase;const z=typeof window==="undefined";q.Step=z?StepNoOp:Step;q.Tour=z?TourNoOp:Tour;export{ShepherdBase,q as default};

