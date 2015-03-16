angular.module("commonModule", []);
angular.module('workitemTreeModule', ['ui.tree']);
angular.module("workitemModule",['commonModule']);
angular.module("workspaceModule", ['ngRoute', 'workitemTreeModule', 'commonModule']);
angular.module("app", ['ngRoute', 'commonModule', 'workspaceModule', 'workitemModule', 'workitemTreeModule']);
