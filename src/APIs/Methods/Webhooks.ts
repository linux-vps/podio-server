import { IPodio, IPodioWebhooks } from "../../interfaces/podio_interfaces";
import { WebhookOptions, Webhook } from "../../types/podio_types";



export class PodioWebhooks implements IPodioWebhooks {
  constructor (private Podio: IPodio) {
    this.Podio = Podio;
  }

  async AddWebhook ( options: WebhookOptions, appId?: number): Promise<{webhook_id: number}> {
    return <{webhook_id: number}>await this.Podio.post(
      `/hook/app/${appId}/`,
      options
    )
  }

  async GetWebhooks (appId: number,): Promise<Webhook[]> {
    return <Webhook[]>await this.Podio.get(
      `/hook/app/${appId}/`,
    )
  }

  async DeleteWebhook (webhook_id: number): Promise<object> {
    return await this.Podio.delete(
      `/hook/${webhook_id}/`,
    )
  }

  async ValidateWebhook (webhook_id: number, webhook_verification_code: string): Promise<object> {
    return await this.Podio.post(
      `/hook/${webhook_id}/verify/validate`,
      {code: webhook_verification_code}
    )
  }
}
