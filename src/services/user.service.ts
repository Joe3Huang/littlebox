import { Status } from 'https://deno.land/std@0.62.0/http/http_status.ts';
import { User } from './../models/User.ts'

const users = [
    new User("1","Hello1","world2"),
    new User("2","Hello2","world2"),
    new User("3","Hello3","world2"),
    new User("4","Hello4","world2"),
    new User("5","Hello5","world2"),
    new User("6","Hello6","world2")
]

export async function getUserById(id: string): Promise<User>
{
    const theUser = users.find(u => u.id == id);
    if(!theUser) throw { status: Status.NotFound, message: "User not found"}
    return theUser;
}
 
export async function getUsers(Id: string) : Promise<User[]>
{
    const result: User[] = [];
    result.push(new User("123","Hello1","world2"));
    result.push(new User("1234","Hello1","world2"));
    return result;
}