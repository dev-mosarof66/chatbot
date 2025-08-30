

export const ParseStringToLiteral =(string)=>{
    let result = string.replace(/"/g, '');
    return result.replace(/\\n/g, "\n")
}