export namespace backend {
	
	export class Config {
	    language: string;
	    darkMode: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Config(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.language = source["language"];
	        this.darkMode = source["darkMode"];
	    }
	}

}

