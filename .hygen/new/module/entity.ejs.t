---
to: "src/modules/<%= h.fileName(name) %>/entities/<%= h.entityFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('Entity') %>
---
<%
 TableName = h.TableName(name);
 EntityName = h.EntityName(name);
%>import { CoreEntity } from '@common/entity/core.entity';
import { Entity } from 'typeorm';

@Entity({ name: '<%= TableName %>' })
export class <%= EntityName %> extends CoreEntity {

}
