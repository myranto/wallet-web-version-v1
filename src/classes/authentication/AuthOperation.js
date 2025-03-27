import { CrudCommon } from "../common/CrudCommon";


export class AuthOperation extends CrudCommon{
    constructor() {
        super('auth')
    }
    login(body){
        return this.postCall(this.uri+'/login',body, false)
    }
    resetPwd(body, id){
        return this.postCall(this.uri+'/reset/password', body, false)
    }
}