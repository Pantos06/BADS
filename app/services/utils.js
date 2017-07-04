angular.module('utils', [])
.factory('utils', function(){
    return {
        'getNodeInfos': function getNodeInfos(min, max, bitVectors){
            var sum = 0;
            var value ='';
            for(var i = min; i<= max; i++){
                sum += bitVectors[i];
                value += bitVectors[i];
            }
            return {'sum':sum, 'value':value, 'size':max-min+1};
        },
        'power_of_2': function power_of_2(n){
            if(typeof n !== 'number'){ return 'Not a number'; }
            return n && (n & (n-1)) === 0;
        }
    };   
});