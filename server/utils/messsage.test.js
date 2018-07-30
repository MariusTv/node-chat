var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'Marius';
        var text = 'Test message';

        var message = generateMessage(from, text);

        // expect(message.from).toBe(from);
        // expect(message.text).toBe(text);

        expect(message).toMatchObject({from, text});

        expect(typeof message.createAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Marius';
        var longitude = '25.27';
        var latitude = '54.67';
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;

        var message = generateLocationMessage(from, latitude, longitude);

        expect(message).toMatchObject({from, url});
        expect(typeof message.createAt).toBe('number');
    });
});