const expect = require('expect');

const {Users} = require('./users');

describe('Users', ()=>{
  let users;

  beforeEach( ()=> {
    users = new Users();
    users.users = [{
        id:'1',
        name:'Alex',
        room:'Travellers'
      },
      {
        id:'2',
        name:'Kate',
        room:'Devs'
      },
      {
        id:'3',
        name:'Stanislav',
        room:'Travellers'
      }
    ];
  });

  it('should add a new user', ()=>{
    let users = new Users();

    let user = {
      id: '123',
      name: 'Sunnat',
      room: 'Travellers'
    };
    let resUser = users.addUser(user.id,user.name,user.room);

    expect(users.users).toEqual([user]);
  });

  it('should find a user', ()=>{
    let user = users.getUser('1');
    expect(user).toEqual({
            id:'1',
            name:'Alex',
            room:'Travellers'});
  });

  it('should not find a user', ()=>{
    let user = users.getUser('111111111111111');
    expect(user).toNotExist();
  });


  it('should remove a user', ()=>{
    let user = users.removeUser('111111111111111');
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should not remove a user', ()=>{
    let user = users.removeUser('1');
    expect(users.users.length).toBe(2);
    expect(users.users).toExclude({
        id:'1',
        name:'Alex',
        room:'Travellers'
      });
  });


  it('should return names for Travellers room', ()=>{
    let userList = users.getUserList ('Travellers');
    expect(userList).toEqual(['Alex','Stanislav']);
  });

  it('should return names for Devs room', ()=>{
    let userList = users.getUserList ('Devs');
    expect(userList).toEqual(['Kate']);
  });

});
