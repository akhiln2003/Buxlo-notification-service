
export interface IdeleteNotificationUseCase {
  execute(
    ids: string[]
  ): Promise<string>;
}
