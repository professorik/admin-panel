const hostUrl = 'http://159.224.24.215:9444';
const userId = 113;

export async function getGroups() {
    let url = hostUrl + '/groups/user/' + userId;
    let response = await fetch(url);
    let res = await response.json();
    let groups = []
    for (const item of res) {
        groups = groups.concat({
            id: item.id,
            name: item.groupName,
        })
    }
    return groups
}

export async function postGroup(group) {
    let url = hostUrl + '/groups/';
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(mapGroup(group))
    });
}

export async function putGroup(group) {
    let url = hostUrl + '/groups/' + group.id;
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(mapGroup(group))
    });
}

export async function deleteGroup(groupId) {
    let url = hostUrl + '/groups/' + groupId;
    await fetch(url, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        method: 'DELETE',
    });
}

export async function getProducts(groups) {
    let result = []
    for (const group of groups) {
        let url = hostUrl + '/products/group/' + group.id;
        let response = await fetch(url);
        let prods = await response.json();
        for (const prod of prods) {
            result = result.concat({
                id: prod.id,
                product_name: prod.productName,
                group_name: group.name,
                groupId: group.id,
                description: prod.description,
            })
        }
    }
    return result;
}

export async function postProduct(prod) {
    let url = hostUrl + '/products/';
    await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(mapProduct(prod))
    });
    return 0
}

export async function patchProduct(prod) {
    let url = hostUrl + '/products/' + prod.id;
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(mapProduct(prod))
    });
}

export async function deleteProduct(prodId) {
    let url = hostUrl + '/products/' + prodId;
    await fetch(url, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        method: 'DELETE',
    });
}

function mapGroup(group) {
    return {
        userId: userId,
        groupName: group.name,
    }
}

function mapProduct(prod) {
    return {
        groupId: prod.groupId,
        productName: prod.product_name,
        description: prod.description,
    }
}
