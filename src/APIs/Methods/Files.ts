import { IPodio, IPodioFiles } from "../../interfaces/podio_interfaces";
import { FileAttachResponse, FileUploadResponse, PodioFile } from "../../types/podio_types";
import FormData from "form-data";
import fs from "fs";
import path from "path";

export class PodioFiles implements IPodioFiles {
  constructor(private Podio: IPodio) {
    this.Podio = Podio;
  }

  async uploadFile(filePath: string, fileName: string): Promise<{file_id: number}> {
    const formData = new FormData();
    formData.append("source", fs.createReadStream(filePath));
    formData.append("filename", fileName);

    const response = await this.Podio.post("/file/v2/", formData);
    return <FileUploadResponse>response;
  }

  async attachFile(fileId: number, refType: string, refId: number): Promise<FileAttachResponse> {
    const response = await this.Podio.post(`/file/${fileId}/attach`, {
      ref_type: refType,
      ref_id: refId
    });
    return <FileAttachResponse>response;
  }

  async getFiles(refType: string, refId: number): Promise<PodioFile[]> {
    return <PodioFile[]>await this.Podio.get(`/file/${refType}/${refId}/`);
  }

  async updateFile(fileId: number, description: string): Promise<void> {
    await this.Podio.put(`/file/${fileId}`, {
      description: description
    });
  }

  async deleteFile(fileId: number): Promise<void> {
    await this.Podio.delete(`/file/${fileId}`);
  }
}
