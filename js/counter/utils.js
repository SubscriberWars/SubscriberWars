export async function json(url){
    const response=await 
    fetch(
        url,{
            cache:'no-store'
        }
    );
    if(!response.ok)
    throw Error(`HTTP ${response.status} from ${new URL(url).hostname}`);
    return response.json()
}

export function num(value){
    if(value===null||value===undefined||value==='')
    return null;const n=Number(value);
    return Number.isFinite(n)?n:null
}

export function stat(label,value){
    const n=num(value);return n===null?null:{label,value:n}
}

export function cleanStats(items){
    return items.filter(Boolean)
}

export const enc=encodeURIComponent;