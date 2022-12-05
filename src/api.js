const hostUrl = 'http://159.224.24.215:8081/';
const userId = 108;

export async function getGroups() {
    let url = hostUrl + '/groups/user/' + userId;
    //let response = await fetch(url);
    //let groups = await response.json();
    return groupsMock;
}

export async function patchGroup(groupId, group) {
    let url = hostUrl + 'groups/' + groupId;
    let response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(group)
    });
    return await response.json();
}

export async function deleteGroup(groupId) {
    let url = hostUrl + 'groups/' + groupId;
    let response = await fetch(url, {
        method: 'DELETE',
    });
    return await response.json();
}

export async function getProducts(groupIds) {
    let result = []
    for (const groupId in groupIds) {
        let url = hostUrl + 'products/group/' + groupId;
        //let response = await fetch(url);
        //let prods = await response.json();
        //result.push(prods)
    }
    return productsMock;
}

export async function postProduct(prod) {
    let url = hostUrl + 'products/';
    let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(prod)
      });
    return await response.json();
}

export async function patchProduct(prodId, prod) {
    let url = hostUrl + 'products/' + prodId;
    let response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(prod)
    });
    return await response.json();
}

export async function deleteProduct(prodId) {
    let url = hostUrl + 'products/' + prodId;
    let response = await fetch(url, {
        method: 'DELETE',
    });
    return await response.json();
}

const groupsMock = [
    {name: "hello", id: 1},
    {name: "my", id: 2},
    {name: "name", id: 3},
    {name: "is", id: 4},
    {name: "writable", id: 5}
]
const productsMock = [
    {id: 'Chuck Norris', group_name: Infinity, product_name: 'kar1', description: 'far1'},
    {id: 'Bruce Lee', group_name: 9000, product_name: 'kar2', description: 'far2'},
    {id: 'Jackie Chan', group_name: 7000, product_name: 'kar3', description: 'far3'},
    {id: 'Jet Li', group_name: 8000, product_name: 'kar4', description: 'far4'}
]