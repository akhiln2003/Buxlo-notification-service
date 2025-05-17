import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchDataFromS3Controller } from "../controllers/common/fetchDataFromS3.controller";

export class CommonRouts {
  private router: Router;
  private diContainer: DIContainer;

  private fetchDataFromS3Controller!: FetchDataFromS3Controller;

  constructor() {
    this.router = Router();
    this.diContainer = new DIContainer();
    this.initializeControllers();
    this.initializeRoutes();
  }

  private initializeControllers(): void {
    this.fetchDataFromS3Controller = new FetchDataFromS3Controller(
      this.diContainer.fetchDataFromS3UseCase()
    );
  }

  private initializeRoutes(): void {
    this.router.post("/fetchmessagefroms3", this.fetchDataFromS3Controller.get);
  }

  public getRouter(): Router {
    return this.router;
  }
}
