import { CrudCommon } from "../common/CrudCommon";

export class AccountOP extends CrudCommon{
    constructor(){
        super('account')
    }   
    findByCustomer(id){
        return this.getCall(this.uri + '/customer/' + id, true)
    }
    findCurrentBalance(customer_id){
        return this.getCall(this.uri + '/current_amount/'+customer_id, true)
    }
}