const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node course'
        }, {
            id: '2',
            name: 'John',
            room: 'React course'
        }, {
            id: '3',
            name: 'Jeff',
            room: 'Node course'
        }];
    });

    it('should add a new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Mario',
            room: 'chat room'
        };

        var resUsers = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId = 'abc';
        var user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '1';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
        expect(user).toEqual(users.users[0]);
    });

    it('should not find user', () => {
        var user = users.getUser('abc');

        expect(user).toBeFalsy();
    });

    it ('should return names for Node course', () => {
        var namesArray = users.getUserList('Node course');

        expect(namesArray.length).toBe(2);
        expect(namesArray).toEqual([users.users[0].name, users.users[2].name]);
    });

    it ('should return names for React course', () => {
        var namesArray = users.getUserList('React course');

        expect(namesArray.length).toBe(1);
        expect(namesArray).toEqual([users.users[1].name]);
    });
});