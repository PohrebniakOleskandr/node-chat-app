class Users {

  constructor () {
    this.users = [];
  }

  addUser (id,name,room) {
    let user = {id,name,room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    let user = this.getUser (id);
    if (!user) return null;

    let users = this.users.filter(user => user.id !== id);
    this.users = users;
    return user;
  }

  getUser (id) {
    let users = this.users.filter(user => user.id === id);
    let user = users[0];
    return user;
  }

  getUserList (room) {
    let users = this.users.filter(user => user.room === room);
    let namesArray = users.map(user => user.name);
    return namesArray;
  }
}

module.exports = {Users};
