/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable sonarjs/prefer-single-boolean-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
function FilterPluginByPath() {
  return {
    fn: {
      opsFilter(taggedOps: any, phrase: any) {
        phrase = phrase.toLowerCase();
        //first filter out all actions that don't meet the search criteria
        const filteredActions = taggedOps.map((tagObj: any) => {
          tagObj._root.entries[1][1] = tagObj._root.entries[1][1].filter((operationObj: any) => {
            const op: any = JSON.parse(JSON.stringify(operationObj));

            let summary = '';

            let description = '';

            if (op.operation.summary !== undefined) {
              summary = JSON.stringify(op.operation.summary).toLowerCase();
            }

            if (op.operation.description !== undefined) {
              description = JSON.stringify(op.operation.description).toLowerCase();
            }

            if (
              !op.path.toLowerCase().includes(phrase) &&
              !summary.includes(phrase) &&
              !description.includes(phrase)
            ) {
              return false;
            }

            return true;
          });

          return tagObj;
        });

        return filteredActions.filter((tagObj: any) => tagObj._root.entries[1][1].size > 0);
      },
    },
  };
}

function operationsSorter(
  a: { get: (argument: string) => string },
  b: { get: (argument: string) => string },
) {
  const methodsOrder = ['post', 'get', 'put', 'patch', 'delete', 'options', 'trace'];
  let result = methodsOrder.indexOf(a.get('method')) - methodsOrder.indexOf(b.get('method'));

  if (result === 0) {
    result = a.get('path').localeCompare(b.get('path'));
  }

  return result;
}

export const swaggerOptions = {
  docExpansion: 'list',
  filter: true,
  showRequestDuration: true,
  tryItOutEnabled: true,
  displayOperationId: true,
  persistAuthorization: true,
  plugins: [FilterPluginByPath],
  operationsSorter,
};
