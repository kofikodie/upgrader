export interface PackageInterface {
    _id: string
    _rev: string
    name: string
    description: string
    'dist-tags': {
        latest: string
    }
    versions: PackageVersionInterface
    readme: string
    time: {
        modified: string
        created: string
        [key: string]: string
    }
}

export interface PackageVersionInterface {
    [key: string]: {
        name: string
        version: string
        description: string
        main: string
        scripts: {
            test: string
        }
        repository: {
            type: string
            url: string
        }
        keywords: string[]
        dependencies: {
            [key: string]: string
        }
        devDependencies: {
            [key: string]: string
        }
        _npmVersion: string
        _nodeVersion: string
        _npmUser: {
            name: string
            email: string
        }
    }
}
