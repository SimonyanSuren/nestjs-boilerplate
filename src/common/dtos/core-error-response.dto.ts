import { ApiProperty } from '@nestjs/swagger';

/**
 * Represents the error response structure for the API.
 */
export class CoreApiErrorResponse {
  /**
   * HTTP status code of the response
   */
  @ApiProperty({ type: Number, example: 400 })
  public statusCode: number;

  /**
   * Error code specific to the application
   */
  @ApiProperty({ type: Number, example: 1 })
  public code: number;

  /**
   * Error message, can be a string or a key-value pair
   */
  @ApiProperty({ type: String })
  public message: string | Record<string, string>;

  /**
   * Name of the error
   */
  @ApiProperty({ type: String })
  public errorName: string;

  /**
   * Request path that caused the error
   */
  @ApiProperty({ type: String })
  public path: string;

  /**
   * Unique identifier for the request
   */
  @ApiProperty({ type: String, example: 'a03a3151-c47e-4349-9f44-dbb793ba3db2' })
  public requestId: string;

  /**
   * Timestamp when the error occurred
   */
  @ApiProperty({ type: String, example: '2021-09-29T12:00:00.000Z' })
  public timestamp: string;

  /**
   * Creates a new instance of CoreApiErrorResponse.
   */
  protected constructor(
    statusCode: number,
    code: number,
    message: string | Record<string, string>,
    errorName: string,
    path: string,
    requestId: string,
    timestamp: string,
  ) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.errorName = errorName;
    this.path = path;
    this.requestId = requestId;
    this.timestamp = timestamp;
  }

  /**
   * Factory method to create a new instance of CoreApiErrorResponse
   */
  static error(
    statusCode: number,
    code: number,
    message: string | Record<string, string>,
    errorName: string,
    path: string,
    requestId: string,
    timestamp: string,
  ): CoreApiErrorResponse {
    return new CoreApiErrorResponse(
      statusCode,
      code,
      message,
      errorName,
      path,
      requestId,
      timestamp,
    );
  }
}
