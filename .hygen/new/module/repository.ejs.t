---
to: "src/modules/<%= h.fileName(name) %>/<%= h.repositoryFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('Repository') %>
---
<%
 RepositoryName = h.RepositoryName(name);

 ClassName = h.ClassName(name);
 className = ClassName.toLowerCase();
 classNamePlural = className + 's';

 EntityName = h.EntityName(name);
 entityFileName = h.entityFileName(name);

 DtoName = h.DtoName(name);
 DtoName = h.DtoName(name);
 dtoFileName = h.dtoFileName(name);
 createDtoFileName = h.createDtoFileName(name);

%>import { type Nullable } from '@common/@types';
import { Codes } from '@common/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { <%= DtoName %> } from './dtos/<%= dtoFileName %>';
import { <%= EntityName %> } from './entities/<%= entityFileName %>';

@Injectable()
export class  <%= RepositoryName %> {
  constructor(
    @InjectRepository(<%= EntityName %>)
    private readonly repository: Repository< <%= EntityName %> >,
  ) {}

  public async create(dto: <%= DtoName %>): Promise< <%= DtoName %> > {
    const entity = this.repository.create(dto);
    await this.repository.save(entity);

    return <%= DtoName %>.toDto(entity);
  }

  public async update(id: number, attributes: Partial< <%= DtoName %> >): Promise< <%= DtoName %> > {
    const <%= className %> = await this.findById(id);
    const updated = await this.repository.save({ ...<%= className %>, ...attributes });

    return <%= DtoName %>.toDto(updated);
  }

  public async findById(id: number): Promise<Nullable< <%= DtoName %> >> {
    const <%= className %> = await this.repository.findOne({ where: { id } });

    if (!<%= className %>) return null;

    return <%= DtoName %>.toDto(<%= className %>);
  }
  
	public async findByIdOrThrow(id: number): Promise< <%= DtoName %> > {
    const <%= className %> = await this.findById(id);

    if (!<%= className %>) {
      throw new NotFoundException(Codes.NOT_FOUND_ERROR);
    }

    return <%= DtoName %>.toDto(<%= className %>);
  }

  public async findAll(): Promise< <%= DtoName %> []> {
    const <%= classNamePlural %> = await this.repository.find();

    return <%= DtoName %>.toDtos(<%= classNamePlural %>);
  }

  public async find(filer: Filter<%= DtoName %>): Promise< <%= DtoName %> []> {
    const <%= classNamePlural %> = await this.repository.find({
      where: { ...filer },
    });

    return <%= DtoName %>.toDtos(<%= classNamePlural %>);
  }

  public async delete(id: number): Promise< <%= DtoName %> > {
    const <%= className %> = await this.findByIdOrThrow(id);
    const deleted = await this.repository.remove(<%= className %>);

    return <%= DtoName %>.toDto(deleted);
  }
}
