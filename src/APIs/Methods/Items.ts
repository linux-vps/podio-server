import { IPodio, IPodioItems } from "../../interfaces/podio_interfaces";
import { AddItemPayload, AddItemResponse, ExportOptions, ExportResponse, FilterOptions,
   FindReferenceableItemsResponse, PodioAppItem, ItemRevision, PodioItemRevisionDif,
    ItemFieldsValues, RearrangeOptions,
    FilterItemsResponse,
    PodioCreds,
    UpdateItemPayload,
    StrBool,
    UpdateItemResponse} from "../../types/podio_types";

export class PodioItems implements IPodioItems {

  constructor (private Podio: IPodio) {
    this.Podio = Podio;
  }

  async addItem (appId: number, data: AddItemPayload): Promise<AddItemResponse> {
    /*
    EXAMPLE OF AN ITEM PAYLOAD:
    {
      external_id:"pagamentos-2",
      fields: [
        {
          external_id: "data-da-despesa",
          values: [{start_date: "2024-12-19"}]
        },
        {
          external_id: "descricao",
          values: [{value: "TESTE"}]
        },
        {
          external_id: "valor-2",
          values: [{value: 200}]
        },
        {
          external_id: "nome-do-membro-2",
          values: [{value: itemId}]
        },
        {
          external_id: "conta-de-pagamento",
          values: [{value: selectionBubbleId}]
        },
        {
          external_id: "realizado",
          values: [{value: selectionBubbleId}]
        }
      ]
    }
    */
    return <AddItemResponse> await this.Podio.post(`/item/app/${appId}/`, data);
  }

  async CloneItem (itemId: number): Promise<AddItemResponse> {
    return <AddItemResponse> await this.Podio.post(`/item/${itemId}/clone/`);
  }

  async DeleteItem (itemId: number): Promise<object> {
    return await this.Podio.delete(`/item/${itemId}/`);
  }

  async DeleteItemReference (itemId: number): Promise<object> {
    return await this.Podio.delete(`/item/${itemId}/ref`);
  }

  async ExportItems (appId: number, exporter: "xls" | "xlsx", exportOptions: ExportOptions): Promise<ExportResponse> {
    return <ExportResponse> await this.Podio.post(`/item/app/${appId}/export/${exporter}`, exportOptions);
  }

  async FilterItems (appId: number, options?: FilterOptions): Promise<FilterItemsResponse> {
    const data = await this.Podio.post(`/item/app/${appId}/filter/`, options);
    return <FilterItemsResponse> data;
  }

  async FilterItemsByView (appId: number, view_id: number ,options?: FilterOptions): Promise<FilterItemsResponse> {
    const data = await this.Podio.post(`/item/app/${appId}/filter/${view_id}`, options);
    return <FilterItemsResponse> data;
  }

  async FindReferenceableItems (field_id: number): Promise<FindReferenceableItemsResponse[]> {
    return <FindReferenceableItemsResponse[]> await this.Podio.get(`/item/field/${field_id}/find`);
  }

  async GetFieldRanges (field_id: number): Promise<{min: number, max: number}> {
    return <{min: number, max: number}> await this.Podio.get(`/item/field/${field_id}/range`);
  }

  async GetItem (itemId: number, mark_as_viewed: boolean=true): Promise<PodioAppItem> {
    return <PodioAppItem> await this.Podio.get(`/item/${itemId}?mark_as_viewed=${mark_as_viewed}`);
  }

  async GetItemByAppItemId (appId: number, app_item_id: number): Promise<PodioAppItem> {
    return <PodioAppItem> await this.Podio.get(`/app/${appId}/item/${app_item_id}/`);
  }

  async GetItemClone (itemId: number): Promise<PodioAppItem> {
    return <PodioAppItem> await this.Podio.get(`/item/${itemId}/clone/`);
  }

  async GetItemByExternalId (appId: number, external_id: string): Promise<PodioAppItem> {
    return <PodioAppItem> await this.Podio.get(`/item/app/${appId}/external_id/${external_id}`);
  }

  async GetItemCount (appId: number, view_id: number=0, key?: string): Promise<{count: number}> {
    return <{count: number}> await this.Podio.get(`/item/app/${appId}/count?=view_id=${view_id}` + (key ? `&key=${key}` : ""));
  }

