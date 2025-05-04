
export const isOk = (response:any) => {
    return response >= 200 && response < 207;
}

export const isToken=()=> {
    const token = localStorage.getItem('token_script');
    return token ? true : false;
}