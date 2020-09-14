export async function getUser()
{
    return {
        id: 123,
        firstname: "Hello",
        lastname: "world"
    }
}
 
export async function getUsers()
{
    const result = [
        {
            id: 123,
            firstname: "Hello",
            lastname: "world"
        },
        {
            id: 1234,
            firstname: "Hello1",
            lastname: "world1"
        }
    ]
    return result;
}