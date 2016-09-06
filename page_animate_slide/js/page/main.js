function changeStart() {
    $('.loading_box').show();
}

function changeSuccess() {
    $('.loading_box').hide();
}

var app = angular.module('myapp', ['ui.router', 'ngAnimate']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/main1').otherwise('/main1');
    $stateProvider
        .state('main1', {
            url: '/main1',
            resolve: {
                data: ['$q', function($q) {
                    var defer = $q.defer();
                    setTimeout(function() {
                        defer.resolve({
                            name: 'wang_hes'
                        });
                    }, 1500);
                    return defer.promise;
                }]
            },
            templateUrl: 'home.html'
        })
        .state('main2', {
            url: '/main2',
            resolve: {
                data: ['$q', function($q) {
                    var defer = $q.defer();
                    var dataJson = [{
                        time: '2016-09-09',
                        title: '这是一个文章的标题'
                    }, {
                        time: '2016-09-12',
                        title: '篇D3源码解构文章后的对D3的研究笔记'
                    }, {
                        time: '2016-09-13',
                        title: '函数是用在取出数组的一段切片'
                    }, {
                        time: '2016-09-14',
                        title: '发所以最近我在看它的实现'
                    }, {
                        time: '2016-09-19',
                        title: '用新的切片替换原删除切片位置的功'
                    }, {
                        time: '2016-09-29',
                        title: '本文不贴大段代码。源码地址'
                    }, {
                        time: '2016-10-12',
                        title: '关于这三个模块的分析网上随随便便就能'
                    }, {
                        time: '2016-10-19',
                        title: 'empty和isset函数时怎么判断变量的'
                    }, {
                        time: '2016-10-21',
                        title: '去除字符串中首尾的空格或其他字符'
                    }, {
                        time: '2016-10-24',
                        title: '在PHP中经常会用到这两个函'
                    }, {
                        time: '2016-11-09',
                        title: '对PHP源码更详细的注解'
                    }, {
                        time: '2016-12-09',
                        title: '前段时间阅读了一篇关于Android动画'
                    }, ]
                    setTimeout(function() {
                        defer.resolve(dataJson);
                    }, 500);
                    return defer.promise;
                }]
            },
            controller: ['$scope', '$timeout', 'data', function($scope, $timeout, data) {
                $scope.list = [];
                var animation = 'toggle';
                $scope.animation = animation;
                for (var i = 0; i < data.length; i++) {
                    (function(num) {
                        $timeout(function() {
                            $scope.list.push(data[num]);
                        }, 100 * num);
                    }(i));
                };
            }],
            templateUrl: 'list.html'
        });
}]).run(['$rootScope', function($rootScope) {
    $rootScope.$on('$stateChangeStart', changeStart);
    $rootScope.$on('$stateChangeSuccess', changeSuccess);
    $rootScope.$on('$stateChangeError', changeSuccess);
    $rootScope.$on('$stateNotFound', changeSuccess);

    $rootScope.$on('$routeChangeStart', changeStart);
    $rootScope.$on('$routeChangeSuccess', changeSuccess);
    $rootScope.$on('$routeChangeError', changeSuccess);
}]);

app.controller('MyController', function($state) {
    $state.go('main1');
});