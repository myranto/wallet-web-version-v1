import { CrudCommon } from "../common/CrudCommon";

export class AccountOP extends CrudCommon{
    constructor(){
        super('account')
    }   
    findByCustomer(id){
        return this.getCall(this.uri + '/customer/' + id, true)
    }
}