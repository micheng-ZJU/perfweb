/**
 * Created by Administrator on 2014/11/25.
 */


function getData(divId){
    var data = document.getElementById(divId).getElementsByTagName('th');
    var datalist = [];
    for(var i=0;i<data.length;i++){
        datalist[i] = data[i].innerText;
    }
    return datalist;
}

function drawCharts(){
    var blocks = document.getElementsByClassName("data_block");

    for(var i = 0; i<blocks.length; i++){
        var datalist = getData("chartData"+ i.toString());
        var maxValue = Math.max.apply(null, datalist);
        var stepWidth = Math.ceil(maxValue/4);

        var steps = Math.ceil(maxValue/stepWidth);

        if(steps*stepWidth-maxValue<=stepWidth*0.25&&steps>1)
            steps += 1;
        //console.log(stepWidth+' * '+steps);
        var labellist = getData("chartLabel"+ i.toString());
        var barChartData = {
            labels : labellist,
            datasets : [
                {
                    fillColor : "rgba(80,140,205,0.5)",
                    strokeColor : "rgba(80,140,205,0.8)",
                    highlightFill : "rgba(80,140,205,0.75)",
                    highlightStroke : "rgba(80,140,205,1)",
                    data : datalist
                }
            ]
        }
        var ctx = document.getElementById("canvas"+ i.toString()).getContext("2d");
        window.myBar = new Chart(ctx).Bar(barChartData, {

            scaleShowGridLines : false,
            barValueSpacing : 15,
            visible:true,
            scaleLineWidth : 2,
            barStrokeWidth : 1,
            scaleOverride : true,
            scaleSteps : steps,
            scaleStepWidth : stepWidth,
            scaleStartValue: 0
        });
    }
    console.log("Charts generated successfully.")

}

function drawLines(){
    var blocks = document.getElementsByClassName("data_block");

    for(var i = 0; i<blocks.length; i++){
        var datalist = getData("chartData"+ i.toString());
        var maxValue = Math.max.apply(null, datalist);
        var minValue = Math.min.apply(null, datalist);
        var diff =  Math.ceil(maxValue) - Math.floor(minValue);

        var stepWidth = diff/2;

        var steps = diff/stepWidth;
        var startvalue = Math.floor(minValue);

        var totop = steps*stepWidth+startvalue - maxValue;
        var tobottom = minValue - startvalue;


        if(totop<=stepWidth*steps*0.25&&steps>1 ||  steps == 1&&maxValue-Math.floor(minValue)>=1)
            steps += 1;
        if(tobottom <= stepWidth*0.25) {
            startvalue -= stepWidth;
        }
        //console.log(stepWidth+' * '+steps);
        var labellist = getData("chartLabel"+ i.toString());
        var lineData = {
            labels : labellist,
            datasets : [
                {
                    label: "My First dataset",
//                    fillColor : "rgba(220,220,220,0.2)",
                    strokeColor : "rgba(80,140,205,0.8)",
                    pointColor : "rgba(80,140,205,0.8)",
                    pointStrokeColor : "#fff",
                    pointHighlightFill : "#fff",
                    pointHighlightStroke : "rgba(220,220,220,1)",
                    data : datalist
                }
            ]
        }
        var ctx = document.getElementById("canvas"+ i.toString()).getContext("2d");
        window.myBar = new Chart(ctx).Line(lineData, {
//            responsive : true,
            bezierCurve : false,
            datasetFill: false,
            scaleShowGridLines : false,
            scaleOverride : true,
            scaleSteps : steps,
            scaleStepWidth : stepWidth,
            scaleStartValue: startvalue
        });
    }
    console.log("Charts generated successfully.")

}

//window.onload = function(){
//    hideTooltip();
//    drawCharts();
//}