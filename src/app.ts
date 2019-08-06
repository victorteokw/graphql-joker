import { applyMiddleware, chainMiddleware } from "scaffold-kit";
import {
  acceptHelp,
  acceptVersion,
  acceptMockInstall,
  acceptOverwrite,
  acceptSilent,
  appHelp,
  catchError,
  displayHelp,
  displayVersion,
  forwardCommand,
  parseArgv,
  useConfigFile,
  executeInstructions
} from "scaffold-kit/lib/middlewares";

import * as pkgJson from '../package.json';
import {
  app, model, nestable, resolver, resource, schema, uploader
} from "./commands";

const application = applyMiddleware(
  appHelp({
    displayName: 'GraphQL Joker',
    commandName: 'joker',
    version: pkgJson.version,
    description: pkgJson.description
  }),
  useConfigFile('.jokerrc'),
  chainMiddleware(
    acceptHelp,
    acceptVersion,
    acceptMockInstall,
    acceptOverwrite,
    acceptSilent,
    parseArgv
  ),
  displayVersion(pkgJson.version),
  catchError('CommandNameError', displayHelp()),
  forwardCommand({ app, model, nestable, resolver, resource, schema, uploader }),
  displayHelp(),
  executeInstructions
);

export default application;
