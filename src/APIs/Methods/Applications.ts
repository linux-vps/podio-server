import { IPodio, IPodioApplications } from "../../interfaces/podio_interfaces";
import { AddAppConfig, AddAppResponse, AppCalculation, InstallAppResponse, PodioApp, UpdateAppConfig } from "../../types/podio_types";

export class PodioApplications implements IPodioApplications {
  constructor(private Podio: IPodio) {
    this.Podio = Podio;
  }

  /**
   * Thêm một ứng dụng mới vào Podio workspace
   */
  async addApp(config: AddAppConfig): Promise<AddAppResponse> {
    return await this.Podio.post(`/app/`, config) as AddAppResponse;
  }

  /**
   * Lấy thông tin chi tiết của một ứng dụng
   */
  async getApp(appId: number): Promise<PodioApp> {
    return await this.Podio.get(`/app/${appId}`) as PodioApp;
  }

  /**
   * Cập nhật thông tin của một ứng dụng
   */
  async updateApp(appId: number, config: UpdateAppConfig): Promise<void> {
    await this.Podio.put(`/app/${appId}`, config);
  }

  /**
   * Xóa một ứng dụng
   */
  async deleteApp(appId: number): Promise<void> {
    await this.Podio.delete(`/app/${appId}`);
  }

  /**
   * Lấy danh sách các ứng dụng trong một workspace
   */
  async getApps(spaceId: number): Promise<PodioApp[]> {
    return await this.Podio.get(`/app/space/${spaceId}/`) as PodioApp[];
  }

  /**
   * Lấy danh sách các phép tính trong ứng dụng
   */
  async getCalculations(appId: number): Promise<AppCalculation[]> {
    return await this.Podio.get(`/app/${appId}/calculation/`) as AppCalculation[];
  }

  /**
   * Cài đặt một ứng dụng vào workspace
   */
  async installApp(appId: number, spaceId: number): Promise<InstallAppResponse> {
    return await this.Podio.post(`/app/${appId}/install`, { space_id: spaceId }) as InstallAppResponse;
  }

  /**
   * Vô hiệu hóa một ứng dụng
   */
  async deactivateApp(appId: number): Promise<void> {
    await this.Podio.post(`/app/${appId}/deactivate`, {});
  }

  /**
   * Kích hoạt lại một ứng dụng đã bị vô hiệu hóa
   */
  async activateApp(appId: number): Promise<void> {
    await this.Podio.post(`/app/${appId}/activate`, {});
  }
}
