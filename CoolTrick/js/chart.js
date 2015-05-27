var app = angular.module('knowIt');



app.service('chart', function($http, $q){
 var stocks = [];

	var deferred = $q.defer();
	
this.getStock = function(){
	
	$http.get('https://www.quandl.com/api/v1/datasets/WIKI/AAPL.csv?auth_token=AmnikopZ2G-QXfdX3woi')
 
	.success(function(data){
	

		var lines=data.split("\n");

		var result = [];

		var headers=lines[0].split(",");

		for(var i = 1; i < lines.length; i++){

			var obj = {};
			var currentline=lines[i].split(",");

			for(var j = 0; j < headers.length; j++){
				obj[headers[j]] = currentline[j];
			}
			result.push(obj);
		}
		for(var i in result){
			stocks.push({
				// Date: result[i].Date,
				High: result[i].High,
				Low: result[i].Low,
				Close: result[i].Close,
				// Volume: result[i].Volume


			})
	
		}
		result = stocks;
		deferred.resolve(stocks)



	})
		return deferred.promise;



		function JSON2CSV(stocks) {
    var array = typeof stocks != 'object' ? JSON.parse(stocks) : stocks;

    var str = '';
    var line = '';

    if ($("#labels").is(':checked')) {
        var head = array[0];
        if ($("#quote").is(':checked')) {
            for (var index in array[0]) {
                var value = index + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (var index in array[0]) {
                line += index + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }

    for (var i = 0; i < array.length; i++) {
        var line = '';

        if ($("#quote").is(':checked')) {
            for (var index in array[i]) {
                var value = array[i][index] + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (var index in array[i]) {
                line += array[i][index] + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
    
}
        
$("#convert").click(function() {
    var json = $.parseJSON($("#json").val());
    var csv = JSON2CSV(json);
    $("#csv").val(csv);
});
    
$("#download").click(function() {
    var json = $.parseJSON($("#json").val());
    var csv = JSON2CSV(json);
    window.open("data:text/csv;charset=utf-8," + escape(csv))
});
}


})
