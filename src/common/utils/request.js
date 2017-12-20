import 'whatwg-fetch';
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
    return response.json();
}

/**
 * 检查响应状态
 *
 * @param  {object} response   请求的响应
 *
 * @return {object|undefined} 返回一个 response, 或者抛出一个error
 */
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}


/**
 * 请求
 *
 * @param  {string} url     请求的URL
 * @param  {object} [options] 请求的option参数
 *
 * @return {object}         返回data或者err
 */
export default function request(url, options) {
    if(!options){
        options = {};
    }
    if(!options.credentials){//设置传递cookies， 否则每次请求的cook不一样
        options.credentials = 'include';
    }
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => ({ data }))
        .catch((err) => ({ err }));
}


export function get (url){
    return request(url);
}

export function post(dt){
    return request(dt.url,{
        method : "POST",
        headers: {
            'Accept': 'application/json',
            // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            'Content-Type' : 'application/json;charset=UTF-8'
        },
        // body : $.param(dt.data)
        body : JSON.stringify(dt.data)
    });
}