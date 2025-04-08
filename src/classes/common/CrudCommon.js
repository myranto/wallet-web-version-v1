import { Api } from "./Api";

export class CrudCommon extends Api{
    constructor(url, extensionURL = '') {
        super(url);
    }
// fonctionnalité basiques


// mettre auth = false si on ne veut pas verifier le token
// exemple d'utilisation avec auth=false pour login, signup... 
    create(body, auth = true){
        return this.postCall(this.uri, body, auth)
    }
    deleteOne(id){
        return this.deleteCall(this.uri + '/' + id, true)
    }
    updateOne(body){
        return this.putCall(this.uri, body, true)
    }
    findAll(page = null){
        const url = page!==null ? this.uri+'/all/'+page+'/15' : this.uri
        return this.getCall(url, true)
    }
    findOne(id){
        return this.getCall(this.uri + '/' + id, true)
    }
}