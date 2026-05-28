"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "copyYarnEngineAndBuildDependencies", {
    enumerable: true,
    get: function() {
        return copyYarnEngineAndBuildDependencies;
    }
});
const _child_process = require("child_process");
const _fs = require("fs");
const _path = require("path");
const _util = require("util");
const _yarnenginedirname = require("../constants/yarn-engine-dirname");
const execFilePromise = (0, _util.promisify)(_child_process.execFile);
const copyYarnEngineAndBuildDependencies = async (buildDirectory)=>{
    await _fs.promises.mkdir(buildDirectory, {
        recursive: true
    });
    await _fs.promises.cp(_yarnenginedirname.YARN_ENGINE_DIRNAME, buildDirectory, {
        recursive: true
    });
    const localYarnPath = (0, _path.join)(buildDirectory, '.yarn/releases/yarn-4.9.2.cjs');
    // Strip NODE_OPTIONS to prevent tsx loader from interfering with yarn
    const { NODE_OPTIONS: _nodeOptions, ...cleanEnv } = process.env;
    try {
        await execFilePromise(process.execPath, [
            localYarnPath,
            'workspaces',
            'focus',
            '--all',
            '--production'
        ], {
            cwd: buildDirectory,
            env: cleanEnv
        });
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    } catch (error) {
        const errorMessage = [
            error?.stdout,
            error?.stderr
        ].filter(Boolean).join('\n') || 'Failed to install logic function executor dependencies';
        throw new Error(errorMessage);
    }
    const objects = await _fs.promises.readdir(buildDirectory);
    await Promise.all(objects.filter((object)=>object !== 'node_modules').map((object)=>{
        const fullPath = (0, _path.join)(buildDirectory, object);
        return (0, _fs.statSync)(fullPath).isDirectory() ? _fs.promises.rm(fullPath, {
            recursive: true,
            force: true
        }) : _fs.promises.rm(fullPath);
    }));
};

//# sourceMappingURL=copy-yarn-engine-and-build-dependencies.js.map