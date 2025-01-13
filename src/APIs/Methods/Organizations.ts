import { IPodio, IPodioOrganizations } from "../../interfaces/podio_interfaces";
import { CreateOrganizationConfig, PodioOrganization, PodioSpace } from "../../types/podio_types";

export class PodioOrganizations implements IPodioOrganizations {
  constructor(private Podio: IPodio) {
    this.Podio = Podio;
  }

  /**
   * Lấy danh sách tất cả các organizations
   * @see https://developers.podio.com/doc/organizations/get-organizations-22344
   * @returns Danh sách các organizations
   */
  async getOrganizations(): Promise<PodioOrganization[]> {
    const response = await this.Podio.get('org/');
    return response as PodioOrganization[];
  }

  /**
   * Lấy thông tin chi tiết của một organization
   * @see https://developers.podio.com/doc/organizations/get-organization-22383
   * @param orgId ID của organization
   * @returns Thông tin chi tiết của organization
   */
  async getOrganization(orgId: number): Promise<PodioOrganization> {
    const response = await this.Podio.get(`org/${orgId}`);
    return response as PodioOrganization;
  }

  /**
   * Tạo một organization mới
   * @see https://developers.podio.com/doc/organizations/add-new-organization-22385
   * @param config Cấu hình cho organization mới
   * @returns Thông tin của organization vừa tạo
   */
  async addOrganization(config: CreateOrganizationConfig): Promise<PodioOrganization> {
    const response = await this.Podio.post('org/', config);
    return response as PodioOrganization;
  }

  /**
   * Lấy danh sách tất cả các spaces trong một organization
   * @see https://developers.podio.com/doc/organizations/get-all-spaces-on-organization-11902608
   * @param orgId ID của organization
   * @returns Danh sách các spaces
   */
  async getOrganizationSpaces(orgId: number): Promise<PodioSpace[]> {
    const response = await this.Podio.get(`org/${orgId}/space/`);
    return response as PodioSpace[];
  }
}