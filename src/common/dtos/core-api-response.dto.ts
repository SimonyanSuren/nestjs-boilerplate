import { ApiProperty } from '@nestjs/swagger';

import { type Nullable } from '../@types/types/common.types';

/**
 * Represents the response structure for the API.
 */
export class CoreApiResponse<T> {
  /**
   * The response code.
   */
  @ApiProperty({ type: Number, default: 1, example: 1 })
  public code: number;

  /**
   * The response message.
   */
  @ApiProperty({ type: String, default: 'Success action' })
  public message: string | Record<string, string>;

  /**
   * The response data.
   */
  @ApiProperty()
  public data: Nullable<T> | T[];

  /**
   * Creates a new instance of CoreApiResponse.
   */
  protected constructor(data: Nullable<T> | T[], code?: number, message?: string) {
    this.code = code || 1;
    this.message = message || 'Success action.';
    this.data = data;
  }

  /**
   * Creates a success response.
   */
  static success<T>(data: Nullable<T> | T[], code?: number, message?: string): CoreApiResponse<T> {
    return new CoreApiResponse(data, code, message);
  }
}
