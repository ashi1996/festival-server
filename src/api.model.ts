import { addToResponseSchemes } from "./app.helpers";
import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, ApiProperty, getSchemaPath } from "@nestjs/swagger";


export class PagingModel {
  @ApiProperty()
  skip: number;
  @ApiProperty()
  take: number;
  @ApiProperty()
  total?: number;
  constructor(take: number, skip: number, total: number) {
    this.skip = skip;
    this.take = take;
    this.total = total;
  }
}
export class ApiResponseModel<TData> {
    @ApiProperty()
    isSuccessful: boolean;
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    innerCode: number;
    @ApiProperty()
    displayMessage: string;
    @ApiProperty()
    exception: string;
    
    data: TData;
    
    constructor(value: any = {}) {
        this.statusCode = 200;
        this.innerCode = 0;
        this.displayMessage = '';
        this.exception = '';
        this.isSuccessful = true;
        this.data = value;
    }
  }

  export class ApiResponseModelPaging<TData> {
    @ApiProperty()
    isSuccessful: boolean;
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    innerCode: number;
    @ApiProperty()
    displayMessage: string;
    @ApiProperty()
    exception: string;
    
    data: TData;
    @ApiProperty({type: () => PagingModel})
    summary: PagingModel;
    
    constructor(value: any = {}, take: number, skip: number, total: number) {
        this.statusCode = 200;
        this.innerCode = 0;
        this.displayMessage = '';
        this.exception = '';
        this.isSuccessful = true;
        this.data = value;
        this.summary = new PagingModel(take, skip, total);
    }
  }

  export const ApiResponseGenericPaging = <TModel extends Type<any>>(model: TModel, isArray = false) => {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(ApiResponseModelPaging)},
            {
              properties: {
                data: isArray ? { items: { $ref: getSchemaPath(model) }} : { $ref: getSchemaPath(model) }
              }
            }
          ]
        }
      }),
      );
    };

  export const ApiResponseGeneric = <TModel extends Type<any>>(model: TModel, isArray = false) => {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(ApiResponseModel)},
            {
              properties: {
                data: isArray ? { items: { $ref: getSchemaPath(model) }} : { $ref: getSchemaPath(model) }
              }
            }
          ]
        }
      }),
      );
    };

    export const ApiResponsePrimitives = (type: string) => {
      return applyDecorators(
        ApiOkResponse({
          schema: {
            allOf: [
              { $ref: getSchemaPath(ApiResponseModel)},
              {
                properties: {
                  data: { type }
                }
              }
            ]
          }
        }),
        );
      };

  addToResponseSchemes([ApiResponseModelPaging, ApiResponseModel]);