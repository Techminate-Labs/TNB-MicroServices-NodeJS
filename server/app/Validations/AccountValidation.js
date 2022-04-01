function validatePk(pk){
    if (pk.length !== 64){
        return false;
    }else if(hex2bin(pk)){
        return false;
    }else{
        return true;
    }
}