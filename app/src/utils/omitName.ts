export const omitName = (name: string)=> {
    if(name.length > 7){
      return `${name.slice(0,7)}...`
    } else {
      return name
    }
  };
