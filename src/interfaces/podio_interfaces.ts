import { AddItemPayload, AddItemResponse, ExportOptions, ExportResponse, FilterItemsResponse, FilterOptions, FindReferenceableItemsResponse, ItemFieldsValues, ItemRevision, PodioAppItem, PodioCreatedBy, PodioCreatedVia, PodioFields, PodioFile, PodioItemRevisionDif, RearrangeOptions, StrBool, UpdateItemPayload, UpdateItemResponse, Webhook, WebhookOptions } from "../types/podio_types";




export interface IPodio {

  authenticate(): Promise<void>;
  isAuthenticated(): boolean;
  refreshToken(): Promise<void>;
  get (urlPart: string): Promise<object>;
  post (urlPart: string, data?: object): Promise<object>;
  put (urlPart: string, data?: object): Promise<object>;
  delete (urlPart: string): Promise<object>;
  criaWebhook (options: WebhookOptions, appId?: number,): Promise<{webhook_id: number}>;
  Items: IPodioItems
  Webhooks: IPodioWebhooks
}

export interface IPodioItems
{
  addItem (appId: number, data: AddItemPayload): Promise<AddItemResponse>
  CloneItem (itemId: number): Promise<AddItemResponse>
  DeleteItem (itemId: number): Promise<object>
  DeleteItemReference (itemId: number): Promise<object>
  ExportItems (appId: number, exporter: "xls" | "xlsx", exportOptions: ExportOptions): Promise<ExportResponse>
  FilterItems (appId: number, options?: FilterOptions): Promise<FilterItemsResponse>
  FilterItemsByView (appId: number, view_id: number ,options?: FilterOptions): Promise<FilterItemsResponse>
  FindReferenceableItems (field_id: number): Promise<FindReferenceableItemsResponse[]>
  GetFieldRanges (field_id: number): Promise<{min: number, max: number}>
  GetItem (itemId: number, mark_as_viewed: boolean): Promise<PodioAppItem>
  GetItemByAppItemId (appId: number, app_item_id: number): Promise<PodioAppItem>
  GetItemClone (itemId: number): Promise<PodioAppItem>
  GetItemByExternalId (appId: number, external_id: string): Promise<PodioAppItem>
  GetItemCount (appId: number, view_id: number, key?: string, ): Promise<{count: number}>
  GetItemFieldValues (itemId: number, field_or_external_id: number): Promise<{values: object}>
  GetItemPreviewForFieldReference (itemId: number, field_id: number): Promise<PodioAppItem>
  GetItemReferences (itemId: number, limit: number): Promise<PodioAppItem[]>
  GetItemRevision (itemId: number, revision: number): Promise<ItemRevision>
  GetItemRevisionDif (itemId: number, revision_from: number, revision_to: number): Promise<PodioItemRevisionDif>
  GetItemRevisions (itemId: number): Promise<ItemRevision[]>
  RevertItemRevision (itemId: number, revision: number): Promise<{revision: number}>
  RevertItemToRevision (itemId: number, revision: number): Promise<{revision: number}>
  GetItemValues (itemId: number): Promise<ItemFieldsValues[]>
  GetItemsAsXlsx (appId: number,  deleted_columns: boolean, limit: number, offset: number, sort_by: string, sort_desc: "true" | "false", view_id: number, key?: string): Promise<Buffer>
  GetMeetingURL (itemId: number): Promise<{url: string | null}>
  GetRecalcStatusForField (itemId: number, field_id: number): Promise<{status: string, timestamp: string | null}>
  GetReferencesToItemByField (itemId: number, field_id: number, limit:number, offset:number): Promise<{item_id: number, title: string, link: string}>
  RearrangeItem (itemId: number, rearrangeOptions: RearrangeOptions): Promise<PodioAppItem>
  UpdateItem (itemId: number, updateOptions: UpdateItemPayload, hook: StrBool, silent: StrBool): Promise<UpdateItemResponse>
  UpdateItemFieldValues (itemId: number, field_or_external_id: number | string, values: object, hook: StrBool, silent: StrBool): Promise<UpdateItemResponse>
  UpdateItemValues (itemId: number, updateOptions: UpdateItemPayload, hook: StrBool, silent: StrBool): Promise<UpdateItemResponse>

}

export interface IPodioWebhooks
{
  AddWebhook (options: WebhookOptions, appId?: number,): Promise<{webhook_id: number}>;
  GetWebhooks (appId: number,): Promise<Webhook[]>
  ValidateWebhook (webhook_id: number, webhook_verification_code: string): Promise<object>
  DeleteWebhook (webhook_id: number): Promise<object>
}
