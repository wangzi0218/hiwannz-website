declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"insights": {
"add-less-multiply-more.md": {
	id: "add-less-multiply-more.md";
  slug: "add-less-multiply-more";
  body: string;
  collection: "insights";
  data: InferEntrySchema<"insights">
} & { render(): Render[".md"] };
"ai-and-humanity.md": {
	id: "ai-and-humanity.md";
  slug: "ai-and-humanity";
  body: string;
  collection: "insights";
  data: InferEntrySchema<"insights">
} & { render(): Render[".md"] };
"ai-replacing-human.md": {
	id: "ai-replacing-human.md";
  slug: "ai-replacing-human";
  body: string;
  collection: "insights";
  data: InferEntrySchema<"insights">
} & { render(): Render[".md"] };
"competency-framework.md": {
	id: "competency-framework.md";
  slug: "competency-framework";
  body: string;
  collection: "insights";
  data: InferEntrySchema<"insights">
} & { render(): Render[".md"] };
"customized-demand.md": {
	id: "customized-demand.md";
  slug: "customized-demand";
  body: string;
  collection: "insights";
  data: InferEntrySchema<"insights">
} & { render(): Render[".md"] };
"identify-product-managers.md": {
	id: "identify-product-managers.md";
  slug: "identify-product-managers";
  body: string;
  collection: "insights";
  data: InferEntrySchema<"insights">
} & { render(): Render[".md"] };
"information-asymmetry.md": {
	id: "information-asymmetry.md";
  slug: "information-asymmetry";
  body: string;
  collection: "insights";
  data: InferEntrySchema<"insights">
} & { render(): Render[".md"] };
"middle-platform.md": {
	id: "middle-platform.md";
  slug: "middle-platform";
  body: string;
  collection: "insights";
  data: InferEntrySchema<"insights">
} & { render(): Render[".md"] };
"motivate-employees.md": {
	id: "motivate-employees.md";
  slug: "motivate-employees";
  body: string;
  collection: "insights";
  data: InferEntrySchema<"insights">
} & { render(): Render[".md"] };
"okr.md": {
	id: "okr.md";
  slug: "okr";
  body: string;
  collection: "insights";
  data: InferEntrySchema<"insights">
} & { render(): Render[".md"] };
"plg-read.md": {
	id: "plg-read.md";
  slug: "plg-read";
  body: string;
  collection: "insights";
  data: InferEntrySchema<"insights">
} & { render(): Render[".md"] };
"product-reconstruction-strategic.md": {
	id: "product-reconstruction-strategic.md";
  slug: "product-reconstruction-strategic";
  body: string;
  collection: "insights";
  data: InferEntrySchema<"insights">
} & { render(): Render[".md"] };
"reality-leadership.md": {
	id: "reality-leadership.md";
  slug: "reality-leadership";
  body: string;
  collection: "insights";
  data: InferEntrySchema<"insights">
} & { render(): Render[".md"] };
"team-manage.md": {
	id: "team-manage.md";
  slug: "team-manage";
  body: string;
  collection: "insights";
  data: InferEntrySchema<"insights">
} & { render(): Render[".md"] };
};
"projects": {
"ai-platform.md": {
	id: "ai-platform.md";
  slug: "ai-platform";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"asset-management.md": {
	id: "asset-management.md";
  slug: "asset-management";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"devops.md": {
	id: "devops.md";
  slug: "devops";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"finclip.md": {
	id: "finclip.md";
  slug: "finclip";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"fleet.md": {
	id: "fleet.md";
  slug: "fleet";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"hipa-cloud.md": {
	id: "hipa-cloud.md";
  slug: "hipa-cloud";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"knowledge-sharing.md": {
	id: "knowledge-sharing.md";
  slug: "knowledge-sharing";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"knownsec-security.md": {
	id: "knownsec-security.md";
  slug: "knownsec-security";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"travel-cms.md": {
	id: "travel-cms.md";
  slug: "travel-cms";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
