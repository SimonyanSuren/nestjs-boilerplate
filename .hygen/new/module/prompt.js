'use strict';

module.exports = {
  prompt: ({ prompter, args }) => {
    return prompter
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Name:',
          validate(value) {
            if (!value.length) {
              return 'Module must have a name.';
            }
            return true;
          },
        },
        {
          type: 'MultiSelect',
          name: 'blocks',
          message: 'Blocks:',
          initial: [
            'DTO',
            'CreateDTO',
            'UpdateDTO',
            'Controller',
            'Service',
            'Repository',
            'Entity',
            //'Module',
          ],
          choices: [
            {
              name: 'DTO',
              value: 'dto',
            },
            {
              name: 'CreateDTO',
              value: 'create-dto',
            },
            {
              name: 'UpdateDTO',
              value: 'update-dto',
            },
            {
              name: 'Controller',
              value: 'controller',
            },
            {
              name: 'Service',
              value: 'service',
            },
            {
              name: 'Repository',
              value: 'repository',
            },
            {
              name: 'Entity',
              value: 'entity',
            },
          ],
        },
      ])
      .then((answer) => {
        // For debugging
        //console.log(answer);
        return answer;
      });
  },
};