  async GetItemFieldValues (itemId: number, field_or_external_id: number): Promise<{values: object}> {
    return <{values: object}> await this.Podio.get(`/item/${itemId}/value/${field_or_external_id}/v2`);
  }

  async GetItemPreviewForFieldReference (itemId: number, field_id: number): Promise<PodioAppItem> {
    return <PodioAppItem> await this.Podio.get(`/item/${itemId}/reference/${field_id}/preview/`);
  }

  async GetItemReferences (itemId: number, limit: number=100): Promise<PodioAppItem[]> {
    return <PodioAppItem[]> await this.Podio.get(`/item/${itemId}/reference?limit=${limit}`);
  }

  async GetItemRevision (itemId: number, revision: number): Promise<ItemRevision> {
    return <ItemRevision> await this.Podio.get(`/item/${itemId}/revision/${revision}/`);
  }

  async GetItemRevisionDif (itemId: number, revision_from: number, revision_to: number): Promise<PodioItemRevisionDif> {
    return (<PodioItemRevisionDif[]> await this.Podio.get(`/item/${itemId}/revision/${revision_from}/${revision_to}`))[0];
  }

  async GetItemRevisions (itemId: number): Promise<ItemRevision[]> {
    return <ItemRevision[]> await this.Podio.get(`/item/${itemId}/revision`);
  }

  async RevertItemRevision (itemId: number, revision: number): Promise<{revision: number}> {
    return <{revision: number}> await this.Podio.delete(`/item/${itemId}/revision/${revision}`);
  }

  async RevertItemToRevision (itemId: number, revision: number): Promise<{revision: number}> {
    return <{revision: number}> await this.Podio.post(`/item/${itemId}/revision/${revision}/revert_to`);
  }

  async GetItemValues (itemId: number): Promise<ItemFieldsValues[]> {
    return <ItemFieldsValues[]> await this.Podio.get(`/item/${itemId}/value/v2`);
  }

  async GetItemsAsXlsx (appId: number, deleted_columns: boolean=false,
    limit: number=20, offset: number=0, sort_by: string="", sort_desc: "true" | "false"="true", view_id: number=0, key?: string, ): Promise<Buffer> {

    const blobData =  <Buffer> await this.Podio.get(`/item/app/${appId}/xlsx?deleted_columns=${deleted_columns}&limit=${limit}&offset=${offset}&sort_by=${sort_by}&sort_desc=${sort_desc}&view_id=${view_id}` + (key ? `&key=${key}` : ""));

    return blobData;

  }

  async GetMeetingURL (itemId: number): Promise<{url: string | null}> {
    return <{url: string | null}> await this.Podio.get(`/item/${itemId}/meeting/url`);
  }

  async GetRecalcStatusForField (itemId: number, field_id: number): Promise<{status: string, timestamp: string | null}> {
    return <{status: string, timestamp: string | null}> await this.Podio.get(`/item/${itemId}/field/${field_id}/recalc/status`);
  }

  async GetReferencesToItemByField (itemId: number, field_id: number, limit:number=10, offset:number=0): Promise<{item_id: number, title: string, link: string}> {
    return <{item_id: number, title: string, link: string}> await this.Podio.get(`/item/${itemId}/reference/field/${field_id}`);
  }

  async RearrangeItem (itemId: number, rearrangeOptions: RearrangeOptions): Promise<PodioAppItem> {
    return <PodioAppItem> await this.Podio.post(`/item/${itemId}/rearrange/`, rearrangeOptions);
  }

  async UpdateItem (itemId: number, updateOptions: UpdateItemPayload, hook: StrBool="true", silent: StrBool="false"): Promise<UpdateItemResponse> {
    return <UpdateItemResponse> await this.Podio.put(`/item/${itemId}?hook=${hook}&silent=${silent}`, updateOptions);
  }

  async UpdateItemFieldValues (itemId: number, field_or_external_id: number | string, values: object, hook: StrBool="true", silent: StrBool="false"): Promise<UpdateItemResponse>{
    return <UpdateItemResponse> await this.Podio.put(`/item/${itemId}/value/${field_or_external_id}?hook=${hook}&silent=${silent}`, values);
  }

  async UpdateItemValues (itemId: number, updateOptions: UpdateItemPayload, hook: StrBool, silent: StrBool): Promise<UpdateItemResponse> {
    return <UpdateItemResponse> await this.Podio.put(`/item/${itemId}/value?hook=${hook}&silent=${silent}`, updateOptions);
  }

}
