angular.module("commonModule", []);
angular.module('workitemTreeModule', ['ui.tree']);
angular.module("workspaceModule", ['ngRoute', 'workitemTreeModule', 'commonModule']);
angular.module("workitemModule",['commonModule']);
angular.module("app", ['ngRoute', 'workspaceModule', 'workitemModule', 'workitemTreeModule']);
