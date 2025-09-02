
export interface IDeleteNotificationUseCase {
  execute(
    ids: string[]
  ): Promise<string>;
}
