import axios from "../Services/axios";
import fs from "fs";
import path from "path";
import {
  IPodio,
  IPodioItems,
  IPodioWebhooks,
  } from "../interfaces/podio_interfaces";
import {
  FilterOptions,
  PodioTokenData,
  WebhookOptions,
  Webhook,
  PodioItemRevision,
  PodioItemRevisionDif,
  PodioCreds,
  FilterItemsResponse,
  PodioAppItem,
  PodioSearchReferenceOptions,
  PodioSearchReferenceResponse,
  PodioSuccessAuthResponse,
  AddItemResponse,
  AddItemPayload,
  ExportOptions,
  ExportResponse,
  FindReferenceableItemsResponse,
  ItemRevision,
  PodioFields,
  ItemFieldsValues,
  RearrangeOptions,
} from "../types/podio_types";

import { PodioItems } from "./Methods/Items";
import { PodioWebhooks } from "./Methods/Webhooks";
import { PodioApplications } from "./Methods/Applications";
import { PodioOrganizations } from "./Methods/Organizations";

export class Podio implements IPodio {
  private token: string = "";
  public Items: PodioItems;
  public Webhooks: IPodioWebhooks;
  public Applications: PodioApplications;
  public Organizations: PodioOrganizations;


  constructor(
    public creds: PodioCreds,
    public token_path: string="./token.json"
    )
  {
    this.token_path = token_path;
    this.creds = creds;
    this.authenticate();
    this.Items = new PodioItems(this);
    this.Webhooks = new PodioWebhooks(this);
    this.Applications = new PodioApplications(this);
    this.Organizations = new PodioOrganizations(this);
  }
  criaWebhook(options: WebhookOptions, appId?: number): Promise<{ webhook_id: number; }>;
  criaWebhook(options: WebhookOptions): Promise<{ webhook_id: number; }>;
  criaWebhook(options: unknown, appId?: unknown): Promise<{ webhook_id: number; }> | Promise<{ webhook_id: number; }> {
    throw new Error("Method not implemented.");
  }

  async authenticate(): Promise<void> {
    if (this.isAuthenticated()) {
      const tokenInfo: PodioTokenData = JSON.parse(fs.readFileSync(this.token_path).toString())
      this.token = tokenInfo.access_token;
      return;
    };

    if (fs.existsSync(this.token_path)) {
      await this.refreshToken();
      const tokenInfo: PodioTokenData = JSON.parse(fs.readFileSync(this.token_path).toString())
      this.token = tokenInfo.access_token;
      return;
    }

    await axios.post(
      `/oauth/token/v2`,
      {
        grant_type: "password",
        username: this.creds.username,
        password: this.creds.password,
        client_id: this.creds.clientId,
        redirect_uri: "about:blank",
        client_secret: this.creds.clientSecret,
      }
    ).then((res) => {
      const data = <PodioSuccessAuthResponse> res.data;
      if (res.status === 200) {
        fs.writeFileSync(this.token_path, JSON.stringify(res.data));
        this.token = data.access_token;
        return;
      }

      if (res.status === 401) {
        throw new Error("Invalid credentials");
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  isAuthenticated (): boolean {

    if (!fs.existsSync(this.token_path)) {
      return false;
    }

    const token: Buffer = fs.readFileSync(this.token_path);

    const tokenJson: PodioTokenData = JSON.parse(token.toString());

    if (tokenJson.access_token === undefined) {
      return false;
    }

    if (token.length === 0) {
      return false;
    }

    axios.get(
      "/app/top", {
        headers: {
          "Authorization": `OAuth2 ${tokenJson.access_token}`
        }
      }
    ).then((res) => {
      if (res.status === 403) {
        return false;
      }

      if (res.status === 200) {
        return true;
      }
    }).catch((err) => {
      console.log(err);
      return false;
    })

    return true;
  }

  async refreshToken (): Promise<void> {

    const tokenFile: Buffer = fs.readFileSync(this.token_path);

    if (tokenFile.length === 0) {
      throw new Error("Token file is empty");
    }

    const token: PodioTokenData = JSON.parse(tokenFile.toString());

    await axios.post(
      "https://api.podio.com/oauth/token/v2",
      {
        grant_type: "refresh_token",
        client_id: this.creds.clientId,
        client_secret: this.creds.clientSecret,
        refresh_token: token.refresh_token,
      }
    ).then((res) => {
      if (res.status === 200) {
        fs.writeFileSync(this.token_path, JSON.stringify(res.data));
        return;
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  async getTokenHeader (): Promise<Axios.AxiosXHRConfigBase<any>> {
    if (!this.isAuthenticated()) {
      await this.authenticate();
    }

    if (this.token === "") {
      throw new Error("Token is undefined, please authenticate");
    }

    const config: Axios.AxiosXHRConfigBase<any> = {
      headers: {
        "Authorization": `OAuth2 ${this.token}`
      }
    }

    return config
  }

  async get(urlPart: string): Promise<object> {
    const config = await this.getTokenHeader();

    return (await axios.get(urlPart, config)).data;
  }

  async post (urlPart: string, data?: object): Promise<object> {
    const config = await this.getTokenHeader();

    return (await axios.post(urlPart, data, config)).data

  }

  async delete (urlPart: string): Promise<object> {
    const config = await this.getTokenHeader();

    return (await axios.delete (urlPart, config)).data
  }

  async put (urlPart: string, data?: object): Promise<object> {
    const config = await this.getTokenHeader();

    return (await axios.put(urlPart, data, config)).data

  }

}
