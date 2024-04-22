---
to: "src/modules/<%= h.fileName(name) %>/<%= h.serviceFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('Service') %>
---
<%
 ClassName = h.ClassName(name);
 fieldName = h.changeCase.camel(ClassName);
 ServiceName = h.ServiceName(name);

 fileName = h.fileName(name);

 RepositoryName = h.RepositoryName(name);
 repositoryName = h.changeCase.camel(RepositoryName);
 repositoryFileName = h.repositoryFileName(name);
%>import { Injectable } from '@nestjs/common';

import { <%= CreateDtoName %> } from './dtos/<%= createDtoFileName %>';
import { <%= DtoName %> } from './dtos/<%= dtoFileName %>';
import { <%= RepositoryName %> } from './<%= repositoryFileName %>';


@Injectable()
export class  <%= ServiceName %> {
  constructor(private readonly <%= repositoryName %>: <%= RepositoryName %>) {}

  public async create( <%= createDtoName %>: <%= CreateDtoName %>): Promise< <%= DtoName %> > {
    const dto = <%= DtoName %>.create(<%= createDtoName %>);

    return this.<%= repositoryName %>.create(dto);
  }

  public async update(id: number, attributes: Partial< <%= DtoName %> >): Promise< <%= DtoName %> > {
    return this.<%= repositoryName %>.update(id, attributes);
  }

  public async getById(id: number): Promise< <%= DtoName %> > {
    return this.<%= repositoryName %>.findByIdOrThrow(id);
  }

  public async getAll(): Promise< <%= DtoName %> [] > {
    return this.<%= repositoryName %>.findAll();
  }

  public async remove(id: number): Promise<void> {
    await this.<%= repositoryName %>.delete(id);
  }
}
