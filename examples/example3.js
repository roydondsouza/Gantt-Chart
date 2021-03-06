var tasks = [
{"startDate":new Date("Tue Dec 25 00:00:01 EST 2012"),"endDate":new Date("Tue Jan 08 23:59:59 EST 2013"),"taskName":"Sierra","status":"RUNNING","name":"Campaign Name - X34234 34530453"},
{"startDate":new Date("Thu Dec 20 00:00:01 EST 2012"),"endDate":new Date("Thu Jan 10 23:59:59 EST 2013"),"taskName":"TWC","status":"FAILED","name":"TWC Auto 2345234 234234SDFS"},
{"startDate":new Date("Thu Dec 20 00:00:01 EST 2012"),"endDate":new Date("Thu Jan 10 23:59:59 EST 2013"),"taskName":"TWC","status":"FAILED","name":"TWC Auto 2345234 234234SDFS"},
{"startDate":new Date("Tue Jan 01 00:00:01 EST 2013"),"endDate":new Date("Sat Jan 05 23:59:59 EST 2013"),"taskName":"TWC","status":"FAILED","name":"TWC Auto 2345234 234234SDFS"}
];

var taskStatus = {
    "SUCCEEDED" : "bar",
    "FAILED" : "bar-failed",
    "RUNNING" : "bar-running",
    "KILLED" : "bar-killed"
};

var taskNames = [ "TWC", "Corolla", "Sierra", "Piedmont Eye Care" ];

tasks.sort(function(a, b) {
    return a.endDate - b.endDate;
});
var maxDate = tasks[tasks.length - 1].endDate;
tasks.sort(function(a, b) {
    return a.startDate - b.startDate;
});
var minDate = tasks[0].startDate;

var format = "%d";
var timeDomainString = "1week";

var gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);//.height(450).width(800);;

var margin = {
     top : 20,
     right : 40,
     bottom : 20,
     left : 80
};
gantt.margin(margin);

gantt.timeDomainMode("fixed");
changeTimeDomain(timeDomainString);

gantt(tasks);

function changeTimeDomain(timeDomainString) {
    this.timeDomainString = timeDomainString;
    switch (timeDomainString) {
    case "1hr":
	format = "%H:%M:%S";
	gantt.timeDomain([ d3.time.hour.offset(getEndDate(), -1), getEndDate() ]);
	break;
    case "3hr":
	format = "%H:%M";
	gantt.timeDomain([ d3.time.hour.offset(getEndDate(), -3), getEndDate() ]);
	break;

    case "6hr":
	format = "%H:%M";
	gantt.timeDomain([ d3.time.hour.offset(getEndDate(), -6), getEndDate() ]);
	break;

    case "1day":
	format = "%H:%M";
	gantt.timeDomain([ d3.time.day.offset(getEndDate(), -1), getEndDate() ]);
	break;

    case "1week":
	format = "%d";
	gantt.timeDomain([ d3.time.day.offset(getEndDate(), -14), getEndDate() ]);
	break;

     case "1month":
    format = "%d";
    gantt.timeDomain([ d3.time.day.offset(getEndDate(), -30), getEndDate()  ]);
    break;
    default:
	format = "%H:%M"

    }
    gantt.tickFormat(format);
    gantt.redraw(tasks);
}

function getEndDate() {
    var lastEndDate = Date.now();
    if (tasks.length > 0) {
	lastEndDate = tasks[tasks.length - 1].endDate;
    }

    return lastEndDate;
}
function prev(){
    format = "%d";
    gantt.timeDomain([ d3.time.day.offset(getEndDate(), -7), getEndDate() ]);
    gantt.tickFormat(format);
    gantt.redraw(tasks);

}
function next(){
    format = "%d";
    gantt.timeDomain([ getEndDate(), d3.time.day.offset(getEndDate(), +7) ]);
    gantt.tickFormat(format);
    gantt.redraw(tasks);

}

function addTask() {

    var lastEndDate = getEndDate();
    var taskStatusKeys = Object.keys(taskStatus);
    var taskStatusName = taskStatusKeys[Math.floor(Math.random() * taskStatusKeys.length)];
    var taskName = taskNames[Math.floor(Math.random() * taskNames.length)];
     var name = "test";

    tasks.push({
	"startDate" : d3.time.day.offset(lastEndDate, Math.ceil(Math.random(10))),
	"endDate" : d3.time.day.offset(lastEndDate, (Math.ceil(Math.random(74))) + 1),
	"taskName" : taskName,
	"status" : taskStatusName,
    "name": name
    });

    changeTimeDomain(timeDomainString);
    gantt.redraw(tasks);
};

// function removeTask() {
//     tasks.pop();
//     changeTimeDomain(timeDomainString);
//     gantt.redraw(tasks);
// };
