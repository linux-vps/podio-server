import { recurrenceType, weekDays } from "../constants/GeneralUtils";

export type FilterOptions = {
  sort_by?: string;
  filters?: object;
  limit?: number;
  offset?: number;
  remember?: boolean;
  sort_desc?: boolean;
}

export type PodioSuccessAuthResponse = {
  access_token: string;
  token_type: "bearer";
  expires_in: number,
  refresh_token: string,
  ref:
  {
    type: "user",
    id: number
  }
}

export type PodioCreds = {
  username: string;
  password: string;
  clientId: string;
  clientSecret: string;
}

export type PodioTokenData = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  ref: {
    type: string,
    id: number
  };
  created_on: Date;
}

export type PodioCreatedBy = {
  avatar: number | null;
  avatar_id: number | null;
  avatar_type: string;
  image: Object | null;
  last_seen_on: string;
  name: string;
  id: number;
  type: string;
  url: string;
  user_id: number;
}

export type PodioCreatedVia = {
  auth_client_id: number;
  display: boolean;
  id: number;
  name: string;
  url: string;
}


export type PodioFieldConfig = {
  label: string;
  mapping: object | null;
  settings: object;
}

export type PodioFields = {
  config: object;
  field_id: number;
  external_id: string;
  type: string;
  label: string;
  values: Object[]
}

export type PodioTag = {
  id: number| null;
}

export type MultiSelectionFieldValue =  {
  id: number;
  status?: string;
  text?: string;
  color?: string;
}

export type MoneyFieldValue = {
  value: string;
  currency?: string;
}
export type DateFieldValue  = {
  start?: string;
  start_date: string;
  start_time?: string | null;
  start_utc?: string;
  start_date_utc?: string;
  start_time_utc?: string | null;
}

type WebhookItemsResponse = {
  item_id: number;
  item_revision_id: number;
  external_id: string | number | null;
}

type WebhookCommentsResponse = {
  item_id: number;
  comment_id: number;
}

type WebhookFilesResponse = {
  item_id: number;
  action_type: "file_created" | "file_replaced" | "file_deleted";
  file_ids: string;
}

type WebhookAppResponse = {
  app_id: number;
}

type WebhookFormResponse = {
  form_id: number;
  app_id: number;
}

type WebhookTagResponse = {
  item_id: number;
  target_type: string;
}

type WebhooksReturns = {
  "item.create": WebhookItemsResponse;
  "item.update": WebhookItemsResponse;
  "item.delete": WebhookItemsResponse;
  "comment.create": WebhookCommentsResponse;
  "comment.delete": WebhookCommentsResponse;
  "file.change": WebhookFilesResponse;
  "app.update": WebhookAppResponse;
  "app.delete": WebhookAppResponse;
  "form.create": WebhookFormResponse;
  "form.update": WebhookFormResponse;
  "form.delete": WebhookFormResponse
  "tag.add": WebhookTagResponse;
  "tag.delete": WebhookTagResponse;
}

type WebhooksTypes = keyof WebhooksReturns

export type WebhookOptions = {
  url: string,
  type: WebhooksTypes
}

export type Webhook = {
  hook_id: number,
  status: "inactive" | "active",
  type: string,
  url: string
}

export type PodioItemRevisionDif = {
  field_id: string,
  external_id: string,
  type: string,
  label: string,
  config: object,
  from: object[],
  to: object[]
}

export type PodioItemRevision = {
  revision: number,
  app_revision: number,
  created_by: PodioCreatedBy,
  created_via: PodioCreatedVia,
  created_on: string,
}

export type PodioFile = {
  file_id: number;
  name: string;
  description?: string;
  mimetype: string;
  size: number;
  created_on: string;
  created_by: PodioCreatedBy;
  link: string;
  perma_link: string;
  thumbnail_link?: string;
  hosted_by: string;
  rights: string[];
}

export type UploadFileResponse = {
  file_id: number;
  link: string;
  name: string;
  size: number;
  mimetype: string;
};

export type AttachFileResponse = {
  file_id: number;
  ref_type: string;
  ref_id: number;
};

export type PodioSearchReferenceOptions = {
  target: "task_reference"| "task_responsible"| "alert"| "conversation"| "conversation_presence"| "grant"| "item_field" | "item_created_by"| "item_created_via"| "item_location"| "item_tags"| "global_nav"| "script_variables"| "apps"| "invite"| "extension"| "spaces"| "flow_app_dependencies"|
"giphys"| "hash_tag"| "search_in" | "search_by";
  target_params: Object;
}

export type PodioSearchReferenceResponse = {
  name: string;
  data: string | null;
  contents: object[];
}

export type PodioAppItem = {
  app_item_id: number;
  app_item_id_formatted: string;
  comment_count: number;
  created_by: PodioCreatedBy;
  created_on: string;
  created_via: PodioCreatedVia[];
  external_id: null;
  fields: PodioFields[];
  files: PodioFile[];
  file_count: number;
  item_id: number;
  last_event_on: string;
  link: string;
  priority: number;
  ratings: Object[];
  revision: 0;
  current_revision: Object[];
  initial_revision: Object[];
  rights: Object[];
  sharefile_vault_folder_id: number | null;
  sharefile_vault_url: string | null;
  title: string
}


export type FilterItemsResponse = {
  filtered: number;
  items: PodioAppItem[];
  total: number;
}

export type PagamentosNomeDoProjetoFieldValue = {
  app: Object;
  app_item_id: number;
  created_by: PodioCreatedBy;
  created_on: string;
  created_via: PodioCreatedVia[];
  files: Object[];
  item_id: number;
  link: string;
  revision: number;
  initial_revision: Object;
  sharefile_vault_folder_id: number | null;
  sharefile_vault_url: string | null;
  space: Object;
  title: string;
}

