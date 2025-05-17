
import { IfetchDataFromS3UseCase } from "../../application/interface/common/IfetchDataFromS3UseCase";
import { FetchDataFromS3UseCase } from "../../application/usecase/common/fetchDataFromS3.UseCase";
import { Is3Service } from "../@types/Is3Service";
import { S3Service } from "../external-services/s3-client";


export class DIContainer {
  private _s3Service: Is3Service;

  constructor() {
    this._s3Service = new S3Service();

  }


  fetchDataFromS3UseCase():IfetchDataFromS3UseCase{
    return new FetchDataFromS3UseCase(this._s3Service);
  }
}
