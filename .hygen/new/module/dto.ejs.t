---
to: "src/modules/<%= h.fileName(name) %>/dtos/<%= h.dtoFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('DTO') %>
---
<%

 DtoName = h.DtoName(name);
 DtoOptionName = h.DtoOptionName(name);

 EntityName = h.EntityName(name);
 entityName = h.changeCase.camel(EntityName);
 entityFileName = h.entityFileName(name);

 CreateDtoName = h.CreateDtoName(name);
 createDtoName = 'createDto';
 createDtoFileName = h.createDtoFileName(name);

%>/* eslint-disable lines-between-class-members */
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToInstance } from 'class-transformer';

import { type <%= EntityName %> } from '../entities/<%= entityFileName %>';
import { <%= CreateDtoName %> } from './<%= createDtoFileName %>';

export class <%= DtoName %> {
	@ApiProperty({ type: Number, example: 1 })
  public id: number;

	@Exclude()
  public isActive: boolean;

  @Exclude()
	@ApiHideProperty()
  public deletedAt: Date | null;

  public  updatedAt: Date;

  public createdAt: Date;

  constructor(dto: <%= CreateDtoName %>) {
    Object.assign(this, dto);
  }

	static create( <%= createDtoName %>:  <%= CreateDtoName %>): <%= DtoName %> {
    return new <%= DtoName %>(<%= createDtoName %>);
  }

  static toDto(entity: <%= EntityName %> ):  <%= DtoName %> {
      return plainToInstance(<%= DtoName %>, entity);
  }

  static toDtos(entities: <%= EntityName %>[]):  <%= DtoName %>[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
