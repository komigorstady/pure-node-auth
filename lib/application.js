const path = require('node:path')


class Application {
    constructor(path, server) {
        this.path = path
        this.apiPath = path.join(this.path, 'api');   
        this.servicePath = path.join(this.path, 'service');
        this.npm = {}
        this.server = server;
        
    }

    async init() {
        try {
            if (!server) throw new Error('Server is undefined');  
            
            

            this.server.start(this.context);    
        } catch (err) {
            console.log(err);
        }
    
    }
    
    async createContext() {
        
    
    
    }
    
    
    async loadDir(place , placePath){
        const files = await fsp.readdir(placePath, { withFileTypes: true });
        for (const file of files) {
          if (file.name.startsWith('.')) continue;
          const filePath = path.join(placePath, file.name);
          if (file.isDirectory()) this.context[file.name] = await this.loadDir(place, filePath);
          else if (place === 'api') await this.loadMethod(filePath);
          else if (place === 'service') await this.loadServices(filePath);
        }
    }
    
    async loadMethod() {
        const src = await fs.readFile(filePath, 'utf8');
        const code = `'use strict';\n${src}`;
        const script = new vm.Script(code);
        const context = vm.createContext(Object.freeze({ ...sandbox }));
        const exported = script.runInContext(context, RUN_OPTIONS);
        return exported;



    }

    async loadServices() {

    }

    async loadFile() {
        
    
    }

    async importNpmDep() {
    const pkgPath = path.join(process.cwd(), 'package.json');
    const pkg = require(pkgPath);
    
    if (pkg.dependencies) {
      for (const dependency of Object.keys(pkg.dependencies)) {
         this.npm[dependency] = require(dependency);
      }
    }
    return Object.freeze(npm);
    }
}