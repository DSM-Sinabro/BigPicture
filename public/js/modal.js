$(document).ready(function() {
    $("#btn_news").click(function() {
        $("#view_eventadd").modal();
    });
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();



    var calendar = $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay',
        },
        defaultView: 'month',
        seletable: true,
        selectHelper: true,

        select: function(start, end, allDay) {
            $('#view_eventadd').modal({
                title: event.title,
                content: event.content
            });
            $("#add").off('click').one("click", function() {
                var title = $('#modal-title').val();
                var newEvent = {
                    title: title,
                    start: start,
                    end: end,
                    allDay: allDay

                };

                console.log(newEvent);
                $('#calendar').fullCalendar('renderEvent', newEvent, 'stick');
                $('#view_eventadd').modal('hide');

            });
            title = $('#modal-title').val('');
        },

        eventClick: function(event, calEvent, jsEvent, view, element) {
            $('#view_event').modal({
                title: event.title,
                content: event.content
            });
            $("#edit").off('click').on("click", function() {
                var title = $('#change_modal-title').val();
                event.title = title;

                $('#calendar').fullCalendar('updateEvent', event);
                $('#view_event').modal('hide');
            });
            $("#remove").off('click').one("click", function() {
                var title = event._id;
                $('#calendar').fullCalendar('removeEvents', title);
                $('#view_event').modal('hide');
            });
            title = $('#change_modal-title').val(event.title);
        },
        editable: true,
        eventLimit: true
    })
});
