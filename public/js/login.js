var socket = io();

socket.on('updateRoomList', function(rooms) {
    var roomsSelect = jQuery('#rooms');
    roomsSelect.html('');

    if (rooms.length) {
        roomsSelect.append(jQuery('<option value="">Select room</option>'));

        rooms.forEach(function(room) {
            roomsSelect.append(jQuery('<option></option>').text(room).val(room));
        });
    } else {
        roomsSelect.append(jQuery('<option value="">No active rooms</option>'));
    }
});
