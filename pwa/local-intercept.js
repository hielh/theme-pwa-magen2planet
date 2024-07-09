/* eslint-disable */
/**
 * Custom interceptors for the project.
 *
 * This project has a section in its package.json:
 *    "pwa-studio": {
 *        "targets": {
 *            "intercept": "./local-intercept.js"
 *        }
 *    }
 *
 * This instructs Buildpack to invoke this file during the intercept phase,
 * as the very last intercept to run.
 *
 * A project can intercept targets from any of its dependencies. In a project
 * with many customizations, this function would tap those targets and add
 * or modify functionality from its dependencies.
 */

const { Targetables } = require("@magento/pwa-buildpack");

const moduleOverridePlugin = require('./src/plugins/moduleOverrideWebpackPlugin');
//import componentOverrideMapping from './src/webpack';
//const moduleOverrideWabpackPlugin = require('./src/webpack/moduleOverrideWebpackPlugin');

const componentOverrideMapping = require('./componentOverrideMapping');

function localIntercept(targets) {
    const targetables = Targetables.using(targets);

    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
            new moduleOverridePlugin(componentOverrideMapping).apply(compiler);
        })

        const MainComponent = targetables.reactComponent(
            "@magento/../../src/lib/ContentTypes/Slider/slider.js"
        );

        MainComponent.insertAfterJSX("<Features />", "<span>Hello World!</span>");
    }

module.exports = localIntercept;
