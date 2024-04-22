---
to: "src/modules/<%= h.fileName(name) %>/<%= h.controllerFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('Controller') %>
---
<%

 moduleName = h.moduleName(name);

 ClassName = h.ClassName(name);
 className = ClassName.toLowerCase();
 fileName = h.fileName(name);
 ControllerName = h.ControllerName(name);

 ServiceName = h.ServiceName(name);
 serviceName = h.changeCase.camel(ServiceName);
 serviceFileName = h.serviceFileName(name);

 DtoName = h.DtoName(name);
 dtoFileName = h.dtoFileName(name);
 createDtoFileName = h.createDtoFileName(name);
 updateDtoFileName = h.updateDtoFileName(name);

 CreateDtoName = h.CreateDtoName(name);
 createDtoName = h.changeCase.camel(CreateDtoName);
 UpdateDtoName = h.UpdateDtoName(name);
 updateDtoName = h.changeCase.camel(UpdateDtoName);

 createFnNameController = 'create' + ClassName;
 updateFnNameController = 'update' + ClassName;
 getOneFnNameController = 'getById';
 getAllFnNameController = 'get' + ClassName + 's';
 deleteFnNameController = 'delete' + ClassName;

 createFnNameService = 'create';
 updateFnNameService = 'update';
 getOneFnNameService = 'getById';
 getAllFnNameService = 'getAll';
 deleteFnNameService = 'remove';

%>import { CurrentUser, DecoratedController, Roles, Swagger } from '@common/decorators';
import { Body, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import { <%= CreateDtoName %> } from './dtos/<%= createDtoFileName %>';
import { <%= UpdateDtoName %> } from './dtos/<%= updateDtoFileName %>';
import { <%= DtoName %> } from './dtos/<%= dtoFileName %>';
import { <%= ServiceName %> } from './<%= serviceFileName %>';

@DecoratedController('<%= h.inflection.pluralize(fileName).toLowerCase() %>')
export class <%= ControllerName %> {
  constructor(private readonly <%= serviceName %>: <%= ServiceName %>) {}

  @Post()
	@Swagger({
    operation: 'Create <%= className %>.',
    status: HttpStatus.CREATED,
    body: <%= CreateDtoName %>,
    response: <%= DtoName %>,
  })
  public async <%= createFnNameController %>(@CurrentUser() user: UserDto, @Body() <%= createDtoName %>: <%= CreateDtoName %>): Promise< <%= DtoName %> > {
    return this.<%= serviceName %>.<%= createFnNameService %>(<%= createDtoName %>);
  }

  @Patch(':id')
	@Swagger({
    operation: 'Update <%= className %>.',
    status: HttpStatus.OK,
		params: [{ name: 'id', type: Number }],
    body: <%= UpdateDtoName %>,
    response: <%= DtoName %>,
  })
  public async <%= updateFnNameController %>(
    @Param('id', ParseIntPipe) id: number,
    @Body() <%= updateDtoName %>: <%= UpdateDtoName %>,
  ): Promise< <%= DtoName %> >  {
    return this.<%= serviceName %>.<%= updateFnNameService %>(id, <%= updateDtoName %>);
  }

  @Get(':id')
	@Swagger({
    operation: 'Get <%= className %> by id.',
    status: HttpStatus.OK,
	  params: [{ name: 'id', type: Number }],
    response: <%= DtoName %>,
  })
	public async <%= getOneFnNameController %>(@Param('id', ParseIntPipe) id: number): Promise< <%= DtoName %> > {
    return  this.<%= serviceName %>.<%= getOneFnNameService %>(id);
  }

  @Get()
	@Swagger({
    operation: 'Get <%= className %> list.',
    status: HttpStatus.OK,
    response: <%= DtoName %>,
		isArray: true,
  })
	public async <%= getAllFnNameController %>(): Promise< <%= DtoName %> [] > {
    return  this.<%= serviceName %>.<%= getAllFnNameService %>();
  }

  @Delete(':id')
	@Swagger({
    operation: 'Delete <%= className %> by id.',
    status: HttpStatus.NO_CONTENT,
    params: [{ name: 'id', type: Number }],
  })
  public async <%= deleteFnNameController %>(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.<%= serviceName %>.<%= deleteFnNameService %>(id);
  }
}
