


export class Utils {

    static addToQueryParams(params: string, name: string, value: any): string {
        if (value) {
            if (value instanceof Array) {
                value.forEach(function(val) {
                    params = Utils.addParam(params, name, val);
                });
                return params;
            }
            return Utils.addParam(params, name, value);
        }
        return params;
    }

    private static addParam(params: string, name: string, value: any) {
        if (params) {
            params += '&';
        }
        return params + name + '=' + encodeURIComponent(value);
    }

}