export type PagamentosNomeDoMembroFieldValue = {
  app: Object;
  app_item_id: number;
  created_by: PodioCreatedBy;
  created_on: string;
  created_via: PodioCreatedVia[];
  files: Object[];
  item_id: number;
  link: string;
  revision: number;
  initial_revision: Object;
  sharefile_vault_folder_id: number | null;
  sharefile_vault_url: string | null;
  space: Object;
  title: string;
}

export type AddItemResponse = {
  item_id: number;
  title: string;
}

export type ItemAddFields = {
  field_id?: number;
  external_id?: string;
  values: {value?: string | number | object; start_date?: string}[]
};

export type Reminder = {
  remind_delta: number
}

export type Recurrence = {
  name: "weekly" | "monthly" | "yearly";
  config: {
    days: weekDays,
    repeat_on: recurrenceType
  };
  step: number;
  until: string;
}


export type AddItemPayload = {
  external_id: string;
  fields: ItemAddFields[];
  file_ids?: number[];
  tags?: string[];
  reminder?: Reminder; //integer of minutes
  recurrence?: Recurrence;
  linked_account_id?: number;
  ref?: {
    type: "item";
    id: number
  }
}

export type UpdateItemPayload = AddItemPayload

export type ExportOptions = {
  limit?: number;
  offset?: number;
  view_id?: number;
  sort_by?: string;
  sort_desc?: boolean;
  filters?: object;
  split_email_by_type?: boolean
  split_phone_by_type?: boolean
}

export type ExportResponse = {
  batch_id: number;
}

export type PodioUser = {
  user_id: number;
  avatar: number;
  avatar_id: number;
  avatar_type: string;
  image: object;
  last_seen_on: string;
  name: string;
  type: string;
  url: string;
}

export type RevisionObject = {
  revision: number;
  user: PodioUser;
  created_on: string;
}

export type ItemRevision = {
  created_by: PodioCreatedBy;
  created_via: PodioCreatedVia;
  created_on: string;
  item_revision_id: number;
  revision: number;
  type: string;
  user: PodioUser;
}

export type FindReferenceableItemsResponse = {
  item_id: number;
  title: string;
  initial_revision: RevisionObject;
  app: PodioAppItem;
}

export type ItemFieldsValues = {
  [external_id: string]: object
}

export type RearrangeOptions = {
  values: {
    [field_id: number]: {
      from: any;
      to: any;
    }
  };
  priority:{
    below: number;
    above: number;
  }
}

export type StrBool = "true" | "false"

export type FileUploadResponse = {
  file_id: number;
  link: string;
  perma_link: string;
}

export type FileAttachResponse = {
  file_id: number;
  revision: number;
}

export type UpdateItemResponse = {
  revision: number;
  title: string;
}

export interface AddAppConfig {
  space_id: number;
  config: {
    name: string;
    item_name: string;
    description?: string;
    usage?: string;
    external_id?: string;
    icon?: string;
    icon_id?: number;
    allow_edit?: boolean;
    default_view?: string;
    allow_attachments?: boolean;
    silent?: boolean;
    silent_creates?: boolean;
    silent_edits?: boolean;
    fields?: Array<{
      type: string;
      external_id?: string;
      config: {
        label: string;
        description?: string;
        required?: boolean;
        visible?: boolean;
        hidden?: boolean;
        delta?: number;
        settings?: any;
      }
    }>;
  }
}

export interface UpdateAppConfig extends Omit<AddAppConfig, 'space_id'> {}

export interface PodioApp {
  app_id: number;
  original: number;
  original_revision: number;
  status: string;
  icon: string;
  icon_id: number;
  space_id: number;
  owner: any;
  config: {
    name: string;
    item_name: string;
    description: string;
    usage: string;
    external_id: string;
    default_view: string;
    allow_edit: boolean;
    allow_attachments: boolean;
    silent: boolean;
    silent_creates: boolean;
    silent_edits: boolean;
    fields: Array<any>;
  };
  url: string;
  url_add: string;
  link: string;
  link_add: string;
  current_revision: number;
  subscribed: boolean;
  rights: string[];
  field_ids: number[];
  fields: Array<any>;
}

export interface AppCalculation {
  title: string;
  script: string;
  draft: string;
  draft_status: string;
  status: string;
  last_error: string | null;
  created_on: string;
  started_on: string | null;
  ended_on: string | null;
}

export interface AddAppResponse {
  app_id: number;
  original: number;
  link: string;
  url: string;
  link_add: string;
  url_add: string;
  url_label: string;
}

export interface InstallAppResponse {
  app_id: number;
}

export interface PodioOrganization {
  org_id: number;
  name: string;
  type: string;
  logo?: number;
  url: string;
  url_label: string;
  premium: boolean;
  role?: string;
  status: string;
  sales_agent_id?: number;
  created_on: string;
  domains: string[];
  rights: string[];
  rank: number;
}

export interface CreateOrganizationConfig {
  name: string;
  logo?: number;
  segment?: string;
  url?: string;
  url_label?: string;
  billing_interval?: 'monthly' | 'yearly';
  domains?: string[];
}

export interface PodioSpace {
  space_id: number;
  name: string;
  url: string;
  url_label: string;
  org_id: number;
  contact_count: number;
  members: number;
  role?: string;
  rights: string[];
  post_on_new_app: boolean;
  post_on_new_member: boolean;
  subscribed: boolean;
  privacy: 'open' | 'closed' | 'private';
  auto_join: boolean;
  type: string;
  created_on: string;
  created_by: {
    user_id: number;
    name: string;
    url: string;
  };
}
