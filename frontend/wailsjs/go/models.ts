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

export namespace model {
	
	export class FileCfg {
	    method: string;
	
	    static createFrom(source: any = {}) {
	        return new FileCfg(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.method = source["method"];
	    }
	}
	export class PathCfg {
	    path: string;
	    recursion: boolean;
	
	    static createFrom(source: any = {}) {
	        return new PathCfg(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.path = source["path"];
	        this.recursion = source["recursion"];
	    }
	}
	export class PicCfg {
	    method: string;
	
	    static createFrom(source: any = {}) {
	        return new PicCfg(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.method = source["method"];
	    }
	}
	export class TaskCfgFrontInterface {
	    fileCfg: FileCfg;
	    picCfg: PicCfg;
	    pathCfgs: PathCfg[];
	
	    static createFrom(source: any = {}) {
	        return new TaskCfgFrontInterface(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.fileCfg = this.convertValues(source["fileCfg"], FileCfg);
	        this.picCfg = this.convertValues(source["picCfg"], PicCfg);
	        this.pathCfgs = this.convertValues(source["pathCfgs"], PathCfg);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

