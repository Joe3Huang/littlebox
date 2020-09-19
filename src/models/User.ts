export class User 
{
       constructor(public id: string, public firstName: string, public lastName: string)
       {

       }

       static fromJSON(json: any)
       {
              return new User(json.id, json.firstName, json.lastName) 
       }
}