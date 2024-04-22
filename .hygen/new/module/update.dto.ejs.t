---
to: "src/modules/<%= h.fileName(name) %>/dtos/<%= h.updateDtoFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('UpdateDTO') %>
---
<%

UpdateDtoName = h.UpdateDtoName(name);

 createDtoFileName = h.createDtoFileName(name);
 updateDtoFileName = h.updateDtoFileName(name);

 CreateDtoName = h.CreateDtoName(name);
 createDtoName = h.changeCase.camel(CreateDtoName);
%>import { OmitType, PartialType } from '@nestjs/swagger';
import { <%= CreateDtoName %> } from './<%= createDtoFileName %>';

export class <%= UpdateDtoName %> extends PartialType(
  OmitType( <%= CreateDtoName %> , [] as const),
) {}